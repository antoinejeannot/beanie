import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import test from "node:test"

import plugin from "./index.js"

const RULES = "## Principles\n\n- **Write no useless comments.** " + "x".repeat(1200)

function write(content) {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "beanie-")), "BEANIE.md")
  fs.writeFileSync(file, content)
  return file
}

function fakeContext(file, stored = {}) {
  const ctx = {
    options: file ? { file } : {},
    hooks: {},
    commands: [],
    sent: undefined,
    said: undefined,
    stored,
    storage: {
      get: async (key) => stored[key],
      set: async (key, value) => {
        stored[key] = value
      },
    },
    session: {
      hook: async (name, fn) => {
        ctx.hooks[name] = fn
      },
      prompt: async (input) => {
        ctx.sent = input
      },
      synthetic: async (input) => {
        ctx.said = input.text
      },
    },
    command: {
      transform: async (callback) => callback({ add: (command) => ctx.commands.push(command) }),
    },
  }
  return ctx
}

test("both model requests receive the rules", async () => {
  const ctx = fakeContext(write(RULES))
  await plugin.setup(ctx)

  for (const kind of ["context", "compaction"]) {
    const event = { system: [{ type: "text", text: "opencode" }] }
    await ctx.hooks[kind](event)

    assert.equal(event.system.length, 2, `${kind} appended no part`)
    const added = event.system[1].text
    assert.ok(added.startsWith("BEANIE —"), `${kind} part is not labelled`)
    assert.ok(added.includes("Write no useless comments"), `${kind} part holds no rules`)
  }
})

test("a missing file leaves the request untouched", async () => {
  const ctx = fakeContext(path.join(os.tmpdir(), "beanie-absent", "BEANIE.md"))
  await plugin.setup(ctx)

  const event = { system: [{ type: "text", text: "opencode" }] }
  await ctx.hooks.context(event)

  assert.deepEqual(event.system, [{ type: "text", text: "opencode" }])
})

test("/beanie asks for a restatement and keeps what I typed", async () => {
  const ctx = fakeContext(write(RULES))
  await plugin.setup(ctx)
  const command = ctx.commands.find((item) => item.name === "beanie")

  await command.execute({
    sessionID: "ses_1",
    prompt: { text: "add a retry to the webhook client", files: [{ uri: "file:///a", mention: { start: 0, end: 2 } }] },
    delivery: "steer",
  })

  assert.equal(ctx.sent.sessionID, "ses_1")
  assert.equal(ctx.sent.delivery, "steer")
  assert.match(ctx.sent.text, /Restate my principles/)
  assert.ok(ctx.sent.text.endsWith("add a retry to the webhook client"))
  assert.equal(
    ctx.sent.files[0].mention,
    undefined,
    "the prefix shifts every offset, so a kept mention points at the wrong text",
  )
  assert.equal(ctx.sent.files[0].uri, "file:///a")
})

test("/beanie off stops the injection, /beanie on brings it back", async () => {
  const ctx = fakeContext(write(RULES))
  await plugin.setup(ctx)
  const command = ctx.commands.find((item) => item.name === "beanie")
  const inject = async () => {
    const event = { system: [] }
    await ctx.hooks.context(event)
    return event.system.length
  }

  assert.equal(await inject(), 1, "beanie starts on")

  await command.execute({ sessionID: "ses_1", prompt: { text: "off" }, delivery: "steer" })
  assert.equal(await inject(), 0, "off still appends the rules")
  assert.equal(ctx.stored.on, false, "off is not remembered")
  assert.match(ctx.said, /off/)
  assert.equal(ctx.sent, undefined, "off asked the model for something")

  await command.execute({ sessionID: "ses_1", prompt: { text: "on" }, delivery: "steer" })
  assert.equal(await inject(), 1, "on does not append the rules")
  assert.equal(ctx.stored.on, true, "on is not remembered")
})

test("a session started after /beanie off stays off", async () => {
  const file = write(RULES)
  const ctx = fakeContext(file, { on: false })
  await plugin.setup(ctx)

  const event = { system: [] }
  await ctx.hooks.context(event)

  assert.deepEqual(event.system, [])
})

test("/beanie with no argument sends the request alone", async () => {
  const ctx = fakeContext(write(RULES))
  await plugin.setup(ctx)
  const command = ctx.commands.find((item) => item.name === "beanie")

  await command.execute({ sessionID: "ses_1", prompt: {}, delivery: "queue" })

  assert.match(ctx.sent.text, /^Restate my principles/)
  assert.ok(ctx.sent.text.endsWith("how you will respect them."))
})

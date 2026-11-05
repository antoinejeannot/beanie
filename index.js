// OpenCode injects a location's AGENTS.md into the agent loop, but not into the
// compaction request, where a summary would otherwise lose the rules.

import fs from "node:fs"
import os from "node:os"
import path from "node:path"

const DEFAULT_FILE = path.join(
  process.env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config"),
  "opencode",
  "BEANIE.md",
)

function rules(file) {
  try {
    const text = fs.readFileSync(file, "utf8").trim()
    return `BEANIE — my engineering principles, read from ${file} on each request. Apply them to the work that you write and to the work that you review. When they disagree with a generic default, they win.\n\n${text}`
  } catch {
    return undefined
  }
}

function restate(file) {
  return `Restate my principles: the BEANIE block in your context, read from ${file}.

Give one line for each rule, in your own words, grouped by its section. Do not quote the file and do not copy it.
Then, in three lines maximum, name the rules that the work below puts most at risk, and how you will respect them.`
}

export default {
  id: "beanie",

  async setup(ctx) {
    const file = ctx.options?.file ?? DEFAULT_FILE

    const inject = (event) => {
      const text = rules(file)
      if (text) event.system.push({ type: "text", text })
    }
    await ctx.session.hook("context", inject)
    await ctx.session.hook("compaction", inject)

    await ctx.command.transform((editor) => {
      editor.add({
        name: "beanie",
        description: "Restate my principles, and the ones the task puts most at risk",
        execute: async ({ sessionID, prompt, delivery }) => {
          // The prefix shifts every attachment offset, so a mention would point at the wrong text.
          const strip = (items) => items?.map(({ mention, ...item }) => item)
          const text = (prompt.text ?? "").trim()
          const template = restate(file)
          await ctx.session.prompt({
            ...prompt,
            sessionID,
            text: text ? `${template}\n\n${text}` : template,
            files: strip(prompt.files),
            agents: strip(prompt.agents),
            skills: strip(prompt.skills),
            delivery,
          })
        },
      })
    })
  },
}

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.svg">
    <img src="assets/logo.svg" width="180" alt="beanie">
  </picture>
</p>

<h1 align="center">beanie</h1>

<p align="center"><em>Ponytail for bald guys.</em></p>

Your principles, in front of the model, on every [OpenCode](https://opencode.ai) request.

## When

Your rules must be in the prompt at the moment the model decides something. There are two such moments, and OpenCode covers only one.

| The model is called | `AGENTS.md` | beanie |
| --- | --- | --- |
| **Agent loop** — your message, and every continuation after a tool call | in the prompt | in the prompt |
| **Compaction** — the session gets long, OpenCode summarises it | **missing** | in the prompt |

The second one is the expensive gap. The summary is written without your rules, and every later turn is built on that summary.

beanie reads your file from disk on each of those calls. Edit a rule and the next message already follows it: no restart, no reload, no copy to keep in sync. One file, one plugin, 70 lines.

## Install

```jsonc
// ~/.config/opencode/opencode.json
{ "plugins": ["/path/to/beanie"] }
```

Your rules go in `~/.config/opencode/BEANIE.md`. Start from the one here, then make it yours:

```sh
cp beanie/BEANIE.md ~/.config/opencode/BEANIE.md
```

## Modes

| Command | What happens |
| --- | --- |
| `/beanie` | He restates your rules in his own words, and names the ones this task puts at risk |
| `/beanie off` | Hat off. No rules in the prompt |
| `/beanie on` | Hat back on |

`off` and `on` are remembered, in every session, until you change them. Text after the command stays: `/beanie add a retry to the webhook client`.

## The principles

> You are a staff engineer who does not like to write code. The best code is the code that you never write.

**The floor** — simplicity never removes validation at a trust boundary, error handling that prevents data loss, security, accessibility, or anything that was asked for.

**Before you write** — know the full scope. Be consistent: the codebase is one puzzle.

**The change** — KISS and YAGNI. Be lazy about the solution, never about the change. Keep the diff minimal. Fix the root cause once. New logic is unfinished without its check. Test the behavior that is specified, not the code that you wrote — a test must fail when you delete the implementation. Do one thing well. Write no useless comments. Decide for the long term.

**Before you show it** — run the hooks. Criticize your own work. Remove everything that you can. One commit for one unit of work. Show it only when you are proud of it.

**How you write** — ASD-STE100 Simplified Technical English. End each reply with what you did not do.

The full text is in [BEANIE.md](BEANIE.md).

## Credit

The mechanism comes from [ponytail](https://github.com/DietrichGebert/ponytail), which does much more. beanie keeps the hook, and makes your own file the single source.

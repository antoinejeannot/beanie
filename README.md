<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.svg">
    <img src="assets/logo.svg" width="180" alt="beanie">
  </picture>
</p>

<h1 align="center">beanie</h1>

<p align="center"><em>Ponytail for bald guys.</em></p>

Your principles, in front of the model, on every [OpenCode](https://opencode.ai) request.

## Why

OpenCode puts your `AGENTS.md` in the system prompt of the agent loop. It does not put it in the compaction request. So when a long session is summarised, the summary is written **without your rules**, and the agent continues from that summary.

beanie appends your rules to both requests. One file, one plugin, 70 lines.

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

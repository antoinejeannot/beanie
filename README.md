<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.svg">
    <img src="assets/logo.svg" width="180" alt="beanie">
  </picture>
</p>

<h1 align="center">beanie</h1>

<p align="center"><em>Ponytail for bald guys.</em></p>

Your rules. In the prompt. Every call.

One file. One plugin. 70 lines. For [OpenCode](https://opencode.ai).

## When

| The model is called | `AGENTS.md` | beanie |
| --- | --- | --- |
| Your message | yes | yes |
| After each tool call | yes | yes |
| Compaction: the session gets summarised | **no** | yes |

Compaction is the gap. The summary drops your rules. Each later turn is built on that summary.

beanie reads your file at each call. Edit a rule. The next message obeys it. No restart.

## Install

```jsonc
// ~/.config/opencode/opencode.json
{ "plugins": ["/path/to/beanie"] }
```

Put your rules in place:

```sh
cp beanie/BEANIE.md ~/.config/opencode/BEANIE.md
```

Write your own. The file here is only a start.

## Modes

| Command | What it does |
| --- | --- |
| `/beanie` | He says your rules again, in his words. He names the ones at risk now. |
| `/beanie off` | Hat off. No rules. |
| `/beanie on` | Hat on. |

The mode stays until you change it. Text after the command stays too.

## The principles

> The best code is the code that you never write.

- **The floor** — never cut these to make a change smaller: validation, error handling that saves data, security, accessibility, what I asked for.
- **Before you write** — know the full scope. Use what the codebase has.
- **The change** — the smallest diff that fully works. Fix the root cause one time. Test the behavior, not the code: a test must fail when you delete the implementation. No useless comments.
- **Before you show it** — run the hooks. Remove all that you can. One commit, one job. Show it only when you are proud of it.
- **How you write** — Simplified Technical English. End each reply with what you did not do.

Full text: [BEANIE.md](BEANIE.md).

## Credit

From [ponytail](https://github.com/DietrichGebert/ponytail). beanie keeps the hook. Your file is the only source.

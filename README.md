<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.svg">
    <img src="assets/logo.svg" width="180" alt="beanie">
  </picture>
</p>

<h1 align="center">beanie</h1>

<p align="center"><em>Ponytail for bald guys.</em></p>

## What

beanie puts one file of engineering principles in every [OpenCode](https://opencode.ai) prompt.

It ships with mine, in [BEANIE.md](BEANIE.md). Keep them, cut them, or point beanie at your own file.

## When

Measured with a probe plugin, not guessed:

| The model is called | beanie |
| --- | --- |
| Your message | yes |
| After each tool call | yes |
| Compaction: the session gets summarised | yes |

Your rules are the **last** part of the system prompt. They come after `AGENTS.md`.

beanie reads the file at each call. Edit a rule. The next message obeys it. No restart.

## Why not just `AGENTS.md`

`AGENTS.md` reaches the same calls. I measured that too. beanie gives you four other things:

- One file for every project. Not one block per repository.
- The last word in the prompt.
- `/beanie off`. No file to edit.
- `/beanie`. The agent says the rules back, so you see that it read them.

## Install

```sh
opencode plugin add github:antoinejeannot/beanie
```

Then put the rules where beanie reads them:

```sh
curl -o ~/.config/opencode/BEANIE.md \
  https://raw.githubusercontent.com/antoinejeannot/beanie/main/BEANIE.md
```

Write your own. The file here is only a start.

### Update

```sh
opencode plugin update beanie
```

The installed commit stays pinned until you run it.

### Work on the plugin

Clone it and give the directory instead. Each edit applies at the next message, with no push and no update.

```jsonc
// ~/.config/opencode/opencode.json — comments are allowed
{
  "plugins": [
    // "github:antoinejeannot/beanie" to run the published commit instead
    "/path/to/beanie"
  ]
}
```

### Another rules file

```jsonc
{ "plugins": [{ "package": "/path/to/beanie", "options": { "file": "/absolute/path/rules.md" } }] }
```

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

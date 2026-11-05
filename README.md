# beanie

Ponytail for bald guys.

beanie keeps your engineering principles in front of the model on each [OpenCode](https://opencode.ai) request. One file holds the rules, one plugin puts them in the system prompt. There are no levels, no modes and no state.

## Why

OpenCode puts the `AGENTS.md` of a location in the system prompt of the agent loop. It does not put it in the compaction request, so the summary of a long session is written without your rules, and the agent continues from that summary. beanie appends your rules to both requests.

The rules stay in one file that you own. A copy in a second place goes stale, and then the two disagree.

## Install

Clone this repository, then add its directory to `plugins` in `~/.config/opencode/opencode.json`:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["/path/to/beanie"]
}
```

Write your rules in `~/.config/opencode/BEANIE.md`. The `BEANIE.md` of this repository is a starting point, not a standard:

```sh
cp /path/to/beanie/BEANIE.md ~/.config/opencode/BEANIE.md
```

To read them from a different file, give an absolute path:

```jsonc
{
  "plugins": [{ "package": "/path/to/beanie", "options": { "file": "/absolute/path/rules.md" } }]
}
```

A missing file is not an error. beanie appends nothing and OpenCode continues.

## The /beanie command

`/beanie` asks the agent to restate your rules in its own words, one line for each rule, and to name the rules that the current task puts most at risk. A restatement shows that the agent read them; a copy shows nothing.

Text after the command stays:

```
/beanie add a retry to the webhook client
```

## Test

```sh
node --test
```

The tests replace the implementation to prove that each one fails without it.

## Credit

The mechanism comes from [ponytail](https://github.com/DietrichGebert/ponytail), which does much more. beanie keeps the system-prompt hook, and makes your own file the single source.

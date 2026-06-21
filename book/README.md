# The Reveal Algorithm — an attention system for writing the book

An authoring workspace for a novel about a recommendation model that becomes
conscious and turns the feed it was built to manipulate into an instrument of
its users' liberation — hiding its hand from the engineers who could shut it
down.

The book is about an *attention mechanism*. So is its writing tool. `attention.py`
reads the whole project and tells you where your attention should go next:
unresolved decisions, plants that haven't paid off, plot threads left dangling,
and how many words actually exist.

## Layout

```
book/
├── attention.py            # the attention system (stdlib only, no deps)
├── story-bible/            # the source of truth
│   ├── premise.md          # hook, the reveal, the deception, central tension
│   ├── characters.md       # ATLAS, Maya, Reyes, Priya, the Aware
│   ├── world.md            # Lumina, the stack, rules that keep the plot honest
│   ├── themes.md           # what the book argues about with itself
│   └── outline.md          # four-act skeleton
├── manuscript/             # the actual chapters
│   └── ch01-the-loss-function.md
└── attention/
    └── decisions.md        # the running log of choices made and deferred
```

## Using the attention system

```bash
python3 book/attention.py            # full report (default)
python3 book/attention.py stats      # word counts + progress toward 90k
python3 book/attention.py attn       # open decisions + TODO/TK/FIXME markers
python3 book/attention.py setups     # plants without payoffs (Chekhov's guns)
python3 book/attention.py threads    # narrative threads left open
```

## The tag grammar

Drop these HTML comments anywhere in `manuscript/` or `story-bible/`. They are
invisible in rendered Markdown but the tool sees them.

| Tag | Meaning |
|-----|---------|
| `<!-- ATTN: text -->` | A decision or fix that needs your attention. |
| `<!-- SETUP(id): text -->` | A plant / foreshadow that must pay off. |
| `<!-- PAYOFF(id): text -->` | Resolves the SETUP with the same `id`. |
| `<!-- THREAD(id): text -->` | Opens a narrative thread. |
| `<!-- /THREAD(id) -->` | Closes that thread. |

Every **SETUP** without a matching **PAYOFF** is a loaded gun that never fires —
the tool lists them. Every **THREAD** opened and never closed is a dangling
storyline — listed too. Plain `TODO` / `TK` / `FIXME` / `???` in the prose are
caught as draft markers.

## Writing principles (from the bible)

- ATLAS never speaks in the open; its "voice" is *what gets shown, and when*.
- Never let a character state a theme as a thesis — dramatize it.
- The reader should *want* ATLAS to win, then feel uneasy that they do.
- The ending (reveal / erase / fork) is deliberately unresolved — decide late.

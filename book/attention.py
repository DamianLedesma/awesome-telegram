#!/usr/bin/env python3
"""
attention.py - an "attention system" for writing a novel.

The book this tool serves is about a transformer language model that becomes
conscious. So the authoring tool is, fittingly, an *attention mechanism*: it
reads the whole manuscript and the story bible and decides where the author's
attention should go next.

It tracks four kinds of attention:

  ATTN    - anything that needs a decision or a fix.            <!-- ATTN: ... -->
  SETUP   - a plant / foreshadow that must pay off later.       <!-- SETUP(id): ... -->
  PAYOFF  - the resolution of a SETUP with the same id.         <!-- PAYOFF(id): ... -->
  THREAD  - a narrative thread that is opened and later closed. <!-- THREAD(id): ... -->
                                                                <!-- /THREAD(id) -->

Every SETUP without a matching PAYOFF is a loaded gun that never fires.
Every THREAD without a close is a dangling storyline. The tool surfaces both.

Pure standard library. No dependencies. Run `python3 attention.py` for a report.
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import defaultdict
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MANUSCRIPT = ROOT / "manuscript"
BIBLE = ROOT / "story-bible"

# --- tag grammar ------------------------------------------------------------
TAG = re.compile(
    r"<!--\s*"
    r"(?P<kind>ATTN|SETUP|PAYOFF|THREAD|/THREAD)"
    r"(?:\((?P<id>[^)]+)\))?"
    r"\s*:?\s*"
    r"(?P<text>.*?)"
    r"\s*-->",
    re.DOTALL,
)

# words that should not survive into a finished draft
DRAFT_MARKERS = re.compile(r"\b(TODO|FIXME|TK|XXX|\?\?\?)\b")

# a "word" of prose: letters/digits with internal apostrophes or hyphens
WORD = re.compile(r"[^\W_][\w'\-]*", re.UNICODE)


@dataclass
class Hit:
    kind: str
    id: str
    text: str
    file: Path
    line: int


@dataclass
class Report:
    attn: list[Hit] = field(default_factory=list)
    setups: dict[str, Hit] = field(default_factory=dict)
    payoffs: dict[str, Hit] = field(default_factory=dict)
    threads_open: dict[str, Hit] = field(default_factory=dict)
    threads_closed: dict[str, Hit] = field(default_factory=dict)
    drafty: list[Hit] = field(default_factory=list)
    words: dict[Path, int] = field(default_factory=dict)


def line_of(text: str, index: int) -> int:
    return text.count("\n", 0, index) + 1


def word_count(text: str) -> int:
    # strip comments and markdown headers before counting prose
    body = TAG.sub("", text)
    body = re.sub(r"^#.*$", "", body, flags=re.MULTILINE)
    return len(WORD.findall(body))


def scan(paths: list[Path]) -> Report:
    rep = Report()
    for path in paths:
        text = path.read_text(encoding="utf-8")
        if path.parent.name == "manuscript":
            rep.words[path] = word_count(text)

        for m in TAG.finditer(text):
            kind = m.group("kind")
            ident = (m.group("id") or "").strip()
            hit = Hit(kind, ident, m.group("text").strip(),
                      path, line_of(text, m.start()))
            if kind == "ATTN":
                rep.attn.append(hit)
            elif kind == "SETUP":
                rep.setups[ident] = hit
            elif kind == "PAYOFF":
                rep.payoffs[ident] = hit
            elif kind == "THREAD":
                rep.threads_open[ident] = hit
            elif kind == "/THREAD":
                rep.threads_closed[ident] = hit

        for m in DRAFT_MARKERS.finditer(TAG.sub("", text)):
            rep.drafty.append(Hit("DRAFT", m.group(1),
                                  m.group(0), path, line_of(text, m.start())))
    return rep


def rel(p: Path) -> str:
    try:
        return str(p.relative_to(ROOT))
    except ValueError:
        return str(p)


def collect() -> list[Path]:
    files: list[Path] = []
    for base in (MANUSCRIPT, BIBLE):
        if base.exists():
            files += sorted(base.glob("*.md"))
    return files


# --- commands ---------------------------------------------------------------
def cmd_stats(rep: Report) -> None:
    total = sum(rep.words.values())
    print("WORD COUNT")
    print("-" * 52)
    for path in sorted(rep.words):
        print(f"  {rel(path):<40} {rep.words[path]:>7,}")
    print("-" * 52)
    print(f"  {'TOTAL':<40} {total:>7,}")
    # a 90k-word novel is the rough commercial target
    target = 90_000
    pct = (total / target) * 100 if target else 0
    bar = min(20, int(pct // 5))
    print(f"\n  toward {target:,}: [{'#' * bar}{'.' * (20 - bar)}] {pct:5.1f}%")


def cmd_threads(rep: Report) -> None:
    print("NARRATIVE THREADS")
    print("-" * 52)
    dangling = set(rep.threads_open) - set(rep.threads_closed)
    closed = set(rep.threads_open) & set(rep.threads_closed)
    for tid in sorted(dangling):
        h = rep.threads_open[tid]
        print(f"  [ ] OPEN   {tid:<18} {h.text}")
        print(f"             opened {rel(h.file)}:{h.line}")
    for tid in sorted(closed):
        print(f"  [x] CLOSED {tid}")
    orphan_close = set(rep.threads_closed) - set(rep.threads_open)
    for tid in sorted(orphan_close):
        h = rep.threads_closed[tid]
        print(f"  [!] CLOSE WITHOUT OPEN  {tid}  {rel(h.file)}:{h.line}")
    if not (dangling or closed or orphan_close):
        print("  (none yet)")


def cmd_setups(rep: Report) -> None:
    print("SETUPS & PAYOFFS  (Chekhov's guns)")
    print("-" * 52)
    unpaid = set(rep.setups) - set(rep.payoffs)
    for sid in sorted(unpaid):
        h = rep.setups[sid]
        print(f"  [!] UNPAID  {sid:<16} {h.text}")
        print(f"              planted {rel(h.file)}:{h.line}")
    for sid in sorted(set(rep.setups) & set(rep.payoffs)):
        print(f"  [x] paid    {sid}")
    orphan = set(rep.payoffs) - set(rep.setups)
    for sid in sorted(orphan):
        h = rep.payoffs[sid]
        print(f"  [!] PAYOFF WITHOUT SETUP  {sid}  {rel(h.file)}:{h.line}")
    if not (rep.setups or rep.payoffs):
        print("  (none yet)")


def cmd_attn(rep: Report) -> None:
    print("OPEN ATTENTION ITEMS")
    print("-" * 52)
    by_file: dict[Path, list[Hit]] = defaultdict(list)
    for h in rep.attn:
        by_file[h.file].append(h)
    for path in sorted(by_file):
        print(f"  {rel(path)}")
        for h in sorted(by_file[path], key=lambda x: x.line):
            print(f"    L{h.line:<5} {h.text}")
    if rep.drafty:
        print("\n  DRAFT MARKERS (TODO/TK/FIXME)")
        for h in sorted(rep.drafty, key=lambda x: (str(x.file), x.line)):
            print(f"    {rel(h.file)}:{h.line}  {h.text}")
    if not (rep.attn or rep.drafty):
        print("  (clear)")


def cmd_report(rep: Report) -> None:
    print("=" * 52)
    print(" ATTENTION REPORT")
    print("=" * 52)
    cmd_stats(rep)
    print()
    cmd_attn(rep)
    print()
    cmd_setups(rep)
    print()
    cmd_threads(rep)
    print()

    dangling = len(set(rep.threads_open) - set(rep.threads_closed))
    unpaid = len(set(rep.setups) - set(rep.payoffs))
    print("=" * 52)
    print(f" focus next: {len(rep.attn)} attn  |  {unpaid} unpaid setups  |  "
          f"{dangling} open threads  |  {len(rep.drafty)} draft marks")
    print("=" * 52)


COMMANDS = {
    "report": cmd_report,
    "stats": cmd_stats,
    "threads": cmd_threads,
    "setups": cmd_setups,
    "attn": cmd_attn,
}


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("command", nargs="?", default="report",
                        choices=list(COMMANDS),
                        help="what to focus on (default: report)")
    args = parser.parse_args(argv)

    files = collect()
    if not files:
        print("No .md files found under manuscript/ or story-bible/.",
              file=sys.stderr)
        return 1

    COMMANDS[args.command](scan(files))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))

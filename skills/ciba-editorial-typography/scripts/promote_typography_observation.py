#!/usr/bin/env python3
"""Promote a captured typography signal only after explicit user confirmation."""

from __future__ import annotations

import argparse
from datetime import datetime, timezone
from pathlib import Path


def clean(value: str) -> str:
    return " ".join(value.replace("|", "\\|").split())


def quote_block(value: str) -> str:
    lines = value.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    return "\n".join(f"> {line}" for line in lines)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--id", required=True, help="ID already present in observation-inbox.md")
    parser.add_argument("--signal", required=True, help="Confirmed neutral interpretation")
    parser.add_argument("--keep", required=True, help="Confirmed property to retain or increase")
    parser.add_argument("--avoid", required=True, help="Confirmed property to reduce or remove")
    parser.add_argument("--decision", required=True, help="Confirmed rule for future typography")
    parser.add_argument(
        "--confirmation",
        required=True,
        help="Exact user words confirming this interpretation",
    )
    parser.add_argument("--context", default="general", help="Page, artifact, or review context")
    parser.add_argument("--date", help="ISO date override for deterministic tests")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    root = Path(__file__).resolve().parents[1] / "references"
    inbox = root / "observation-inbox.md"
    ledger = root / "typography-ledger.md"
    inbox_text = inbox.read_text(encoding="utf-8")
    entry_id = clean(args.id)

    if f"## {entry_id}" not in inbox_text:
        raise SystemExit(f"Unknown typography inbox ID: {entry_id}")
    if f"Promoted ID: {entry_id}" in ledger.read_text(encoding="utf-8"):
        raise SystemExit(f"Typography inbox ID already promoted: {entry_id}")

    date = args.date or datetime.now(timezone.utc).date().isoformat()
    entry = (
        f"\n### {date} — {clean(args.context)}\n\n"
        f"- Promoted ID: {entry_id}\n"
        "- Explicit confirmation:\n\n"
        f"{quote_block(args.confirmation)}\n\n"
        "| Confirmed signal | Keep | Avoid | Decision |\n"
        "| --- | --- | --- | --- |\n"
        f"| {clean(args.signal)} | {clean(args.keep)} | {clean(args.avoid)} | "
        f"{clean(args.decision)} |\n"
    )
    with ledger.open("a", encoding="utf-8") as handle:
        handle.write(entry)
    with inbox.open("a", encoding="utf-8") as handle:
        handle.write(
            f"\n## Promotion record — {entry_id}\n\n"
            f"- Promoted: {date}\n"
            f"- Ledger context: {clean(args.context)}\n"
            "- Status: promoted after explicit confirmation\n"
        )

    print(f"Promoted {entry_id} to {ledger} using explicit confirmation.")


if __name__ == "__main__":
    main()

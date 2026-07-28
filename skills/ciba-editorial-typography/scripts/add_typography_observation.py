#!/usr/bin/env python3
"""Capture exact typography feedback without inferring a permanent preference."""

from __future__ import annotations

import argparse
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4


def clean(value: str) -> str:
    return " ".join(value.replace("|", "\\|").split())


def quote_block(value: str) -> str:
    lines = value.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    return "\n".join(f"> {line}" for line in lines)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--quote", required=True, help="User's exact explicit feedback")
    parser.add_argument("--context", default="general", help="Page, artifact, or review context")
    parser.add_argument("--source", default="direct user feedback", help="Where the quote came from")
    parser.add_argument("--id", help="Stable ID override for deterministic tests")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    inbox = Path(__file__).resolve().parents[1] / "references" / "observation-inbox.md"
    now = datetime.now(timezone.utc)
    entry_id = clean(args.id) if args.id else f"TYPE-{now.strftime('%Y%m%dT%H%M%S%fZ')}-{uuid4().hex[:8]}"
    entry = (
        f"\n## {entry_id}\n\n"
        f"- Captured: {now.date().isoformat()} UTC\n"
        f"- Context: {clean(args.context)}\n"
        f"- Source: {clean(args.source)}\n"
        "- Status: pending interpretation and explicit confirmation\n"
        "- Exact feedback:\n\n"
        f"{quote_block(args.quote)}\n"
    )
    with inbox.open("a", encoding="utf-8") as handle:
        handle.write(entry)
    print(f"Captured {entry_id} in {inbox}; no permanent preference was inferred.")


if __name__ == "__main__":
    main()


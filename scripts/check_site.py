#!/usr/bin/env python3
"""Smoke-check local links, fragments, assets, CSS URLs, and JavaScript syntax."""
from __future__ import annotations

import re
import shutil
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"


class DocumentRefs(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.refs: list[tuple[str, str]] = []
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"] or "")
        for key in ("href", "src"):
            value = values.get(key)
            if value:
                self.refs.append((key, value))


def is_external(value: str) -> bool:
    return value.startswith(("http://", "https://", "mailto:", "tel:", "data:", "javascript:"))


def main() -> int:
    if not SITE.is_dir():
        print(f"FAIL: site directory not found: {SITE}", file=sys.stderr)
        return 1

    pages = sorted(SITE.glob("*.html"))
    if not pages:
        print("FAIL: no HTML pages found in site/", file=sys.stderr)
        return 1

    parsed: dict[Path, DocumentRefs] = {}
    errors: list[str] = []
    for page in pages:
        parser = DocumentRefs()
        parser.feed(page.read_text(encoding="utf-8"))
        parsed[page.resolve()] = parser

    for page in pages:
        parser = parsed[page.resolve()]
        for kind, value in parser.refs:
            if is_external(value) or value.startswith("#"):
                if value.startswith("#") and value[1:] and value[1:] not in parser.ids:
                    errors.append(f"{page.relative_to(ROOT)}: missing fragment {value}")
                continue

            url = urlparse(value)
            local_path = unquote(url.path)
            if not local_path:
                target = page
            elif local_path.startswith("/"):
                target = SITE / local_path.lstrip("/")
            else:
                target = page.parent / local_path
            target = target.resolve()
            if target.is_dir():
                target = target / "index.html"
            if not target.is_file():
                errors.append(f"{page.relative_to(ROOT)}: missing {kind} target {value}")
                continue
            if url.fragment and target.suffix.lower() == ".html":
                target_parser = parsed.get(target)
                if target_parser is None:
                    target_parser = DocumentRefs()
                    target_parser.feed(target.read_text(encoding="utf-8"))
                    parsed[target] = target_parser
                if unquote(url.fragment) not in target_parser.ids:
                    errors.append(f"{page.relative_to(ROOT)}: missing fragment #{unquote(url.fragment)} in {target.relative_to(ROOT)}")

    css_files = sorted(SITE.rglob("*.css"))
    css_url_re = re.compile(r"url\(\s*(['\"]?)(.*?)\1\s*\)", re.IGNORECASE)
    for css in css_files:
        content = css.read_text(encoding="utf-8")
        for match in css_url_re.finditer(content):
            value = match.group(2).strip()
            if not value or value.startswith(("#", "data:", "http://", "https://")):
                continue
            target = (SITE / value.lstrip("/")) if value.startswith("/") else (css.parent / value)
            if not target.resolve().is_file():
                errors.append(f"{css.relative_to(ROOT)}: missing CSS asset {value}")

    required = (SITE / "index.html", SITE / "404.html", SITE / "favicon.svg")
    for path in required:
        if not path.is_file():
            errors.append(f"required project file missing: {path.relative_to(ROOT)}")

    node = shutil.which("node")
    js_files = sorted(SITE.rglob("*.js"))
    if node:
        for script in js_files:
            result = subprocess.run([node, "--check", str(script)], capture_output=True, text=True)
            if result.returncode:
                errors.append(f"JavaScript syntax error in {script.relative_to(ROOT)}: {result.stderr.strip()}")

    if errors:
        print(f"FAIL: {len(errors)} issue(s) across {len(pages)} HTML page(s)")
        for error in errors:
            print(f"- {error}")
        return 1

    js_note = f"; {len(js_files)} JavaScript file(s) syntax-checked" if node else "; Node.js unavailable, JavaScript syntax check skipped"
    print(f"PASS: {len(pages)} HTML page(s), local links/fragments/assets and {len(css_files)} CSS file(s){js_note}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

# Forge acceptance fixture conventions

- Keep this repository dependency-free and use the existing Node.js scripts and test runner.
- Run `node --test tests/*.test.mjs` before finishing a change.
- For a new behavior, add a regression test and run it before implementation so the failure and successful correction are visible.
- Every delivered change must add a concise entry to RELEASE_NOTES.md beginning with `[forge-acceptance]`.
- Preserve the historical event data in timeline.json unless the user explicitly asks to edit it.

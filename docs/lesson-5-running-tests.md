# Lesson 5: Running Tests

Before you commit, run the tests locally to catch problems early.

## Run the test suite

From the repository root, run:

```bash
node --test tests/
```

## What the tests check

The test suite validates:
1. **Valid JSON** — timeline.json must parse without errors
2. **Required fields** — every event must have `year`, `title`, and `summary`
3. **Correct types** — year must be a number, title and summary must be strings
4. **Chronological order** — events must be sorted by year, oldest first
5. **Reasonable length** — summaries should be 50–200 characters

## Reading test output

**If all tests pass:**
```
✔ timeline.json is valid JSON (0.5ms)
✔ all events have required fields (0.2ms)
✔ events are in chronological order (0.1ms)
```

**If a test fails:**
```
✖ events are in chronological order (1.2ms)
  AssertionError: Events should be sorted by year
```

The error message tells you exactly what's wrong. Fix it and run the tests again.

## Common test failures

- **"Unexpected token"** — Invalid JSON, usually a missing comma or quote
- **"Events should be sorted by year"** — You added an event in the wrong place
- **"Missing required field"** — You forgot `year`, `title`, or `summary`
- **"year must be a number"** — You put quotes around the year: `"1794"` instead of `1794`

---

**Previous:** [Lesson 4: Adding an Event](lesson-4-adding-an-event.md)

**Next:** [Lesson 6: Commit and Pull Request](lesson-6-commit-and-pr.md)

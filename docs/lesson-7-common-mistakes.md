# Lesson 7: Common Mistakes

Here are the five most common mistakes and how to fix them.

## Mistake 1: Forgetting the release note

**What happens:** CI fails with "RELEASE_NOTES.md was not updated"

**Fix:** Add a line to `RELEASE_NOTES.md` at the top:
```
- [forge] Add [event name] ([year]) to timeline
```

**Remember:** Must start with `- [forge] ` (dash, space, bracket, "forge", bracket, space).

## Mistake 2: Wrong release note format

**What happens:** CI fails with "no added line starts with '- [forge] '"

**Common errors:**
- `- Add event` (missing `[forge]`)
- `- (forge) Add event` (wrong bracket style)
- `- [forge]  Add event` (two spaces after bracket)

**Fix:** Use exactly `- [forge] ` followed by your description.

## Mistake 3: Events out of order

**What happens:** Test fails: "Events should be in chronological order"

**Fix:** Sort events by year, oldest first. If you added 1794 after 1800, move it to the right place.

## Mistake 4: Invalid JSON

**What happens:** The file won't parse; tests fail immediately

**Common causes:**
- Missing comma between events
- Extra comma after the last event
- Missing quotes around strings
- Quotes around the year number

**Fix:** Use a JSON validator to find the syntax error. Check for missing or extra commas.

## Mistake 5: Quotes around the year

**What happens:** JSON is invalid; tests fail

**Wrong:**
```json
"year": "1794"
```

**Right:**
```json
"year": 1794
```

**Fix:** Remove the quotes around the year. It must be a number, not a string.

---

**Previous:** [Lesson 6: Commit and Pull Request](lesson-6-commit-and-pr.md)

**Next:** [Lesson 8: You're Ready](lesson-8-youre-ready.md)

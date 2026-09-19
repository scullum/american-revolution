# Lesson 3: The Format

Every event in `timeline.json` has exactly three fields:

## year
- **Type:** Number (not a string)
- **Example:** `1776` not `"1776"`
- **Rule:** Must be a valid calendar year

## title
- **Type:** String
- **Length:** 2–5 words
- **Example:** `"Declaration of Independence"`
- **Rule:** Short phrase that names the event

## summary
- **Type:** String
- **Length:** 100–150 characters (one sentence)
- **Example:** `"The Continental Congress formally declared the thirteen colonies independent from British rule on July 4th."`
- **Rule:** What happened and why it mattered, in one sentence

## Complete example

```json
{
  "year": 1794,
  "title": "Whiskey Rebellion",
  "summary": "Farmers in western Pennsylvania rebelled against federal whiskey taxes, testing the new government's authority."
}
```

## What to avoid

- ❌ Quotes around the year: `"year": "1794"`
- ❌ Wrong field names: `date`, `name`, `description`
- ❌ Missing fields: every event needs all three
- ❌ Extra fields: only these three are allowed
- ❌ Multi-sentence summaries: keep it to one sentence

---

**Previous:** [Lesson 2: The Rules](lesson-2-the-rules.md)

**Next:** [Lesson 4: Adding an Event](lesson-4-adding-an-event.md)

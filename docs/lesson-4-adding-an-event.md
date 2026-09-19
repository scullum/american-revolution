# Lesson 4: Adding an Event

Let's walk through adding a new event step by step.

## Step 1: Pick an event

Find a gap in the timeline or add to the end. The timeline currently goes from 1765 to 1781. Let's add 1794 (Whiskey Rebellion).

## Step 2: Add to timeline.json

Open `timeline.json` and add the event in chronological order (after 1781, before the closing bracket):

```json
  {
    "year": 1794,
    "title": "Whiskey Rebellion",
    "summary": "Farmers in western Pennsylvania rebelled against federal whiskey taxes, testing the new government's authority."
  }
```

**Important:** Make sure you have a comma after the previous event. The last event in the array should NOT have a trailing comma.

## Step 3: Validate the JSON

If you're not sure your JSON is valid, paste it into a JSON validator online (search "JSON validator"). Common mistakes:
- Missing comma between events
- Extra comma after the last event
- Quotes around the year number

## Step 4: Add the release note

Open `RELEASE_NOTES.md` and add one line at the top (above the existing entries):

```
- [forge] Add Whiskey Rebellion (1794) to timeline
```

**Remember:** Must start with `- [forge] ` (with a space after the bracket).

## Step 5: Test locally

Run the tests to make sure everything works (see Lesson 5).

---

**Previous:** [Lesson 3: The Format](lesson-3-the-format.md)

**Next:** [Lesson 5: Running Tests](lesson-5-running-tests.md)

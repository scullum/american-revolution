# Lesson 6: Commit and Pull Request

Once your tests pass, you're ready to commit and open a pull request.

## Step 1: Stage your changes

```bash
git add timeline.json RELEASE_NOTES.md
```

## Step 2: Commit with a clear message

```bash
git commit -m "Add Whiskey Rebellion (1794) to timeline"
```

**Commit message tips:**
- Be specific: "Add Whiskey Rebellion" is better than "Update timeline"
- Start with a verb: Add, Fix, Update, Remove
- Keep it short (under 50 characters if possible)

## Step 3: Push to your branch

```bash
git push origin your-branch-name
```

Replace `your-branch-name` with the name of your feature branch.

## Step 4: Open a pull request

Go to GitHub and open a pull request. In the description:
- Say what you added
- Mention why it's significant
- Reference any issues if applicable

Example:
```
Added the Whiskey Rebellion (1794) to the timeline. This event tested
the new federal government's authority and is a key moment in early
American history.
```

## Step 5: Wait for CI

The CI pipeline will run automatically:
1. Checkout your code
2. Run the test suite
3. Check that RELEASE_NOTES.md was updated with the `[forge]` prefix

If CI passes, you're done. If it fails, read the error message and fix the problem.

---

**Previous:** [Lesson 5: Running Tests](lesson-5-running-tests.md)

**Next:** [Lesson 7: Common Mistakes](lesson-7-common-mistakes.md)

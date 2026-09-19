# Lesson 2: The Rules

This project has **one strict rule**: every pull request must include a release note.

**What's a release note?** A one-line description of what you changed, added to `RELEASE_NOTES.md` at the top of the file.

**The exact format:** Every release note must start with `- [forge] ` (dash, space, bracket, "forge", bracket, space) followed by your description.

**Example:** If you add the Whiskey Rebellion (1794), your release note would be:
```
- [forge] Add Whiskey Rebellion (1794) to timeline
```

**Why?** Release notes tell users what changed in each version. The `[forge]` prefix marks entries created by contributors (as opposed to automated tools or maintainers).

**The test will fail if you forget.** The CI pipeline checks every pull request. If there's no release note with the `[forge]` prefix, the build stops. You must add it before merging.

**Common mistakes:**
- Missing the `[forge]` prefix entirely: `- Add event` ❌
- Wrong bracket style: `- (forge) Add event` ❌
- Extra spaces: `- [forge]  Add event` (two spaces) ❌
- Correct format: `- [forge] Add event` ✅

---

**Previous:** [Lesson 1: What Is This Project?](lesson-1-what-is-this.md)

**Next:** [Lesson 3: The Format](lesson-3-the-format.md)

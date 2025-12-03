# Merge Conflict Quick Guide

When Git reports conflicts, review each file instead of blindly selecting an option:

1. **Inspect the context**
   - Open the conflicted file and locate the `<<<<<<<`, `=======`, and `>>>>>>>` markers.
   - Understand what each side represents: `current` is your branch; `incoming` is the branch you are merging or rebasing onto.

2. **Choose the right resolution**
   - **Accept Current Change** when your branch already has the correct or newer code for that section.
   - **Accept Incoming Change** when the other branch’s change should replace yours (for example, it contains the fixes you need).
   - **Accept Both** when the changes are compatible and should coexist—usually after reordering or blending the code manually.

3. **Edit for coherence**
   - Remove the conflict markers and adjust formatting, imports, or variable names so the final code is consistent and builds correctly.

4. **Verify and test**
   - Run the project’s tests or a quick build to confirm the resolution.
   - Use `git add <file>` to mark the conflict as resolved, then continue the merge or rebase.

5. **Document tricky decisions**
   - If you had to make judgment calls, leave a short comment in the commit message or code comments for future reference.

By evaluating each conflict block, you can pick the right option for the situation instead of defaulting to current or incoming everywhere.

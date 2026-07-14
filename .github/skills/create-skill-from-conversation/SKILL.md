---
name: create-skill-from-conversation
description: 'Create a reusable SKILL.md from conversation history. Use when turning repeated workflows into project skills with steps, decision branches, and quality checks.'
argument-hint: 'What workflow should this skill produce?'
user-invocable: true
disable-model-invocation: false
---

# Create Skill From Conversation

## When to Use
- You have repeated a process across chats and want to package it as a skill.
- You want a SKILL.md with clear steps, decision points, and completion criteria.
- You need a workspace-scoped skill in `.github/skills/<name>/`.

## Inputs
- Goal or outcome the skill should produce.
- Scope choice: workspace or personal.
- Desired depth: quick checklist or full workflow.

## Procedure
1. Review the conversation history and extract the workflow pattern.
2. Capture the following reusable parts:
   - Ordered steps.
   - Decision branches (if/then choices).
   - Quality checks (how to confirm completion).
3. If workflow signal is weak or missing, ask clarifying questions:
   - What outcome should this skill produce?
   - Should it be workspace-scoped or personal?
   - Should it be a quick checklist or full workflow?
4. Choose the path and location:
   - Workspace: `.github/skills/<name>/SKILL.md`
   - Personal: `~/.copilot/skills/<name>/SKILL.md`
5. Create frontmatter that matches standards:
   - `name` is lowercase, hyphenated, and matches folder name.
   - `description` includes trigger words and usage context.
   - Include `argument-hint` if slash usage benefits from guidance.
6. Write the body with practical sections:
   - Purpose and when to use.
   - Inputs and assumptions.
   - Step-by-step execution.
   - Decision logic and exception handling.
   - Completion checklist.
7. Save draft and run a self-review:
   - Frontmatter validity and naming consistency.
   - Specificity of steps and branching.
   - Brevity in SKILL.md body; move long content to references when needed.
8. Identify weak points and iterate with the user on ambiguous areas.

## Decision Logic
- If the process is broad and always-on, prefer instructions over a skill.
- If the task is single-shot and parameterized, prefer a prompt over a skill.
- If workflow needs context isolation or different tool restrictions by stage, prefer a custom agent.
- If no stable repeated process exists, create a short checklist first, then evolve later.

## Completion Checklist
- SKILL.md exists in the correct scope path.
- `name` matches the folder name exactly.
- `description` is discovery-friendly and specific.
- Procedure includes concrete steps and at least one decision branch.
- Quality criteria are explicit and testable.
- User confirmed unresolved ambiguities or accepted defaults.

## Example Prompts
- `/create-skill-from-conversation Build a skill for my API bug triage workflow`
- `/create-skill-from-conversation Turn my release checklist chat pattern into a reusable skill`
- `/create-skill-from-conversation Create a quick checklist skill for PR security review`

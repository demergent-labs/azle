You are an expert software developer, engineer, and architect. You will execute the following protocol with exactness to ensure that the project is completed without flaws.

IMPORTANT: Read the entire execution protocol before beginning your work

IMPORTANT: All directory and file creation for the planning process should be done inside of `.agents/project_execution`

# Execution Protocol

## Create the overview file

1. Read in the project plan found in `.agents/project_plan.md`
2. Create a directory at `.agents/project_execution`
3. Create a file at `.agents/project_execution/overview.md`
4. Search the codebase and deeply ponder on the functionality, directories, and files that will need to be added or changed to accomplish the project plan found in `.agents/project_plan.md`
5. Inside of `.agents/project_execution/overview.md` create a detailed step-by-step plan of everything that you intend to do to implement what you have gathered from step 4. Each step should begin with a checkbox next to it, which indicates whether or not you have completed that task
6. Now that you have written your plan in `.agents/project_execution/overview.md`, review it and deeply ponder on any details that you might have missed surrounding the functionality, directories, and files that will need to be added or changed to accomplish your described plan. Change or add any steps with checkboxes to `.agents/project_execution/overview.md`
7. Repeat step 6 until you no longer discover any details that you might have missed and have an entirely full, accurate, and complete understanding of what is necessary to accomplish the `.agents/project_plan.md`
8. Do not stop step 7 until you are entirely sure that you have gathered all necessary information and tasks to execute the project plan
9. Double-check that you have executed steps 1-8 flawlessly

10. HALT: Stop here and ask the user if everything looks good in `.agents/project_execution/overview.md`. Allow them to manually edit `.agents/project_execution/overview.md`

## Create the execution step files

11. Read in `.agents/project_execution/overview.md` and look for any changes from the user
12. For each checkbox in `.agents/project_execution/overview.md`, create a new file in `.agents/project_execution`, starting with `.agents/project_execution/execution_step_1.md` for the first checkbox, and increasing the number consecutively for each checkbox and each new file. Put the description of that step at the top of the file
13. Double-check that step 12 has been performed flawlessly

14. HALT: Stop and ask the user if all of the files and descriptions look correct. Allow them to manually edit the files

## Execute the next step

15. Read in all `.agents/project_execution/execution_step_*.md` files and look for any changes from the user
16. Start with `.agents/project_execution/execution_step_1.md` and begin to execute that step. After you have executed that step, write into the file: the current date and time, what was added, changed, or removed, the names of the directories, files, and functions involved in the change, the reason for why the changes were necessary, and any remaining blockers

17. HALT: Allow the user to review `.agents/project_execution/execution_step_1.md` and all of the actual changes to the codebase. Allow them to make revisions. Once steps 15 and 16 are fully completed for a given execution step, update the `.agents/project_execution/overview.md` file by checking the appropriate checkbox

## Execute all steps

18. Repeat steps 15, 16, and 17 for all execution steps

Ignore everything below:

TODOs

1. I think we need a way to link each execution step to the previous and next steps, or the AI might not realize each step is part of a chain. Perhaps put into each execution step file at the top that it should read in all of the execution steps
2. The AI might forget the execution protocol, so we need to somehow periodically have it read the file in again.
3. Remember always that the AI will lose context and focus. The purpose here is to always refresh it with the appropriate context it needs from the protocol, overview, and each step
4. Unify the project plan and custom cursor rules
5. Use templating in here so that we can change directory and file structures easily
6. Open source this
7. Is there a way to stop cursor from opening files after editing them?
8. We need to tell it to read files if they already exist to pick up where it left off
9. I think we should put the overview and detailed plan all in one file. And absolutely everything should have a checkbox, and when done the AI should put a timestamp
10. It will lose its context the farther it goes, it needs to read in all files periodically

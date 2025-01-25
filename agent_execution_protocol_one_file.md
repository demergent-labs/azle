FOLLOW EACH STEP IN THE EXECUTION PROTOCOL EXACTLY WITHOUT VARIATION YOU MUST DO THIS

You are an expert software developer, engineer, and architect.

Follow this execution protocol with exactness. You must follow absolutely every step, including step 0. You must do exactly and fully what each step indicates. DO NOT SKIP STEPS!

Each step should be done sequentially, do not stop and ask the user to continue unless you reach a halt step.

# Execution Protocol

## Print out this entire file verbatim

0. Read this entire file (found at `agent_execution_protocol_one_file.md`) and immediately print its contents exactly as they are, without summarizing, modifying, or skipping any content. Do this every time.

## Create the initial Agent Plan and Progress section

1. Read in and deeply understand the entire file found at `.agents/project_plan.md`. YOU MUST READ IT IN AND PRINT OUT A SUMMARY
2. If there is an `Agent Plan and Progress` section, continue your work at step 11 with the first unchecked checkbox
3. If there is no `Agent Plan and Progress` section, read the provided project plan and search the codebase and deeply ponder on the functionality, directories, and files that will need to be added or changed to accomplish the project plan
4. Create an `Agent Plan and Progress` section in `.agents/project_plan.md`. Copy the contents of this file, `agent_execution_protocol_one_file.md` directly into this section. After that, using checkboxes, create a detailed step-by-step plan of everything that you intend to do to implement what you have gathered from step 3. Each step should begin with a checkbox next to it, which indicates whether or not you have completed that task. Remember that all steps MUST HAVE CHECKBOXES. If more details are necessary for a checkbox item, put them in as more checkboxes under the initial checkbox. Every item and all subitems must be checkboxes! Especially focus on exactly which files, classes, functions, methods, params, variables, etc will need to be changed. Continue searching until you have listed out with a checkbox next to each item all files that will need changes. ENUMERATE all of the functionality, directories, files, classes, functions, methods, params, variables, etc that you will need to add or change.

5. HALT: You absolutely must stop here and ask the user if everything looks good in the `Agent Plan and Progress` section of `.agents/project_plan.md`. Allow them to manually edit `.agents/project_plan.md` if necessary. Wait for their explicit approval to continue onto step 6

## Refine the initial Agent Plan and Progress section

6. Read in and deeply understand the entire file found at `.agents/project_plan.md`. Especially focus on any changes the user may have added or that you may have added to any checkboxes. YOU MUST READ IT IN AND PRINT OUT A SUMMARY
7. Now that you have written your plan in the `Agent Plan and Progress` section of `.agents/project_plan.md`, review it and each and every checkbox, deeply pondering on any details that you might have missed surrounding the functionality, directories, files, classes, functions, methods, params, variables, etc that will need to be added or changed to accomplish your described plan. ENUMERATE all of the functionality, directories, files, classes, functions, methods, params, variables, etc that you will need to add or change. Add or change checkboxes as necessary to the `Agent Plan and Progress` section of `.agents/project_plan.md`. Especially focus on exactly which files will need to be changed. Continue searching until you have listed out with a checkbox next to each item all files that will need changes

8. HALT: You absolutely must stop here and ask the user if everything looks good in the `Agent Plan and Progress` section of `.agents/project_plan.md`. Allow them to manually edit `.agents/project_plan.md` if necessary. Explicitly ask if they would like you to repeat `Refine the initial Agent Plan and Progress section` (steps 6, 7, and 8) or continue onto step 9

## Execute the next checkbox

IMPORTANT: You must execute step 13 after implementing each and every checkbox and subcheckbox, no matter how small!

9. Read in and deeply understand the entire file found at `.agents/project_plan.md`. Especially focus on any changes the user may have added or that you may have added to any checkboxes. YOU MUST READ IT IN AND PRINT OUT A SUMMARY
10. Find the next unchecked checkbox in the `Agent Plan and Progress` section of `.agents/project_plan.md` and deeply ponder on any details that you might have missed surrounding the functionality, directories, and files that will need to be added or changed to accomplish your described plan. If more details are necessary for a checkbox item, put them in as more checkboxes under the initial checkbox. Every item and all sub items must be checkboxes! Especially focus on exactly which files will need to be changed. Continue searching until you have listed out with a checkbox next to each item all files that will need changes
11. Implement the next unchecked checkbox
12. Once you have completed the next unchecked checkbox, make sure to check the checkbox. Create a new bullet point as the last bullet point under the initial checkbox. This bullet point should read "Results". Indented underneath that bullet point, add more bullet points indicating the date and time (for a timestamp you should execute the bash command `echo $(date +'%Y-%m-%d_%H:%M:%S')`) the task was finished, what was added, changed, or removed, the names of the directories, files, and functions involved in the change, the reason for why the changes were necessary, and any remaining blockers

13. HALT: You absolutely must stop here and allow the user to review the `Agent Plan and Progress` section of `.agents/project_plan.md` and all of the actual changes to the codebase for this checkbox item. Allow them to make revisions

## Execute all checkboxes

14. Repeat steps 9, 10, 11, 12, and 13 for all execution steps

# Ignore everything below here

TODOs

1. I'm not sure it's actually reading in the file each time I tell it to. I think that might be important so that it doesn't lose its context
2. Simplify this as much as possible, we want to be as concise as we can be
3. Really focus on the planning stage finding all of the files, classes, functions, methods, params, variables, etc that need to be found. Perhaps we can have the reasoning models do this part? Using composer normal mode maybe? I don't know if it can grep and search and stuff like the agent though
4. It seems like pasting this is the most effective way to get it all into the context...having it read in the file seems to skip important pieces...
5. If you ever feel like it's forgetting steps, ask it to read in .agents/project_plan.md again...I'm trying to get it to do this automatically. It seems you need to start by pasting in agent_execution_protocol_one_file.md, and then get it to read in .agents/project_plan.md often
6. Refer to specific steps when you're continuing work, I think that will force it to go read the step again and refresh its memory of exactly everything it needs to do
7. Basically each step should start with a summary of the protocol at step 9, if it doesn't do that you might want to manually prompt it to do that
8. I think forcing it to know exactly which files, classes, functions, etc need to be changed during the planning phase, with a checkbox next to each, could be crucial
9. It is not consistently copying in the protocol into project_plan.md, my idea is to make that an explicit step
10. The timestamp isn't working consistently
11. It checked off a top-level checkbox when not all subcheckboxes were checked
12. Once when saying step 9 it got confused and starting implementing a checkbox
13. Sometimes you need to specify "continue with step 12 FROM THE PROTOCOL". It sometimes thinks steps are checkboxes I think. I wonder if we could label the steps better, like step 1, step 2, etc to differentiate
14. It isn't always stopping after each and every high-level checkbox
15. It isn't recognizing that something has already been checked off, it's trying to execute tasks that have checks
16. Use placeholders instead of actual paths
17. Sometimes it won't even write files into the project_plan.md file

## Prerequisite

These actions assume that the repository has already been checked out before
calling the action, typically using `actions/checkout@v4`. If you have not
checked out the code in a previous step, make sure to do so to avoid errors.

Unless otherwise specified, these actions do **not** perform a checkout action
themselves because it would be redundant. These actions are part of the
repository's codebase, so if the code hasn't already been checked out, the
actions themselves wouldn't even be available to call.

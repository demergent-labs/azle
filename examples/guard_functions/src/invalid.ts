// The following file gives examples of invalid guard function usage that will
// result in compilation time errors.

import { $query, GuardResult } from 'azle';

function guard_function(): GuardResult {
    return { ok: null };
}

// 1. Custom annotation not directly followed by a function declaration
$query;
let invalid = ['this is not a function declaration'];
export function fn1(): void {}

// 2. Call expression without arguments
$query();
export function fn2(): void {}

// 3. Spreading the options object
$query(...invalid);
export function fn3(): void {}

// 4. Spreading inside the options object
$query({ ...invalid });
export function fn4(): void {}

// 5. Too many arguments
$query({}, true);
export function fn5(): void {}

// 6. Too many options
$query({ guard: guard_function, anything_else: true, 4: true });
export function fn6(): void {}

// 7. Invalid option
$query({ anything_else: false });
export function fn7(): void {}

let computed_prop_name = 'guard';

// 8. Computed guard key name
$query({ [computed_prop_name]: guard_function });
export function fn8(): void {}

// 9. Non exported function
$query;
function fn9(): void {}

$query; // Dangling guard un-followed by exported function

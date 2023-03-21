// The following file gives examples of invalid guard function usage that will
// result in compilation time errors.

import { $query, GuardResult } from 'azle';

const array_containing_options_object = [
    { guard: 'this is not a function declaration' }
];
const options_subset = { guard: 'this is not a function declaration' };

function guard_function(): GuardResult {
    return { Ok: null };
}

// 1. Custom annotation not directly followed by a function declaration
$query;
console.log('Something between annotation and function declaration');
export function fn1(): void {}

// 2. Spreading the options object
$query(...array_containing_options_object);
export function fn3(): void {}

// 3. Spreading inside the options object
$query({ ...options_subset });
export function fn4(): void {}

// 4. Too many arguments
$query({}, true);
export function fn5(): void {}

// 5. Too many options
$query({ guard: guard_function, anything_else: true, 4: true });
export function fn6(): void {}

// 6. Invalid option
$query({ anything_else: false });
export function fn7(): void {}

let computed_prop_name = 'guard';

// 7. Computed guard key name
$query({ [computed_prop_name]: guard_function });
export function fn8(): void {}

// 8. Non exported function
$query;
function fn9(): void {}

// 9. Dangling guard without accompanying exported function
$query;

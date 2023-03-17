import { $query, GuardResult } from 'azle';

// #region Guarded functions are called
$query;
export function identifier_annotation(): boolean {
    console.log('identifier_annotation was called');
    return true;
}

$query();
export function call_expression_without_options_object(): boolean {
    console.log('call_expression_without_options_object was called');
    return true;
}

$query({});
export function call_expression_with_empty_options_object(): boolean {
    console.log('call_expression_with_empty_options_object was called');
    return true;
}

function allow_all(): GuardResult {
    console.log('allow_all called');
    return { ok: null };
}

$query({ guard: allow_all });
export function loosely_guarded(): boolean {
    console.log('loosely_guarded called');
    return true;
}

$query({ guard: allow_all });
export function loosely_guarded_with_guard_option_key_as_string(): boolean {
    console.log('loosely_guarded_with_guard_option_key_as_string was called');
    return true;
}
// #endregion Guarded function are called

// #region Execution halted by guard function
function allow_none(): GuardResult {
    console.log('allow_none called');
    return { err: 'Execution halted by "allow_none" guard function' };
}

$query({ guard: allow_none });
export function tightly_guarded(): boolean {
    console.log('tightly_guarded was called');
    return true;
}

function throw_string(): GuardResult {
    throw 'Execution halted by "throw_string" guard function';
}

$query({ guard: throw_string });
export function error_string_guarded(): boolean {
    console.log('error_string_guarded was called');
    return true;
}

class CustomError extends Error {
    constructor(message: string) {
        super(message);
    }
}

function throw_custom_error(): GuardResult {
    throw new CustomError(
        'Execution halted by "throw_custom_error" guard function'
    );
}

$query({ guard: throw_custom_error });
export function custom_error_guarded(): boolean {
    console.log('custom_error_guarded was called');
    return true;
}
// #endregion Execution halted by guard functions

// #region Execution halted by runtime error
function return_invalid_type(): GuardResult {
    return 'Something other than a guard result';
}

$query({ guard: return_invalid_type });
export function invalid_return_type_guarded(): boolean {
    console.log('invalid_return_type_guarded was called');
    return true;
}
// #region Execution halted by runtime error

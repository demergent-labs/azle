import { $query, GuardResult } from 'azle';

// #region Guarded functions are called
$query;
export function identifier_annotation(): boolean {
    console.log('identifier_annotation called');
    return true;
}

$query();
export function call_expression_without_options_object(): boolean {
    console.log('call_expression_without_options_object called');
    return true;
}

$query({});
export function call_expression_with_empty_options_object(): boolean {
    console.log('call_expression_with_empty_options_object called');
    return true;
}

export function allow_all(): GuardResult {
    console.log('allow_all called');
    return { ok: null };
}

$query({ guard: allow_all });
export function loosely_guarded(): boolean {
    console.log('loosely_guarded called');
    return true;
}

$query({ "guard": allow_all });
export function loosely_guarded_with_guard_option_key_as_string(): boolean {
    console.log('loosely_guarded_with_guard_option_key_as_string called');
    return true;
}
// #endregion Guarded function are called

// #region Execution halted by guard function
export function allow_none(): GuardResult {
    console.log('allow_none called');
    return { err: 'Execution halted by "allow_none" guard function' };
}

$query({ guard: allow_none });
export function tightly_guarded(): boolean {
    console.log('tightly_guarded called');
    return true;
}

export function throw_string(): GuardResult {
    console.log('throw_string called');
    throw 'Execution halted by "throw_string" guard function';
}

$query({ guard: throw_string });
export function error_string_guarded(): boolean {
    console.log('error_string_guarded called');
    return true;
}

class CustomError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export function throw_custom_error(): GuardResult {
    console.log('throw_custom_error called');
    throw new CustomError(
        'Execution halted by "throw_custom_error" guard function'
    );
}

$query({ guard: throw_custom_error });
export function custom_error_guarded(): boolean {
    console.log('custom_error_guarded called');
    return true;
}
// #endregion Execution halted by guard functions

// #region Execution halted by runtime error
export function return_invalid_type(): GuardResult {
    console.log('return_invalid_type called');
    return 'Something other than a guard result';
}

$query({ guard: return_invalid_type });
export function invalid_return_type_guarded(): boolean {
    console.log('invalid_return_type_guarded called');
    return true;
}

export function return_non_guard_result_object(): GuardResult {
    console.log('return_non_guard_result_object called');
    return { bad_prop: 'Something other than a guard result' };
}

$query({ guard: return_non_guard_result_object });
export function bad_object_guarded(): boolean {
    console.log('bad_object_guarded called');
    return true;
}

export function non_null_ok_value(): GuardResult {
    console.log('non_null_ok_value called');
    return { ok: 'Something other than null' };
}

$query({ guard: non_null_ok_value });
export function non_null_ok_value_guarded(): boolean {
    console.log('non_null_ok_value_guarded called');
    return true;
}

export function non_string_err_value(): GuardResult {
    console.log('non_string_err_value called');
    return { err: { bad_prop: 'Something other than a string' } };
}

$query({ guard: non_string_err_value });
export function non_string_err_value_guarded(): boolean {
    console.log('non_string_err_value_guarded called');
    return true;
}
// #region Execution halted by runtime error

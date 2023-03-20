import { $query, $update, GuardResult, int32, Record } from 'azle';

type State = Record<{
    counter: int32;
}>;

let state: State = {
    counter: 0
};

$query;
export function getState(): State {
    return state;
}

// #region Guarded functions are called
$query;
export function identifierAnnotation(): boolean {
    console.log('identifierAnnotation called');
    return true;
}

$query();
export function callExpressionWithoutOptionsObject(): boolean {
    console.log('callExpressionWithoutOptionsObject called');
    return true;
}

$query({});
export function callExpressionWithEmptyOptionsObject(): boolean {
    console.log('callExpressionWithEmptyOptionsObject called');
    return true;
}

function allowAll(): GuardResult {
    console.log('allowAll called');
    return { ok: null };
}

$query({ guard: allowAll });
export function looselyGuarded(): boolean {
    console.log('looselyGuarded called');
    return true;
}

$query({ "guard": allowAll });
export function looselyGuardedWithGuardOptionKeyAsString(): boolean {
    console.log('looselyGuardedWithGuardOptionKeyAsString called');
    return true;
}

function modifyStateAndUpdate(): GuardResult {
    console.log('allowAll called');
    return { ok: null };
}

$update({ guard: modifyStateAndUpdate });
export function guardedModifyState(): int32 {
    console.log('guardedModifyState called');
    return ++state.counter;
}
// #endregion Guarded function are called

// #region Execution halted by guard function
function allowNone(): GuardResult {
    console.log('allowNone called');
    return { err: 'Execution halted by "allowNone" guard function' };
}

$query({ guard: allowNone });
export function tightlyGuarded(): boolean {
    console.log('tightlyGuarded called');
    return true;
}

function throwString(): GuardResult {
    console.log('throwString called');
    throw 'Execution halted by "throwString" guard function';
}

$query({ guard: throwString });
export function errorStringGuarded(): boolean {
    console.log('errorStringGuarded called');
    return true;
}

class CustomError extends Error {
    constructor(message: string) {
        super(message);
    }
}

function throwCustomError(): GuardResult {
    console.log('throwCustomError called');
    throw new CustomError(
        'Execution halted by "throwCustomError" guard function'
    );
}

$query({ guard: throwCustomError });
export function customErrorGuarded(): boolean {
    console.log('customErrorGuarded called');
    return true;
}
// #endregion Execution halted by guard functions

// #region Execution halted by runtime error
function returnInvalidType(): GuardResult {
    console.log('returnInvalidType called');
    return 'Something other than a guard result';
}

$query({ guard: returnInvalidType });
export function invalidReturnTypeGuarded(): boolean {
    console.log('invalidReturnTypeGuarded called');
    return true;
}

function returnNonGuardResultObject(): GuardResult {
    console.log('returnNonGuardResultObject called');
    return { badProp: 'Something other than a guard result' };
}

$query({ guard: returnNonGuardResultObject });
export function badObjectGuarded(): boolean {
    console.log('badObjectGuarded called');
    return true;
}

function nonNullOkValue(): GuardResult {
    console.log('nonNullOkValue called');
    return { ok: 'Something other than null' };
}

$query({ guard: nonNullOkValue });
export function nonNullOkValueGuarded(): boolean {
    console.log('nonNullOkValueGuarded called');
    return true;
}

function nonStringErrValue(): GuardResult {
    console.log('nonStringErrValue called');
    return { err: { badProp: 'Something other than a string' } };
}

$query({ guard: nonStringErrValue });
export function nonStringErrValueGuarded(): boolean {
    console.log('nonStringErrValueGuarded called');
    return true;
}
// #endregion Execution halted by runtime error

import { ic, GuardResult } from 'azle';
import { state } from './state';

export function logMethodNameAndAllowAll(): GuardResult {
    console.log('logMethodName called');
    state.lastCalledMethod = ic.method_name();
    return { ok: null };
}

export function allowAll(): GuardResult {
    console.log('allowAll called');
    return { ok: null };
}

export function modifyStateAndAllowAll(): GuardResult {
    console.log('modifyStateAndAllowAll called');
    state.counter++;
    return { ok: null };
}

export function allowNone(): GuardResult {
    console.log('allowNone called');
    return { err: 'Execution halted by "allowNone" guard function' };
}

export function throwString(): GuardResult {
    console.log('throwString called');
    throw 'Execution halted by "throwString" guard function';
}

class CustomError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export function throwCustomError(): GuardResult {
    console.log('throwCustomError called');
    throw new CustomError(
        'Execution halted by "throwCustomError" guard function'
    );
}

export function returnInvalidType(): GuardResult {
    console.log('returnInvalidType called');
    return 'Something other than a guard result';
}

export function returnNonGuardResultObject(): GuardResult {
    console.log('returnNonGuardResultObject called');
    return { badProp: 'Something other than a guard result' };
}

export function returnNonNullOkValue(): GuardResult {
    console.log('nonNullOkValue called');
    return { ok: 'Something other than null' };
}

export function returnNonStringErrValue(): GuardResult {
    console.log('nonStringErrValue called');
    return { err: { badProp: 'Something other than a string' } };
}

import { ic, GuardResult } from 'azle';
import { state } from './state';

export function allowModifyStateGuarded(): GuardResult {
    console.log('allowModifyStateGuarded called');
    if (ic.methodName() === 'modifyStateGuarded') {
        console.log(
            `Method ${ic.methodName()} allowed by inspectMessage's guard function: allowModifyStateGuarded`
        );
    } else {
        console.log(
            `Method ${ic.methodName()} would be rejected by inspectMessage's guard function... but we are in inspect message mode so doing so would be a contract violation. Therefore, proceeding.`
        );
    }

    return { Ok: null };
}

export function allowAll(): GuardResult {
    console.log('allowAll called');
    return { Ok: null };
}

export function acceptAllThenRejectAll(): GuardResult {
    console.log('acceptAllThenRejectAll called');
    if (++state.heartbeatTick > 20) {
        console.log(`Heartbeat suppressed`);
        return { Err: 'This error message will never be seen' };
    }
    console.log(`Accepted heartbeat tick #${state.heartbeatTick}`);
    return { Ok: null };
}

export function incrementCounterAndAllowAll(): GuardResult {
    console.log('incrementCounterAndAllowAll called');
    state.counter++;
    return { Ok: null };
}

export function unpassable(): GuardResult {
    console.log('unpassable called');
    return { Err: 'Execution halted by "unpassable" guard function' };
}

export function throwString(): GuardResult {
    console.log('throw string called');
    throw 'Execution halted by "throw string" guard function';
}

class CustomError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export function throwCustomError(): GuardResult {
    console.log('throwCustomError called');
    throw new CustomError(
        'Execution halted by "throw custom error" guard function'
    );
}

export function preventUpgrades(): GuardResult {
    console.log('preventUpgrades called');
    return { Err: 'Upgrades to this canister are disabled' };
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
    return { Ok: 'Something other than null' };
}

export function returnNonStringErrValue(): GuardResult {
    console.log('nonStringErrValue called');
    return { Err: { badProp: 'Something other than a string' } };
}

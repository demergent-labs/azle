import { state } from './index';

export function allowAll(): void {
    console.log('allowAll called');
}

export function acceptAllThenRejectAll(): void {
    console.log('acceptAllThenRejectAll called');
    if (++state.heartbeatTick > 20) {
        console.log(`Heartbeat suppressed`);
        throw 'This error message will never be seen';
    }
    console.log(`Accepted heartbeat tick #${state.heartbeatTick}`);
}

export function incrementCounterAndAllowAll(): void {
    console.log('incrementCounterAndAllowAll called');
    state.counter++;
}

export function unpassable(): void {
    console.log('unpassable called');
    throw 'Execution halted by "unpassable" guard function';
}

export function throwString(): void {
    console.log('throw string called');
    throw 'Execution halted by "throw string" guard function';
}

class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

export function throwCustomError(): void {
    console.log('throwCustomError called');
    throw new CustomError(
        'Execution halted by "throw custom error" guard function'
    );
}

export function returnNonStringErrValue(): void {
    console.log('nonStringErrValue called');
    throw { badProp: 'Something other than a string' };
}

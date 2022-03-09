import {
    Query,
    u64,
    ic
} from 'azle';

export function caller(): Query<string> {
    return ic.caller();
}

export function canisterBalance(): Query<u64> {
    return ic.canisterBalance();
}

export function id(): Query<string> {
    return ic.id();
}

export function print(message: string): Query<boolean> {
    ic.print(message);

    return true;
}

export function time(): Query<u64> {
    return ic.time();
}

export function trap(message: string): Query<boolean> {
    ic.trap(message);

    return true;
}
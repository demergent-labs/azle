import {
    Query,
    u64
} from 'azle';

declare const ic: {
    caller: () => string;
    canisterBalance: () => u64;
    id: () => string;
    print: (...args: any) => void;
    time: () => u64;
    trap: (message: string) => never;
};

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
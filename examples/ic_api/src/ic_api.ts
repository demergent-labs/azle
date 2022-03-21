import {
    Query,
    float64,
    ic
} from 'azle';

export function caller(): Query<string> {
    return ic.caller();
}

// TODO This function should return a nat64: https://github.com/demergent-labs/azle/issues/98
export function canisterBalance(): Query<float64> {
    return ic.canisterBalance();
}

export function id(): Query<string> {
    return ic.id();
}

export function print(message: string): Query<boolean> {
    ic.print(message);

    return true;
}

// TODO This function should return a nat64: https://github.com/demergent-labs/azle/issues/98
export function time(): Query<float64> {
    return ic.time();
}

export function trap(message: string): Query<boolean> {
    ic.trap(message);

    return true;
}
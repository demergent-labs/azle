import { empty, ic, Manual, Query } from 'azle';

export function accept(): Query<boolean> {
    return true;
}

export function error(): Query<Manual<empty>> {
    // This errors because neither ic.reject nor ic.reply were called
}

export function reject(message: string): Query<Manual<empty>> {
    ic.reject(message);
}

// class API

import { query } from 'azle';

export default class {
    @query
    accept(): boolean {
        return true;
    }

    @query
    error(): Manual<empty> {
        // This errors because neither ic.reject nor ic.reply were called
    }

    @query
    reject(message: string): Manual<empty> {
        ic.reject(message);
    }
}

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

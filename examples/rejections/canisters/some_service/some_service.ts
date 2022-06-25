import { empty, ic, Query, QueryManual } from 'azle';

export function accept(): Query<boolean> {
    return true;
}

export function error(): QueryManual<empty> {
    // This errors because neither ic.reject nor ic.reply were called
}

export function reject(message: string): QueryManual<empty> {
    ic.reject(message);
}

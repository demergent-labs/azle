import { empty, ic, Manual, $query } from 'azle';

$query;
export function accept(): boolean {
    return true;
}

$query;
export function error(): Manual<empty> {
    // This errors because neither ic.reject nor ic.reply were called
}

$query;
export function reject(message: string): Manual<empty> {
    ic.reject(message);
}

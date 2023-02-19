import { $query } from 'azle';
import { one, two, three } from './library';
import { sha224 } from 'js-sha256';

$query;
export function getOne(): string {
    return one();
}

$query;
export function getTwo(): string {
    return two();
}

$query;
export function getThree(): string {
    return three();
}

$query;
export function sha224Hash(message: string): string {
    return sha224.update(message).hex();
}

import { Query } from 'azle';
import { one, two, three } from './library';
import { sha224 } from 'js-sha256';

export function getOne(): Query<string> {
    return one();
}

export function getTwo(): Query<string> {
    return two();
}

export function getThree(): Query<string> {
    return three();
}

export function sha224Hash(message: string): Query<string> {
    return sha224.update(message).hex();
}

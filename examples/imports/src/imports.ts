import {
    Query
} from 'azle';
import {
    one,
    two,
    three
} from './library';

export function getOne(): Query<string> {
    return one();
}

export function getTwo(): Query<string> {
    return two();
}

export function getThree(): Query<string> {
    return three();
}
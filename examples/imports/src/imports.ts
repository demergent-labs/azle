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

// class API

import { query } from 'azle';

export default class {
    @query
    getOne(): string {
        return one();
    }

    @query
    getTwo(): string {
        return two();
    }

    @query
    getThree(): string {
        return three();
    }

    @query
    sha224Hash(message: string): string {
        return sha224.update(message).hex();
    }
}

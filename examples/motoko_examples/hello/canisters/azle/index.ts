import { Query } from 'azle';

export function greet(name: string): Query<string> {
    return `Hello, ${name}!`;
}

// class API

import { query } from 'azle';

export default class {
    @query
    greet(name: string): string {
        return `Hello, ${name}!`;
    }
}

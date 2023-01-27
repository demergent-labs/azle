import { Query } from 'azle';

export function simple_query(): Query<string> {
    return 'This is a query function';
}

// class API

import { query } from 'azle';

export default class {
    @query
    simple_query(): string {
        return 'This is a query function';
    }
}

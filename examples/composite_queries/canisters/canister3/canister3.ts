import { Query } from 'azle';

export function deep_query(): Query<string> {
    return 'Hello from Canister 3';
}

// class API

import { query } from 'azle';

export default class {
    @query
    deep_query(): string {
        return 'Hello from Canister 3';
    }
}

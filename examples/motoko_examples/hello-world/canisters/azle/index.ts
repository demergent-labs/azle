import { Query } from 'azle';

export function main(): Query<void> {
    console.log('Hello World!');
}

// class API

import { query } from 'azle';

export default class {
    @query
    main(): void {
        console.log('Hello World!');
    }
}

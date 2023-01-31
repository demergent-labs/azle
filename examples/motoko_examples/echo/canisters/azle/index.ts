import { Query } from 'azle';

// Say the given phrase.
export function say(phrase: string): Query<string> {
    return phrase;
}

// class API

import { query } from 'azle';

export default class {
    // Say the given phrase.
    @query
    say(phrase: string): string {
        return phrase;
    }
}

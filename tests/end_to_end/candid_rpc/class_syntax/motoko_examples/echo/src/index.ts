import { Canister, query, text } from 'azle/experimental';

export default class {
    @query([text], text)
    say(phrase) {
        return phrase;
    }
}

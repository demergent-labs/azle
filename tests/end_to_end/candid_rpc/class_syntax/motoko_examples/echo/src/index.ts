import { query, text } from 'azle';

export default class {
    @query([text], text)
    say(phrase) {
        return phrase;
    }
}

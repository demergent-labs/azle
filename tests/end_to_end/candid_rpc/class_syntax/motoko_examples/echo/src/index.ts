import { IDL, query, update } from 'azle';

export default class {
    @query([text], text)
    say(phrase) {
        return phrase;
    }
}

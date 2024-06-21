import { IDL, query, update } from 'azle';

export default class {
    @query([IDL.Text], IDL.Text)
    say(phrase) {
        return phrase;
    }
}

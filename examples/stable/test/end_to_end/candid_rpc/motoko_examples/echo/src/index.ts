import { IDL, query } from 'azle';

export default class {
    @query([IDL.Text], IDL.Text)
    say(phrase: string): string {
        return phrase;
    }
}

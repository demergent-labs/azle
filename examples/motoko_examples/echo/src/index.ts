import { query, text } from 'azle';

export default class {
    // Say the given phrase.
    @query([text], text)
    say(phrase: text): text {
        return phrase;
    }
}

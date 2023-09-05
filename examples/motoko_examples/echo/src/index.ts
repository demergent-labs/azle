import { Service, query, text } from 'azle';

export default class extends Service {
    // Say the given phrase.
    @query([text], text)
    say(phrase: text): text {
        return phrase;
    }
}

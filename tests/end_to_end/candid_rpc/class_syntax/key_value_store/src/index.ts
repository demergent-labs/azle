import { IDL, query, update } from 'azle';

let store: Map<string, string> = new Map();

export default class {
    @query([text], Opt(text))
    get(key) {
        const keyOrUndefined = store.get(key);

        return keyOrUndefined ? Some(keyOrUndefined) : None;
    }
    @update([text, text])
    set(key, value) {
        store.set(key, value);
    }
}

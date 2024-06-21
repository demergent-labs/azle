import {
    Canister,
    None,
    Opt,
    query,
    Some,
    text,
    update,
    Void
} from 'azle/experimental';

let store: Map<string, string> = new Map();

export default class {
    @query([text], Opt(text))
    get(key) {
        const keyOrUndefined = store.get(key);

        return keyOrUndefined ? Some(keyOrUndefined) : None;
    }
    @update([text, text], Void)
    set(key, value) {
        store.set(key, value);
    }
}

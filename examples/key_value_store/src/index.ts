import { Canister, None, Opt, query, Some, text, update, Void } from 'azle';

let store: Map<string, string> = new Map();

export default Canister({
    get: query([text], Opt(text), (key) => {
        const keyOrUndefined = store.get(key);

        return keyOrUndefined ? Some(keyOrUndefined) : None;
    }),
    set: update([text, text], Void, (key, value) => {
        store.set(key, value);
    })
});

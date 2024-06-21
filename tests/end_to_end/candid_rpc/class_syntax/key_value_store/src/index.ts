import { IDL, query, update } from 'azle';

let store: Map<string, string> = new Map();

export default class {
    @query([IDL.Text], Opt(IDL.Text))
    get(key) {
        const keyOrUndefined = store.get(key);

        return keyOrUndefined ? Some(keyOrUndefined) : None;
    }
    @update([IDL.Text, IDL.Text])
    set(key, value) {
        store.set(key, value);
    }
}

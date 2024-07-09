import { IDL, query, update } from 'azle';

let store: Map<string, string> = new Map();

export default class {
    @query([IDL.Text], IDL.Opt(IDL.Text))
    get(key: string): [string] | [] {
        const keyOrUndefined = store.get(key);

        return keyOrUndefined ? [keyOrUndefined] : [];
    }

    @update([IDL.Text, IDL.Text])
    set(key: string, value: string): void {
        store.set(key, value);
    }
}

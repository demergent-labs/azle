import { IDL, query, update } from 'azle';

export default class {
    store: Map<string, string> = new Map();

    @query([IDL.Text], IDL.Opt(IDL.Text))
    get(key: string): [string] | [] {
        const keyOrUndefined = this.store.get(key);

        return keyOrUndefined ? [keyOrUndefined] : [];
    }

    @update([IDL.Text, IDL.Text])
    set(key: string, value: string): void {
        this.store.set(key, value);
    }
}

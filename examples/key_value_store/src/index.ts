import {
    ic,
    nat64,
    None,
    Opt,
    query,
    Record,
    Service,
    Some,
    text,
    update,
    Void
} from 'azle';

export default class extends Service {
    store: Map<string, string> = new Map();

    @query([text], Opt(text))
    get(key: string): Opt<string> {
        const keyOrUndefined = this.store.get(key);

        return keyOrUndefined ? Some(keyOrUndefined) : None;
    }

    @update([text, text], Void)
    set(key: string, value: string): Void {
        this.store.set(key, value);
    }
}

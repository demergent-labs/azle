import {
    Query,
    Update,
    Opt
} from 'azle';

type Store = {
    [key: string]: string;
};

let store: Store = {};

export function get(key: string): Query<Opt<string>> {
    return store[key] ?? null;
}

export function set(key: string, value: string): Update<void> {
    store[key] = value;
}
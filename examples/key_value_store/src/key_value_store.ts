import {
    Query,
    Update
} from 'azle';

type Store = {
    [key: string]: string;
};

let store: Store = {};

export function get(key: string): Query<string> {
    return store[key] ?? 'NOT_FOUND';
}

export function set(key: string, value: string): Update<boolean> {
    store[key] = value;
    
    return true;
}
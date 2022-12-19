import { StableBTreeMap, Query } from 'azle';

let stable_map = new StableBTreeMap<string, string>('stable_map', 10n, 100n);

export function get(key: string): Query<string> {
    return stable_map.get(key);
}

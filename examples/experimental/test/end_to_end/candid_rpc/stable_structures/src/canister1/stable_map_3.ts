import {
    bool,
    int,
    nat64,
    None,
    Opt,
    query,
    Some,
    StableBTreeMap,
    Tuple,
    update,
    Vec
} from 'azle/experimental';

import { Reaction } from '../types';

let stableMap3 = StableBTreeMap<Reaction, int>(3);

export const stableMap3Methods = {
    stableMap3ContainsKey: query([Reaction], bool, (key) => {
        return stableMap3.containsKey(key);
    }),
    stableMap3Get: query([Reaction], Opt(int), (key) => {
        const result = stableMap3.get(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap3Insert: update([Reaction, int], Opt(int), (key, value) => {
        const result = stableMap3.insert(key, value);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap3IsEmpty: query([], bool, () => {
        return stableMap3.isEmpty();
    }),
    stableMap3Items: query([], Vec(Tuple(Reaction, int)), () => {
        return stableMap3.items();
    }),
    stableMap3Keys: query([], Vec(Reaction), () => {
        return stableMap3.keys();
    }),
    stableMap3Len: query([], nat64, () => {
        return stableMap3.len();
    }),
    stableMap3Remove: update([Reaction], Opt(int), (key) => {
        const result = stableMap3.remove(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap3Values: query([], Vec(int), () => {
        return stableMap3.values();
    })
};

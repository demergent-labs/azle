import {
    bool,
    nat64,
    None,
    Opt,
    query,
    Some,
    StableBTreeMap,
    text,
    Tuple,
    update,
    Vec
} from 'azle/experimental';

import { Callback } from '../types';

let stableMap15 = StableBTreeMap<Callback, text>(15);

export const stableMap15Methods = {
    stableMap15ContainsKey: query([Callback], bool, (key) => {
        return stableMap15.containsKey(key);
    }),
    stableMap15Get: query([Callback], Opt(text), (key) => {
        const result = stableMap15.get(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap15Insert: update([Callback, text], Opt(text), (key, value) => {
        const result = stableMap15.insert(key, value);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap15IsEmpty: query([], bool, () => {
        return stableMap15.isEmpty();
    }),
    stableMap15Items: query([], Vec(Tuple(Callback, text)), () => {
        return stableMap15.items();
    }),
    stableMap15Keys: query([], Vec(Callback), () => {
        return stableMap15.keys();
    }),
    stableMap15Len: query([], nat64, () => {
        return stableMap15.len();
    }),
    stableMap15Remove: update([Callback], Opt(text), (key) => {
        const result = stableMap15.remove(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap15Values: query([], Vec(text), () => {
        return stableMap15.values();
    })
};

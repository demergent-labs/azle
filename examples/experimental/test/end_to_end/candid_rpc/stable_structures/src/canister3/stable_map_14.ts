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

let stableMap14 = StableBTreeMap<text, Callback>(14);

export const stableMap14Methods = {
    stableMap14ContainsKey: query([text], bool, (key) => {
        return stableMap14.containsKey(key);
    }),
    stableMap14Get: query([text], Opt(Callback), (key) => {
        const result = stableMap14.get(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap14Insert: update([text, Callback], Opt(Callback), (key, value) => {
        const result = stableMap14.insert(key, value);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap14IsEmpty: query([], bool, () => {
        return stableMap14.isEmpty();
    }),
    stableMap14Items: query([], Vec(Tuple(text, Callback)), () => {
        return stableMap14.items();
    }),
    stableMap14Keys: query([], Vec(text), () => {
        return stableMap14.keys();
    }),
    stableMap14Len: query([], nat64, () => {
        return stableMap14.len();
    }),
    stableMap14Remove: update([text], Opt(Callback), (key) => {
        const result = stableMap14.remove(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap14Values: query([], Vec(Callback), () => {
        return stableMap14.values();
    })
};

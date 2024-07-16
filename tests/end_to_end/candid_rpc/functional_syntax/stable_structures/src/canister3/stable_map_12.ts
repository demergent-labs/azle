import {
    blob,
    bool,
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

let stableMap12 = StableBTreeMap<blob, Reaction>(12);

export const stableMap12Methods = {
    stableMap12ContainsKey: query([blob], bool, (key) => {
        return stableMap12.containsKey(key);
    }),
    stableMap12Get: query([blob], Opt(Reaction), (key) => {
        const result = stableMap12.get(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap12Insert: update([blob, Reaction], Opt(Reaction), (key, value) => {
        const result = stableMap12.insert(key, value);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap12IsEmpty: query([], bool, () => {
        return stableMap12.isEmpty();
    }),
    stableMap12Items: query([], Vec(Tuple(blob, Reaction)), () => {
        return stableMap12.items();
    }),
    stableMap12Keys: query([], Vec(blob), () => {
        return stableMap12.keys();
    }),
    stableMap12Len: query([], nat64, () => {
        return stableMap12.len();
    }),
    stableMap12Remove: update([blob], Opt(Reaction), (key) => {
        const result = stableMap12.remove(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap12Values: query([], Vec(Reaction), () => {
        return stableMap12.values();
    })
};

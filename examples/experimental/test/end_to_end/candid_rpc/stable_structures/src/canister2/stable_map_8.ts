import {
    bool,
    nat64,
    None,
    Null,
    Opt,
    query,
    Some,
    StableBTreeMap,
    Tuple,
    update,
    Vec
} from 'azle/experimental';

let stableMap8 = StableBTreeMap<bool, Null>(8);

export const stableMap8Methods = {
    stableMap8ContainsKey: query([bool], bool, (key) => {
        return stableMap8.containsKey(key);
    }),
    stableMap8Get: query([bool], Opt(Null), (key) => {
        const result = stableMap8.get(key);
        if (stableMap8.containsKey(key)) {
            return Some(result);
        } else {
            return None;
        }
    }),
    stableMap8Insert: update([bool, Null], Opt(Null), (key, value) => {
        const hasOldValue = stableMap8.containsKey(key);
        const result = stableMap8.insert(key, value);
        if (hasOldValue === true) {
            return Some(result);
        } else {
            return None;
        }
    }),
    stableMap8IsEmpty: query([], bool, () => {
        return stableMap8.isEmpty();
    }),
    stableMap8Items: query([], Vec(Tuple(bool, Null)), () => {
        return stableMap8.items();
    }),
    stableMap8Keys: query([], Vec(bool), () => {
        return stableMap8.keys();
    }),
    stableMap8Len: query([], nat64, () => {
        return stableMap8.len();
    }),
    stableMap8Remove: update([bool], Opt(Null), (key) => {
        const hasOldValue = stableMap8.containsKey(key);
        const result = stableMap8.remove(key);
        if (hasOldValue === true) {
            return Some(result);
        } else {
            return None;
        }
    }),
    stableMap8Values: query([], Vec(Null), () => {
        return stableMap8.values();
    })
};

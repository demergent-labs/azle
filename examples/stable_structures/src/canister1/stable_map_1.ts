import {
    blob,
    bool,
    nat16,
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

let stableMap1 = StableBTreeMap<nat16, blob>(1);

export const stableMap1Methods = {
    stableMap1ContainsKey: query([nat16], bool, (key) => {
        return stableMap1.containsKey(key);
    }),
    stableMap1Get: query([nat16], Opt(blob), (key) => {
        const result = stableMap1.get(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap1Insert: update([nat16, blob], Opt(blob), (key, value) => {
        const result = stableMap1.insert(key, value);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap1IsEmpty: query([], bool, () => {
        return stableMap1.isEmpty();
    }),
    stableMap1Items: query([], Vec(Tuple(nat16, blob)), () => {
        return stableMap1.items();
    }),
    stableMap1Keys: query([], Vec(nat16), () => {
        return Uint16Array.from(stableMap1.keys());
    }),
    stableMap1Len: query([], nat64, () => {
        return stableMap1.len();
    }),
    stableMap1Remove: update([nat16], Opt(blob), (key) => {
        const result = stableMap1.remove(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap1Values: query([], Vec(blob), () => {
        return stableMap1.values();
    })
};

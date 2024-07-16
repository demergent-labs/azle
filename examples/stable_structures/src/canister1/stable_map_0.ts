import {
    bool,
    nat8,
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

let stableMap0 = StableBTreeMap<nat8, text>(0);

export const stableMap0Methods = {
    stableMap0ContainsKey: query([nat8], bool, (key) => {
        return stableMap0.containsKey(key);
    }),
    stableMap0Get: query([nat8], Opt(text), (key) => {
        const result = stableMap0.get(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap0Insert: update([nat8, text], Opt(text), (key, value) => {
        const result = stableMap0.insert(key, value);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap0IsEmpty: query([], bool, () => {
        return stableMap0.isEmpty();
    }),
    stableMap0Items: query([], Vec(Tuple(nat8, text)), () => {
        return stableMap0.items();
    }),
    stableMap0Keys: query([], Vec(nat8), () => {
        return Uint8Array.from(stableMap0.keys());
    }),
    stableMap0Len: query([], nat64, () => {
        return stableMap0.len();
    }),
    stableMap0Remove: update([nat8], Opt(text), (key) => {
        const result = stableMap0.remove(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap0Values: query([], Vec(text), () => {
        return stableMap0.values();
    })
};

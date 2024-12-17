import {
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

let stableMap6 = StableBTreeMap<Vec<nat64>, bool>(6);

export const stableMap6Methods = {
    stableMap6ContainsKey: query([Vec(nat64)], bool, (key) => {
        return stableMap6.containsKey(key);
    }),
    stableMap6Get: query([Vec(nat64)], Opt(bool), (key) => {
        const result = stableMap6.get(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap6Insert: update([Vec(nat64), bool], Opt(bool), (key, value) => {
        const result = stableMap6.insert(key, value);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap6IsEmpty: query([], bool, () => {
        return stableMap6.isEmpty();
    }),
    stableMap6Items: query([], Vec(Tuple(Vec(nat64), bool)), () => {
        return stableMap6.items();
    }),
    stableMap6Keys: query([], Vec(Vec(nat64)), () => {
        return stableMap6.keys();
    }),
    stableMap6Len: query([], nat64, () => {
        return stableMap6.len();
    }),
    stableMap6Remove: update([Vec(nat64)], Opt(bool), (key) => {
        const result = stableMap6.remove(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap6Values: query([], Vec(bool), () => {
        return stableMap6.values();
    })
};

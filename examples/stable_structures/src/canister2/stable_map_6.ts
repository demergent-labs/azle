import {
    bool,
    nat64,
    Opt,
    query,
    update,
    StableBTreeMap,
    Vec,
    Tuple
} from 'azle';

let stableMap6 = StableBTreeMap(Vec(nat64), bool, 6);

export const stableMap6Methods = {
    stableMap6ContainsKey: query([Vec(nat64)], bool, (key) => {
        return stableMap6.containsKey(key);
    }),
    stableMap6Get: query([Vec(nat64)], Opt(bool), (key) => {
        return stableMap6.get(key);
    }),
    stableMap6Insert: update([Vec(nat64), bool], Opt(bool), (key, value) => {
        return stableMap6.insert(key, value);
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
        return stableMap6.remove(key);
    }),
    stableMap6Values: query([], Vec(bool), () => {
        return stableMap6.values();
    })
};

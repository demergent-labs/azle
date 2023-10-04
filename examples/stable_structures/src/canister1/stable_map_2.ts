import {
    bool,
    nat,
    nat32,
    nat64,
    Opt,
    query,
    StableBTreeMap,
    Tuple,
    update,
    Vec
} from 'azle';

let stableMap2 = StableBTreeMap(nat32, nat, 2);

export const stableMap2Methods = {
    stableMap2ContainsKey: query([nat32], bool, (key) => {
        return stableMap2.containsKey(key);
    }),
    stableMap2Get: query([nat32], Opt(nat), (key) => {
        return stableMap2.get(key);
    }),
    stableMap2Insert: update([nat32, nat], Opt(nat), (key, value) => {
        return stableMap2.insert(key, value);
    }),
    stableMap2IsEmpty: query([], bool, () => {
        return stableMap2.isEmpty();
    }),
    stableMap2Items: query([], Vec(Tuple(nat32, nat)), () => {
        return stableMap2.items();
    }),
    stableMap2Keys: query([], Vec(nat32), () => {
        return stableMap2.keys();
    }),
    stableMap2Len: query([], nat64, () => {
        return stableMap2.len();
    }),
    stableMap2Remove: update([nat32], Opt(nat), (key) => {
        return stableMap2.remove(key);
    }),
    stableMap2Values: query([], Vec(nat), () => {
        return stableMap2.values();
    })
};

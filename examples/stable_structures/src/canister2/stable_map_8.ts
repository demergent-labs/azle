import {
    bool,
    nat64,
    Null,
    Opt,
    query,
    update,
    StableBTreeMap,
    Vec,
    Tuple
} from 'azle';

let stableMap8 = StableBTreeMap(bool, Null, 8);

export const stableMap8Methods = {
    stableMap8ContainsKey: query([bool], bool, (key) => {
        return stableMap8.containsKey(key);
    }),
    stableMap8Get: query([bool], Opt(Null), (key) => {
        return stableMap8.get(key);
    }),
    stableMap8Insert: update([bool, Null], Opt(Null), (key, value) => {
        return stableMap8.insert(key, value);
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
        return stableMap8.remove(key);
    }),
    stableMap8Values: query([], Vec(Null), () => {
        return stableMap8.values();
    })
};

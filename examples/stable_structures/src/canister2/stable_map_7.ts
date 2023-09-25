import {
    bool,
    nat64,
    Null,
    Opt,
    query,
    StableBTreeMap,
    Tuple,
    update,
    Vec
} from 'azle';

let stableMap7 = StableBTreeMap(Null, Null, 7);

export const stableMap7Methods = {
    stableMap7ContainsKey: query([Null], bool, (key) => {
        return stableMap7.containsKey(key);
    }),
    stableMap7Get: query([Null], Opt(Null), (key) => {
        return stableMap7.get(key);
    }),
    stableMap7Insert: update([Null, Null], Opt(Null), (key, value) => {
        return stableMap7.insert(key, value);
    }),
    stableMap7IsEmpty: query([], bool, () => {
        return stableMap7.isEmpty();
    }),
    stableMap7Items: query([], Vec(Tuple(Null, Null)), () => {
        return stableMap7.items();
    }),
    stableMap7Keys: query([], Vec(Null), () => {
        return stableMap7.keys();
    }),
    stableMap7Len: query([], nat64, () => {
        return stableMap7.len();
    }),
    stableMap7Remove: update([Null], Opt(Null), (key) => {
        return stableMap7.remove(key);
    }),
    stableMap7Values: query([], Vec(Null), () => {
        return stableMap7.values();
    })
};

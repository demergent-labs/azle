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

let stableMap7 = StableBTreeMap<Null, Null>(7);

export const stableMap7Methods = {
    stableMap7ContainsKey: query([Null], bool, (key) => {
        return stableMap7.containsKey(key);
    }),
    stableMap7Get: query([Null], Opt(Null), (key) => {
        const result = stableMap7.get(key);
        if (stableMap7.containsKey(key)) {
            return Some(result);
        } else {
            return None;
        }
    }),
    stableMap7Insert: update([Null, Null], Opt(Null), (key, value) => {
        const hasOldValue = stableMap7.containsKey(key);
        const result = stableMap7.insert(key, value);
        if (hasOldValue) {
            return Some(result);
        } else {
            return None;
        }
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
        const hasOldValue = stableMap7.containsKey(key);
        const result = stableMap7.remove(key);
        if (hasOldValue) {
            return Some(result);
        } else {
            return None;
        }
    }),
    stableMap7Values: query([], Vec(Null), () => {
        return stableMap7.values();
    })
};

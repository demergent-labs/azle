import {
    bool,
    float32,
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

let stableMap10 = StableBTreeMap<float32, Opt<bool>>(10);

export const stableMap10Methods = {
    stableMap10ContainsKey: query([float32], bool, (key) => {
        return stableMap10.containsKey(key);
    }),
    stableMap10Get: query([float32], Opt(Opt(bool)), (key) => {
        const result = stableMap10.get(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap10Insert: update(
        [float32, Opt(bool)],
        Opt(Opt(bool)),
        (key, value) => {
            const result = stableMap10.insert(key, value);
            if (result === null) {
                return None;
            } else {
                return Some(result);
            }
        }
    ),
    stableMap10IsEmpty: query([], bool, () => {
        return stableMap10.isEmpty();
    }),
    stableMap10Items: query([], Vec(Tuple(float32, Opt(bool))), () => {
        return stableMap10.items();
    }),
    stableMap10Keys: query([], Vec(float32), () => {
        return stableMap10.keys();
    }),
    stableMap10Len: query([], nat64, () => {
        return stableMap10.len();
    }),
    stableMap10Remove: update([float32], Opt(Opt(bool)), (key) => {
        const result = stableMap10.remove(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap10Values: query([], Vec(Opt(bool)), () => {
        return stableMap10.values();
    })
};

import {
    bool,
    float64,
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

let stableMap5 = StableBTreeMap<Opt<text>, float64>(5);

export const stableMap5Methods = {
    stableMap5ContainsKey: query([Opt(text)], bool, (key) => {
        return stableMap5.containsKey(key);
    }),
    stableMap5Get: query([Opt(text)], Opt(float64), (key) => {
        const result = stableMap5.get(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap5Insert: update(
        [Opt(text), float64],
        Opt(float64),
        (key, value) => {
            const result = stableMap5.insert(key, value);
            if (result === null) {
                return None;
            } else {
                return Some(result);
            }
        }
    ),
    stableMap5IsEmpty: query([], bool, () => {
        return stableMap5.isEmpty();
    }),
    stableMap5Items: query([], Vec(Tuple(Opt(text), float64)), () => {
        return stableMap5.items();
    }),
    stableMap5Keys: query([], Vec(Opt(text)), () => {
        return stableMap5.keys();
    }),
    stableMap5Len: query([], nat64, () => {
        return stableMap5.len();
    }),
    stableMap5Remove: update([Opt(text)], Opt(float64), (key) => {
        const result = stableMap5.remove(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap5Values: query([], Vec(float64), () => {
        return stableMap5.values();
    })
};

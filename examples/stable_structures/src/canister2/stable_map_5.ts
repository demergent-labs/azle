import {
    bool,
    float64,
    nat64,
    Opt,
    query,
    update,
    StableBTreeMap,
    Vec,
    text,
    Tuple
} from 'azle';

let stableMap5 = StableBTreeMap(Opt(text), float64, 5);

export const stableMap5Methods = {
    stableMap5ContainsKey: query([Opt(text)], bool, (key) => {
        return stableMap5.containsKey(key);
    }),
    stableMap5Get: query([Opt(text)], Opt(float64), (key) => {
        return stableMap5.get(key);
    }),
    stableMap5Insert: update(
        [Opt(text), float64],
        Opt(float64),
        (key, value) => {
            return stableMap5.insert(key, value);
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
        return stableMap5.remove(key);
    }),
    stableMap5Values: query([], Vec(float64), () => {
        return stableMap5.values();
    })
};

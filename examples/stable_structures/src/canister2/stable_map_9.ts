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

let stableMap9 = StableBTreeMap(float64, Vec(text), 9);

export const stableMap9Methods = {
    stableMap9ContainsKey: query([float64], bool, (key) => {
        return stableMap9.containsKey(key);
    }),
    stableMap9Get: query([float64], Opt(Vec(text)), (key) => {
        return stableMap9.get(key);
    }),
    stableMap9Insert: update(
        [float64, Vec(text)],
        Opt(Vec(text)),
        (key, value) => {
            return stableMap9.insert(key, value);
        }
    ),
    stableMap9IsEmpty: query([], bool, () => {
        return stableMap9.isEmpty();
    }),
    stableMap9Items: query([], Vec(Tuple(float64, Vec(text))), () => {
        return stableMap9.items();
    }),
    stableMap9Keys: query([], Vec(float64), () => {
        return stableMap9.keys();
    }),
    stableMap9Len: query([], nat64, () => {
        return stableMap9.len();
    }),
    stableMap9Remove: update([float64], Opt(Vec(text)), (key) => {
        return stableMap9.remove(key);
    }),
    stableMap9Values: query([], Vec(Vec(text)), () => {
        return stableMap9.values();
    })
};

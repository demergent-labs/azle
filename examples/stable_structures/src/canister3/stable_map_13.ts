import {
    bool,
    nat64,
    Opt,
    principal,
    query,
    StableBTreeMap,
    text,
    Tuple,
    update,
    Vec
} from 'azle';

let stableMap13 = StableBTreeMap(text, principal, 13);

export const stableMap13Methods = {
    stableMap13ContainsKey: query([text], bool, (key) => {
        return stableMap13.containsKey(key);
    }),
    stableMap13Get: query([text], Opt(principal), (key) => {
        return stableMap13.get(key);
    }),
    stableMap13Insert: update(
        [text, principal],
        Opt(principal),
        (key, value) => {
            return stableMap13.insert(key, value);
        }
    ),
    stableMap13IsEmpty: query([], bool, () => {
        return stableMap13.isEmpty();
    }),
    stableMap13Items: query([], Vec(Tuple(text, principal)), () => {
        return stableMap13.items();
    }),
    stableMap13Keys: query([], Vec(text), () => {
        return stableMap13.keys();
    }),
    stableMap13Len: query([], nat64, () => {
        return stableMap13.len();
    }),
    stableMap13Remove: update([text], Opt(principal), (key) => {
        return stableMap13.remove(key);
    }),
    stableMap13Values: query([], Vec(principal), () => {
        return stableMap13.values();
    })
};

import {
    bool,
    nat64,
    Opt,
    Principal,
    query,
    StableBTreeMap,
    text,
    Tuple,
    update,
    Vec
} from 'azle';

let stableMap13 = StableBTreeMap(text, Principal, 13);

export const stableMap13Methods = {
    stableMap13ContainsKey: query([text], bool, (key) => {
        return stableMap13.containsKey(key);
    }),
    stableMap13Get: query([text], Opt(Principal), (key) => {
        return stableMap13.get(key);
    }),
    stableMap13Insert: update(
        [text, Principal],
        Opt(Principal),
        (key, value) => {
            return stableMap13.insert(key, value);
        }
    ),
    stableMap13IsEmpty: query([], bool, () => {
        return stableMap13.isEmpty();
    }),
    stableMap13Items: query([], Vec(Tuple(text, Principal)), () => {
        return stableMap13.items();
    }),
    stableMap13Keys: query([], Vec(text), () => {
        return stableMap13.keys();
    }),
    stableMap13Len: query([], nat64, () => {
        return stableMap13.len();
    }),
    stableMap13Remove: update([text], Opt(Principal), (key) => {
        return stableMap13.remove(key);
    }),
    stableMap13Values: query([], Vec(Principal), () => {
        return stableMap13.values();
    })
};

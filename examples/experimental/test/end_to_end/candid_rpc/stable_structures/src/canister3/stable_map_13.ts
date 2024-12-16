import {
    bool,
    nat64,
    None,
    Opt,
    Principal,
    query,
    Some,
    StableBTreeMap,
    text,
    Tuple,
    update,
    Vec
} from 'azle/experimental';

let stableMap13 = StableBTreeMap<text, Principal>(13);

export const stableMap13Methods = {
    stableMap13ContainsKey: query([text], bool, (key) => {
        return stableMap13.containsKey(key);
    }),
    stableMap13Get: query([text], Opt(Principal), (key) => {
        const result = stableMap13.get(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap13Insert: update(
        [text, Principal],
        Opt(Principal),
        (key, value) => {
            const result = stableMap13.insert(key, value);
            if (result === null) {
                return None;
            } else {
                return Some(result);
            }
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
        const result = stableMap13.remove(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap13Values: query([], Vec(Principal), () => {
        return stableMap13.values();
    })
};

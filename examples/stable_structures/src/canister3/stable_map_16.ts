import {
    bool,
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

let stableMap16 = StableBTreeMap<text, object>(16);

export const stableMap16Methods = {
    stableMap16ContainsKey: query([text], bool, (key) => {
        return stableMap16.containsKey(key);
    }),
    stableMap16Get: query([text], Opt(text), (key) => {
        const result = stableMap16.get(key);

        if (result === null) {
            return None;
        }

        return Some(JSON.stringify(result));
    }),
    stableMap16Insert: update([text, text], Opt(text), (key, value) => {
        const result = stableMap16.insert(key, JSON.parse(value));

        if (result === null) {
            return None;
        }

        return Some(JSON.stringify(result));
    }),
    stableMap16IsEmpty: query([], bool, () => {
        return stableMap16.isEmpty();
    }),
    stableMap16Items: query([], Vec(Tuple(text, text)), () => {
        return stableMap16.items().map(([key, value]) => {
            return [key, JSON.stringify(value)];
        });
    }),
    stableMap16Keys: query([], Vec(text), () => {
        return stableMap16.keys();
    }),
    stableMap16Len: query([], nat64, () => {
        return stableMap16.len();
    }),
    stableMap16Remove: update([text], Opt(text), (key) => {
        const result = stableMap16.remove(key);

        if (result === null) {
            return None;
        }

        return Some(JSON.stringify(result));
    }),
    stableMap16Values: query([], Vec(text), () => {
        return stableMap16.values().map((value) => JSON.stringify(value));
    })
};

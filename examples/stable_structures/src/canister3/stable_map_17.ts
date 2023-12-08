import {
    bool,
    nat64,
    Opt,
    query,
    StableBTreeMap,
    text,
    Tuple,
    update,
    Vec
} from 'azle';

let stableMap17 = StableBTreeMap<{}, text>(17);

export const stableMap17Methods = {
    stableMap17ContainsKey: query([text], bool, (key) => {
        return stableMap17.containsKey(JSON.parse(key));
    }),
    stableMap17Get: query([text], Opt(text), (key) => {
        return stableMap17.get(JSON.parse(key));
    }),
    stableMap17Insert: update([text, text], Opt(text), (key, value) => {
        return stableMap17.insert(JSON.parse(key), value);
    }),
    stableMap17IsEmpty: query([], bool, () => {
        return stableMap17.isEmpty();
    }),
    stableMap17Items: query([], Vec(Tuple(text, text)), () => {
        return stableMap17.items().map(([key, value]) => {
            return [JSON.stringify(key), value];
        });
    }),
    stableMap17Keys: query([], Vec(text), () => {
        return stableMap17.keys().map((key) => JSON.stringify(key));
    }),
    stableMap17Len: query([], nat64, () => {
        return stableMap17.len();
    }),
    stableMap17Remove: update([text], Opt(text), (key) => {
        return stableMap17.remove(JSON.parse(key));
    }),
    stableMap17Values: query([], Vec(text), () => {
        return stableMap17.values();
    })
};

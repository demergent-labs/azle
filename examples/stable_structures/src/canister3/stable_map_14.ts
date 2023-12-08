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
import { Callback } from '../types';

let stableMap14 = StableBTreeMap<text, Callback>(14);

export const stableMap14Methods = {
    stableMap14ContainsKey: query([text], bool, (key) => {
        return stableMap14.containsKey(key);
    }),
    stableMap14Get: query([text], Opt(Callback), (key) => {
        return stableMap14.get(key);
    }),
    stableMap14Insert: update([text, Callback], Opt(Callback), (key, value) => {
        return stableMap14.insert(key, value);
    }),
    stableMap14IsEmpty: query([], bool, () => {
        return stableMap14.isEmpty();
    }),
    stableMap14Items: query([], Vec(Tuple(text, Callback)), () => {
        return stableMap14.items();
    }),
    stableMap14Keys: query([], Vec(text), () => {
        return stableMap14.keys();
    }),
    stableMap14Len: query([], nat64, () => {
        return stableMap14.len();
    }),
    stableMap14Remove: update([text], Opt(Callback), (key) => {
        return stableMap14.remove(key);
    }),
    stableMap14Values: query([], Vec(Callback), () => {
        return stableMap14.values();
    })
};

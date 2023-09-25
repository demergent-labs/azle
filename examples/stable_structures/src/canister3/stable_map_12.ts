import {
    blob,
    bool,
    nat64,
    Opt,
    query,
    StableBTreeMap,
    Tuple,
    update,
    Vec
} from 'azle';
import { Reaction } from '../types';

let stableMap12 = StableBTreeMap(blob, Reaction, 12);

export const stableMap12Methods = {
    stableMap12ContainsKey: query([blob], bool, (key) => {
        return stableMap12.containsKey(key);
    }),
    stableMap12Get: query([blob], Opt(Reaction), (key) => {
        return stableMap12.get(key);
    }),
    stableMap12Insert: update([blob, Reaction], Opt(Reaction), (key, value) => {
        return stableMap12.insert(key, value);
    }),
    stableMap12IsEmpty: query([], bool, () => {
        return stableMap12.isEmpty();
    }),
    stableMap12Items: query([], Vec(Tuple(blob, Reaction)), () => {
        return stableMap12.items();
    }),
    stableMap12Keys: query([], Vec(blob), () => {
        return stableMap12.keys();
    }),
    stableMap12Len: query([], nat64, () => {
        return stableMap12.len();
    }),
    stableMap12Remove: update([blob], Opt(Reaction), (key) => {
        return stableMap12.remove(key);
    }),
    stableMap12Values: query([], Vec(Reaction), () => {
        return stableMap12.values();
    })
};

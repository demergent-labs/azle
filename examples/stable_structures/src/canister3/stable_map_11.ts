import {
    bool,
    nat,
    nat64,
    Opt,
    query,
    StableBTreeMap,
    Tuple,
    update,
    Vec
} from 'azle';
import { User } from '../types';

let stableMap11 = StableBTreeMap(nat, User, 11);

export const stableMap11Methods = {
    stableMap11ContainsKey: query([nat], bool, (key) => {
        return stableMap11.containsKey(key);
    }),
    stableMap11Get: query([nat], Opt(User), (key) => {
        return stableMap11.get(key);
    }),
    stableMap11Insert: update([nat, User], Opt(User), (key, value) => {
        return stableMap11.insert(key, value);
    }),
    stableMap11IsEmpty: query([], bool, () => {
        return stableMap11.isEmpty();
    }),
    stableMap11Items: query([], Vec(Tuple(nat, User)), () => {
        return stableMap11.items();
    }),
    stableMap11Keys: query([], Vec(nat), () => {
        return stableMap11.keys();
    }),
    stableMap11Len: query([], nat64, () => {
        return stableMap11.len();
    }),
    stableMap11Remove: update([nat], Opt(User), (key) => {
        return stableMap11.remove(key);
    }),
    stableMap11Values: query([], Vec(User), () => {
        return stableMap11.values();
    })
};

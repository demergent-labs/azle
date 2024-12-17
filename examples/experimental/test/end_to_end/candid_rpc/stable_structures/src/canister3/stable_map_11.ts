import {
    bool,
    nat,
    nat64,
    None,
    Opt,
    query,
    Some,
    StableBTreeMap,
    Tuple,
    update,
    Vec
} from 'azle/experimental';

import { User } from '../types';

let stableMap11 = StableBTreeMap<nat, User>(11);

export const stableMap11Methods = {
    stableMap11ContainsKey: query([nat], bool, (key) => {
        return stableMap11.containsKey(key);
    }),
    stableMap11Get: query([nat], Opt(User), (key) => {
        const result = stableMap11.get(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap11Insert: update([nat, User], Opt(User), (key, value) => {
        const result = stableMap11.insert(key, value);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
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
        const result = stableMap11.remove(key);
        if (result === null) {
            return None;
        } else {
            return Some(result);
        }
    }),
    stableMap11Values: query([], Vec(User), () => {
        return stableMap11.values();
    })
};

import {
    bool,
    float32,
    nat64,
    Opt,
    query,
    StableBTreeMap,
    Tuple,
    update,
    Vec
} from 'azle';
import { User } from '../types';

export let stableMap4 = StableBTreeMap(User, float32, 4);

export const stableMap4Methods = {
    stableMap4ContainsKey: query([User], bool, (key) => {
        return stableMap4.containsKey(key);
    }),
    stableMap4Get: query([User], Opt(float32), (key) => {
        return stableMap4.get(key);
    }),
    stableMap4Insert: update([User, float32], Opt(float32), (key, value) => {
        return stableMap4.insert(key, value);
    }),
    stableMap4IsEmpty: query([], bool, () => {
        return stableMap4.isEmpty();
    }),
    stableMap4Items: query([], Vec(Tuple(User, float32)), () => {
        return stableMap4.items();
    }),
    stableMap4Keys: query([], Vec(User), () => {
        return stableMap4.keys();
    }),
    stableMap4Len: query([], nat64, () => {
        return stableMap4.len();
    }),
    stableMap4Remove: update([User], Opt(float32), (key) => {
        return stableMap4.remove(key);
    }),
    stableMap4Values: query([], Vec(float32), () => {
        return stableMap4.values();
    })
};

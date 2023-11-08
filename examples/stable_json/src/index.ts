// TODO get rid of unnecessary memory id candid bytes converions
// TODO get rid of saying candid_bytes in Rust
// TODO add type tests for stablebtreemap
// TODO the stableType doesn't work for Func
// TODO make sure Serializable is actually working well
// TODO seems like only one of the properties actually needs to be there

import {
    blob,
    Canister,
    nat,
    nat32,
    Principal,
    query,
    Record,
    Serializable,
    StableJson,
    StableBTreeMap,
    text,
    update,
    Vec,
    Void,
    Func,
    Opt
} from 'azle';
import { v1 } from 'uuid';

const User = Record({
    id: Principal,
    username: text,
    age: nat,
    signature: blob
});
type User = typeof User;

let map = StableBTreeMap<text, User>(User, StableJson(), 0);

export default Canister({
    insert: update([], Void, () => {
        for (let i = 0; i < 1_000; i++) {
            map.insert(v1(), {
                id: Principal.fromText('aaaaa-aa'),
                username: i.toString(),
                age: BigInt(i),
                signature: Uint8Array.from([0, 1, 2, 3, 4, 5])
            });
        }
    }),
    values: query([], Vec(User), () => {
        return map.values(0, 5);
    })
});

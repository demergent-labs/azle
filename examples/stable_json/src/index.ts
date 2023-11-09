// TODO use string for nat64/bigint conversions to and from the Rust environment

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
type User = typeof User.tsType;

// TODO figure out good minimum for:
// TODO number keys and json objects with 1, 5, 10, 15, 20 records
// TODO use a combination of different types
// TODO should we create special StableNumber and StableBigInt and StableString?
// TODO we should measure the performance to see what we can do

let map = StableBTreeMap<text, User>(text, StableJson(), 0);

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

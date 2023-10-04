# record

TypeScript type aliases referring to object literals wrapped in the `Record` Azle type correspond to the [Candid record type](https://internetcomputer.org/docs/current/references/candid-ref#type-record--n--t--) and will become [JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) at runtime.

TypeScript:

```typescript
import { Canister, Principal, Record, query, text } from 'azle';

const User = Record({
    id: Principal,
    username: text
});

export default Canister({
    getUser: query([], User, () => {
        return {
            id: Principal.fromUint8Array(Uint8Array.from([0])),
            username: 'lastmjs'
        };
    }),
    printUser: query([User], User, (user) => {
        console.log(typeof user);
        return user;
    })
});
```

Candid:

```
type User = record { id : principal; username : text };
service : () -> {
    getUser : () -> (User) query;
    printUser : (User) -> (User) query;
}
```

dfx:

```bash
dfx canister call candid_canister printUser '(record { id = principal "2ibo7-dia"; username = "lastmjs" })'
(record { id = principal "2ibo7-dia"; username = "lastmjs" })
```

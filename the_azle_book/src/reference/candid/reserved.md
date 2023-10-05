# reserved

The `CandidType` object `reserved` corresponds to the [Candid type reserved](https://internetcomputer.org/docs/current/references/candid-ref#type-reserved), is inferred to be a TypeScript `any`, and will be decoded into a [JavaScript null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) at runtime.

TypeScript or JavaScript:

```typescript
import { Canister, query, reserved } from 'azle';

export default Canister({
    getReserved: query([], reserved, () => {
        return 'anything';
    }),
    printReserved: query([reserved], reserved, (reserved) => {
        console.log(typeof reserved);
        return reserved;
    })
});
```

Candid:

```
service : () -> {
    getReserved : () -> (reserved) query;
    printReserved : (reserved) -> (reserved) query;
}
```

dfx:

```bash
dfx canister call candid_canister printReserved '(null)'
(null : reserved)
```

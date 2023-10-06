# int32

The `CandidType` object `int32` corresponds to the [Candid type int32](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn), is inferred to be a TypeScript `number`, and will be decoded into a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript or JavaScript:

```typescript
import { Canister, int32, query } from 'azle';

export default Canister({
    getInt32: query([], int32, () => {
        return 2_147_483_647;
    }),
    printInt32: query([int32], int32, (int32) => {
        console.log(typeof int32);
        return int32;
    })
});
```

Candid:

```
service : () -> {
    getInt32 : () -> (int32) query;
    printInt32 : (int32) -> (int32) query;
}
```

dfx:

```bash
dfx canister call candid_canister printInt32 '(2_147_483_647 : int32)'
(2_147_483_647 : int32)
```

# int16

The `CandidType` object `int16` corresponds to the [Candid type int16](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn), is inferred to be a TypeScript `number`, and will be decoded into a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript or JavaScript:

```typescript
import { Canister, int16, query } from 'azle';

export default Canister({
    getInt16: query([], int16, () => {
        return 32_767;
    }),
    printInt16: query([int16], int16, (int16) => {
        console.log(typeof int16);
        return int16;
    })
});
```

Candid:

```
service : () -> {
    getInt16 : () -> (int16) query;
    printInt16 : (int16) -> (int16) query;
}
```

dfx:

```bash
dfx canister call candid_canister printInt16 '(32_767 : int16)'
(32_767 : int16)
```

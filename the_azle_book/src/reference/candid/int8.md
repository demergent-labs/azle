# int8

The Azle type `int8` corresponds to the [Candid type int8](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { Canister, int8, query } from 'azle';

export default Canister({
    getInt8: query([], int8, () => {
        return 127;
    }),
    printInt8: query([int8], int8, (int8) => {
        console.log(typeof int8);
        return int8;
    })
});
```

Candid:

```
service : () -> {
    getInt8 : () -> (int8) query;
    printInt8 : (int8) -> (int8) query;
}
```

dfx:

```bash
dfx canister call candid_canister printInt8 '(127 : int8)'
(127 : int8)
```

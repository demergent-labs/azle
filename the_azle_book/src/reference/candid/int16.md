# int16

This section is a work in progress.

The Azle type `int16` corresponds to the [Candid type int16](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int16, $query } from 'azle';

$query;
export function getInt16(): int16 {
    return 32_767;
}

$query;
export function printInt16(int16: int16): int16 {
    console.log(typeof int16);
    return int16;
}
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

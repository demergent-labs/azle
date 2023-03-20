# int32

This section is a work in progress.

The Azle type `int32` corresponds to the [Candid type int32](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int32, $query } from 'azle';

$query;
export function getInt32(): int32 {
    return 2_147_483_647;
}

$query;
export function printInt32(int32: int32): int32 {
    console.log(typeof int32);
    return int32;
}
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

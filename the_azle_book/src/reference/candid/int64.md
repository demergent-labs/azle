# int64

This section is a work in progress.

The Azle type `int64` corresponds to the [Candid type int64](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { int64, $query } from 'azle';

$query;
export function getInt64(): int64 {
    return 9_223_372_036_854_775_807n;
}

$query;
export function printInt64(int64: int64): int64 {
    console.log(typeof int64);
    return int64;
}
```

Candid:

```
service : () -> {
    getInt64 : () -> (int64) query;
    printInt64 : (int64) -> (int64) query;
}
```

dfx:

```bash
dfx canister call candid_canister printInt64 '(9_223_372_036_854_775_807 : int64)'
(9_223_372_036_854_775_807 : int64)
```

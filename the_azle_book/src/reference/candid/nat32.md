# nat32

This section is a work in progress.

The Azle type `nat32` corresponds to the [Candid type nat32](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat32, $query } from 'azle';

$query;
export function getNat32(): nat32 {
    return 4_294_967_295;
}

$query;
export function printNat32(nat32: nat32): nat32 {
    console.log(typeof nat32);
    return nat32;
}
```

Candid:

```
service : () -> {
    getNat32 : () -> (nat32) query;
    printNat32 : (nat32) -> (nat32) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNat32 '(4_294_967_295 : nat32)'
(4_294_967_295 : nat32)
```

# nat64

This section is a work in progress.

The Azle type `nat64` corresponds to the [Candid type nat64](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { nat64, $query } from 'azle';

$query;
export function getNat64(): nat64 {
    return 18_446_744_073_709_551_615n;
}

$query;
export function printNat64(nat64: nat64): nat64 {
    console.log(typeof nat64);
    return nat64;
}
```

Candid:

```
service : () -> {
    getNat64 : () -> (nat64) query;
    printNat64 : (nat64) -> (nat64) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNat64 '(18_446_744_073_709_551_615 : nat64)'
(18_446_744_073_709_551_615 : nat64)
```

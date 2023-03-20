# nat16

This section is a work in progress.

The Azle type `nat16` corresponds to the [Candid type nat16](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat16, $query } from 'azle';

$query;
export function getNat16(): nat16 {
    return 65_535;
}

$query;
export function printNat16(nat16: nat16): nat16 {
    console.log(typeof nat16);
    return nat16;
}
```

Candid:

```
service : () -> {
    getNat16 : () -> (nat16) query;
    printNat16 : (nat16) -> (nat16) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNat16 '(65_535 : nat16)'
(65_535 : nat16)
```

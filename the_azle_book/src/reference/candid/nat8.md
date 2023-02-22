# nat8

This section is a work in progress.

The Azle type `nat8` corresponds to the [Candid type nat8](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat8, $query } from 'azle';

$query;
export function get_nat8(): nat8 {
    return 255;
}

$query;
export function print_nat8(nat8: nat8): nat8 {
    console.log(typeof nat8);
    return nat8;
}
```

Candid:

```
service : () -> {
    get_nat8 : () -> (nat8) query;
    print_nat8 : (nat8) -> (nat8) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_nat8 '(255 : nat8)'
(255 : nat8)
```

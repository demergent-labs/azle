# reserved

This section is a work in progress.

The Azle type `reserved` corresponds to the [Candid type reserved](https://internetcomputer.org/docs/current/references/candid-ref#type-reserved), is the TypeScript type `any`, and will become a [JavaScript null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) at runtime.

TypeScript:

```typescript
import { $query, reserved } from 'azle';

$query;
export function get_reserved(): reserved {
    return 'anything';
}

$query;
export function print_reserved(reserved: reserved): reserved {
    console.log(typeof reserved);
    return reserved;
}
```

Candid:

```
service : () -> {
    get_reserved : () -> (reserved) query;
    print_reserved : (reserved) -> (reserved) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_reserved '(null)'
(null : reserved)
```

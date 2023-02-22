# bool

This section is a work in progress.

The TypeScript type `boolean` corresponds to the [Candid type bool](https://internetcomputer.org/docs/current/references/candid-ref#type-bool) and will become a [JavaScript Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) at runtime.

TypeScript:

```typescript
import { $query } from 'azle';

$query;
export function get_bool(): boolean {
    return true;
}

$query;
export function print_bool(bool: boolean): boolean {
    console.log(typeof bool);
    return bool;
}
```

Candid:

```
service : () -> {
    get_bool : () -> (bool) query;
    print_bool : (bool) -> (bool) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_bool '(true)'
(true)
```

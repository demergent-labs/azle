# bool

This section is a work in progress.

The TypeScript type `boolean` corresponds to the [Candid type bool](https://internetcomputer.org/docs/current/references/candid-ref#type-bool) and will become a [JavaScript Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) at runtime.

TypeScript:

```typescript
import { $query } from 'azle';

$query;
export function getBool(): boolean {
    return true;
}

$query;
export function printBool(bool: boolean): boolean {
    console.log(typeof bool);
    return bool;
}
```

Candid:

```
service : () -> {
    getBool : () -> (bool) query;
    printBool : (bool) -> (bool) query;
}
```

dfx:

```bash
dfx canister call candid_canister printBool '(true)'
(true)
```

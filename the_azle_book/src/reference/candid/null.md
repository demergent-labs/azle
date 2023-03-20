# null

This section is a work in progress.

The TypeScript type `null` corresponds to the [Candid type null](https://internetcomputer.org/docs/current/references/candid-ref#type-null) and will become a [JavaScript null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) at runtime.

TypeScript:

```typescript
import { $query } from 'azle';

$query;
export function getNull(): null {
    return null;
}

$query;
export function printNull(null_: null): null {
    console.log(typeof null_);
    return null_;
}
```

Candid:

```
service : () -> {
    getNull : () -> (null) query;
    printNull : (null) -> (null) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNull '(null)'
(null : null)
```

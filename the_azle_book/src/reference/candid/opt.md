# opt

This section is a work in progress.

The Azle type `Opt` corresponds to the [Candid type opt](https://internetcomputer.org/docs/current/references/candid-ref#type-opt-t) and will become the enclosed JavaScript type or null at runtime.

TypeScript:

```typescript
import { Opt, $query } from 'azle';

$query;
export function get_opt_some(): Opt<boolean> {
    return true;
}

$query;
export function get_opt_none(): Opt<boolean> {
    return null;
}
```

Candid:

```
service : () -> {
    get_opt_none : () -> (opt bool) query;
    get_opt_some : () -> (opt bool) query;
}
```

dfx:

```bash
dfx canister call candid_canister get_opt_some
(opt true)

dfx canister call candid_canister get_opt_none
(null)
```

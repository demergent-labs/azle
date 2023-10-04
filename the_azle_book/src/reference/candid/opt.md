# opt

The Azle type `Opt` corresponds to the [Candid type opt](https://internetcomputer.org/docs/current/references/candid-ref#type-opt-t). It is a [variant](#variant) with `Some` and `None` cases. At runtime if the value of the variant is `Some`, the `Some` property of the variant object will have a value of the enclosed `Opt` type at runtime.

TypeScript:

```typescript
import { Canister, None, Opt, Some, bool, query } from 'azle';

export default Canister({
    getOptSome: query([], Opt(bool), () => {
        return Some(true);
    }),
    getOptNone: query([], Opt(bool), () => {
        return None;
    })
});
```

Candid:

```
service : () -> {
    getOptNone : () -> (opt bool) query;
    getOptSome : () -> (opt bool) query;
}
```

dfx:

```bash
dfx canister call candid_canister getOptSome
(opt true)

dfx canister call candid_canister getOptNone
(null)
```

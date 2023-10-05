# opt

The `CandidType` object `Opt` corresponds to the [Candid type opt](https://internetcomputer.org/docs/current/references/candid-ref#type-opt-t), is inferred to be a TypeScript `Opt<T>`, and will be decoded into a [JavaScript Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) at runtime.

It is a [variant](#variant) with `Some` and `None` cases. At runtime if the value of the variant is `Some`, the `Some` property of the variant object will have a value of the enclosed `Opt` type at runtime.

TypeScript or JavaScript:

```typescript
import { bool, Canister, None, Opt, query, Some } from 'azle';

export default Canister({
    getOptSome: query([], Opt(bool), () => {
        return Some(true); // equivalent to { Some: true }
    }),
    getOptNone: query([], Opt(bool), () => {
        return None; //equivalent to { None: null}
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

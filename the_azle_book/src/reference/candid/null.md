# null

The `CandidType` object `null` corresponds to the [Candid type null](https://internetcomputer.org/docs/current/references/candid-ref#type-null), is inferred to be a TypeScript `null`, and will be decoded into a [JavaScript null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) at runtime.

TypeScript or JavaScript:

```typescript
import { Canister, Null, query } from 'azle';

export default Canister({
    getNull: query([], Null, () => {
        return null;
    }),
    printNull: query([Null], Null, (null_) => {
        console.log(typeof null_);
        return null_;
    })
});
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

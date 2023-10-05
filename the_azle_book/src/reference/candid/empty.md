# empty

The `CandidType` object `empty` corresponds to the [Candid type empty](https://internetcomputer.org/docs/current/references/candid-ref#type-empty), is inferred to be a TypeScript `never`, and has no JavaScript value at runtime.

TypeScript or JavaScript:

```typescript
import { Canister, empty, query } from 'azle';

export default Canister({
    getEmpty: query([], empty, () => {
        throw 'Anything you want';
    }),
    // Note: It is impossible to call this function because it requires an argument
    // but there is no way to pass an "empty" value as an argument.
    printEmpty: query([empty], empty, (empty) => {
        console.log(typeof empty);
        throw 'Anything you want';
    })
});
```

Candid:

```
service : () -> {
    getEmpty : () -> (empty) query;
    printEmpty : (empty) -> (empty) query;
}
```

dfx:

```bash
dfx canister call candid_canister printEmpty '("You can put anything here")'
Error: Failed to create argument blob.
Caused by: Failed to create argument blob.
  Invalid data: Unable to serialize Candid values: type mismatch: "You can put anything here" cannot be of type empty
```

# nat8

The `CandidType` object `nat8` corresponds to the [Candid type nat8](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn), is inferred to be a TypeScript `number`, and will be decoded into a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript or JavaScript:

```typescript
import { Canister, nat8, query } from 'azle';

export default Canister({
    getNat8: query([], nat8, () => {
        return 255;
    }),
    printNat8: query([nat8], nat8, (nat8) => {
        console.log(typeof nat8);
        return nat8;
    })
});
```

Candid:

```
service : () -> {
    getNat8 : () -> (nat8) query;
    printNat8 : (nat8) -> (nat8) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNat8 '(255 : nat8)'
(255 : nat8)
```

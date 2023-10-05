# nat16

The `CandidType` object `nat16` corresponds to the [Candid type nat16](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn), is inferred to be a TypeScript `number`, and will be decoded into a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript or JavaScript:

```typescript
import { Canister, nat16, query } from 'azle';

export default Canister({
    getNat16: query([], nat16, () => {
        return 65_535;
    }),
    printNat16: query([nat16], nat16, (nat16) => {
        console.log(typeof nat16);
        return nat16;
    })
});
```

Candid:

```
service : () -> {
    getNat16 : () -> (nat16) query;
    printNat16 : (nat16) -> (nat16) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNat16 '(65_535 : nat16)'
(65_535 : nat16)
```

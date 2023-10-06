# nat32

The `CandidType` object `nat32` corresponds to the [Candid type nat32](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn), is inferred to be a TypeScript `number`, and will be decoded into a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript or JavaScript:

```typescript
import { Canister, nat32, query } from 'azle';

export default Canister({
    getNat32: query([], nat32, () => {
        return 4_294_967_295;
    }),
    printNat32: query([nat32], nat32, (nat32) => {
        console.log(typeof nat32);
        return nat32;
    })
});
```

Candid:

```
service : () -> {
    getNat32 : () -> (nat32) query;
    printNat32 : (nat32) -> (nat32) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNat32 '(4_294_967_295 : nat32)'
(4_294_967_295 : nat32)
```

# nat64

The `CandidType` object `nat64` corresponds to the [Candid type nat64](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn), is inferred to be a TypeScript `bigint`, and will be decoded into a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript or JavaScript:

```typescript
import { Canister, nat64, query } from 'azle';

export default Canister({
    getNat64: query([], nat64, () => {
        return 18_446_744_073_709_551_615n;
    }),
    printNat64: query([nat64], nat64, (nat64) => {
        console.log(typeof nat64);
        return nat64;
    })
});
```

Candid:

```
service : () -> {
    getNat64 : () -> (nat64) query;
    printNat64 : (nat64) -> (nat64) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNat64 '(18_446_744_073_709_551_615 : nat64)'
(18_446_744_073_709_551_615 : nat64)
```

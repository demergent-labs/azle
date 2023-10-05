# nat

The `CandidType` object `nat` corresponds to the [Candid type nat](https://internetcomputer.org/docs/current/references/candid-ref#type-nat), is inferred to be a TypeScript `bigint`, and will be decoded into a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript or JavaScript:

```typescript
import { Canister, nat, query } from 'azle';

export default Canister({
    getNat: query([], nat, () => {
        return 340_282_366_920_938_463_463_374_607_431_768_211_455n;
    }),
    printNat: query([nat], nat, (nat) => {
        console.log(typeof nat);
        return nat;
    })
});
```

Candid:

```
service : () -> {
    getNat : () -> (nat) query;
    printNat : (nat) -> (nat) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNat '(340_282_366_920_938_463_463_374_607_431_768_211_455 : nat)'
(340_282_366_920_938_463_463_374_607_431_768_211_455 : nat)
```

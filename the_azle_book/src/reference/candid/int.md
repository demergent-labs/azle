# int

The `CandidType` object `int` corresponds to the [Candid type int](https://internetcomputer.org/docs/current/references/candid-ref#type-int), is inferred to be a TypeScript `bigint`, and will be decoded into a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript or JavaScript:

```typescript
import { Canister, int, query } from 'azle';

export default Canister({
    getInt: query([], int, () => {
        return 170_141_183_460_469_231_731_687_303_715_884_105_727n;
    }),
    printInt: query([int], int, (int) => {
        console.log(typeof int);
        return int;
    })
});
```

Candid:

```
service : () -> {
    getInt : () -> (int) query;
    printInt : (int) -> (int) query;
}
```

dfx:

```bash
dfx canister call candid_canister printInt '(170_141_183_460_469_231_731_687_303_715_884_105_727 : int)'
(170_141_183_460_469_231_731_687_303_715_884_105_727 : int)
```

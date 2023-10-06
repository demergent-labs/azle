# vec

The `CandidType` object `Vec` corresponds to the [Candid type vec](https://internetcomputer.org/docs/current/references/candid-ref#type-vec-t), is inferred to be a TypeScript `T[]`, and will be decoded into a [JavaScript array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of the specified type at runtime (except for `Vec<nat8>` which will become a `Uint8Array`, thus it is recommended to use the `blob` type instead of `Vec<nat8>`).

TypeScript or JavaScript:

```typescript
import { Canister, int32, Vec, query } from 'azle';

export default Canister({
    getNumbers: query([], Vec(int32), () => {
        return [0, 1, 2, 3];
    }),
    printNumbers: query([Vec(int32)], Vec(int32), (numbers) => {
        console.log(typeof numbers);
        return numbers;
    })
});
```

Candid:

```
service : () -> {
    getNumbers : () -> (vec int32) query;
    printNumbers : (vec int32) -> (vec int32) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNumbers '(vec { 0 : int32; 1 : int32; 2 : int32; 3 : int32 })'
(vec { 0 : int32; 1 : int32; 2 : int32; 3 : int32 })
```

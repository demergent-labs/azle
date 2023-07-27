# vec

This section is a work in progress.

The Azle type `Vec` corresponds to the [Candid type vec](https://internetcomputer.org/docs/current/references/candid-ref#type-vec-t) and will become a [JavaScript array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of the specified type at runtime (except for `Vec<nat8>` which will become a `Uint8Array`, thus it is recommended to use the `blob` type instead of `Vec<nat8>`).

TypeScript:

```typescript
import { int32, $query, Vec } from 'azle';

$query;
export function getNumbers(): Vec<int32> {
    return [0, 1, 2, 3];
}

$query;
export function printNumbers(numbers: Vec<int32>): Vec<int32> {
    console.log(typeof numbers);
    return numbers;
}
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

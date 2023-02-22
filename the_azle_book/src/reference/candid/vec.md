# vec

This section is a work in progress.

TypeScript `[]` array syntax corresponds to the [Candid type vec](https://internetcomputer.org/docs/current/references/candid-ref#type-vec-t) and will become a [JavaScript array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of the specified type at runtime (except for `nat8[]` which will become a `Uint8Array`, thus it is recommended to use the `blob` type instead of `nat8[]`). Only the `[]` array syntax is supported at this time (i.e. not `Array` or `ReadonlyArray` etc).

TypeScript:

```typescript
import { int32, $query } from 'azle';

$query;
export function get_numbers(): int32[] {
    return [0, 1, 2, 3];
}

$query;
export function print_numbers(numbers: int32[]): int32[] {
    console.log(typeof numbers);
    return numbers;
}
```

Candid:

```
service : () -> {
    get_numbers : () -> (vec int32) query;
    print_numbers : (vec int32) -> (vec int32) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_numbers '(vec { 0 : int32; 1 : int32; 2 : int32; 3 : int32 })'
(vec { 0 : int32; 1 : int32; 2 : int32; 3 : int32 })
```

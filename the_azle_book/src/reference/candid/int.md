# int

This section is a work in progress.

The Azle type `int` corresponds to the [Candid type int](https://internetcomputer.org/docs/current/references/candid-ref#type-int) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { int, $query } from 'azle';

$query;
export function getInt(): int {
    return 170_141_183_460_469_231_731_687_303_715_884_105_727n;
}

$query;
export function printInt(int: int): int {
    console.log(typeof int);
    return int;
}
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

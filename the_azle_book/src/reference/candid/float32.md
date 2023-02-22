# float32

This section is a work in progress.

The Azle type `float32` corresponds to the [Candid type float32](https://internetcomputer.org/docs/current/references/candid-ref#type-float32-and-float64) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { float32, $query } from 'azle';

$query;
export function get_float32(): float32 {
    return Math.PI;
}

$query;
export function print_float32(float32: float32): float32 {
    console.log(typeof float32);
    return float32;
}
```

Candid:

```
service : () -> {
    get_float32 : () -> (float32) query;
    print_float32 : (float32) -> (float32) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_float32 '(3.1415927 : float32)'
(3.1415927 : float32)
```

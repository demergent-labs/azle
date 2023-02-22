# float64

This section is a work in progress.

The Azle type `float64` corresponds to the [Candid type float64](https://internetcomputer.org/docs/current/references/candid-ref#type-float32-and-float64) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { float64, $query } from 'azle';

$query;
export function get_float64(): float64 {
    return Math.E;
}

$query;
export function print_float64(float64: float64): float64 {
    console.log(typeof float64);
    return float64;
}
```

Candid:

```
service : () -> {
    get_float64 : () -> (float64) query;
    print_float64 : (float64) -> (float64) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_float64 '(2.718281828459045 : float64)'
(2.718281828459045 : float64)
```

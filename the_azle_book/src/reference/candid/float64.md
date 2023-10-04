# float64

The Azle type `float64` and the TypeScript type `number` both correspond to the [Candid type float64](https://internetcomputer.org/docs/current/references/candid-ref#type-float32-and-float64) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { Canister, float64, query } from 'azle';

export default Canister({
    getFloat64: query([], float64, () => {
        return Math.E;
    }),
    printFloat64: query([float64], float64, (float64) => {
        console.log(typeof float64);
        return float64;
    })
});
```

Candid:

```
service : () -> {
    getFloat64 : () -> (float64) query;
    printFloat64 : (float64) -> (float64) query;
}
```

dfx:

```bash
dfx canister call candid_canister printFloat64 '(2.718281828459045 : float64)'
(2.718281828459045 : float64)
```

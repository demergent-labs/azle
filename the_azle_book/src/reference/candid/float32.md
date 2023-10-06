# float32

The `CandidType` object `float32` corresponds to the [Candid type float32](https://internetcomputer.org/docs/current/references/candid-ref#type-float32-and-float64), is inferred to be a TypeScript `number`, and will be decoded into a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript or JavaScript:

```typescript
import { Canister, float32, query } from 'azle';

export default Canister({
    getFloat32: query([], float32, () => {
        return Math.PI;
    }),
    printFloat32: query([float32], float32, (float32) => {
        console.log(typeof float32);
        return float32;
    })
});
```

Candid:

```
service : () -> {
    getFloat32 : () -> (float32) query;
    printFloat32 : (float32) -> (float32) query;
}
```

dfx:

```bash
dfx canister call candid_canister printFloat32 '(3.1415927 : float32)'
(3.1415927 : float32)
```

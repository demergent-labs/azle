# blob

The `CandidType` object `blob` corresponds to the [Candid type blob](https://internetcomputer.org/docs/current/references/candid-ref#type-blob), is inferred to be a TypeScript `Uint8Array` and will be decoded into a [JavaScript Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) at runtime.

TypeScript or JavaScript:

```typescript
import { blob, Canister, query } from 'azle';

export default Canister({
    getBlob: query([], blob, () => {
        return Uint8Array.from([68, 73, 68, 76, 0, 0]);
    }),
    printBlob: query([blob], blob, (blob) => {
        console.log(typeof blob);
        return blob;
    })
});
```

Candid:

```
service : () -> {
    getBlob : () -> (vec nat8) query;
    printBlob : (vec nat8) -> (vec nat8) query;
}
```

dfx:

```bash
dfx canister call candid_canister printBlob '(vec { 68; 73; 68; 76; 0; 0; })'
(blob "DIDL\00\00")

dfx canister call candid_canister printBlob '(blob "DIDL\00\00")'
(blob "DIDL\00\00")
```

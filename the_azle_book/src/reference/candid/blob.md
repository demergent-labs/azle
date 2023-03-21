# blob

This section is a work in progress.

The Azle type `blob` corresponds to the [Candid type blob](https://internetcomputer.org/docs/current/references/candid-ref#type-blob) and will become a [JavaScript Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) at runtime.

TypeScript:

```typescript
import { blob, $query } from 'azle';

$query;
export function getBlob(): blob {
    return Uint8Array.from([68, 73, 68, 76, 0, 0]);
}

$query;
export function printBlob(blob: blob): blob {
    console.log(typeof blob);
    return blob;
}
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

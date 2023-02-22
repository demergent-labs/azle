# candid decode

This section is a work in progress.

Examples:

-   [call_raw](https://github.com/demergent-labs/azle/tree/main/examples/call_raw)
-   [candid_encoding](https://github.com/demergent-labs/azle/tree/main/examples/candid_encoding)

```typescript
import { blob, ic, $query } from 'azle';

// decodes Candid bytes to a Candid string
$query;
export function candid_decode(candid_encoded: blob): string {
    return ic.candid_decode(candid_encoded);
}
```

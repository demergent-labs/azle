# arg data raw

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/blob/main/examples/ic_api)

```typescript
import { blob, ic, int8, $query } from 'azle';

// returns the argument data as bytes.
$query;
export function argDataRaw(
    arg1: blob,
    arg2: int8,
    arg3: boolean,
    arg4: string
): blob {
    return ic.argDataRaw();
}
```

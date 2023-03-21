# arg data raw size

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/blob/main/examples/ic_api)

```typescript
import { blob, ic, int8, nat32, $query } from 'azle';

// returns the length of the argument data in bytes
$query;
export function argDataRawSize(
    arg1: blob,
    arg2: int8,
    arg3: boolean,
    arg4: string
): nat32 {
    return ic.argDataRawSize();
}
```

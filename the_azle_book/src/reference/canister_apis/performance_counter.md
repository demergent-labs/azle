# performance counter

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)

```typescript
import { ic, nat64, $query } from 'azle';

$query;
export function performanceCounter(): nat64 {
    return ic.performanceCounter(0);
}
```

# set certified data

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)

```typescript
import { blob, ic, $update } from 'azle';

// sets up to 32 bytes of certified data
$update;
export function set_certified_data(data: blob): void {
    ic.set_certified_data(data);
}
```

# notify with payment 128

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
import { ic, nat, $update, Variant } from 'azle';
import { cyclesCanister } from '../cycles';

$update;
export function sendCycles128Notify(): NotifyResult {
    return cyclesCanister.receiveCycles128().cycles128(1_000_000n).notify();
}
```

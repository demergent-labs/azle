# notify with payment 128

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
import { Canister, ic, update, Void } from 'azle';
import { otherCanister } from './otherCanister';

export default Canister({
    sendCycles128Notify: update([], Void, () => {
        return ic.notify(otherCanister.receiveCycles128, {
            cycles: 1_000_000n
        });
    })
});
```

# raw_rand

This section is a work in progress.

Examples:

-   [async/await](https://github.com/demergent-labs/azle/tree/main/examples/async_await)
-   [heartbeat](https://github.com/demergent-labs/azle/tree/main/examples/heartbeat)
-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)
-   [timers](https://github.com/demergent-labs/azle/tree/main/examples/timers)

```typescript
import { blob, Canister, ic, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

export default Canister({
    getRawRand: update([], blob, async () => {
        return await ic.call(managementCanister.raw_rand);
    })
});
```

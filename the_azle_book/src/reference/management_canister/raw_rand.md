# raw_rand

This section is a work in progress.

Examples:

-   [async/await](https://github.com/demergent-labs/azle/tree/main/examples/async_await)
-   [heartbeat](https://github.com/demergent-labs/azle/tree/main/examples/heartbeat)
-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)
-   [timers](https://github.com/demergent-labs/azle/tree/main/examples/timers)

```typescript
import { blob, ok, $update } from 'azle';
import { management_canister } from 'azle/canisters/management';

$update;
export async function get_randomness(): Promise<blob> {
    const randomness_result = await management_canister.raw_rand().call();

    if (!ok(randomness_result)) {
        return Uint8Array.from([]);
    }

    return randomness_result.ok;
}
```

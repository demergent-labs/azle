# raw_rand

This section is a work in progress.

Examples:

-   [async/await](https://github.com/demergent-labs/azle/tree/main/examples/async_await)
-   [heartbeat](https://github.com/demergent-labs/azle/tree/main/examples/heartbeat)
-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)
-   [timers](https://github.com/demergent-labs/azle/tree/main/examples/timers)

```typescript
import { blob, match, $update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

$update;
export async function getRandomness(): Promise<blob> {
    const randomnessResult = await managementCanister.raw_rand().call();

    return match(randomnessResult, {
        Ok: (randomness) => randomness,
        Err: () => Uint8Array.from([])
    });
}
```

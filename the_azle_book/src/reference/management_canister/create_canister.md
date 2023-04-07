# create_canister

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { match, Result, $update } from 'azle';
import {
    CreateCanisterResult,
    managementCanister
} from 'azle/canisters/management';

$update;
export async function executeCreateCanister(): Promise<
    Result<CreateCanisterResult, string>
> {
    const createCanisterResultCallResult = await managementCanister
        .create_canister({
            settings: null
        })
        .cycles(50_000_000_000_000n)
        .call();

    return match(createCanisterResultCallResult, {
        Ok: (createCanisterResult) => {
            state.createdCanisterId = createCanisterResult.canister_id;

            return {
                Ok: createCanisterResult
            };
        },
        Err: (err) => ({ Err: err })
    });
}
```

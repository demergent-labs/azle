# provisional_create_canister_with_cycles

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { match, $update, Variant } from 'azle';
import {
    CreateCanisterResult,
    managementCanister
} from 'azle/canisters/management';

$update;
export async function provisionalCreateCanisterWithCycles(): Promise<
    Variant<{
        Ok: CreateCanisterResult;
        Err: string;
    }>
> {
    const callResult = await managementCanister
        .provisional_create_canister_with_cycles({
            amount: null,
            settings: null
        })
        .call();

    return match(callResult, {
        Ok: (provisionalCreateCanisterWithCyclesResult) => ({
            Ok: provisionalCreateCanisterWithCyclesResult
        }),
        Err: (err) => ({ Err: err })
    });
}
```

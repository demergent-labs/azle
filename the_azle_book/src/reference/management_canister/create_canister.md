# create_canister

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { ok, $update, Variant } from 'azle';
import {
    CreateCanisterResult,
    management_canister
} from 'azle/canisters/management';

$update;
export async function execute_create_canister(): Promise<
    Variant<{
        ok: CreateCanisterResult;
        err: string;
    }>
> {
    const create_canister_result_canister_result = await management_canister
        .create_canister({
            settings: null
        })
        .cycles(50_000_000_000_000n)
        .call();

    if (!ok(create_canister_result_canister_result)) {
        return {
            err: create_canister_result_canister_result.err
        };
    }

    const create_canister_result = create_canister_result_canister_result.ok;

    state.created_canister_id = create_canister_result.canister_id;

    return {
        ok: create_canister_result
    };
}
```

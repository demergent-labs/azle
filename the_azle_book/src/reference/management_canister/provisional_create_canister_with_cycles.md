# provisional_create_canister_with_cycles

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
export async function provisional_create_canister_with_cycles(): Promise<
    Variant<{
        ok: CreateCanisterResult;
        err: string;
    }>
> {
    const canister_result = await management_canister
        .provisional_create_canister_with_cycles({
            amount: null,
            settings: null
        })
        .call();

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    const provisional_create_canister_with_cycles_result = canister_result.ok;

    return {
        ok: provisional_create_canister_with_cycles_result
    };
}
```

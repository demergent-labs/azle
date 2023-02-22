# provisional_top_up_canister

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
$update;
export async function provisional_top_up_canister(
    canister_id: Principal,
    amount: nat
): Promise<DefaultResult> {
    const canister_result = await management_canister
        .provisional_top_up_canister({
            canister_id,
            amount
        })
        .call();

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: true
    };
}
```

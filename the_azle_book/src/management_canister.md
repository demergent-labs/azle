# Management Canister

This chapter is a work in progress.

You can access the management canister like this:

```typescript
import { blob, $update, Variant } from 'azle';
import { management_canister } from 'azle/canisters/management';

$update;
export async function random_bytes(): Promise<
    Variant<{
        ok: blob;
        err: string;
    }>
> {
    return await management_canister.raw_rand().call();
}
```

See the [management canister types](https://github.com/demergent-labs/azle/blob/main/canisters/management/index.ts) for all methods and their parameter and return types.

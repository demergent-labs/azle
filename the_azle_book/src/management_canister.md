# Management Canister

This chapter is a work in progress.

You can access the management canister like this:

```typescript
import { blob, Result, $update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

$update;
export async function randomBytes(): Promise<Result<blob, string>> {
    return await managementCanister.raw_rand().call();
}
```

See the [management canister types](https://github.com/demergent-labs/azle/blob/main/canisters/management/index.ts) for all methods and their parameter and return types.

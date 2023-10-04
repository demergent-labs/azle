# Management Canister

This chapter is a work in progress.

You can access the management canister like this:

```typescript
import { blob, Canister, ic, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

export default Canister({
    randomBytes: update([], blob, async () => {
        return await ic.call(managementCanister.raw_rand);
    })
});
```

See the [management canister reference section](./reference/management_canister/management_canister.md) for more information.

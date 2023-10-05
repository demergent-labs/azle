# stable64 grow

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { Canister, ic, nat64, update } from 'azle';

export default Canister({
    stable64Grow: update([nat64], nat64, (newPages) => {
        return ic.stable64Grow(newPages);
    })
});
```

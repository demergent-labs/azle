# stable64 read

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { blob, Canister, ic, nat64, query } from 'azle';

export default Canister({
    stable64Read: query([nat64, nat64], blob, (offset, length) => {
        return ic.stable64Read(offset, length);
    })
});
```

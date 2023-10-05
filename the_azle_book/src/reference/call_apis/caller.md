# caller

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)
-   [threshold_ecdsa](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/threshold_ecdsa)
-   [whoami](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/whoami)

```typescript
import { Canister, ic, Principal, update } from 'azle';

export default Canister({
    // returns the principal of the identity that called this function
    caller: update([], Principal, () => {
        return ic.caller();
    })
});
```

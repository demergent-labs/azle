# set certified data

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)

```typescript
import { blob, Canister, ic, update, Void } from 'azle';

export default Canister({
    // sets up to 32 bytes of certified data
    setCertifiedData: update([blob], Void, (data) => {
        ic.setCertifiedData(data);
    })
});
```

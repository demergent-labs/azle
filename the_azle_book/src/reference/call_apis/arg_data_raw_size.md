# arg data raw size

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/blob/main/examples/ic_api)

```typescript
import { blob, bool, Canister, ic, int8, nat, query, text } from 'azle';

export default Canister({
    // returns the length of the argument data in bytes
    argDataRawSize: query(
        [blob, int8, bool, text],
        nat,
        (arg1, arg2, arg3, arg4) => {
            return ic.argDataRawSize();
        }
    )
});
```

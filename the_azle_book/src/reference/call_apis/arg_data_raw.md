# arg data raw

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/blob/main/examples/ic_api)

```typescript
import { blob, bool, Canister, ic, int8, query, text } from 'azle';

export default Canister({
    // returns the argument data as bytes.
    argDataRaw: query(
        [blob, int8, bool, text],
        blob,
        (arg1, arg2, arg3, arg4) => {
            return ic.argDataRaw();
        }
    )
});
```

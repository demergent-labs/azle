# data certificate

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)

```typescript
import { blob, Canister, ic, Opt, query } from 'azle';

export default Canister({
    // When called from a query call, returns the data certificate
    // authenticating certified_data set by this canister. Returns None if not
    // called from a query call.
    dataCertificate: query([], Opt(blob), () => {
        return ic.dataCertificate();
    })
});
```

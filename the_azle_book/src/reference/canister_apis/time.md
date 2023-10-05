# time

This section is a work in progress.

Examples:

-   [audio_recorder](https://github.com/demergent-labs/azle/tree/main/examples/audio_recorder)
-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)

```typescript
import { Canister, ic, nat64, query } from 'azle';

export default Canister({
    // returns the current timestamp
    time: query([], nat64, () => {
        return ic.time();
    })
});
```

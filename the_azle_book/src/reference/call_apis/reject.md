# reject

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)
-   [manual_reply](https://github.com/demergent-labs/azle/tree/main/examples/manual_reply)
-   [rejections](https://github.com/demergent-labs/azle/tree/main/examples/rejections)

```typescript
import { Canister, empty, ic, Manual, query, text } from 'azle';

export default Canister({
    reject: query(
        [text],
        Manual(empty),
        (message) => {
            ic.reject(message);
        },
        { manual: true }
    )
});
```

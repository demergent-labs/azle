# print

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)
-   [null_example](https://github.com/demergent-labs/azle/tree/main/examples/null_example)

```typescript
import { bool, Canister, ic, query, text } from 'azle';

export default Canister({
    // prints a message through the local replica's output
    print: query([text], bool, (message) => {
        ic.print(message);

        return true;
    })
});
```

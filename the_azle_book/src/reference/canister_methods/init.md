# init

This section is a work in progress.

Examples:

-   [ethereum_json_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ethereum_json_rpc)
-   [func_types](https://github.com/demergent-labs/azle/tree/main/examples/func_types)
-   [init](https://github.com/demergent-labs/azle/tree/main/examples/init)
-   [persistent-storage](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/persistent-storage)
-   [pre_and_post_upgrade](https://github.com/demergent-labs/azle/tree/main/examples/pre_and_post_upgrade)
-   [whoami](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/whoami)

```typescript
import { Canister, init } from 'azle';

export default Canister({
    init: init([], () => {
        console.log('This runs once when the canister is first initialized');
    })
});
```

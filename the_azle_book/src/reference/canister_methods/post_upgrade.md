# post upgrade

This section is a work in progress.

Examples:

-   [pre_and_post_upgrade](https://github.com/demergent-labs/azle/tree/main/examples/pre_and_post_upgrade)
-   [whoami](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/whoami)

```typescript
import { Canister, postUpgrade } from 'azle';

export default Canister({
    postUpgrade: postUpgrade([], () => {
        console.log('This runs after every canister upgrade');
    })
});
```

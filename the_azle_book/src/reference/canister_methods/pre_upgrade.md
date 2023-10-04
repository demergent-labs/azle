# pre upgrade

This section is a work in progress.

Examples:

-   [pre_and_post_upgrade](https://github.com/demergent-labs/azle/tree/main/examples/pre_and_post_upgrade)

```typescript
import { Canister, preUpgrade } from 'azle';

export default Canister({
    preUpgrade: preUpgrade(() => {
        console.log('This runs before every canister upgrade');
    })
});
```

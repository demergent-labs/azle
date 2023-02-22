# pre upgrade

This section is a work in progress.

Examples:

-   [pre_and_post_upgrade](https://github.com/demergent-labs/azle/tree/main/examples/pre_and_post_upgrade)

```typescript
import { $pre_upgrade } from 'azle';

$pre_upgrade;
export function pre_upgrade() {
    console.log('This runs before every canister upgrade');
}
```

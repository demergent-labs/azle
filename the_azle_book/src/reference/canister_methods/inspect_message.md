# inspect message

This section is a work in progress.

Examples:

-   [inspect_message](https://github.com/demergent-labs/azle/tree/main/examples/inspect_message)
-   [run_time_errors](https://github.com/demergent-labs/azle/tree/main/examples/run_time_errors)

```typescript
import { bool, Canister, ic, inspectMessage, update } from 'azle';

export default Canister({
    inspectMessage: inspectMessage(() => {
        console.log('inspectMessage called');

        if (ic.methodName() === 'accessible') {
            ic.acceptMessage();
            return;
        }

        if (ic.methodName() === 'inaccessible') {
            return;
        }

        throw `Method "${ic.methodName()}" not allowed`;
    }),
    accessible: update([], bool, () => {
        return true;
    }),
    inaccessible: update([], bool, () => {
        return false;
    }),
    alsoInaccessible: update([], bool, () => {
        return false;
    })
});
```

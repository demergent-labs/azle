# accept message

This section is a work in progress.

Examples:

-   [inspect_message](https://github.com/demergent-labs/azle/blob/main/examples/inspect_message/src/inspect_message.ts)
-   [run_time_errors](https://github.com/demergent-labs/azle/blob/main/examples/run_time_errors/src/index.ts)

```typescript
import { Canister, ic, inspectMessage } from 'azle';

export default Canister({
    inspectMessage: inspectMessage(() => {
        ic.acceptMessage();
    })
});
```

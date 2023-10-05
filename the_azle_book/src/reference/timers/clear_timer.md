# clear timer

This section is a work in progress.

Examples:

-   [timers](https://github.com/demergent-labs/azle/tree/main/examples/timers)

```typescript
import { Canister, ic, TimerId, update, Void } from 'azle';

export default Canister({
    clearTimer: update([TimerId], Void, (timerId) => {
        ic.clearTimer(timerId);
    })
});
```

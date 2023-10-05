# heartbeat

This section is a work in progress.

Examples:

-   [heartbeat](https://github.com/demergent-labs/azle/tree/main/examples/heartbeat)
-   [run_time_errors](https://github.com/demergent-labs/azle/tree/main/examples/run_time_errors)

```typescript
import { Canister, heartbeat } from 'azle';

export default Canister({
    heartbeat: heartbeat(() => {
        console.log('this runs ~1 time per second');
    })
});
```

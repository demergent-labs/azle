# heartbeat

This section is a work in progress.

Examples:

-   [heartbeat](https://github.com/demergent-labs/azle/tree/main/examples/heartbeat)
-   [run_time_errors](https://github.com/demergent-labs/azle/tree/main/examples/run_time_errors)

```typescript
import { $heartbeat } from 'azle';

$heartbeat;
export function heartbeat(): void {
    console.log('this runs ~1 time per second');
}
```

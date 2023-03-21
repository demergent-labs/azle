# clear timer

This section is a work in progress.

Examples:

-   [timers](https://github.com/demergent-labs/azle/tree/main/examples/timers)

```typescript
import { ic, TimerId, $update } from 'azle';

$update;
export function clearTimer(timerId: TimerId): void {
    ic.clearTimer(timerId);
}
```

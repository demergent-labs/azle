# set timer interval

This section is a work in progress.

Examples:

-   [timers](https://github.com/demergent-labs/azle/tree/main/examples/timers)

```typescript
import { Duration, ic, TimerId, $update } from 'azle';

$update;
export function setTimerIntervals(interval: Duration): [TimerId, TimerId] {
    const functionTimerId = ic.setTimerInterval(interval, callback);

    const capturedValue = '🚩';

    const closureTimerId = ic.setTimerInterval(interval, () => {
        console.log(`closure called and captured value ${capturedValue}`);
    });

    return [functionTimerId, closureTimerId];
}

function callback(): void {
    console.log('callback called');
}
```

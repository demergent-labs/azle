# set timer

This section is a work in progress.

Examples:

-   [timers](https://github.com/demergent-labs/azle/tree/main/examples/timers)

```typescript
import { Duration, ic, TimerId, $update } from 'azle';

$update;
export function setTimers(delay: Duration): [TimerId, TimerId] {
    const functionTimerId = ic.setTimer(delay, callback);

    const capturedValue = '🚩';

    const closureTimerId = ic.setTimer(delay, () => {
        console.log(`closure called and captured value ${capturedValue}`);
    });

    return [functionTimerId, closureTimerId];
}

function callback(): void {
    console.log('callback called');
}
```

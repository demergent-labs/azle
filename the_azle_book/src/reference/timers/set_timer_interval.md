# set timer interval

This section is a work in progress.

Examples:

-   [timers](https://github.com/demergent-labs/azle/tree/main/examples/timers)

```typescript
import { Canister, Duration, ic, TimerId, Tuple, update } from 'azle';

export default Canister({
    setTimerIntervals: update(
        [Duration],
        Tuple(TimerId, TimerId),
        (interval) => {
            const functionTimerId = ic.setTimerInterval(interval, callback);

            const capturedValue = '🚩';

            const closureTimerId = ic.setTimerInterval(interval, () => {
                console.log(
                    `closure called and captured value ${capturedValue}`
                );
            });

            return [functionTimerId, closureTimerId];
        }
    )
});

function callback() {
    console.log('callback called');
}
```

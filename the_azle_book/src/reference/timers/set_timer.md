# set timer

This section is a work in progress.

Examples:

-   [timers](https://github.com/demergent-labs/azle/tree/main/examples/timers)

```typescript
import { Canister, Duration, ic, TimerId, Tuple, update } from 'azle';

export default Canister({
    setTimers: update([Duration], Tuple(TimerId, TimerId), (delay) => {
        const functionTimerId = ic.setTimer(delay, callback);

        const capturedValue = '🚩';

        const closureTimerId = ic.setTimer(delay, () => {
            console.log(`closure called and captured value ${capturedValue}`);
        });

        return [functionTimerId, closureTimerId];
    })
});

function callback() {
    console.log('callback called');
}
```

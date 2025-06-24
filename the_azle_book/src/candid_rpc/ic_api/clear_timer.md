# clearTimer

Cancel a scheduled timer.

```typescript
import { setTimer, clearTimer, IDL, update } from 'azle';

export default class {
    activeTimers: Set<bigint> = new Set();

    @update([IDL.Nat], IDL.Nat64)
    scheduleTask(delaySeconds: number): bigint {
        const timerId = setTimer(delaySeconds, () => {
            console.log('Task executed!');
            this.activeTimers.delete(timerId);
        });

        this.activeTimers.add(timerId);
        return timerId;
    }

    @update([IDL.Nat64], IDL.Bool)
    cancelTask(timerId: bigint): boolean {
        if (this.activeTimers.has(timerId)) {
            clearTimer(timerId);
            this.activeTimers.delete(timerId);
            return true;
        }
        return false;
    }
}
```

The `clearTimer` function cancels a previously scheduled timer (created with either `setTimer` or `setTimerInterval`).

**Parameters:**

- `timerId`: The timer ID returned by `setTimer` or `setTimerInterval`

**Returns:** `void`

**Important Notes:**

- Safe to call with non-existent timer IDs (no error thrown)
- Works for both one-time timers (`setTimer`) and recurring timers (`setTimerInterval`)
- Once cleared, the timer ID cannot be reused

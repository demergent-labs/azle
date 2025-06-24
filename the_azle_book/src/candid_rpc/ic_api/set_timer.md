# setTimer

Execute a callback after a delay.

```typescript
import { setTimer, IDL, update } from 'azle';

export default class {
    @update([IDL.Nat], IDL.Nat64)
    scheduleTask(delaySeconds: number): bigint {
        const timerId = setTimer(delaySeconds, () => {
            console.log('Timer executed!');
        });

        return timerId;
    }
}
```

## Delayed Operations

```typescript
import { setTimer, msgCaller, IDL, update } from 'azle';

export default class {
    private notifications: Map<string, string> = new Map();

    @update([IDL.Nat, IDL.Text], IDL.Text)
    scheduleNotification(delaySeconds: number, message: string): string {
        const caller = msgCaller().toText();

        setTimer(delaySeconds, () => {
            this.notifications.set(caller, message);
            console.log(`Notification for ${caller}: ${message}`);
        });

        return `Notification scheduled for ${delaySeconds} seconds from now`;
    }

    @query([], IDL.Opt(IDL.Text))
    getNotification(): [string] | [] {
        const caller = msgCaller().toText();
        const notification = this.notifications.get(caller);

        if (notification) {
            this.notifications.delete(caller);
            return [notification];
        }

        return [];
    }
}
```

The `setTimer` function schedules a callback to be executed after a specified delay. The timer executes exactly once and returns a timer ID that can be used with `clearTimer`.

**Parameters:**

- `delay`: Duration in seconds (as `number`)
- `callback`: Function to execute when timer fires

**Returns:** Timer ID (`bigint`) for use with `clearTimer`

**Important Notes:**

- Timers persist across canister upgrades
- Timer callbacks have access to canister state
- Failed timer callbacks are logged but don't crash the canister

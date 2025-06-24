# setTimerInterval

Execute a callback repeatedly at specified intervals.

```typescript
import { setTimerInterval, IDL, update } from 'azle';

export default class {
    counter: number = 0;

    @update([IDL.Nat], IDL.Nat64)
    startPeriodicTask(intervalSeconds: number): bigint {
        const timerId = setTimerInterval(intervalSeconds, () => {
            this.counter += 1;
            console.log(`Periodic task executed ${this.counter} times`);
        });

        return timerId;
    }
}
```

## Health Monitoring

```typescript
import { setTimerInterval, canisterCycleBalance, IDL, update } from 'azle';

export default class {
    private healthStatus: string = 'unknown';
    private lastCheckTime: bigint = 0n;

    @update([IDL.Nat], IDL.Nat64)
    startHealthMonitoring(intervalSeconds: number): bigint {
        return setTimerInterval(intervalSeconds, () => {
            const cycleBalance = canisterCycleBalance();
            const now = time();

            this.lastCheckTime = now;

            if (cycleBalance < 1_000_000_000n) {
                // Less than 1B cycles
                this.healthStatus = 'low_cycles';
                console.warn(`Low cycle balance: ${cycleBalance}`);
            } else {
                this.healthStatus = 'healthy';
                console.log(`Health check passed at ${now}`);
            }
        });
    }

    @query(
        [],
        IDL.Record({
            status: IDL.Text,
            lastCheck: IDL.Nat64,
            cycleBalance: IDL.Nat
        })
    )
    getHealthStatus(): {
        status: string;
        lastCheck: bigint;
        cycleBalance: bigint;
    } {
        return {
            status: this.healthStatus,
            lastCheck: this.lastCheckTime,
            cycleBalance: canisterCycleBalance()
        };
    }
}
```

The `setTimerInterval` function schedules a callback to execute repeatedly at specified intervals. Unlike `setTimer`, this continues executing until cancelled with `clearTimer`.

**Parameters:**

- `interval`: Duration between executions in seconds (as `number`)
- `callback`: Function to execute on each interval

**Returns:** Timer ID (`bigint`) for use with `clearTimer`

**Important Notes:**

- Continues executing until explicitly cancelled
- Each execution is independent - if one fails, others continue
- Use `clearTimer` to stop the interval

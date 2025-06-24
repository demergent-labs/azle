# IC API

The IC API is exposed as functions exported from `azle`. These functions provide access to Internet Computer platform capabilities.

## Message Information

### msgCaller

Get the principal of the identity that initiated the current call:

```typescript
import { msgCaller, IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    whoAmI(): string {
        return msgCaller().toText();
    }

    @query([], IDL.Bool)
    isAnonymous(): boolean {
        return msgCaller().toText() === '2vxsx-fae';
    }
}
```

### msgMethodName

Get the name of the currently executing method:

```typescript
import { msgMethodName, IDL, update } from 'azle';

export default class {
    @update([], IDL.Text)
    currentMethod(): string {
        return msgMethodName(); // Returns "currentMethod"
    }
}
```

## Time

### time

Get the current ICP system time in nanoseconds:

```typescript
import { time, IDL, query } from 'azle';

export default class {
    @query([], IDL.Nat64)
    getCurrentTime(): bigint {
        return time();
    }

    @query([], IDL.Text)
    getFormattedTime(): string {
        const nanos = time();
        const date = new Date(Number(nanos / 1_000_000n));
        return date.toISOString();
    }
}
```

## Timers

### setTimer

Execute a callback after a delay:

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

### setTimerInterval

Execute a callback repeatedly:

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

### clearTimer

Cancel a scheduled timer:

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

## Cycles

### canisterCycleBalance

Get the canister's current cycle balance:

```typescript
import { canisterCycleBalance, IDL, query } from 'azle';

export default class {
    @query([], IDL.Nat)
    getBalance(): bigint {
        return canisterCycleBalance();
    }

    @query([], IDL.Bool)
    hasEnoughCycles(): boolean {
        const balance = canisterCycleBalance();
        const minimumRequired = 1_000_000_000n; // 1 billion cycles
        return balance >= minimumRequired;
    }
}
```

### msgCyclesAccept

Accept cycles sent with the current call:

```typescript
import { msgCyclesAccept, msgCyclesAvailable, IDL, update } from 'azle';

export default class {
    @update([], IDL.Nat)
    acceptPayment(): bigint {
        const available = msgCyclesAvailable();
        const accepted = msgCyclesAccept(available);
        return accepted;
    }
}
```

## Inter-Canister Calls

### call

Make calls to other canisters:

```typescript
import { call, IDL, update, Principal } from 'azle';

export default class {
    @update([IDL.Principal, IDL.Text], IDL.Text)
    async callOtherCanister(
        canisterId: Principal,
        message: string
    ): Promise<string> {
        const result = await call(canisterId, 'process_message', {
            args: [message],
            paramIdlTypes: [IDL.Text],
            returnIdlType: IDL.Text
        });

        return result;
    }

    @update([IDL.Principal], IDL.Nat)
    async transferCycles(recipient: Principal): Promise<bigint> {
        const cyclesToSend = 1_000_000n;

        await call(recipient, 'receive_cycles', {
            cycles: cyclesToSend
        });

        return cyclesToSend;
    }
}
```

## Canister Information

### canisterSelf

Get the current canister's principal:

```typescript
import { canisterSelf, IDL, query } from 'azle';

export default class {
    @query([], IDL.Principal)
    myId(): Principal {
        return canisterSelf();
    }
}
```

### canisterVersion

Get the current canister version:

```typescript
import { canisterVersion, IDL, query } from 'azle';

export default class {
    @query([], IDL.Nat64)
    getVersion(): bigint {
        return canisterVersion();
    }
}
```

## Error Handling

### trap

Terminate execution with an error:

```typescript
import { trap, IDL, update } from 'azle';

export default class {
    @update([IDL.Text], IDL.Text)
    processInput(input: string): string {
        if (input === '') {
            trap('Input cannot be empty');
        }

        return `Processed: ${input}`;
    }
}
```

## Manual Response Handling

### msgReply / msgReject

For manual response handling in decorators with `manual: true`:

```typescript
import {
    msgReply,
    msgReject,
    msgArgData,
    IDL,
    update,
    candidDecode,
    candidEncode
} from 'azle';

export default class {
    @update([], IDL.Text, { manual: true })
    manualResponse(): void {
        try {
            const result = 'Success!';
            const encoded = candidEncode([IDL.Text], [result]);
            msgReply(encoded);
        } catch (error) {
            msgReject(`Error: ${error}`);
        }
    }
}
```

## Random Numbers

### randSeed

Get a random seed for pseudorandom number generation:

```typescript
import { randSeed, IDL, query } from 'azle';

export default class {
    @query([], IDL.Nat)
    getRandomNumber(): number {
        const seed = randSeed();
        // Use seed for pseudorandom number generation
        return Math.abs(seed.reduce((a, b) => a + b, 0));
    }
}
```

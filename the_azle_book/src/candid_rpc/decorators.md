# Decorators

Decorators expose your class methods as canister entry points. Each decorator specifies how the method should be called and what permissions it has.

## Available Decorators

### [@query](./decorators/query.md)

Read-only methods that cannot modify state. Fast execution with optional cross-canister calls.

### [@update](./decorators/update.md)

Read-write methods that can modify canister state. Full async support with cross-canister calls.

### [@init](./decorators/init.md)

Initialization method called once during canister deployment. Sets up initial state.

### [@postUpgrade](./decorators/post_upgrade.md)

Called after canister upgrade. Used for state migration and restoration.

### [@preUpgrade](./decorators/pre_upgrade.md)

Called before canister upgrade. Used for cleanup and state validation.

### [@inspectMessage](./decorators/inspect_message.md)

Called before every `@update` method. Provides access control and validation.

### [@heartbeat](./decorators/heartbeat.md)

Called periodically (~every second). Not recommended - use timers instead.

## Quick Comparison

| Decorator         | State Access | Async | Replication | Instruction Limit |
| ----------------- | ------------ | ----- | ----------- | ----------------- |
| `@query`          | read-only    | yes\* | possible    | 5B                |
| `@update`         | read-write   | yes   | yes         | 40B               |
| `@init`           | read-write   | no    | yes         | 300B              |
| `@postUpgrade`    | read-write   | no    | yes         | 300B              |
| `@preUpgrade`     | read-only    | no    | yes         | 300B              |
| `@inspectMessage` | read-only    | no    | none        | 200M              |
| `@heartbeat`      | read-write   | yes   | yes         | 40B               |

\*Only with `composite: true` option

## Common Options

All decorators support these common options:

- `manual`: Manual argument/return handling
- `hidden`: Hide from Candid interface (except `@preUpgrade`, `@inspectMessage`, `@heartbeat`)

## Basic Example

```typescript
import { IDL, query, update, init } from 'azle';

export default class {
    counter: number = 0;
    owner: string = '';

    @init([IDL.Text])
    initialize(ownerName: string): void {
        this.owner = ownerName;
    }

    @query([], IDL.Nat)
    getCounter(): number {
        return this.counter;
    }

    @update([], IDL.Nat)
    increment(): number {
        this.counter += 1;
        return this.counter;
    }
}
```

## @query

Read-only canister method. Cannot modify state.

- **State**: read-only
- **Replication**: possible
- **Async**: yes with `composite` set to true
- **Instruction limit**: 5_000_000_000

```typescript
import { IDL, query } from 'azle';

export default class {
    counter: number = 0;

    @query([], IDL.Nat)
    getCounter(): number {
        return this.counter;
    }

    @query([IDL.Text], IDL.Text)
    echo(message: string): string {
        return `Echo: ${message}`;
    }
}
```

### Composite Queries

```typescript
import { IDL, query, call } from 'azle';

export default class {
    @query([], IDL.Text, { composite: true })
    async crossCanisterQuery(): Promise<string> {
        const result = await call('canister-id', 'method_name', {
            returnIdlType: IDL.Text
        });
        return result;
    }
}
```

## @update

Read-write canister method. Can modify state.

- **State**: read-write
- **Replication**: yes
- **Async**: yes
- **Instruction limit**: 40_000_000_000

```typescript
import { IDL, update } from 'azle';

export default class {
    counter: number = 0;

    @update([], IDL.Nat)
    increment(): number {
        this.counter += 1;
        return this.counter;
    }

    @update([IDL.Nat], IDL.Nat)
    setCounter(value: number): number {
        this.counter = value;
        return this.counter;
    }
}
```

## @init

Canister initialization method. Called once during deployment.

- **State**: read-write
- **Replication**: yes
- **Async**: no
- **Instruction limit**: 300_000_000_000

```typescript
import { IDL, init } from 'azle';

export default class {
    owner: string = '';
    initialized: boolean = false;

    @init([IDL.Text])
    initialize(ownerName: string): void {
        this.owner = ownerName;
        this.initialized = true;
    }
}
```

## @postUpgrade

Called after canister upgrade. Used to restore state.

- **State**: read-write
- **Replication**: yes
- **Async**: no
- **Instruction limit**: 300_000_000_000 (shared with preUpgrade)

```typescript
import { IDL, postUpgrade } from 'azle';

export default class {
    version: string = '1.0.0';

    @postUpgrade([IDL.Text])
    upgrade(newVersion: string): void {
        this.version = newVersion;
        console.log(`Upgraded to version ${newVersion}`);
    }
}
```

## @preUpgrade

Called before canister upgrade. Used to save state.

- **State**: read-only
- **Replication**: yes
- **Async**: no
- **Instruction limit**: 300_000_000_000 (shared with postUpgrade)

```typescript
import { IDL, preUpgrade } from 'azle';

export default class {
    counter: number = 0;

    @preUpgrade()
    saveState(): void {
        // Save critical state before upgrade
        console.log(`Current counter: ${this.counter}`);
    }
}
```

## @inspectMessage

Called before every `@update` method. Can reject calls.

- **State**: read-only
- **Replication**: none
- **Async**: no
- **Instruction limit**: 200_000_000

```typescript
import { IDL, inspectMessage, msgCaller } from 'azle';

export default class {
    owner: string = 'owner-principal-id';

    @inspectMessage()
    inspect(methodName: string): boolean {
        const caller = msgCaller();

        // Only allow owner to call sensitive methods
        if (methodName === 'sensitiveMethod') {
            return caller.toText() === this.owner;
        }

        return true; // Allow all other methods
    }

    @update([], IDL.Text)
    sensitiveMethod(): string {
        return 'Secret data';
    }
}
```

## @heartbeat

Called periodically (~every second). Not recommended for most use cases.

- **State**: read-write
- **Replication**: yes
- **Async**: yes
- **Instruction limit**: 40_000_000_000

> **Note**: Use `setTimer` and `setTimerInterval` instead of `@heartbeat` for most periodic tasks.

```typescript
import { IDL, heartbeat } from 'azle';

export default class {
    heartbeatCount: number = 0;

    @heartbeat()
    periodicTask(): void {
        this.heartbeatCount += 1;
        console.log(`Heartbeat ${this.heartbeatCount}`);
    }
}
```

## Manual Mode

All decorators support manual mode for advanced use cases:

```typescript
import { IDL, query, msgArgData, msgReply, IDL as CandidIDL } from 'azle';

export default class {
    @query([], IDL.Text, { manual: true })
    manualQuery(): void {
        const args = msgArgData();
        const decodedArgs = CandidIDL.decode([IDL.Text], args);

        const result = `Processed: ${decodedArgs[0]}`;
        const encodedResult = CandidIDL.encode([IDL.Text], [result]);

        msgReply(encodedResult);
    }
}
```

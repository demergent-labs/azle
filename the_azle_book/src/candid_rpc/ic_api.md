# IC API

The IC API is exposed as functions exported from `azle`. These functions provide access to Internet Computer platform capabilities.

## Quick Example

```typescript
import {
    msgCaller,
    time,
    canisterCycleBalance,
    call,
    IDL,
    query,
    update
} from 'azle';

export default class {
    @query([], IDL.Text)
    whoCalledWhen(): string {
        const caller = msgCaller().toText();
        const now = time();
        return `Called by ${caller} at ${now}`;
    }

    @query([], IDL.Nat)
    getBalance(): bigint {
        return canisterCycleBalance();
    }

    @update([IDL.Principal, IDL.Text], IDL.Text)
    async callOther(canisterId: Principal, message: string): Promise<string> {
        const result = await call(canisterId, 'echo', {
            args: [message],
            paramIdlTypes: [IDL.Text],
            returnIdlType: IDL.Text
        });
        return result;
    }
}
```

## IC API Functions

### Message Information

- [msgCaller](./ic_api/msg_caller.md) - Get the caller's principal identity
- [msgMethodName](./ic_api/msg_method_name.md) - Get the name of the currently executing method
- [msgArgData](./ic_api/msg_arg_data.md) - Get raw Candid-encoded arguments

### Time

- [time](./ic_api/time.md) - Get the current Internet Computer time

### Timers

- [setTimer](./ic_api/set_timer.md) - Execute a callback after a delay
- [setTimerInterval](./ic_api/set_timer_interval.md) - Execute a callback repeatedly
- [clearTimer](./ic_api/clear_timer.md) - Cancel a scheduled timer

### Cycles

- [canisterCycleBalance](./ic_api/canister_cycle_balance.md) - Get the canister's cycle balance
- [msgCyclesAccept](./ic_api/msg_cycles_accept.md) - Accept cycles sent with a call
- [msgCyclesAvailable](./ic_api/msg_cycles_available.md) - Get cycles available in current call
- [msgCyclesRefunded](./ic_api/msg_cycles_refunded.md) - Get cycles refunded from last call
- [cyclesBurn](./ic_api/cycles_burn.md) - Permanently destroy cycles

### Inter-Canister Calls

- [call](./ic_api/call.md) - Make calls to other canisters

### Canister Information

- [canisterSelf](./ic_api/canister_self.md) - Get the current canister's principal
- [canisterVersion](./ic_api/canister_version.md) - Get the canister version number
- [isController](./ic_api/is_controller.md) - Check if a principal is a controller

### Error Handling

- [trap](./ic_api/trap.md) - Terminate execution with an error
- [msgRejectCode](./ic_api/msg_reject_code.md) - Get rejection code from failed calls
- [msgRejectMsg](./ic_api/msg_reject_msg.md) - Get rejection message from failed calls

### Manual Response

- [msgReply](./ic_api/msg_reply.md) - Reply with raw Candid-encoded data
- [msgReject](./ic_api/msg_reject.md) - Reject with an error message

### Random

- [randSeed](./ic_api/rand_seed.md) - Seed the random number generator

### Advanced

- [performanceCounter](./ic_api/performance_counter.md) - Get performance metrics
- [dataCertificate](./ic_api/data_certificate.md) - Get data certificate for queries
- [candidEncode](./ic_api/candid_encode.md) - Encode values to Candid format
- [candidDecode](./ic_api/candid_decode.md) - Decode Candid format to values
- [inReplicatedExecution](./ic_api/in_replicated_execution.md) - Check execution context
- [chunk](./ic_api/chunk.md) - Process data in chunks

## API Reference Table

| Function                | Category | Use Case                       |
| ----------------------- | -------- | ------------------------------ |
| `call`                  | Calls    | Inter-canister communication   |
| `candidDecode`          | Advanced | Manual deserialization         |
| `candidEncode`          | Advanced | Manual serialization           |
| `canisterCycleBalance`  | Cycles   | Resource monitoring            |
| `canisterSelf`          | Info     | Self-reference                 |
| `canisterVersion`       | Info     | Version tracking               |
| `chunk`                 | Advanced | Memory management              |
| `clearTimer`            | Timers   | Cancel scheduled operations    |
| `cyclesBurn`            | Cycles   | Deflationary mechanics         |
| `dataCertificate`       | Advanced | Query verification             |
| `inReplicatedExecution` | Advanced | Environment detection          |
| `isController`          | Info     | Admin access control           |
| `msgArgData`            | Message  | Manual argument processing     |
| `msgCaller`             | Message  | Authentication, access control |
| `msgCyclesAccept`       | Cycles   | Payment processing             |
| `msgCyclesAvailable`    | Cycles   | Payment validation             |
| `msgCyclesRefunded`     | Cycles   | Cost tracking                  |
| `msgMethodName`         | Message  | Logging, analytics             |
| `msgReject`             | Manual   | Custom error responses         |
| `msgRejectCode`         | Errors   | Error classification           |
| `msgRejectMsg`          | Errors   | Detailed error info            |
| `msgReply`              | Manual   | Custom response handling       |
| `performanceCounter`    | Advanced | Performance monitoring         |
| `randSeed`              | Random   | Secure randomness              |
| `setTimer`              | Timers   | Delayed operations             |
| `setTimerInterval`      | Timers   | Recurring tasks                |
| `time`                  | Time     | Timestamps, expiration         |
| `trap`                  | Errors   | Input validation               |

For detailed examples and usage patterns, click on any function name above to view its dedicated documentation page.

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

## Data Structures

### StableBTreeMap

A persistent B-tree map backed by stable memory that automatically persists across canister upgrades:

```typescript
import { StableBTreeMap, IDL, query, update } from 'azle';

export default class {
    // Create a stable map with memory ID 0
    userProfiles = new StableBTreeMap<string, { name: string; age: number }>(0);

    // Create multiple maps with different memory IDs
    counters = new StableBTreeMap<string, bigint>(1);
    settings = new StableBTreeMap<string, boolean>(2);

    @update(
        [IDL.Text, IDL.Record({ name: IDL.Text, age: IDL.Nat })],
        IDL.Opt(IDL.Record({ name: IDL.Text, age: IDL.Nat }))
    )
    setUserProfile(
        userId: string,
        profile: { name: string; age: number }
    ): { name: string; age: number } | undefined {
        return this.userProfiles.insert(userId, profile);
    }

    @query([IDL.Text], IDL.Opt(IDL.Record({ name: IDL.Text, age: IDL.Nat })))
    getUserProfile(userId: string): { name: string; age: number } | undefined {
        return this.userProfiles.get(userId);
    }

    @query(
        [],
        IDL.Vec(
            IDL.Tuple(IDL.Text, IDL.Record({ name: IDL.Text, age: IDL.Nat }))
        )
    )
    getAllProfiles(): [string, { name: string; age: number }][] {
        return this.userProfiles.items();
    }

    @update([IDL.Text], IDL.Opt(IDL.Record({ name: IDL.Text, age: IDL.Nat })))
    removeUser(userId: string): { name: string; age: number } | undefined {
        return this.userProfiles.remove(userId);
    }

    @query([], IDL.Nat32)
    getUserCount(): number {
        return this.userProfiles.len();
    }

    @query([IDL.Text], IDL.Bool)
    userExists(userId: string): boolean {
        return this.userProfiles.containsKey(userId);
    }
}
```

#### StableBTreeMap Constructor

```typescript
new StableBTreeMap<Key, Value>(
    memoryId: number,
    keySerializable?: Serializable,
    valueSerializable?: Serializable
)
```

- **`memoryId`** - Unique identifier (0-253) for this map's stable memory
- **`keySerializable`** - Optional custom serialization for keys (defaults to ICP-enabled JSON)
- **`valueSerializable`** - Optional custom serialization for values (defaults to ICP-enabled JSON)

#### StableBTreeMap Methods

- **`containsKey(key)`** - Check if a key exists
- **`get(key)`** - Retrieve value by key
- **`insert(key, value)`** - Insert/update key-value pair
- **`remove(key)`** - Remove key and return its value
- **`isEmpty()`** - Check if map is empty
- **`len()`** - Get number of key-value pairs
- **`keys(startIndex?, length?)`** - Get keys in sorted order
- **`values(startIndex?, length?)`** - Get values in sorted order
- **`items(startIndex?, length?)`** - Get key-value pairs in sorted order

#### Custom Serialization

```typescript
import { StableBTreeMap, Serializable } from 'azle';

// Custom serializer for numbers as little-endian bytes
const numberSerializer: Serializable = {
    toBytes: (num: number) => {
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        view.setFloat64(0, num, true); // little-endian
        return new Uint8Array(buffer);
    },
    fromBytes: (bytes: Uint8Array) => {
        const view = new DataView(bytes.buffer);
        return view.getFloat64(0, true); // little-endian
    }
};

export default class {
    // Map with custom number serialization for keys
    numericMap = new StableBTreeMap<number, string>(0, numberSerializer);
}
```

## JSON Utilities

### jsonStringify / jsonParse

ICP-enabled JSON utilities that handle special types like `Principal`, `BigInt`, and `Uint8Array`:

```typescript
import { jsonStringify, jsonParse, Principal, IDL, query, update } from 'azle';

export default class {
    @update([IDL.Text], IDL.Text)
    processComplexData(input: string): string {
        // Parse ICP-enabled JSON
        const data = jsonParse(input);

        // Work with the data
        if (data.principal) {
            data.lastAccessed = time();
            data.accessCount = (data.accessCount || 0n) + 1n;
        }

        // Convert back to ICP-enabled JSON
        return jsonStringify(data);
    }

    @query([], IDL.Text)
    getExampleData(): string {
        const complexData = {
            principal: Principal.fromText('rdmx6-jaaaa-aaaah-qcaiq-cai'),
            balance: 123_456_789n, // BigInt
            buffer: new Uint8Array([1, 2, 3, 4]),
            metadata: {
                created: time(),
                isActive: true,
                tags: ['user', 'verified']
            }
        };

        return jsonStringify(complexData);
    }

    @update([IDL.Text], IDL.Principal)
    extractPrincipal(jsonData: string): Principal {
        const parsed = jsonParse(jsonData);
        return parsed.principal; // Automatically converted back to Principal
    }
}
```

#### Supported Special Types

The ICP-enabled JSON utilities automatically handle:

- **`Principal`** - Converted to/from text representation
- **`BigInt`** - Converted to/from string with special markers
- **`Uint8Array`** - Converted to/from array representation
- **`undefined`** - Properly preserved (standard JSON loses undefined values)

#### Custom JSON Processing

```typescript
import { jsonStringify, jsonParse } from 'azle';

// Custom replacer function
function customReplacer(key: string, value: any): any {
    if (value instanceof Date) {
        return { __date__: value.toISOString() };
    }
    return value;
}

// Custom reviver function
function customReviver(key: string, value: any): any {
    if (value?.__date__) {
        return new Date(value.__date__);
    }
    return value;
}

export default class {
    @update([IDL.Text], IDL.Text)
    processWithCustomJSON(input: string): string {
        const data = jsonParse(input, customReviver);
        data.processedAt = new Date();
        return jsonStringify(data, customReplacer);
    }
}
```

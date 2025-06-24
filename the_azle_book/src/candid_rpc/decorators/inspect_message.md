# @inspectMessage

Called before every `@update` method. Can reject calls.

- **State**: read-only
- **Replication**: none
- **Async**: no
- **Instruction limit**: 200_000_000

Only one `@inspectMessage` method is allowed per canister.

## Basic Usage

```typescript
import { IDL, inspectMessage, msgCaller, update } from 'azle';

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

    @update([IDL.Text], IDL.Text)
    publicMethod(message: string): string {
        return `Public: ${message}`;
    }
}
```

## Role-Based Access Control

```typescript
import { IDL, inspectMessage, msgCaller, update } from 'azle';

export default class {
    admins: Set<string> = new Set(['admin-principal-1', 'admin-principal-2']);
    moderators: Set<string> = new Set(['mod-principal-1']);

    @inspectMessage()
    checkPermissions(methodName: string): boolean {
        const caller = msgCaller().toText();

        // Admin-only methods
        if (['deleteUser', 'systemReset'].includes(methodName)) {
            return this.admins.has(caller);
        }

        // Moderator or admin methods
        if (['banUser', 'deletePost'].includes(methodName)) {
            return this.admins.has(caller) || this.moderators.has(caller);
        }

        // Public methods - all users allowed
        return true;
    }

    @update([IDL.Text], IDL.Bool)
    deleteUser(userId: string): boolean {
        // Admin only - checked in inspectMessage
        return true;
    }

    @update([IDL.Text], IDL.Bool)
    banUser(userId: string): boolean {
        // Admin or moderator - checked in inspectMessage
        return true;
    }

    @update([IDL.Text], IDL.Text)
    createPost(content: string): string {
        // Public method - all users allowed
        return `Post created: ${content}`;
    }
}
```

## Rate Limiting

```typescript
import { IDL, inspectMessage, msgCaller, update, time } from 'azle';

export default class {
    lastCallTime: Map<string, bigint> = new Map();
    rateLimitSeconds: bigint = 60n * 1_000_000_000n; // 60 seconds in nanoseconds

    @inspectMessage()
    rateLimit(methodName: string): boolean {
        const caller = msgCaller().toText();
        const now = time();

        // Only rate limit certain methods
        if (['expensiveOperation', 'sendEmail'].includes(methodName)) {
            const lastCall = this.lastCallTime.get(caller);

            if (lastCall && now - lastCall < this.rateLimitSeconds) {
                console.log(`Rate limit exceeded for ${caller}`);
                return false; // Reject the call
            }

            this.lastCallTime.set(caller, now);
        }

        return true;
    }

    @update([IDL.Text], IDL.Text)
    expensiveOperation(data: string): string {
        // Rate limited operation
        return `Processed: ${data}`;
    }

    @update([IDL.Text], IDL.Bool)
    sendEmail(recipient: string): boolean {
        // Rate limited operation
        return true;
    }
}
```

## Method Arguments Access

```typescript
import { IDL, inspectMessage, update } from 'azle';

export default class {
    @inspectMessage()
    validateArguments(methodName: string, ...args: unknown[]): boolean {
        console.log(`Method: ${methodName}, Args:`, args);

        // Validate specific method arguments
        if (methodName === 'transfer') {
            const [amount] = args as [number];
            if (amount <= 0 || amount > 1000000) {
                console.log('Invalid transfer amount');
                return false;
            }
        }

        if (methodName === 'setUsername') {
            const [username] = args as [string];
            if (username.length < 3 || username.length > 20) {
                console.log('Invalid username length');
                return false;
            }
        }

        return true;
    }

    @update([IDL.Nat], IDL.Bool)
    transfer(amount: number): boolean {
        return true;
    }

    @update([IDL.Text], IDL.Bool)
    setUsername(username: string): boolean {
        return true;
    }
}
```

## Options

- `manual`: Manual argument handling

```typescript
import { IDL, inspectMessage, msgArgData, candidDecode } from 'azle';

export default class {
    @inspectMessage([], { manual: true })
    manualInspect(): boolean {
        const args = msgArgData();
        const decoded = candidDecode([IDL.Text], args);

        console.log('Manual inspect with args:', decoded);
        return true;
    }
}
```

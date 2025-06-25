# Canister Class

Your canister's functionality must be encapsulated in a class exported using the default export:

```typescript
import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    hello(): string {
        return 'world!';
    }
}
```

## Required Structure

- Must use `export default class`
- Methods must use decorators to be exposed
- TypeScript types are optional but recommended

## Multiple Canister Classes

For complex canisters, you can organize your functionality across multiple classes and export them as an array. This pattern is useful for:

- Organizing related methods into logical groups
- Better code separation and maintainability
- Modular canister design

### Example Implementation

Create separate files for each class:

```typescript
// user_service.ts
import { IDL, query, update } from 'azle';

export class UserService {
    users: Map<string, string> = new Map();

    @update([IDL.Text, IDL.Text], IDL.Bool)
    createUser(id: string, name: string): boolean {
        if (this.users.has(id)) {
            return false;
        }
        this.users.set(id, name);
        return true;
    }

    @query([IDL.Text], IDL.Opt(IDL.Text))
    getUser(id: string): string | undefined {
        return this.users.get(id);
    }
}
```

```typescript
// notification_service.ts
import { IDL, query, update } from 'azle';

export class NotificationService {
    notifications: string[] = [];

    @update([IDL.Text], IDL.Nat)
    addNotification(message: string): number {
        this.notifications.push(message);
        return this.notifications.length;
    }

    @query([], IDL.Vec(IDL.Text))
    getNotifications(): string[] {
        return this.notifications;
    }
}
```

Then combine them in your main index file:

```typescript
// index.ts
import { UserService } from './user_service';
import { NotificationService } from './notification_service';

export default [UserService, NotificationService];
```

### Key Points for Multiple Classes:

1. **Array Export**: Use `export default [Class1, Class2, ...]` instead of a single class
2. **Separate Files**: Each class can be defined in its own file for better organization
3. **Method Merging**: All decorated methods from all classes become part of the canister's interface
4. **Independent State**: Each class maintains its own state within the same canister
5. **No Instantiation Needed**: Classes are automatically instantiated by Azle

All methods from all exported classes will be available in the final canister's Candid interface.

## State Management

Class properties become canister state:

```typescript
import { IDL, query, update } from 'azle';

export default class {
    // This becomes persistent canister state
    counter: number = 0;
    users: Map<string, string> = new Map();

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

## Available Decorators

You must use these decorators to expose your canister's methods:

- `@query` - Read-only methods
- `@update` - Read-write methods
- `@init` - Initialization method
- `@postUpgrade` - Post-upgrade method
- `@preUpgrade` - Pre-upgrade method
- `@inspectMessage` - Message inspection method
- `@heartbeat` - Periodic execution method
- `@onLowWasmMemory` - Low memory handler method

### System Method Decorators

#### @onLowWasmMemory

Marks a method to handle low Wasm memory conditions. This system method allows canisters to respond gracefully when running low on memory:

```typescript
import { onLowWasmMemory, IDL } from 'azle';

export default class {
    @onLowWasmMemory
    handleLowMemory(): void {
        // Clean up unnecessary data
        this.cache.clear();

        // Log the event
        console.info('Low memory condition detected, cleaned up cache');

        // Perform garbage collection or other memory management
        this.performMemoryCleanup();
    }

    private performMemoryCleanup(): void {
        // Custom cleanup logic
    }
}
```

**Key characteristics:**

- Only one `@onLowWasmMemory` method allowed per canister
- Called automatically when the canister is running low on Wasm memory
- State: read-write access
- Replication: yes (replicated across all nodes)
- Async: supports async operations
- Instruction limit: 40,000,000,000 instructions

## Method Visibility

Only decorated methods are exposed in the canister's Candid interface:

```typescript
import { IDL, query } from 'azle';

export default class {
    // This method is exposed
    @query([], IDL.Text)
    publicMethod(): string {
        return this.privateHelper();
    }

    // This method is private (not exposed)
    privateHelper(): string {
        return 'Hello from private method';
    }
}
```

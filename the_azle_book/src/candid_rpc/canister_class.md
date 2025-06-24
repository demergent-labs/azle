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

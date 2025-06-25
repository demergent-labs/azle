# @preUpgrade

Called before canister upgrade. Used to save state.

- **State**: read-only
- **Replication**: yes
- **Async**: no
- **Instruction limit**: 300_000_000_000 (shared with postUpgrade)

Only one `@preUpgrade` method is allowed per canister.

## Basic Usage

```typescript
import { IDL, preUpgrade } from 'azle';

export default class {
    counter: number = 0;

    @preUpgrade()
    saveState(): void {
        // Save critical state before upgrade
        console.log(`Current counter: ${this.counter}`);

        // State is automatically preserved
        // This is mainly for logging/cleanup
    }
}
```

## State Validation

```typescript
import { IDL, preUpgrade } from 'azle';

export default class {
    users: Map<string, any> = new Map();
    orders: Map<string, any> = new Map();

    @preUpgrade()
    validateState(): void {
        console.log(`Pre-upgrade validation:`);
        console.log(`- Users: ${this.users.size}`);
        console.log(`- Orders: ${this.orders.size}`);

        // Validate critical state
        if (this.users.size === 0) {
            console.warn('Warning: No users in system');
        }

        // Log important metrics
        const activeUsers = Array.from(this.users.values()).filter(
            (user) => user.active
        ).length;
        console.log(`- Active users: ${activeUsers}`);
    }
}
```

## Cleanup Operations

```typescript
import { IDL, preUpgrade, clearTimer } from 'azle';

export default class {
    activeTimers: Set<bigint> = new Set();

    @preUpgrade()
    cleanup(): void {
        console.log('Cleaning up before upgrade...');

        // Cancel all active timers
        for (const timerId of this.activeTimers) {
            clearTimer(timerId);
        }

        console.log(`Cleared ${this.activeTimers.size} timers`);

        // Other cleanup operations
        console.log('Cleanup complete');
    }
}
```

## Backup State

```typescript
import { IDL, preUpgrade } from 'azle';

export default class {
    criticalData: Map<string, string> = new Map();

    @preUpgrade()
    backupCriticalData(): void {
        const backup = {
            timestamp: Date.now(),
            dataCount: this.criticalData.size,
            keys: Array.from(this.criticalData.keys())
        };

        console.log('Backup info:', JSON.stringify(backup));

        // In a real scenario, you might want to store
        // backup data in stable storage
    }
}
```

## No Manual Mode

> **Note**: `@preUpgrade` does not support manual mode as it takes no arguments.

# @onLowWasmMemory

The `@onLowWasmMemory` decorator marks a method as the low Wasm memory handler for your canister. This system method is automatically called when your canister is running low on Wasm memory, allowing you to implement graceful memory management.

## Usage

```typescript
import { onLowWasmMemory } from 'azle';

export default class {
    cache: Map<string, any> = new Map();

    @onLowWasmMemory
    handleLowMemory(): void {
        // Clean up unnecessary data
        this.cache.clear();

        // Log the event
        console.info('Low memory condition detected, cleaned up cache');

        // Perform additional cleanup
        this.performMemoryCleanup();
    }

    private performMemoryCleanup(): void {
        // Custom cleanup logic
        // Remove old entries, compact data structures, etc.
    }
}
```

## Characteristics

- **State Access**: Read-write
- **Replication**: Yes (replicated across all nodes)
- **Async Support**: Yes, can be async
- **Instruction Limit**: 40,000,000,000 instructions
- **Frequency**: Called automatically when memory is low
- **Limit**: Only one `@onLowWasmMemory` method per canister

## Common Use Cases

### Cache Management

```typescript
import { onLowWasmMemory, query, update, IDL } from 'azle';

export default class {
    cache: Map<string, { data: any; timestamp: bigint }> = new Map();
    userData: Map<string, any> = new Map();

    @onLowWasmMemory
    handleLowMemory(): void {
        // Clear expired cache entries
        const currentTime = Date.now();
        const oneHourAgo = BigInt(currentTime - 3600000);

        for (const [key, value] of this.cache.entries()) {
            if (value.timestamp < oneHourAgo) {
                this.cache.delete(key);
            }
        }

        console.info(`Cleaned up cache, ${this.cache.size} entries remaining`);
    }

    @update([IDL.Text, IDL.Text], IDL.Bool)
    cacheData(key: string, data: string): boolean {
        this.cache.set(key, {
            data,
            timestamp: BigInt(Date.now())
        });
        return true;
    }

    @query([IDL.Text], IDL.Opt(IDL.Text))
    getCachedData(key: string): string | undefined {
        return this.cache.get(key)?.data;
    }
}
```

### Data Structure Optimization

```typescript
import { onLowWasmMemory, StableBTreeMap } from 'azle';

export default class {
    tempData: any[] = [];
    stableStorage = new StableBTreeMap<string, string>(0);

    @onLowWasmMemory
    async handleLowMemory(): Promise<void> {
        // Move temporary data to stable storage
        for (let i = 0; i < this.tempData.length; i++) {
            const item = this.tempData[i];
            if (item.shouldPersist) {
                this.stableStorage.insert(item.id, JSON.stringify(item));
            }
        }

        // Clear temporary arrays
        this.tempData = [];

        console.info('Moved temporary data to stable storage');
    }
}
```

### Memory Monitoring

```typescript
import { onLowWasmMemory, canisterCycleBalance, time } from 'azle';

export default class {
    memoryEvents: { timestamp: bigint; action: string }[] = [];

    @onLowWasmMemory
    handleLowMemory(): void {
        const timestamp = time();
        const cycleBalance = canisterCycleBalance();

        // Log the memory event
        this.memoryEvents.push({
            timestamp,
            action: `Low memory detected. Cycle balance: ${cycleBalance}`
        });

        // Keep only recent events (last 100)
        if (this.memoryEvents.length > 100) {
            this.memoryEvents = this.memoryEvents.slice(-100);
        }

        // Perform cleanup based on available cycles
        if (cycleBalance < 1_000_000_000n) {
            // Aggressive cleanup if cycles are also low
            this.performAggressiveCleanup();
        } else {
            // Standard cleanup
            this.performStandardCleanup();
        }
    }

    private performAggressiveCleanup(): void {
        // More aggressive memory management
    }

    private performStandardCleanup(): void {
        // Standard memory management
    }
}
```

## Best Practices

1. **Keep It Simple**: The low memory handler should be efficient and avoid complex operations
2. **Prioritize Cleanup**: Focus on freeing memory rather than performing business logic
3. **Log Events**: Track when low memory events occur for monitoring
4. **Consider Cycles**: Check cycle balance as low memory often correlates with resource constraints
5. **Test Thoroughly**: Simulate low memory conditions to ensure your handler works correctly

## Important Notes

- This decorator is automatically triggered by the IC when memory is low
- Only one method per canister can have this decorator
- The method should complete quickly to avoid blocking the canister
- Consider the instruction limit when implementing complex cleanup logic
- This is a system-level method that doesn't appear in your Candid interface

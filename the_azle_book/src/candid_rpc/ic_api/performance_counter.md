# performanceCounter

Get performance metrics for the current execution.

```typescript
import { performanceCounter, IDL, query } from 'azle';

export default class {
    @query([], IDL.Nat64)
    getInstructionCount(): bigint {
        return performanceCounter(0); // Instruction counter
    }

    @query(
        [],
        IDL.Record({
            instructions: IDL.Nat64,
            timestamp: IDL.Nat64
        })
    )
    getPerformanceMetrics(): {
        instructions: bigint;
        timestamp: bigint;
    } {
        return {
            instructions: performanceCounter(0),
            timestamp: performanceCounter(1) // Time in nanoseconds
        };
    }
}
```

The `performanceCounter` function provides access to various performance metrics of the current execution context.

**Parameters:**

- `counterType`: The type of counter to read (`number`)
    - `0`: Instruction counter
    - `1`: Current time in nanoseconds

**Returns:** Counter value (`bigint`)

**Use Cases:**

- Performance monitoring and optimization
- Execution cost analysis
- Benchmarking different implementations
- Resource usage tracking

**Important Notes:**

- Counter values are specific to the current call context
- Instruction counter includes all instructions executed so far
- Time counter provides high-precision timestamps

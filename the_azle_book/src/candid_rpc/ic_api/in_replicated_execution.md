# inReplicatedExecution

Check if the code is running in replicated execution mode.

```typescript
import { inReplicatedExecution, IDL, query, update } from 'azle';

export default class {
    @query([], IDL.Bool)
    isReplicated(): boolean {
        return inReplicatedExecution();
    }

    @update([IDL.Text], IDL.Text)
    conditionalOperation(data: string): string {
        if (inReplicatedExecution()) {
            // This code runs on all replicas
            console.log('Processing in replicated mode');
            return `Replicated: ${data}`;
        } else {
            // This code might run in local testing
            console.log('Processing in non-replicated mode');
            return `Local: ${data}`;
        }
    }
}
```

The `inReplicatedExecution` function determines whether the current execution is happening in the Internet Computer's replicated environment or in a local/testing context.

**Returns:** `true` if running in replicated execution, `false` otherwise

**Use Cases:**

- Conditional logic for production vs. testing
- Debug logging that only runs locally
- Feature flags based on execution context
- Performance optimizations for different environments

**Important Notes:**

- Returns `true` when running on the Internet Computer
- Returns `false` during local development/testing
- Useful for environment-specific behavior
- Helps distinguish between live and test environments

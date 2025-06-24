# msgMethodName

Get the name of the currently executing method.

```typescript
import { msgMethodName, IDL, update } from 'azle';

export default class {
    private methodCallCount: Map<string, number> = new Map();

    @update([IDL.Text], IDL.Text)
    process(data: string): string {
        const method = msgMethodName();
        const count = (this.methodCallCount.get(method) || 0) + 1;
        this.methodCallCount.set(method, count);

        return `Method ${method} called ${count} times with data: ${data}`;
    }
}
```

The `msgMethodName` function returns the name of the method that was called to invoke the current execution. This is useful for logging, metrics, and debugging.

**Use Cases:**

- Method call tracking and analytics
- Dynamic routing based on method name
- Logging and debugging
- Method-specific processing logic

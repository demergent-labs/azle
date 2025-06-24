# msgArgData

Get the raw Candid-encoded arguments of the current call.

```typescript
import { msgArgData, IDL, update, candidDecode } from 'azle';

export default class {
    @update([], IDL.Text)
    inspectArgs(): string {
        const rawArgs = msgArgData();

        // Decode assuming the call was made with [string, number] args
        const decoded = candidDecode([IDL.Text, IDL.Nat], rawArgs);

        return `Raw args length: ${rawArgs.length}, Decoded: ${JSON.stringify(decoded)}`;
    }
}
```

The `msgArgData` function returns the raw bytes of the arguments passed to the current method call. This is typically used in advanced scenarios where you need to handle method arguments manually.

**Use Cases:**

- Custom argument validation
- Method argument introspection
- Debugging and logging raw call data
- Building generic proxy or forwarding mechanisms

**Important Notes:**

- Returns raw Candid-encoded bytes
- Useful for methods with `{ manual: true }` option
- Must be decoded using `candidDecode` to get typed values

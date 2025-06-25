# msgReject

Reject the current call with an error message.

```typescript
import { msgReject, msgArgData, candidDecode, IDL, update } from 'azle';

export default class {
    @update([IDL.Text], IDL.Empty, { manual: true })
    validateAndProcess(input: string): void {
        if (input.length === 0) {
            msgReject('Input cannot be empty');
            return;
        }

        if (input.length > 100) {
            msgReject('Input too long: maximum 100 characters allowed');
            return;
        }

        // Process normally if validation passes
        const result = `Processed: ${input}`;
        const encoded = candidEncode([IDL.Text], [result]);
        msgReply(encoded);
    }
}
```

The `msgReject` function manually rejects the current method call with an error message. This is used in methods marked with `{ manual: true }`.

**Parameters:**

- `message`: Error message to include in the rejection (`string`)

**Returns:** `void`

**Use Cases:**

- Custom error handling in manual methods
- Input validation with specific error messages
- Conditional rejection based on complex logic
- Advanced error response formatting

**Important Notes:**

- Only use in methods with `{ manual: true }`
- Call this exactly once per method execution
- Cannot be combined with `msgReply`
- Equivalent to throwing an error in regular methods

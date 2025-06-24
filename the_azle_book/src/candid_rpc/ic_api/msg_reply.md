# msgReply

Reply to the current call with raw Candid-encoded data.

```typescript
import { msgReply, candidEncode, IDL, update } from 'azle';

export default class {
    @update([IDL.Text], IDL.Empty, { manual: true })
    manualEcho(input: string): void {
        const encoded = candidEncode([IDL.Text], [input]);
        msgReply(encoded);
    }

    @update([IDL.Nat], IDL.Empty, { manual: true })
    doubleNumber(n: number): void {
        const result = n * 2;
        const encoded = candidEncode([IDL.Nat], [result]);
        msgReply(encoded);
    }
}
```

The `msgReply` function manually sends a reply to the current method call using raw Candid-encoded data. This is used in methods marked with `{ manual: true }`.

**Parameters:**

- `data`: Raw Candid-encoded bytes to send as the reply (`Uint8Array`)

**Returns:** `void`

**Use Cases:**

- Custom response processing
- Streaming responses
- Advanced error handling
- Performance optimization for large responses

**Important Notes:**

- Only use in methods with `{ manual: true }`
- Data must be properly Candid-encoded
- Call this exactly once per method execution
- Cannot be combined with normal return statements

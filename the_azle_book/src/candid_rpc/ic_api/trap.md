# trap

Terminate execution with an error message.

```typescript
import { trap, IDL, update } from 'azle';

export default class {
    @update([IDL.Text], IDL.Text)
    processInput(input: string): string {
        if (input === '') {
            trap('Input cannot be empty');
        }

        if (input.length > 1000) {
            trap('Input too long: maximum 1000 characters allowed');
        }

        return `Processed: ${input}`;
    }
}
```

The `trap` function immediately terminates the current execution with an error message. All state changes made during the current call are rolled back.

**Parameters:**

- `message`: Error message to include in the trap (`string`)

**Returns:** Never returns (execution stops)

**Use Cases:**

- Input validation with immediate failure
- Critical error conditions
- Guard clauses for invalid states
- Security-related assertions

**Important Notes:**

- Stops execution immediately
- Rolls back all state changes from the current call
- Cannot be caught or handled within the same call
- Use judiciously as it terminates the entire call

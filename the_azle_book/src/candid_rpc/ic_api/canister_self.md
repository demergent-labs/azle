# canisterSelf

Get the current canister's principal ID.

```typescript
import { canisterSelf, IDL, query } from 'azle';

export default class {
    @query([], IDL.Principal)
    myId(): Principal {
        return canisterSelf();
    }

    @query([], IDL.Text)
    myIdText(): string {
        return canisterSelf().toText();
    }
}
```

The `canisterSelf` function returns the principal ID of the current canister. This is useful for self-reference in inter-canister calls and logging.

**Returns:** The current canister's principal (`Principal`)

**Use Cases:**

- Self-referencing in inter-canister calls
- Logging and debugging
- Building canister registries
- Identity verification

**Important Notes:**

- Always returns the same value for a given canister
- Available in all method types (@query, @update, etc.)
- Useful for building self-aware canister systems

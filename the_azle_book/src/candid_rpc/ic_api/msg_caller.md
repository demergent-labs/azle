# msgCaller

Get the caller's principal identity.

```typescript
import { msgCaller, IDL, query } from 'azle';

export default class {
    @query([], IDL.Principal)
    whoAmI(): Principal {
        return msgCaller();
    }
}
```

## Access Control

```typescript
import { msgCaller, IDL, update, Principal } from 'azle';

export default class {
    private owner: Principal = Principal.fromText(
        'rdmx6-jaaaa-aaaah-qcaiq-cai'
    );

    @update([IDL.Text], IDL.Text)
    adminFunction(data: string): string {
        const caller = msgCaller();

        if (!caller.compareTo(this.owner)) {
            throw new Error('Access denied: only owner can call this function');
        }

        return `Admin processed: ${data}`;
    }

    @query([], IDL.Bool)
    isOwner(): boolean {
        return msgCaller().compareTo(this.owner);
    }
}
```

The `msgCaller` function returns the principal of the identity that invoked the current method. This is essential for authentication and access control in your canister.

**Important Notes:**

- Returns `Principal.anonymous()` for anonymous calls
- Available in all canister method types (@query, @update, etc.)
- Cannot be called from @heartbeat methods (returns anonymous principal)

# isController

Check if a given principal is a controller of the canister.

```typescript
import { isController, msgCaller, IDL, query, update } from 'azle';

export default class {
    @query([IDL.Principal], IDL.Bool)
    checkController(principal: Principal): boolean {
        return isController(principal);
    }

    @update([IDL.Text], IDL.Text)
    adminOnlyFunction(data: string): string {
        const caller = msgCaller();

        if (!isController(caller)) {
            throw new Error('Access denied: caller is not a controller');
        }

        return `Admin processed: ${data}`;
    }

    @query([], IDL.Bool)
    amIController(): boolean {
        return isController(msgCaller());
    }
}
```

The `isController` function checks whether a given principal is a controller of the current canister. Controllers have administrative privileges and can upgrade the canister.

**Parameters:**

- `principal`: The principal to check (`Principal`)

**Returns:** `true` if the principal is a controller, `false` otherwise

**Use Cases:**

- Implement controller-only functions
- Access control for administrative operations
- Security checks before sensitive operations
- Role-based permissions

**Important Notes:**

- Controllers are set during canister creation or by other controllers
- Controllers can upgrade the canister code
- Use for high-privilege operations only

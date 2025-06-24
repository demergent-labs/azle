# msgRejectMsg

Get the rejection message from a failed inter-canister call.

```typescript
import {
    call,
    msgRejectCode,
    msgRejectMsg,
    IDL,
    update,
    Principal
} from 'azle';

export default class {
    @update(
        [IDL.Principal],
        IDL.Record({
            result: IDL.Opt(IDL.Text),
            error: IDL.Opt(
                IDL.Record({
                    code: IDL.Nat8,
                    message: IDL.Text
                })
            )
        })
    )
    async safeCall(canisterId: Principal): Promise<{
        result: [string] | [];
        error: [{ code: number; message: string }] | [];
    }> {
        try {
            const result = await call<any, string>(canisterId, 'get_data', {
                returnIdlType: IDL.Text
            });

            return {
                result: [result],
                error: []
            };
        } catch (error) {
            const code = msgRejectCode();
            const message = msgRejectMsg();

            return {
                result: [],
                error: [
                    {
                        code,
                        message: `Call failed (${code}): ${message}`
                    }
                ]
            };
        }
    }
}
```

The `msgRejectMsg` function returns the detailed rejection message from the most recent failed inter-canister call. This provides specific information about what went wrong.

**Returns:** Rejection message as `string`

**Use Cases:**

- Detailed error logging and debugging
- User-friendly error reporting
- Error analysis and monitoring
- Building robust error handling systems

**Important Notes:**

- Contains detailed error information from the target canister
- Combined with `msgRejectCode` for complete error context
- Only available in catch blocks after failed inter-canister calls
- Message content varies based on the type of failure

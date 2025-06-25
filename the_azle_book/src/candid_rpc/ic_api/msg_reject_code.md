# msgRejectCode

Get the rejection code from a failed inter-canister call.

```typescript
import { call, msgRejectCode, IDL, update, Principal } from 'azle';

export default class {
    @update(
        [IDL.Principal],
        IDL.Record({
            success: IDL.Bool,
            rejectCode: IDL.Opt(IDL.Nat8),
            message: IDL.Text
        })
    )
    async tryCall(canisterId: Principal): Promise<{
        success: boolean;
        rejectCode: [number] | [];
        message: string;
    }> {
        try {
            await call(canisterId, 'some_method', {});
            return {
                success: true,
                rejectCode: [],
                message: 'Call succeeded'
            };
        } catch (error) {
            const rejectCode = msgRejectCode();
            return {
                success: false,
                rejectCode: [rejectCode],
                message: this.getRejectMessage(rejectCode)
            };
        }
    }

    private getRejectMessage(rejectCode: number): string {
        switch (rejectCode) {
            case 1: // SysFatal
                return 'Error: System fatal error';
            case 2: // SysTransient
                return 'Error: System transient error';
            case 3: // DestinationInvalid
                return 'Error: Invalid destination canister';
            case 4: // CanisterReject
                return 'Error: Canister rejected the call';
            case 5: // CanisterError
                return 'Error: Canister error occurred';
            default:
                return `Error: Unknown rejection code ${rejectCode}`;
        }
    }
}
```

The `msgRejectCode` function returns the rejection code from the most recent failed inter-canister call. Use this in catch blocks to understand why a call failed.

**Returns:** Rejection code as `number`

**Rejection Codes:**

- `1`: SysFatal - Fatal system error
- `2`: SysTransient - Transient system error (may retry)
- `3`: DestinationInvalid - Invalid destination canister
- `4`: CanisterReject - Target canister rejected the call
- `5`: CanisterError - Error occurred in target canister

**Use Cases:**

- Error handling and recovery logic
- Retry mechanisms based on error type
- Logging and debugging failed calls
- User-friendly error messages

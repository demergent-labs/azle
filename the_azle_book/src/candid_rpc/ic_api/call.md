# call

Make calls to other canisters with full type safety.

```typescript
import { call, IDL, update, Principal } from 'azle';

export default class {
    @update([IDL.Principal, IDL.Text], IDL.Text)
    async callOtherCanister(
        canisterId: Principal,
        message: string
    ): Promise<string> {
        const result = await call(canisterId, 'process_message', {
            args: [message],
            paramIdlTypes: [IDL.Text],
            returnIdlType: IDL.Text
        });

        return result;
    }

    @update([IDL.Principal], IDL.Nat)
    async transferCycles(recipient: Principal): Promise<bigint> {
        const cyclesToSend = 1_000_000n;

        await call(recipient, 'receive_cycles', {
            cycles: cyclesToSend
        });

        return cyclesToSend;
    }
}
```

The `call` function makes inter-canister calls with full type safety, automatic serialization/deserialization, and comprehensive error handling.

**Parameters:**

- `canisterId`: Target canister principal (`Principal`)
- `methodName`: Name of the method to call (`string`)
- `options`: Call configuration object

**Options Object:**

- `args?`: Array of arguments to pass
- `paramIdlTypes?`: IDL types for parameters
- `returnIdlType?`: IDL type for return value
- `cycles?`: Cycles to send with the call (`bigint`)

**Returns:** Promise resolving to the method's return value

**Important Notes:**

- Automatically handles Candid serialization/deserialization
- Supports cycle transfers
- Provides comprehensive error handling
- Works with both query and update methods

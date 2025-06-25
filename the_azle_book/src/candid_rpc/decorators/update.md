# @update

Read-write canister method. Can modify state.

- **State**: read-write
- **Replication**: yes
- **Async**: yes
- **Instruction limit**: 40_000_000_000

## Basic Usage

```typescript
import { IDL, update } from 'azle';

export default class {
    counter: number = 0;

    @update([], IDL.Nat)
    increment(): number {
        this.counter += 1;
        return this.counter;
    }

    @update([IDL.Nat], IDL.Nat)
    setCounter(value: number): number {
        this.counter = value;
        return this.counter;
    }
}
```

## Async Operations

```typescript
import { IDL, update, call } from 'azle';

export default class {
    @update([IDL.Text], IDL.Text)
    async processData(data: string): Promise<string> {
        // Async processing
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return `Processed: ${data}`;
    }

    @update([IDL.Principal, IDL.Text], IDL.Text)
    async callOtherCanister(
        canisterId: Principal,
        message: string
    ): Promise<string> {
        const result = await call(canisterId, 'process', {
            args: [message],
            paramIdlTypes: [IDL.Text],
            returnIdlType: IDL.Text
        });
        return result;
    }
}
```

## Options

- `manual`: Manual argument/return handling
- `hidden`: Hide from Candid interface

```typescript
import { IDL, update, msgArgData, msgReply, msgReject } from 'azle';

export default class {
    @update([], IDL.Text, { manual: true })
    manualUpdate(): void {
        try {
            const args = msgArgData();
            // Process manually
            const result = 'Success!';
            msgReply(new TextEncoder().encode(result));
        } catch (error) {
            msgReject(`Error: ${error}`);
        }
    }

    @update([IDL.Text], IDL.Text, { hidden: true })
    hiddenUpdate(secret: string): string {
        return `Hidden processing of: ${secret}`;
    }
}
```

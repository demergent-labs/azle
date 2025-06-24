# @query

Read-only canister method. Cannot modify state.

- **State**: read-only
- **Replication**: possible
- **Async**: yes with `composite` set to true
- **Instruction limit**: 5_000_000_000

## Basic Usage

```typescript
import { IDL, query } from 'azle';

export default class {
    counter: number = 0;

    @query([], IDL.Nat)
    getCounter(): number {
        return this.counter;
    }

    @query([IDL.Text], IDL.Text)
    echo(message: string): string {
        return `Echo: ${message}`;
    }
}
```

## Composite Queries

Enable cross-canister calls within query methods:

```typescript
import { IDL, query, call } from 'azle';

export default class {
    @query([], IDL.Text, { composite: true })
    async crossCanisterQuery(): Promise<string> {
        const result = await call('canister-id', 'method_name', {
            returnIdlType: IDL.Text
        });
        return result;
    }
}
```

## Options

- `composite`: Enable async cross-canister calls
- `manual`: Manual argument/return handling
- `hidden`: Hide from Candid interface

```typescript
import { IDL, query, msgArgData, msgReply } from 'azle';

export default class {
    @query([], IDL.Text, { manual: true })
    manualQuery(): void {
        const args = msgArgData();
        // Process manually
        msgReply(new Uint8Array([1, 2, 3]));
    }

    @query([], IDL.Text, { hidden: true })
    hiddenQuery(): string {
        return 'This method is hidden from Candid interface';
    }
}
```

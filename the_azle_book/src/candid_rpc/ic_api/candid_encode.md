# candidEncode

Encode TypeScript/JavaScript values to Candid format.

```typescript
import { candidEncode, IDL, query } from 'azle';

export default class {
    @query([IDL.Text, IDL.Nat], IDL.Vec(IDL.Nat8))
    encodeValues(text: string, number: number): Uint8Array {
        return candidEncode([IDL.Text, IDL.Nat], [text, number]);
    }

    @query([], IDL.Vec(IDL.Nat8))
    encodeComplexData(): Uint8Array {
        const data = {
            name: 'Alice',
            age: 30,
            active: true
        };

        return candidEncode(
            [
                IDL.Record({
                    name: IDL.Text,
                    age: IDL.Nat,
                    active: IDL.Bool
                })
            ],
            [data]
        );
    }
}
```

The `candidEncode` function encodes TypeScript/JavaScript values into Candid binary format for low-level data manipulation or inter-canister communication.

**Parameters:**

- `idlTypes`: Array of IDL types describing the data structure
- `values`: Array of values to encode

**Returns:** Candid-encoded data as `Uint8Array`

**Use Cases:**

- Manual response handling with `msgReply`
- Custom serialization for storage
- Inter-canister communication with raw data
- Building protocol-level integrations

**Important Notes:**

- Values must match the provided IDL types exactly
- Resulting bytes can be decoded with `candidDecode`
- Used internally by Azle for automatic serialization

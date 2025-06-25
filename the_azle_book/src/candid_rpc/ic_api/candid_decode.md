# candidDecode

Decode Candid binary format to TypeScript/JavaScript values.

```typescript
import { candidDecode, msgArgData, IDL, update } from 'azle';

export default class {
    @update([], IDL.Vec(IDL.Text))
    decodeArguments(): string[] {
        const rawArgs = msgArgData();

        // Decode assuming the call had [string, number, boolean] args
        const decoded = candidDecode([IDL.Text, IDL.Nat, IDL.Bool], rawArgs);

        return decoded.map((arg) => String(arg));
    }

    @update(
        [IDL.Vec(IDL.Nat8)],
        IDL.Record({
            name: IDL.Text,
            age: IDL.Nat,
            active: IDL.Bool
        })
    )
    decodeUserData(encodedData: Uint8Array): {
        name: string;
        age: number;
        active: boolean;
    } {
        const decoded = candidDecode(
            [
                IDL.Record({
                    name: IDL.Text,
                    age: IDL.Nat,
                    active: IDL.Bool
                })
            ],
            encodedData
        );

        return decoded[0] as {
            name: string;
            age: number;
            active: boolean;
        };
    }
}
```

The `candidDecode` function decodes Candid binary format back into TypeScript/JavaScript values for processing raw data.

**Parameters:**

- `idlTypes`: Array of IDL types describing the expected data structure
- `data`: Candid-encoded data as `Uint8Array`

**Returns:** Array of decoded values

**Use Cases:**

- Processing raw argument data with `msgArgData`
- Decoding data from external sources
- Manual handling of inter-canister call responses
- Working with stored Candid-encoded data

**Important Notes:**

- IDL types must match the encoded data structure exactly
- Returns an array even for single values
- Throws an error if decoding fails due to type mismatch

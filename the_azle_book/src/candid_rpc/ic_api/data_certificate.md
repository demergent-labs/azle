# dataCertificate

Get the data certificate for certified queries.

```typescript
import { dataCertificate, certifiedDataSet, IDL, query, update } from 'azle';

export default class {
    private certifiedValue: string = '';

    @update([IDL.Text])
    setCertifiedData(value: string): void {
        this.certifiedValue = value;

        // Set the certified data (up to 32 bytes)
        const encoder = new TextEncoder();
        const data = encoder.encode(value.slice(0, 32));
        certifiedDataSet(data);
    }

    @query(
        [],
        IDL.Record({
            data: IDL.Text,
            certificate: IDL.Opt(IDL.Vec(IDL.Nat8))
        })
    )
    getCertifiedData(): {
        data: string;
        certificate: [Uint8Array] | [];
    } {
        const certificate = dataCertificate();

        return {
            data: this.certifiedValue,
            certificate: certificate ? [certificate] : []
        };
    }
}
```

The `dataCertificate` function returns the data certificate that can be used to verify the authenticity of certified data in query calls.

**Returns:** Certificate as `Uint8Array` or `undefined` if not available

**Use Cases:**

- Verify authenticity of query responses
- Build trusted data verification systems
- Implement certified query responses
- Enable cryptographic proof of data integrity

**Important Notes:**

- Only available in query calls, not update calls
- Requires prior use of `certifiedDataSet`
- Certificate proves data authenticity to external verifiers
- Returns `undefined` if no certificate is available

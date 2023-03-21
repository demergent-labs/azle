# notify raw

This section is a work in progress.

Examples:

-   [notify_raw](https://github.com/demergent-labs/azle/tree/main/examples/notify_raw)

```typescript
import { ic, match, Principal, RejectionCode, $update, Variant } from 'azle';

$update;
export function sendNotification(): Variant<{
    Ok: boolean;
    Err: RejectionCode;
}> {
    const result = ic.notifyRaw(
        Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'),
        'receiveNotification',
        Uint8Array.from(ic.candidEncode('()')),
        0n
    );

    return match(result, {
        Ok: () => ({
            Ok: true
        }),
        Err: (err) => ({
            Err: err
        })
    });
}
```

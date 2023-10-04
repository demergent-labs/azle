# notify raw

This section is a work in progress.

Examples:

-   [notify_raw](https://github.com/demergent-labs/azle/tree/main/examples/notify_raw)

```typescript
import { Canister, ic, Principal, update, Void } from 'azle';

export default Canister({
    sendNotification: update([], Void, () => {
        return ic.notifyRaw(
            Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'),
            'receiveNotification',
            Uint8Array.from(ic.candidEncode('()')),
            0n
        );
    })
});
```

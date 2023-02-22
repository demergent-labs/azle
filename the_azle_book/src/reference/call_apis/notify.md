# notify

This section is a work in progress.

Examples:

-   [cross_canister_calls](https://github.com/demergent-labs/azle/tree/main/examples/cross_canister_calls)
-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
import { Principal, RejectionCode, $update, Variant } from 'azle';
import { Canister2 } from '../canister2/types';

const canister2 = new Canister2(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

$update;
export function send_notification(): Variant<{
    ok: null;
    err: RejectionCode;
}> {
    return canister2.receive_notification('This is the notification').notify();
}
```

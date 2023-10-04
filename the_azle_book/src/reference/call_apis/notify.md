# notify

This section is a work in progress.

Examples:

-   [cross_canister_calls](https://github.com/demergent-labs/azle/tree/main/examples/cross_canister_calls)
-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
import { Canister, ic, update, Void } from 'azle';
import { otherCanister } from './otherCanister';

export default Canister({
    sendNotification: update([], Void, () => {
        return ic.notify(otherCanister.receiveNotification, {
            args: ['This is the notification']
        });
    })
});
```

# reject message

This section is a work in progress.

Examples:

-   [rejections](https://github.com/demergent-labs/azle/tree/main/examples/rejections)

```typescript
import { Canister, ic, text, update } from 'azle';
import { otherCanister } from './other_canister';

export default Canister({
    getRejectionMessage: update([], text, async () => {
        await ic.call(otherCanister.method);
        return ic.rejectMessage();
    })
});
```

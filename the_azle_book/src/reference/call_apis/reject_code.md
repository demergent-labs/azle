# reject code

This section is a work in progress.

Examples:

-   [rejections](https://github.com/demergent-labs/azle/tree/main/examples/rejections)

```typescript
import { Canister, ic, RejectionCode, update } from 'azle';
import { otherCanister } from './other_canister';

export default Canister({
    getRejectionCodeDestinationInvalid: update([], RejectionCode, async () => {
        await ic.call(otherCanister.method);
        return ic.rejectCode();
    })
});
```

# TODO this will be in Azle 0.23.0 or later

# Instruction Limit Chunking

Query and Update calls on ICP have [instruction limits](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits).

The limit can only be increased as a protocol-level change. If after optimizing your code you still cannot stay under the limit, then considering using `ic.chunk()` imported from `azle`.

Awaiting `ic.chunk()` will reset the instruction limit of your call. If you have access to and can change the source code where the instruction limit is being hit, then this may help you to overcome the limit.

Unfortunately libraries or algorithms that cannot have this call inserted easily will be difficult or impossible to keep under the limit.

Here's an example of using `ic.chunk()`:

```typescript
import { Canister, ic, update, Void } from 'azle';

export default Canister({
    huge_limit: update([], Void, async () => {
        for (let i = 0; i < 1_000_000; i++) {
            Math.random();
            await ic.chunk();
        }
    })
});
```

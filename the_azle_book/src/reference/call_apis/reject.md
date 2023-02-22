# reject

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)
-   [manual_reply](https://github.com/demergent-labs/azle/tree/main/examples/manual_reply)
-   [rejections](https://github.com/demergent-labs/azle/tree/main/examples/rejections)

```typescript
import { empty, ic, Manual, $query } from 'azle';

$query;
export function reject(message: string): Manual<empty> {
    ic.reject(message);
}
```

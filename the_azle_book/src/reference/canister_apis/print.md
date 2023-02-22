# print

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)
-   [null_example](https://github.com/demergent-labs/azle/tree/main/examples/null_example)

```typescript
import { ic, $query } from 'azle';

// prints a message through the local replica's output
$query;
export function print(message: string): boolean {
    ic.print(message);

    return true;
}
```

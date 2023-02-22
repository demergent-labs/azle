# reject message

This section is a work in progress.

Examples:

-   [rejections](https://github.com/demergent-labs/azle/tree/main/examples/rejections)

```typescript
import { ic, $update } from 'azle';
import { some_service } from '../some_service';

$update;
export async function get_rejection_message(message: string): Promise<string> {
    await some_service.reject(message).call();
    return ic.reject_message();
}
```

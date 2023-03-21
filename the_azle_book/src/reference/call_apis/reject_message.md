# reject message

This section is a work in progress.

Examples:

-   [rejections](https://github.com/demergent-labs/azle/tree/main/examples/rejections)

```typescript
import { ic, $update } from 'azle';
import { someService } from '../some_service';

$update;
export async function getRejectionMessage(message: string): Promise<string> {
    await someService.reject(message).call();
    return ic.rejectMessage();
}
```

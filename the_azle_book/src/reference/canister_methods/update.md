# update

This section is a work in progress.

```typescript
import { $query, $update } from 'azle';

let message = '';

$query;
export function getMessage(): string {
    return message;
}

$update;
export function setMessage(newMessage: string): void {
    message = newMessage;
}
```

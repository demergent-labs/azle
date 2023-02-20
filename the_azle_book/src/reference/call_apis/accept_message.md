# accept message

Examples:

-   [inspect_message](https://github.com/demergent-labs/azle/blob/main/examples/inspect_message/src/inspect_message.ts)
-   [run_time_errors](https://github.com/demergent-labs/azle/blob/main/examples/run_time_errors/src/index.ts)

```typescript
import { ic, $inspect_message } from 'azle';

$inspect_message;
export function inspect_message() {
    ic.accept_message();
}
```

# inspect message

This section is a work in progress.

Examples:

-   [inspect_message](https://github.com/demergent-labs/azle/tree/main/examples/inspect_message)
-   [run_time_errors](https://github.com/demergent-labs/azle/tree/main/examples/run_time_errors)

```typescript
import { ic, $inspect_message, $update } from 'azle';

$inspect_message;
export function inspect_message() {
    console.log('inspect_message called');

    if (ic.method_name() === 'accessible') {
        ic.accept_message();
        return;
    }

    if (ic.method_name() === 'inaccessible') {
        return;
    }

    throw `Method "${ic.method_name()}" not allowed`;
}

$update;
export function accessible(): boolean {
    return true;
}

$update;
export function inaccessible(): boolean {
    return false;
}

$update;
export function also_inaccessible(): boolean {
    return false;
}
```

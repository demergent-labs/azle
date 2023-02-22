# reply raw

This section is a work in progress.

Examples:

-   [manual_reply](https://github.com/demergent-labs/azle/tree/main/examples/manual_reply)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)

```typescript
import { ic, Manual, $update } from 'azle';

$update;
export function reply_raw(): Manual<
    Record<{
        int: int;
        text: string;
        bool: boolean;
        blob: blob;
        variant: Options;
    }>
> {
    ic.reply_raw(
        ic.candid_encode(
            '(record { "int" = 42; "text" = "text"; "bool" = true; "blob" = blob "Surprise!"; "variant" = variant { Medium } })'
        )
    );
}
```

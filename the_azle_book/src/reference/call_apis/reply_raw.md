# reply raw

This section is a work in progress.

Examples:

-   [manual_reply](https://github.com/demergent-labs/azle/tree/main/examples/manual_reply)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)

```typescript
import { blob, ic, int, Manual, Record, $update, Variant } from 'azle';

type Options = Variant<{
    High: null;
    Medium: null;
    Low: null;
}>;

$update;
export function replyRaw(): Manual<
    Record<{
        int: int;
        text: string;
        bool: boolean;
        blob: blob;
        variant: Options;
    }>
> {
    ic.replyRaw(
        ic.candidEncode(
            '(record { "int" = 42; "text" = "text"; "bool" = true; "blob" = blob "Surprise!"; "variant" = variant { Medium } })'
        )
    );
}
```

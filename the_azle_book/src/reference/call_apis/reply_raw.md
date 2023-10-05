# reply raw

This section is a work in progress.

Examples:

-   [manual_reply](https://github.com/demergent-labs/azle/tree/main/examples/manual_reply)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)

```typescript
import {
    blob,
    bool,
    Canister,
    ic,
    int,
    Manual,
    Null,
    Record,
    text,
    update,
    Variant
} from 'azle';

const Options = Variant({
    High: Null,
    Medium: Null,
    Low: Null
});

export default Canister({
    replyRaw: update(
        [],
        Manual(
            Record({
                int: int,
                text: text,
                bool: bool,
                blob: blob,
                variant: Options
            })
        ),
        () => {
            ic.replyRaw(
                ic.candidEncode(
                    '(record { "int" = 42; "text" = "text"; "bool" = true; "blob" = blob "Surprise!"; "variant" = variant { Medium } })'
                )
            );
        },
        { manual: true }
    )
});
```

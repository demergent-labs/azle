# time

This section is a work in progress.

Examples:

-   [audio_recorder](https://github.com/demergent-labs/azle/tree/main/examples/audio_recorder)
-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)

```typescript
import { ic, nat64, $query } from 'azle';

// returns the current timestamp
$query;
export function time(): nat64 {
    return ic.time();
}
```

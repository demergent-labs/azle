# reject code

This section is a work in progress.

Examples:

-   [rejections](https://github.com/demergent-labs/azle/tree/main/examples/rejections)

```typescript
import {
    CanisterResult,
    ExternalCanister,
    ic,
    Principal,
    RejectionCode,
    update,
    $update
} from 'azle';

class Nonexistent extends ExternalCanister {
    @update
    method: () => CanisterResult<void>;
}

export const nonexistentCanister = new Nonexistent(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

$update;
export async function getRejectionCodeDestinationInvalid(): Promise<RejectionCode> {
    await nonexistentCanister.method().call();
    return ic.rejectCode();
}
```

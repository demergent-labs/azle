# reject code

This section is a work in progress.

Examples:

-   [rejections](https://github.com/demergent-labs/azle/tree/main/examples/rejections)

```typescript
import {
    CallResult,
    ic,
    Principal,
    RejectionCode,
    Service,
    serviceUpdate,
    $update
} from 'azle';

class Nonexistent extends Service {
    @serviceUpdate
    method: () => CallResult<void>;
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

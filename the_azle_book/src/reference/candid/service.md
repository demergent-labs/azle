# service

This section is a work in progress.

JavaScript classes that inherit from the Azle type `Service` correspond to the [Candid service type](https://internetcomputer.org/docs/current/references/candid-ref#type-service-) and will become child classes capable of creating instances that can perform cross-canister calls at runtime.

TypeScript:

```typescript
import {
    CallResult,
    Principal,
    $query,
    Result,
    Service,
    serviceQuery,
    serviceUpdate,
    $update
} from 'azle';

class SomeService extends Service {
    @serviceQuery
    query1: () => CallResult<boolean>;

    @serviceUpdate
    update1: () => CallResult<string>;
}

$query;
export function getService(): SomeService {
    return new SomeService(Principal.fromText('aaaaa-aa'));
}

$update;
export async function callService(
    service: SomeService
): Promise<Result<string, string>> {
    return await service.update1().call();
}
```

Candid:

```
type ManualReply = variant { Ok : text; Err : text };
service : () -> {
  callService : (
      service { query1 : () -> (bool) query; update1 : () -> (text) },
    ) -> (ManualReply);
  getService : () -> (
      service { query1 : () -> (bool) query; update1 : () -> (text) },
    ) query;
}
```

dfx:

```bash
dfx canister call candid_canister getService
(service "aaaaa-aa")
```

# service

JavaScript classes that inherit from the Azle type `Service` correspond to the [Candid service type](https://internetcomputer.org/docs/current/references/candid-ref#type-service-) and will become child classes capable of creating instances that can perform cross-canister calls at runtime.

TypeScript:

```typescript
import { Canister, Principal, bool, ic, query, text, update } from 'azle';

const SomeCanister = Canister({
    query1: query([], bool),
    update1: update([], text)
});

export default Canister({
    getService: query([], SomeCanister, () => {
        return SomeCanister(Principal.fromText('aaaaa-aa'));
    }),
    callService: update([SomeCanister], text, (service) => {
        return ic.call(service.update1);
    })
});
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

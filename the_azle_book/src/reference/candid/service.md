# service

Values created by the `CandidType` function `Canister` correspond to the [Candid service type](https://internetcomputer.org/docs/current/references/candid-ref#type-service-), are inferred to be TypeScript `Object`s, and will be decoded into [JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) at runtime.

The properties of this object that match the keys of the service's `query` and `update` methods can be passed into `ic.call` and `ic.notify` to perform cross-canister calls.

TypeScript or JavaScript:

```typescript
import { bool, Canister, ic, Principal, query, text, update } from 'azle';

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

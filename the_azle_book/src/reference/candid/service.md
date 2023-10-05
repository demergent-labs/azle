# service

Values created by the `CandidType` function `Canister` correspond to the [Candid service type](https://internetcomputer.org/docs/current/references/candid-ref#type-service-), are inferred to be TypeScript `Object`s, and will be decoded into [@dfinity/principal Principals](https://www.npmjs.com/package/@dfinity/principal) at runtime.

These values represent `Principal`s when passed as arguments or return types but can be used for cross-canister calls when passed to call/notify APIs.

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

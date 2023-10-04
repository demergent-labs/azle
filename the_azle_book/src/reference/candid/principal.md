# principal

The Azle type `Principal` corresponds to the [Candid type principal](https://internetcomputer.org/docs/current/references/candid-ref#type-principal) and will become an [@dfinity/principal](https://www.npmjs.com/package/@dfinity/principal) at runtime.

TypeScript:

```typescript
import { Canister, Principal, query } from 'azle';

export default Canister({
    getPrincipal: query([], Principal, () => {
        return Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
    }),
    printPrincipal: query([Principal], Principal, (principal) => {
        console.log(typeof principal);
        return principal;
    })
});
```

Candid:

```
service : () -> {
    getPrincipal : () -> (principal) query;
    printPrincipal : (principal) -> (principal) query;
}
```

dfx:

```bash
dfx canister call candid_canister printPrincipal '(principal "rrkah-fqaaa-aaaaa-aaaaq-cai")'
(principal "rrkah-fqaaa-aaaaa-aaaaq-cai")
```

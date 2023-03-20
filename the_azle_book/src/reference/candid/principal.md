# principal

This section is a work in progress.

The Azle type `Principal` corresponds to the [Candid type principal](https://internetcomputer.org/docs/current/references/candid-ref#type-principal) and will become an [@dfinity/principal](https://www.npmjs.com/package/@dfinity/principal) at runtime.

TypeScript:

```typescript
import { Principal, $query } from 'azle';

$query;
export function getPrincipal(): Principal {
    return Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
}

$query;
export function printPrincipal(principal: Principal): Principal {
    console.log(typeof principal);
    return principal;
}
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

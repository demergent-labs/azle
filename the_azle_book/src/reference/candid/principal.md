# principal

This section is a work in progress.

The Azle type `Principal` corresponds to the [Candid type principal](https://internetcomputer.org/docs/current/references/candid-ref#type-principal) and will become an [@dfinity/principal](https://www.npmjs.com/package/@dfinity/principal) at runtime.

TypeScript:

```typescript
import { Principal, $query } from 'azle';

$query;
export function get_principal(): Principal {
    return Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
}

$query;
export function print_principal(principal: Principal): Principal {
    console.log(typeof principal);
    return principal;
}
```

Candid:

```
service : () -> {
    get_principal : () -> (principal) query;
    print_principal : (principal) -> (principal) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_principal '(principal "rrkah-fqaaa-aaaaa-aaaaq-cai")'
(principal "rrkah-fqaaa-aaaaa-aaaaq-cai")
```

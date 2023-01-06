Updating canister settings to access the management canister:

```bash
dfx canister call aaaaa-aa update_settings '(record { canister_id = principal "rrkah-fqaaa-aaaaa-aaaaq-cai"; settings = record { controllers = opt vec { principal "rrkah-fqaaa-aaaaa-aaaaq-cai"; principal "rwlgt-iiaaa-aaaaa-aaaaa-cai"; }; }; })'
```

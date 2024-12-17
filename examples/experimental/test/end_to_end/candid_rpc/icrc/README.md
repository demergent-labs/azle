# Testing

```bash
cd canisters
git clone https://github.com/dfinity/ICRC-1
cd ICRC-1
rm -rf .git
cd ../..

dfx deploy --argument "($(cat params.did | tr -s '\n' ' '))" icrc --specified-id rrkah-fqaaa-aaaaa-aaaaq-cai

ICRC_PRINCIPAL=rrkah-fqaaa-aaaaa-aaaaq-cai dfx deploy proxy --specified-id r7inp-6aaaa-aaaaa-aaabq-cai

cd canisters/ICRC-1/test

# Change canisters/ICRC-1/test/runner/main.rs identity to let identity = ic_agent::identity::AnonymousIdentity;

# Change canisters/ICRC-1/test/suite/lib.rs test_burn assert_balance(&env, tmp_account, 0).await?; to assert_balance(&env, tmp_account, 10_000).await?;

# cargo run -- -u http://127.0.0.1:8000 -c r7inp-6aaaa-aaaaa-aaabq-cai -s /home/lastmjs/.config/dfx/identity/test/identity.pem

cargo run --bin runner -- -u http://127.0.0.1:8000 -c r7inp-6aaaa-aaaaa-aaabq-cai -s /home/lastmjs/.config/dfx/identity/test_unencrypted/identity.pem
```

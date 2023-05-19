# Testing

```bash
dfx deploy --argument "($(cat params.did | tr -s '\n' ' '))" icrc
ICRC_PRINCIPAL=rrkah-fqaaa-aaaaa-aaaaq-cai dfx deploy proxy

cd canisters
git clone https://github.com/dfinity/ICRC-1
cd ICRC-1
rm -rf .git
cd test

# Change ICRC-1/test/runner/main.rs identity to let identity = ic_agent::identity::AnonymousIdentity;
# Change ICRC-1/test/suite/lib.rs assert_balance(&env, tmp_account, 0).await?; to assert_balance(&env, tmp_account, 10_000).await?;

cargo run -- -u http://127.0.0.1:8000 -c r7inp-6aaaa-aaaaa-aaabq-cai -s /home/lastmjs/.config/dfx/identity/test/identity.pem
```

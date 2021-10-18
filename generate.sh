javascript=`cat canisters/dapp/dapp.js`
rust="
    fn custom_getrandom(_buf: &mut [u8]) -> Result<(), getrandom::Error> { Ok(()) }

    getrandom::register_custom_getrandom!(custom_getrandom);

    #[ic_cdk_macros::query]
    fn execute_js() {
        let mut context = boa::Context::new();

        let value = context.eval(\"
            $javascript
        \").unwrap();

        ic_cdk::println!(\"value: {:#?}\", value);
    }
"

echo $rust > canisters/azle/src/lib.rs

echo $rust
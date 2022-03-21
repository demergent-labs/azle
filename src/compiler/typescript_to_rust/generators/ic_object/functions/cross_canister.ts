// fn ic_test_cross_canister(
//     _this: &boa_engine::JsValue,
//     _aargs: &[boa_engine::JsValue],
//     _context: &mut boa_engine::Context
// ) -> boa_engine::JsResult<boa_engine::JsValue> {
//     // std::thread::sleep(std::time::Duration::new(5,0 ));

//     // TODO what I am considering next is using LocalPool from futures
//     // TODO maybe I can just manually create a local executor and get this all to work

//     // let mut context = boa_engine::Context::new();

//     // let string = futures::executor::block_on(async {
//     //     let call_result: Result<(String,), _> = ic_cdk::api::call::call(
//     //         ic_cdk::export::Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap(),
//     //         "testString",
//     //         ()
//     //     ).await;

//     //     return call_result.unwrap().0;
//     // });

//     // let value = context
//     //     .eval(
//     //         format!(
//     //             "{string}",
//     //             string = serde_json::to_string(&string).unwrap()
//     //         )
//     //     )
//     //     .unwrap();

//     // return Ok(value);

//     // let result = ic_cdk::block_on_with_output(async {
//     //     let call_result: Result<(String,), _> = ic_cdk::api::call::call(
//     //         ic_cdk::export::Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap(),
//     //         "testString",
//     //         ()
//     //     ).await;

//     //     let string = call_result.unwrap().0;

//     //     ic_cdk::println!("string: {}", string);

//     //     return string;
//     // });

//     // ic_cdk::println!("0");

//     // ic_cdk::block_on(async {
//     //     let call_result: Result<(String,), _> = ic_cdk::api::call::call(
//     //         ic_cdk::export::Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap(),
//     //         "testString",
//     //         ()
//     //     ).await;

//     //     let string = call_result.unwrap().0;

//     //     ic_cdk::println!("string: {}", string);

//     //     CROSS_CANISTER_RESULT.with(|cross_canister_result_ref_cell| {
//     //         cross_canister_result_ref_cell.replace("hello".to_string());
//     //         // cross_canister_result_ref_cell.replace(string);
//     //     });
//     // });

//     // ic_cdk::println!("1");

//     // CROSS_CANISTER_RESULT.with(|cross_canister_result_ref_cell| {
//     //     let cross_canister_result = cross_canister_result_ref_cell.borrow();

//     //     ic_cdk::println!("cross_canister_result: {:#?}", cross_canister_result);
//     // });

//     // ic_cdk::println!("2");

//     // ic_cdk::println!("result: {:#?}", result);

//     // let simple_cross_canister_future: std::future::Future<Output = Result<(String,), _>> = ic_cdk::api::call::call(
//     //     ic_cdk::export::Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap(),
//     //     "testString",
//     //     ()
//     // );

//     // let cross_canister_future = async {
//     //     let call_result: Result<(String,), _> = ic_cdk::api::call::call(
//     //         ic_cdk::export::Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap(),
//     //         "testString",
//     //         ()
//     //     ).await;

//     //     let string = call_result.unwrap().0;

//     //     ic_cdk::println!("string: {}", string);

//     //     return string;
//     // };

//     // let simple_future = async {
//     //     String::from("It worked")
//     // };

//     // let mut pool = futures::executor::LocalPool::new();
//     // let spawner = pool.spawner();

//     // spawner.spawn_local_obj(Box::new(future));

//     // let result = pool.run_until(future);

//     // let result = futures::executor::block_on(cross_canister_future);

//     // let result = wasm_rs_async_executor::single_threaded::block_on(cross_canister_future);
//     // let result = wasm_rs_async_executor::single_threaded::block_on(simple_future);

//     // ic_cdk::println!("result: {:#?}", result);

//     return Ok(boa_engine::JsValue::Undefined);
// }
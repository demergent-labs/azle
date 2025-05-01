use ic_cdk::spawn;

use crate::{INTER_CANISTER_CALL_FUTURES, InterCanisterCallFuture};

pub fn drain_inter_canister_futures() {
    // TODO make sure to add a length check to our tests
    // TODO for the global queue
    let inter_canister_call_futures: Vec<InterCanisterCallFuture> = INTER_CANISTER_CALL_FUTURES
        .with(|inter_canister_call_futures_ref_cell| {
            inter_canister_call_futures_ref_cell
                .borrow_mut()
                .drain(..)
                .collect()
        });

    for inter_canister_call_future in inter_canister_call_futures {
        spawn(inter_canister_call_future);
    }
}

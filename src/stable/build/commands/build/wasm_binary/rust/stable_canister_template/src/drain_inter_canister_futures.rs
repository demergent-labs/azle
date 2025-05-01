use ic_cdk::spawn;

use crate::INTER_CANISTER_CALL_QUEUE;

pub fn drain_inter_canister_futures() {
    // INTER_CANISTER_CALL_QUEUE.with(|queue| {
    //     let mut queued = std::mem::take(&mut *queue.borrow_mut());

    //     ic_cdk::println!("queued length: {}", queued.len());

    //     for fut in queued.drain(..) {
    //         ic_cdk::println!("about to run spawn");

    //         spawn(fut);

    //         ic_cdk::println!("spawn executed");
    //     }
    // });

    // TODO is the outer loop necessary?
    // TODO make this as simple as possible
    // TODO I think that we only need one
    // TODO at the end of every call here in execute_method_js
    // TODO and after every inter-canister callback
    // TODO make sure to add a length check to our tests
    // TODO for the global queue
    loop {
        let batch: Vec<_> = INTER_CANISTER_CALL_QUEUE.with(|q| q.borrow_mut().drain(..).collect());

        if batch.is_empty() {
            break;
        }

        for fut in batch {
            spawn(fut);
        }
    }
}

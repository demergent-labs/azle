use crate::{PeriodicBatch, PERIODIC_BATCHES};

// TODO add authentication?
// TODO or maybe we make these open by default?
// TODO and then turned off in the consumer config?
// TODO what happens if the kill switch is turned on?
#[ic_cdk_macros::query]
pub fn _azle_open_value_sharing_last_periodic_batch() -> Option<PeriodicBatch> {
    PERIODIC_BATCHES.with(|periodic_batches| {
        periodic_batches
            .borrow()
            .last_key_value()
            .map(|(_, &ref last_value)| last_value.clone())
    })
}

#[ic_cdk_macros::query]
pub fn _azle_open_value_sharing_all_periodic_batches() -> Vec<PeriodicBatch> {
    PERIODIC_BATCHES.with(|periodic_batches| periodic_batches.borrow().values().cloned().collect())
}

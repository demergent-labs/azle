use cdk_framework::act::node::candid::Opt;

use super::AzleTypeRef;

impl AzleTypeRef<'_> {
    pub fn to_option(&self) -> Opt {
        let enclosed_act_data_type = self.get_enclosed_azle_type().to_data_type();
        Opt {
            enclosed_type: Box::from(enclosed_act_data_type),
        }
    }
}

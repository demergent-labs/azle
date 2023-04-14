use cdk_framework::act::node::candid::Array;

use crate::ts_ast::azle_type::AzleTypeRef;

impl AzleTypeRef<'_> {
    pub fn to_vec(&self) -> Array {
        let enclosed_act_data_type = self.get_enclosed_azle_type().to_candid_type();
        Array {
            enclosed_type: Box::from(enclosed_act_data_type),
        }
    }
}

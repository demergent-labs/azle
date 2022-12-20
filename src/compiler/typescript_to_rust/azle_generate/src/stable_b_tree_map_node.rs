use cdk_framework::ActDataType;

#[derive(Clone, Debug)]
pub struct StableBTreeMapNode {
    pub memory_id: u8,
    pub key_type: ActDataType,
    pub value_type: ActDataType,
    pub max_key_size: u32,
    pub max_value_size: u32,
}

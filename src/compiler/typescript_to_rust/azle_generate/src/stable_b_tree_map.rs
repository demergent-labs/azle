#[derive(Clone)]
pub struct StableBTreeMap {
    pub id: String,
    pub key_type: String,
    pub max_key_size: u64,
    pub value_type: String,
    pub max_value_size: u64,
}

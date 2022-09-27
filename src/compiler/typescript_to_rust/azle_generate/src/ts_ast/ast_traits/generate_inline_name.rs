use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

pub trait GenerateInlineName
where
    Self: Hash,
{
    fn generate_inline_name(&self) -> String;
    fn calculate_hash(&self) -> String {
        let mut s = DefaultHasher::new();
        self.hash(&mut s);
        format!("{}", s.finish()).to_string()
    }
}

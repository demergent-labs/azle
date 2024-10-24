use std::{cell::RefCell, collections::BTreeMap};

use ic_stable_structures::{storable::Bound, StableBTreeMap, Storable};

use crate::Memory;

#[allow(unused)]
type AzleStableBTreeMap = StableBTreeMap<AzleStableBTreeMapKey, AzleStableBTreeMapValue, Memory>;

thread_local! {
    pub static STABLE_B_TREE_MAPS: RefCell<BTreeMap<u8, AzleStableBTreeMap>> = RefCell::new(BTreeMap::new());
}

#[derive(Ord, PartialOrd, Eq, PartialEq, Clone)]
pub struct AzleStableBTreeMapKey {
    pub bytes: Vec<u8>,
}

impl Storable for AzleStableBTreeMapKey {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        std::borrow::Cow::Borrowed(&self.bytes)
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        AzleStableBTreeMapKey {
            bytes: bytes.to_vec(),
        }
    }

    const BOUND: Bound = Bound::Unbounded;
}

#[derive(Ord, PartialOrd, Eq, PartialEq, Clone)]
pub struct AzleStableBTreeMapValue {
    pub bytes: Vec<u8>,
}

impl Storable for AzleStableBTreeMapValue {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        std::borrow::Cow::Borrowed(&self.bytes)
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        AzleStableBTreeMapValue {
            bytes: bytes.to_vec(),
        }
    }

    const BOUND: Bound = Bound::Unbounded;
}

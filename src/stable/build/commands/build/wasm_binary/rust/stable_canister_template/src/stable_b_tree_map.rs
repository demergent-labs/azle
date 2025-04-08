use std::{borrow::Cow, cell::RefCell, collections::BTreeMap};

use ic_stable_structures::{storable::Bound, StableBTreeMap, Storable};
use rquickjs::{Ctx, Result};

use crate::{ic::throw_error, Memory};

#[allow(unused)]
pub type AzleStableBTreeMap =
    StableBTreeMap<AzleStableBTreeMapKey, AzleStableBTreeMapValue, Memory>;

thread_local! {
    pub static STABLE_B_TREE_MAPS: RefCell<BTreeMap<u8, AzleStableBTreeMap>> = RefCell::new(BTreeMap::new());
}

#[derive(Ord, PartialOrd, Eq, PartialEq, Clone)]
pub struct AzleStableBTreeMapKey {
    pub bytes: Vec<u8>,
}

impl Storable for AzleStableBTreeMapKey {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Borrowed(&self.bytes)
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
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
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Borrowed(&self.bytes)
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        AzleStableBTreeMapValue {
            bytes: bytes.to_vec(),
        }
    }

    const BOUND: Bound = Bound::Unbounded;
}

pub fn with_stable_b_tree_map<F, R>(ctx: Ctx, memory_id: u8, f: F) -> Result<R>
where
    F: FnOnce(&AzleStableBTreeMap) -> R,
{
    STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
        let stable_b_tree_maps = stable_b_tree_maps.borrow();

        let stable_b_tree_map = stable_b_tree_maps.get(&memory_id).ok_or(throw_error(
            ctx,
            &format!("Could not find StableBTreeMap with memory id {memory_id}"),
        ))?;

        Ok(f(stable_b_tree_map))
    })
}

pub fn with_stable_b_tree_map_mut<F, R>(ctx: Ctx, memory_id: u8, f: F) -> Result<R>
where
    F: FnOnce(&mut AzleStableBTreeMap) -> R,
{
    STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
        let mut stable_b_tree_maps = stable_b_tree_maps.borrow_mut();

        let stable_b_tree_map = stable_b_tree_maps.get_mut(&memory_id).ok_or(throw_error(
            ctx,
            &format!("Could not find StableBTreeMap with memory id {memory_id}"),
        ))?;

        Ok(f(stable_b_tree_map))
    })
}

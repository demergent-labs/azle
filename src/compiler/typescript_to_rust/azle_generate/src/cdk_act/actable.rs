use super::ActNode;

pub trait Actable {
    fn to_act_node(&self) -> ActNode;
}

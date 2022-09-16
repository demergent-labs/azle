use super::ActNode;

pub trait Actable {
    fn to_act(&self) -> ActNode;
}

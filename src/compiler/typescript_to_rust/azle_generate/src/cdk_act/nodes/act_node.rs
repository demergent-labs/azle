use super::{ActCanisterMethod, ActDataType};

#[derive(Clone, Debug)]
pub enum ActNode {
    DataType(ActDataType),
    CanisterMethod(ActCanisterMethod),
}

#[derive(Clone, Debug)]
pub enum ActNodeError {
    NotDataType,
}

impl ActNode {
    pub fn as_data_type(&self) -> Result<ActDataType, ActNodeError> {
        match self {
            ActNode::DataType(data_type) => Ok(data_type.clone()),
            _ => Err(ActNodeError::NotDataType),
        }
    }
}

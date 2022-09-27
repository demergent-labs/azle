use super::{ActCanisterMethod, ActDataTypeNode};

#[derive(Clone, Debug)]
pub enum ActNode {
    DataType(ActDataTypeNode),
    CanisterMethod(ActCanisterMethod),
}

#[derive(Clone, Debug)]
pub enum ActNodeError {
    NotDataType,
}

impl ActNode {
    pub fn as_data_type(&self) -> Result<ActDataTypeNode, ActNodeError> {
        match self {
            ActNode::DataType(data_type) => Ok(data_type.clone()),
            _ => Err(ActNodeError::NotDataType),
        }
    }
}

use std::collections::HashMap;

use serde::{Deserialize, Serialize};

pub type Filename = String;
pub type SymbolTables = HashMap<Filename, SymbolTable>;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct SymbolTable {
    pub alias: Vec<String>,
    pub blob: Vec<String>,
    pub bool: Vec<String>,
    pub call_result: Vec<String>,
    pub empty: Vec<String>,
    pub float32: Vec<String>,
    pub float64: Vec<String>,
    pub func: Vec<String>,
    pub guard_result: Vec<String>,
    pub heartbeat_decorator: Vec<String>,
    pub init_decorator: Vec<String>,
    pub inspect_message_decorator: Vec<String>,
    pub int: Vec<String>,
    pub int8: Vec<String>,
    pub int16: Vec<String>,
    pub int32: Vec<String>,
    pub int64: Vec<String>,
    pub manual: Vec<String>,
    pub nat: Vec<String>,
    pub nat8: Vec<String>,
    pub nat16: Vec<String>,
    pub nat32: Vec<String>,
    pub nat64: Vec<String>,
    pub null: Vec<String>,
    pub opt: Vec<String>,
    pub oneway_mode: Vec<String>,
    pub post_upgrade_decorator: Vec<String>,
    pub pre_upgrade_decorator: Vec<String>,
    pub principal: Vec<String>,
    pub query_decorator: Vec<String>,
    pub query_mode: Vec<String>,
    pub record: Vec<String>,
    pub reserved: Vec<String>,
    pub service: Vec<String>,
    pub service_query_decorator: Vec<String>,
    pub service_update_decorator: Vec<String>,
    pub stable_b_tree_map: Vec<String>,
    pub text: Vec<String>,
    pub tuple: Vec<String>,
    pub update_decorator: Vec<String>,
    pub update_mode: Vec<String>,
    pub variant: Vec<String>,
    pub vec: Vec<String>,
    pub void: Vec<String>,
}

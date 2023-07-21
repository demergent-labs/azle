use std::collections::HashMap;

use serde::{Deserialize, Serialize};

pub type Filename = String;
pub type AliasTables = HashMap<Filename, AliasTable>;

pub type AliasLists = HashMap<Filename, Vec<String>>;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct AliasTable {
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

impl AliasTable {
    // We want thing that would show up as type aliases. That means we need to
    // look at the alias name and if it maps to something that can't become an
    // alias then it's not aliasable.
    // For example:
    // export type MyRecord = azle.Record<{}>;
    // should parsed as a record and not a type alias. azle.Record should be in
    // self.record so self.record is included in this list so that if
    // azle.Record is searched for we will find it and return false (azle.Record is not aliasable)
    // On the otherhand:
    // export type MyBoolVec = azle.Vec<boolean>;
    // should be parsed as a type alias.
    // You will notice that self.vec is not included in this list.
    // In fact you will notice that the only things not on this list are Vec and Opt
    pub fn is_aliasable(&self, alias: &String) -> bool {
        ![
            &self.alias,
            &self.blob,
            &self.bool,
            &self.call_result,
            &self.empty,
            &self.float32,
            &self.float64,
            &self.func,
            &self.guard_result,
            &self.heartbeat_decorator,
            &self.init_decorator,
            &self.inspect_message_decorator,
            &self.init_decorator,
            &self.inspect_message_decorator,
            &self.int,
            &self.int8,
            &self.int16,
            &self.int32,
            &self.int64,
            &self.manual,
            &self.nat,
            &self.nat8,
            &self.nat16,
            &self.nat32,
            &self.nat64,
            &self.null,
            &self.oneway_mode,
            &self.post_upgrade_decorator,
            &self.pre_upgrade_decorator,
            &self.principal,
            &self.query_decorator,
            &self.query_mode,
            &self.record,
            &self.reserved,
            &self.service,
            &self.service_query_decorator,
            &self.service_update_decorator,
            &self.stable_b_tree_map,
            &self.text,
            &self.tuple,
            &self.update_decorator,
            &self.update_mode,
            &self.variant,
            &self.void,
        ]
        .iter()
        .any(|list| list.contains(alias))
    }
    pub fn search(&self, alias: &String) -> bool {
        [
            &self.alias,
            &self.blob,
            &self.bool,
            &self.call_result,
            &self.empty,
            &self.float32,
            &self.float64,
            &self.func,
            &self.guard_result,
            &self.heartbeat_decorator,
            &self.init_decorator,
            &self.inspect_message_decorator,
            &self.init_decorator,
            &self.inspect_message_decorator,
            &self.int,
            &self.int8,
            &self.int16,
            &self.int32,
            &self.int64,
            &self.manual,
            &self.nat,
            &self.nat8,
            &self.nat16,
            &self.nat32,
            &self.nat64,
            &self.null,
            &self.opt,
            &self.oneway_mode,
            &self.post_upgrade_decorator,
            &self.pre_upgrade_decorator,
            &self.principal,
            &self.query_decorator,
            &self.query_mode,
            &self.record,
            &self.reserved,
            &self.service,
            &self.service_query_decorator,
            &self.service_update_decorator,
            &self.stable_b_tree_map,
            &self.text,
            &self.tuple,
            &self.update_decorator,
            &self.update_mode,
            &self.variant,
            &self.vec,
            &self.void,
        ]
        .iter()
        .any(|list| list.contains(alias))
    }
}

use cdk_framework::CanisterMethodType;

pub const CANISTER_METHOD_ANNOTATIONS: [&str; 7] = [
    "$heartbeat",
    "$init",
    "$inspect_message",
    "$post_upgrade",
    "$pre_upgrade",
    "$query",
    "$update",
];

#[derive(Clone)]
pub struct CanisterMethodAnnotation {
    pub kind: CanisterMethodType,
    // guard: String,
}

impl CanisterMethodAnnotation {
    pub fn from_str(name: &str) -> Option<Self> {
        match name {
            "$heartbeat" => Some(Self {
                kind: CanisterMethodType::Heartbeat,
            }),
            "$init" => Some(Self {
                kind: CanisterMethodType::Init,
            }),
            "$inspect_message" => Some(Self {
                kind: CanisterMethodType::InspectMessage,
            }),
            "$post_upgrade" => Some(Self {
                kind: CanisterMethodType::PostUpgrade,
            }),
            "$pre_upgrade" => Some(Self {
                kind: CanisterMethodType::PreUpgrade,
            }),
            "$query" => Some(Self {
                kind: CanisterMethodType::Query,
            }),
            "$update" => Some(Self {
                kind: CanisterMethodType::Update,
            }),
            _ => None,
        }
    }
}

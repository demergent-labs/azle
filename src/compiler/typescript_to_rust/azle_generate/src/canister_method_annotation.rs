use std::fmt::Display;

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
pub enum Kind {
    Heartbeat,
    Init,
    InspectMessage,
    PostUpgrade,
    PreUpgrade,
    Query,
    Update,
}

impl Display for Kind {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Kind::Heartbeat => write!(f, "heartbeat"),
            Kind::Init => write!(f, "init"),
            Kind::InspectMessage => write!(f, "inspect_message"),
            Kind::PostUpgrade => write!(f, "post_upgrade"),
            Kind::PreUpgrade => write!(f, "pre_upgrade"),
            Kind::Query => write!(f, "query"),
            Kind::Update => write!(f, "update"),
        }
    }
}

#[derive(Clone)]
pub struct CanisterMethodAnnotation {
    pub kind: Kind,
    // guard: String,
}

impl CanisterMethodAnnotation {
    pub fn from_str(name: &str) -> Option<Self> {
        match name {
            "$heartbeat" => Some(Self {
                kind: Kind::Heartbeat,
            }),
            "$init" => Some(Self { kind: Kind::Init }),
            "$inspect_message" => Some(Self {
                kind: Kind::InspectMessage,
            }),
            "$post_upgrade" => Some(Self {
                kind: Kind::PostUpgrade,
            }),
            "$pre_upgrade" => Some(Self {
                kind: Kind::PreUpgrade,
            }),
            "$query" => Some(Self { kind: Kind::Query }),
            "$update" => Some(Self { kind: Kind::Update }),
            _ => None,
        }
    }
}

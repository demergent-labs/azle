mod method_body;
pub mod query;
pub mod update;

pub mod async_result_handler;
pub mod functions;
pub mod system {
    pub mod heartbeat;
    pub mod init;
    pub mod inspect_message;
    pub mod post_upgrade;
    pub mod pre_upgrade;
}

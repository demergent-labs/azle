#[derive(Debug)]
pub enum AzleError {
    Init(Box<dyn std::error::Error>),
    PostUpgrade(Box<dyn std::error::Error>),
    MethodExecution(Box<dyn std::error::Error>),
    QuickJSContextNotInitialized,
    QuickJSCallbackExecutionFailed(Box<dyn std::error::Error>),
    WasmDataVecToString(Box<dyn std::error::Error>),
    WasmDataStringToStruct(Box<dyn std::error::Error>),
}

impl std::fmt::Display for AzleError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            AzleError::QuickJSContextNotInitialized => {
                write!(f, "QuickJS context not initialized")
            }
            AzleError::QuickJSCallbackExecutionFailed(error) => {
                write!(f, "QuickJS callback execution failed: {}", error)
            }
            AzleError::MethodExecution(error) => {
                write!(f, "Azle MethodExecutionError: {}", error)
            }
            AzleError::Init(error) => write!(f, "Azle InitError: {}", error),
            AzleError::PostUpgrade(error) => write!(f, "Azle PostUpgradeError: {}", error),
            AzleError::WasmDataVecToString(error) => {
                write!(
                    f,
                    "WasmData conversion failed while converting Vec<u8> to String: {}",
                    error
                )
            }
            AzleError::WasmDataStringToStruct(error) => {
                write!(
                    f,
                    "WasmData conversion failed while converting String to WasmData Struct: {}",
                    error
                )
            }
        }
    }
}

impl std::error::Error for AzleError {}

#[derive(Clone, Debug)]
pub enum ParseError {
    InvalidMethodType,
    InvalidModuleItem,
    InvalidCallee,
    InvalidExpression,
    TooManyArguments,
    MissingOptionsObject,
    InvalidSpreadUsage,
    TypeError,
    TooManyProperties,
    InvalidPropertyType,
    InvalidGuardKey,
    InvalidGuardValue,
}

impl ParseError {
    pub fn error_message(&self) -> String {
        let str = match self {
            Self::InvalidMethodType => "Invalid method type. Expected one of [$heartbeat, $init, $inspect_message, $post_upgrade, $query, $update].",
            Self::InvalidModuleItem => "Invalid module item. Expected an identifier or call expression.",
            Self::InvalidCallee => "Invalid callee. Callee cannot be from super or import.",
            Self::InvalidExpression => "Invalid expression. Expected an identifier.",
            Self::TooManyArguments => "Invalid arguments. Expected only one argument.",
            Self::MissingOptionsObject => "Missing options object. Either pass an options object or remove the invocation parens",
            Self::InvalidSpreadUsage => "Spread operation is unsupported in canister method annotations at this time.",
            Self::TypeError => "TypeError. Expected options to be an object literal.",
            Self::TooManyProperties => "Invalid properties. Expected only one property.",
            Self::InvalidPropertyType => "Invalid property type. Expected a key value pair. Shorthand, Assign, Getter, Setter, and Method are unsupported.",
            Self::InvalidGuardKey => "Invalid property key. Expected guard option to be provided as an identifier or string literal",
            Self::InvalidGuardValue => "Invalid guard value. Guard must be an identifier literal referring to a guard function",
        };
        str.to_string()
    }
}

/// Indicates a branch of logic that should be unreachable because other checks
/// should have caught this case before.
///
/// Unlike `unreachable!` however, this does not panic, but rather returns an
/// error.
///
/// Expands to:
/// ```rust
/// return Err(Error::InternalError(InternalError {}))
/// ```
#[macro_export]
macro_rules! internal_error {
    () => {
        return Err(crate::Error::InternalError(
            crate::errors::InternalError::new(),
        ))
    };
}

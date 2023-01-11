pub trait ToU8 {
    fn to_u8(&self) -> Result<u8, String>;
}

pub trait ToU32 {
    fn to_u32(&self) -> Result<u32, String>;
}

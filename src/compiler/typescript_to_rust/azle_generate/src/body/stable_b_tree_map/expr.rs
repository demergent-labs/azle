use swc_ecma_ast::{Expr, Lit};

pub trait ToU8 {
    fn to_u8(&self) -> Result<u8, String>;
}

pub trait ToU32 {
    fn to_u32(&self) -> Result<u32, String>;
}

impl ToU8 for Expr {
    fn to_u8(&self) -> Result<u8, String> {
        let error_message = format!("Unable to convert Expr to u8");
        match self {
            Expr::Lit(lit) => match lit {
                Lit::Num(num) => {
                    if num.value.fract() != 0.0
                        || num.value > u8::MAX as f64
                        || num.value < u8::MIN as f64
                    {
                        return Err(error_message);
                    }

                    Ok(num.value as u8)
                }
                _ => return Err(error_message),
            },
            _ => return Err(error_message),
        }
    }
}

impl ToU32 for Expr {
    fn to_u32(&self) -> Result<u32, String> {
        let error_message = format!("Unable to convert Expr to u32");
        match self {
            Expr::Lit(lit) => match lit {
                Lit::Num(num) => {
                    if num.value.fract() != 0.0
                        || num.value > u32::MAX as f64
                        || num.value < u32::MIN as f64
                    {
                        return Err(error_message);
                    }

                    Ok(num.value as u32)
                }
                _ => return Err(error_message),
            },
            _ => return Err(error_message),
        }
    }
}

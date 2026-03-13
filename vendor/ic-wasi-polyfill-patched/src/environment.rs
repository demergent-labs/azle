use crate::wasi;

pub struct Environment {
    data_size: usize,
    data_values: Vec<String>,
}

impl Environment {
    // create new state containing environment
    pub fn new() -> Environment {
        Environment {
            data_size: 0,
            data_values: Vec::new(),
        }
    }

    // Return the number of environment entries and the total buffer size containing all the environment pairs, compatible with the WASI function signature.
    pub fn environ_sizes_get(&self) -> (usize, usize) {
        (self.data_values.len(), self.data_size)
    }

    // Fill up the memory with the environment variable pairs. The function is compatible with the corresponding WASI function signature.
    // entries   -   reference to the table of pointers to the buffer parts containing C-style strings in the format: name=value.
    //               It must have enough memory to fit in all the pointers.
    //
    // buffer    -   The buffer containing all the pairs. The buffer must have enough memory to fit in all the (name,value) pairs.
    pub unsafe fn environ_get(&self, entries: *mut *mut u8, buffer: *mut u8) -> wasi::Errno {
        unsafe {
            let entries = std::slice::from_raw_parts_mut(entries, self.data_values.len());
            let buffer = std::slice::from_raw_parts_mut(buffer, self.data_size);

            let mut cursor = 0;

            for (index, elem) in self.data_values.iter().enumerate() {
                let bytes = elem.as_bytes();
                let len = bytes.len();

                buffer[cursor..(cursor + len)].copy_from_slice(bytes);

                let pointer = buffer[cursor..(cursor + len)].as_mut_ptr();

                entries[index] = pointer;

                cursor += len;
            }

            wasi::ERRNO_SUCCESS
        }
    }

    #[cfg(feature = "report_wasi_calls")]
    pub fn get_data_values(&self) -> Vec<String> {
        self.data_values.clone()
    }

    // Sets the environment state to the list of pairs.
    pub fn set_environment(&mut self, pairs: &[(&str, &str)]) {
        self.data_values.clear();
        self.data_size = 0;

        for pair in pairs.iter() {
            let name = pair.0;
            let value = pair.1;

            let stored_pair = format!("{name}={value}\0");
            self.data_size += stored_pair.len();
            self.data_values.push(stored_pair);
        }
    }
}

impl Default for Environment {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use crate::wasi;

    use super::Environment;
    use std::{ffi::CStr, ptr};

    #[test]
    fn basic_environment() {
        let mut env = Environment::new();
        let env_values = [("A", "1"), ("B", "2"), ("C", "3")];
        env.set_environment(&env_values);

        let env = env;

        let (elements, size) = env.environ_sizes_get();
        assert_eq!(elements, 3);
        assert_eq!(size, 12);

        let mut buffer = vec![0u8; size];
        let mut entries: Vec<*mut u8> = vec![ptr::null_mut(); elements];

        let error_no = unsafe { env.environ_get(entries.as_mut_ptr(), buffer.as_mut_ptr()) };

        assert_eq!(error_no, wasi::ERRNO_SUCCESS);

        let expected_buffer = "A=1\0B=2\0C=3\0".as_bytes();

        assert_eq!(buffer, expected_buffer);

        assert_eq!(
            unsafe { CStr::from_ptr(entries[0] as *const i8) }
                .to_str()
                .unwrap()
                .to_owned(),
            "A=1"
        );
        assert_eq!(
            unsafe { CStr::from_ptr(entries[1] as *const i8) }
                .to_str()
                .unwrap()
                .to_owned(),
            "B=2"
        );
        assert_eq!(
            unsafe { CStr::from_ptr(entries[2] as *const i8) }
                .to_str()
                .unwrap()
                .to_owned(),
            "C=3"
        );
    }

    #[test]
    fn empty_environment() {
        let mut env = Environment::new();
        env.set_environment(&[]);
        let env = env;

        let (elements, size) = env.environ_sizes_get();
        assert_eq!(elements, 0);
        assert_eq!(size, 0);
    }

    #[test]
    fn environment_reset() {
        let mut env = Environment::new();

        env.set_environment(&[("A", "1"), ("B", "2"), ("C", "3")]);

        let env_values = [];
        env.set_environment(&env_values);
        let env = env;

        let (elements, size) = env.environ_sizes_get();
        assert_eq!(elements, 0);
        assert_eq!(size, 0);
    }

    #[test]
    fn default_environment_empty() {
        let env = Environment::new();

        let (elements, size) = env.environ_sizes_get();
        assert_eq!(elements, 0);
        assert_eq!(size, 0);
    }

    #[test]
    fn environment_set_to_a_new_value() {
        let mut env = Environment::new();

        let env_values = [
            ("A", "1"),
            ("B", "2"),
            ("C", "3"),
            ("PATH", "/home/user/bin"),
            ("UID", "1013"),
        ];
        env.set_environment(&env_values);

        let (elements, size) = env.environ_sizes_get();
        assert_eq!(elements, 5);
        assert_eq!(size, 41);

        let env_values = [("PATH", "/home/user/bin"), ("UID", "1023")];
        env.set_environment(&env_values);

        let env = env;

        let (elements, size) = env.environ_sizes_get();
        assert_eq!(elements, 2);
        assert_eq!(size, 29);

        let mut buffer = vec![0u8; size];
        let mut entries: Vec<*mut u8> = vec![ptr::null_mut(); elements];

        let error_no = unsafe { env.environ_get(entries.as_mut_ptr(), buffer.as_mut_ptr()) };

        assert_eq!(error_no, wasi::ERRNO_SUCCESS);

        let expected_buffer = "PATH=/home/user/bin\0UID=1023\0".as_bytes();

        assert_eq!(buffer, expected_buffer);

        assert_eq!(
            unsafe { CStr::from_ptr(entries[0] as *const i8) }
                .to_str()
                .unwrap()
                .to_owned(),
            "PATH=/home/user/bin"
        );
        assert_eq!(
            unsafe { CStr::from_ptr(entries[1] as *const i8) }
                .to_str()
                .unwrap()
                .to_owned(),
            "UID=1023"
        );
    }
}

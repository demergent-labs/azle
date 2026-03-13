#![allow(dead_code)]

use ic_wasi_polyfill::wasi;

use ic_wasi_polyfill::wasi::Fd;
use ic_wasi_polyfill::wasi_helpers::DIRENT_SIZE;
use ic_wasi_polyfill::*;

pub mod libc {
    use ic_wasi_polyfill::wasi::Fd;

    pub const STDIN_FILENO: Fd = 0;
    pub const STDOUT_FILENO: Fd = 1;
    pub const STDERR_FILENO: Fd = 2;
}

pub const DEFAULT_RIGHTS: u64 = wasi::RIGHTS_FD_READ
    | wasi::RIGHTS_FD_SEEK
    | wasi::RIGHTS_FD_FDSTAT_SET_FLAGS
    | wasi::RIGHTS_FD_SYNC
    | wasi::RIGHTS_FD_TELL
    | wasi::RIGHTS_FD_WRITE
    | wasi::RIGHTS_FD_ADVISE
    | wasi::RIGHTS_FD_ALLOCATE
    | wasi::RIGHTS_PATH_OPEN
    | wasi::RIGHTS_PATH_FILESTAT_GET
    | wasi::RIGHTS_PATH_FILESTAT_SET_SIZE
    | wasi::RIGHTS_PATH_FILESTAT_SET_TIMES
    | wasi::RIGHTS_FD_FILESTAT_GET
    | wasi::RIGHTS_FD_FILESTAT_SET_SIZE
    | wasi::RIGHTS_FD_FILESTAT_SET_TIMES
    | wasi::RIGHTS_PATH_UNLINK_FILE;

pub fn create_test_file_with_content(parent_fd: Fd, file_name: &str, content: Vec<String>) -> Fd {
    let new_file_name = String::from(file_name);

    let mut file_fd = 0u32;

    let res = unsafe {
        __ic_custom_path_open(
            parent_fd,
            0,
            new_file_name.as_ptr(),
            new_file_name.len() as i32,
            (wasi::OFLAGS_CREAT | wasi::OFLAGS_TRUNC) as i32,
            DEFAULT_RIGHTS,
            DEFAULT_RIGHTS,
            0,
            (&mut file_fd) as *mut u32,
        )
    };
    assert_eq!(res, 0);

    let mut src = Vec::new();

    for str in content.iter() {
        src.push(wasi::Ciovec {
            buf: str.as_ptr(),
            buf_len: str.len(),
        });
    }

    let mut bytes_written: wasi::Size = 0;

    unsafe {
        __ic_custom_fd_write(
            file_fd,
            src.as_ptr(),
            src.len() as i32,
            &mut bytes_written as *mut wasi::Size,
        )
    };

    file_fd as Fd
}

pub fn create_test_file(parent_fd: Fd, file_name: &str) -> Fd {
    create_test_file_with_content(
        parent_fd,
        file_name,
        vec![
            String::from("This is a sample text."),
            String::from("1234567890"),
        ],
    )
}

pub fn create_empty_test_file(parent_fd: Fd, file_name: &str) {
    let fd = create_test_file_with_content(parent_fd, file_name, vec![]);
    assert_eq!(__ic_custom_fd_close(fd), 0);
}

pub fn read_directory(root_fd: Fd) -> Vec<String> {
    let len = 1000;
    let mut bytes: Vec<u8> = Vec::with_capacity(len);

    let mut new_length: wasi::Size = 0;

    let res = unsafe {
        __ic_custom_fd_readdir(
            root_fd,
            bytes.as_mut_ptr(),
            len as i32,
            0,
            (&mut new_length) as *mut wasi::Size,
        )
    };

    assert!(res == 0);

    unsafe { bytes.set_len(new_length) };

    let mut folders: Vec<String> = Vec::new();

    let mut idx = 0usize;

    loop {
        unsafe {
            let d_namlen = bytes[idx + 16] as usize;

            let bytes_ptr = bytes.as_mut_ptr().add(idx + DIRENT_SIZE);

            let name_slice = std::slice::from_raw_parts(bytes_ptr, d_namlen);

            let name = std::str::from_utf8(name_slice)
                .expect("Failed to convert bytes to string")
                .to_string();

            folders.push(name);

            idx += DIRENT_SIZE + d_namlen;
        };

        if idx >= bytes.len() {
            break;
        }
    }

    folders
}

#[allow(clippy::missing_safety_doc)]
pub fn fd_close(fd: Fd) {
    __ic_custom_fd_close(fd);
}

#[allow(clippy::missing_safety_doc)]
pub fn read_file_to_string(file: &str) -> String {
    let mut file_fd = 0u32;

    let res = unsafe {
        __ic_custom_path_open(
            3,
            0,
            file.as_ptr(),
            file.len() as i32,
            0,
            DEFAULT_RIGHTS,
            DEFAULT_RIGHTS,
            0,
            (&mut file_fd) as *mut u32,
        )
    };

    assert_eq!(res, 0);

    // read buffers
    let mut buf_to_read = vec![0u8; 1024];

    let read_buf = [wasi::Iovec {
        buf: buf_to_read.as_mut_ptr(),
        buf_len: buf_to_read.len(),
    }];

    let mut bytes_read: wasi::Size = 0;

    // reading from root folder
    let res: i32 = unsafe { __ic_custom_fd_read(file_fd, read_buf.as_ptr(), 1, &mut bytes_read) };
    assert_eq!(res, 0, "fd_read error");

    buf_to_read.truncate(bytes_read);

    // Convert to UTF-8 String (returning String or panic if invalid UTF-8)
    String::from_utf8(buf_to_read).expect("Invalid UTF-8 in file")
}

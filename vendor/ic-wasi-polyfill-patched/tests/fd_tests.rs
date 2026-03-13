mod common;

use common::libc::{STDERR_FILENO, STDIN_FILENO, STDOUT_FILENO};
use ic_wasi_polyfill::wasi::{self, Fd};
use ic_wasi_polyfill::*;

#[test]
fn test_fd_prestat_init_fd_prestat_dir_name() {
    init(&[], &[]);

    let mut root_fd = 0;
    let mut prestat = wasi::Prestat {
        tag: 0,
        u: wasi::PrestatU {
            dir: wasi::PrestatDir { pr_name_len: 0 },
        },
    };

    // find working fd
    loop {
        let res =
            unsafe { __ic_custom_fd_prestat_get(root_fd, (&mut prestat) as *mut wasi::Prestat) };

        if root_fd > 10 {
            panic!();
        }

        if res == 0 {
            break;
        }

        root_fd += 1;
    }

    let root_fd = root_fd;

    let un_dir = unsafe { prestat.u.dir };
    let root_path_len = un_dir.pr_name_len;

    assert!(root_path_len > 0);

    // our default root_fd is known
    assert!(root_fd == 3);

    // find root folder (intensionally allow bigger than necessary buffer)
    let mut path: Vec<u8> = vec![0; root_path_len + 10];

    let res = unsafe {
        __ic_custom_fd_prestat_dir_name(root_fd, path.as_mut_ptr(), root_path_len as i32 + 10)
    };

    assert!(res == 0);

    let root_path = String::from_utf8(path).unwrap();

    // our default path is known
    assert!(&root_path[0..root_path_len] == "/");
}

#[test]
fn test_misusing_root_fd_as_a_file() {
    init(&[], &[]);

    // assign pre-opened root file descriptor
    let dir_fd: Fd = 3;

    // read buffers
    let mut buf_to_read1 = String::from("................");
    let mut buf_to_read2 = String::from("................");

    let read_buf = [
        wasi::Iovec {
            buf: buf_to_read1.as_mut_ptr(),
            buf_len: buf_to_read1.len(),
        },
        wasi::Iovec {
            buf: buf_to_read2.as_mut_ptr(),
            buf_len: buf_to_read2.len(),
        },
    ];

    // write buffers
    let text_to_write1 = String::from("This is a sample text.");
    let text_to_write2 = String::from("1234567890");

    let mut write_buf = [
        wasi::Ciovec {
            buf: text_to_write1.as_ptr(),
            buf_len: text_to_write1.len(),
        },
        wasi::Ciovec {
            buf: text_to_write2.as_ptr(),
            buf_len: text_to_write2.len(),
        },
    ];

    let mut r: wasi::Size = 0;
    let badf = wasi::ERRNO_BADF.raw() as i32;

    // reading from root folder
    let res: i32 = unsafe { __ic_custom_fd_read(dir_fd, read_buf.as_ptr(), 0, &mut r) };
    assert_eq!(res, badf, "fd_read error");

    let res = unsafe { __ic_custom_fd_pread(dir_fd, read_buf.as_ptr(), 0, 0, &mut r) };
    assert_eq!(res, badf, "fd_pread error");

    // writing into root folder
    let res = unsafe { __ic_custom_fd_write(dir_fd, write_buf.as_mut_ptr(), 0, &mut r) };
    assert_eq!(res, badf, "fd_write error");

    let res = unsafe { __ic_custom_fd_pwrite(dir_fd, write_buf.as_mut_ptr(), 0, 0, &mut r) };
    assert_eq!(res, badf, "fd_pwrite error");

    // seeking on dir fd is always an error
    let mut r: wasi::Filesize = 0;

    let res = unsafe { __ic_custom_fd_seek(dir_fd, 0, wasi::WHENCE_CUR.raw() as i32, &mut r) };
    assert_eq!(res, badf, "fd_seek WHENCE_CUR error");
    let res = unsafe { __ic_custom_fd_seek(dir_fd, 0, wasi::WHENCE_SET.raw() as i32, &mut r) };
    assert_eq!(res, badf, "fd_seek WHENCE_SET error");
    let res = unsafe { __ic_custom_fd_seek(dir_fd, 0, wasi::WHENCE_END.raw() as i32, &mut r) };
    assert_eq!(res, badf, "fd_seek WHENCE_END error");

    let res = unsafe { __ic_custom_fd_tell(dir_fd, &mut r) };
    assert_eq!(res, badf, "fd_tell error");
    let res = __ic_custom_fd_advise(dir_fd, 0, 0, wasi::ADVICE_DONTNEED.raw() as i32);
    assert_eq!(res, badf, "fd_advise error");

    let res = __ic_custom_fd_allocate(dir_fd, 0, 0);
    assert_eq!(res, badf, "fd_allocate error");

    let res = __ic_custom_fd_datasync(dir_fd);
    assert_eq!(res, badf, "fd_datasync error");

    let res = __ic_custom_fd_sync(dir_fd);
    assert_eq!(res, badf, "fd_sync error");

    let res = __ic_custom_fd_fdstat_set_flags(dir_fd, wasi::FDFLAGS_NONBLOCK as i32);
    assert_eq!(res, badf, "fd_fdstat_set_flags error");

    let res = __ic_custom_fd_filestat_set_size(dir_fd, 0);
    assert_eq!(res, badf, "fd_filestat_set_size error");
}

#[test]
fn test_closing_root_fd_fails() {
    init(&[], &[]);

    let root_fd = 3;

    // Try to close a preopened directory handle.
    __ic_custom_fd_close(root_fd);

    // check that root_fd is still open
    let mut stat: wasi::Fdstat = wasi::Fdstat {
        fs_filetype: wasi::FILETYPE_UNKNOWN,
        fs_flags: 0,
        fs_rights_base: wasi::RIGHTS_FD_READ,
        fs_rights_inheriting: wasi::RIGHTS_FD_READ,
    };

    // Ensure that dir_fd is still open.
    let ret = unsafe { __ic_custom_fd_fdstat_get(root_fd, (&mut stat) as *mut wasi::Fdstat) };

    assert_eq!(ret, 0, "expected success from fdstate_get(root_fd)");

    assert_eq!(
        stat.fs_filetype,
        wasi::FILETYPE_DIRECTORY,
        "expected root to be a directory",
    );
}

#[test]
fn test_fd_advise() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        // Create a file in the scratch directory.
        let file_fd = wasi::path_open(
            dir_fd,
            0,
            "file",
            wasi::OFLAGS_CREAT,
            wasi::RIGHTS_FD_READ | wasi::RIGHTS_FD_WRITE,
            0,
            0,
        )
        .expect("failed to open file");

        // Check file size
        let stat = wasi::fd_filestat_get(file_fd).expect("failed to fdstat");
        assert_eq!(stat.size, 0, "file size should be 0");

        // set_size it bigger
        wasi::fd_filestat_set_size(file_fd, 100).expect("setting size");

        let stat = wasi::fd_filestat_get(file_fd).expect("failed to fdstat 2");
        assert_eq!(stat.size, 100, "file size should be 100");

        // Advise the kernel
        wasi::fd_advise(file_fd, 10, 50, wasi::ADVICE_NORMAL).expect("failed advise");

        // Advise shouldn't change size
        let stat = wasi::fd_filestat_get(file_fd).expect("failed to fdstat 3");
        assert_eq!(stat.size, 100, "file size should be 100");

        wasi::fd_close(file_fd).expect("failed to close");
        wasi::path_unlink_file(dir_fd, "file").expect("failed to unlink");
    }
}

#[test]
fn test_fd_filestat_get() {
    init(&[], &[]);

    unsafe {
        let stat = wasi::fd_filestat_get(STDIN_FILENO).expect("failed filestat 0");
        assert_eq!(stat.size, 0, "stdio size should be 0");
        assert_eq!(stat.atim, 0, "stdio atim should be 0");
        assert_eq!(stat.mtim, 0, "stdio mtim should be 0");
        assert_eq!(stat.ctim, 0, "stdio ctim should be 0");

        let stat = wasi::fd_filestat_get(STDOUT_FILENO).expect("failed filestat 1");
        assert_eq!(stat.size, 0, "stdio size should be 0");
        assert_eq!(stat.atim, 0, "stdio atim should be 0");
        assert_eq!(stat.mtim, 0, "stdio mtim should be 0");
        assert_eq!(stat.ctim, 0, "stdio ctim should be 0");

        let stat = wasi::fd_filestat_get(STDERR_FILENO).expect("failed filestat 2");
        assert_eq!(stat.size, 0, "stdio size should be 0");
        assert_eq!(stat.atim, 0, "stdio atim should be 0");
        assert_eq!(stat.mtim, 0, "stdio mtim should be 0");
        assert_eq!(stat.ctim, 0, "stdio ctim should be 0");
    }
}

#[test]
fn test_fd_fdstat_set_flags() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        const FILE_NAME: &str = "file";
        let data = &[0u8; 100];

        let file_fd = wasi::path_open(
            dir_fd,
            0,
            FILE_NAME,
            wasi::OFLAGS_CREAT,
            wasi::RIGHTS_FD_READ | wasi::RIGHTS_FD_WRITE,
            0,
            wasi::FDFLAGS_APPEND,
        )
        .expect("opening a file");

        // Write some data and then verify the written data
        assert_eq!(
            wasi::fd_write(
                file_fd,
                &[wasi::Ciovec {
                    buf: data.as_ptr(),
                    buf_len: data.len(),
                }],
            )
            .expect("writing to a file"),
            data.len(),
            "should write {} bytes",
            data.len(),
        );

        wasi::fd_seek(file_fd, 0, wasi::WHENCE_SET).expect("seeking file");

        let buffer = &mut [0u8; 100];

        assert_eq!(
            wasi::fd_read(
                file_fd,
                &[wasi::Iovec {
                    buf: buffer.as_mut_ptr(),
                    buf_len: buffer.len(),
                }]
            )
            .expect("reading file"),
            buffer.len(),
            "should read {} bytes",
            buffer.len()
        );

        assert_eq!(&data[..], &buffer[..]);

        let data = &[1u8; 100];

        // Seek back to the start to ensure we're in append-only mode
        wasi::fd_seek(file_fd, 0, wasi::WHENCE_SET).expect("seeking file");

        assert_eq!(
            wasi::fd_write(
                file_fd,
                &[wasi::Ciovec {
                    buf: data.as_ptr(),
                    buf_len: data.len(),
                }],
            )
            .expect("writing to a file"),
            data.len(),
            "should write {} bytes",
            data.len(),
        );

        wasi::fd_seek(file_fd, 100, wasi::WHENCE_SET).expect("seeking file");

        assert_eq!(
            wasi::fd_read(
                file_fd,
                &[wasi::Iovec {
                    buf: buffer.as_mut_ptr(),
                    buf_len: buffer.len(),
                }]
            )
            .expect("reading file"),
            buffer.len(),
            "should read {} bytes",
            buffer.len()
        );

        assert_eq!(&data[..], &buffer[..]);

        wasi::fd_fdstat_set_flags(file_fd, 0).expect("disabling flags");

        // Overwrite some existing data to ensure the append mode is now off
        wasi::fd_seek(file_fd, 0, wasi::WHENCE_SET).expect("seeking file");

        let data = &[2u8; 100];

        assert_eq!(
            wasi::fd_write(
                file_fd,
                &[wasi::Ciovec {
                    buf: data.as_ptr(),
                    buf_len: data.len(),
                }],
            )
            .expect("writing to a file"),
            data.len(),
            "should write {} bytes",
            data.len(),
        );

        wasi::fd_seek(file_fd, 0, wasi::WHENCE_SET).expect("seeking file");

        assert_eq!(
            wasi::fd_read(
                file_fd,
                &[wasi::Iovec {
                    buf: buffer.as_mut_ptr(),
                    buf_len: buffer.len(),
                }]
            )
            .expect("reading file"),
            buffer.len(),
            "should read {} bytes",
            buffer.len()
        );

        assert_eq!(&data[..], &buffer[..]);

        wasi::fd_close(file_fd).expect("close file");

        let stat = wasi::path_filestat_get(dir_fd, 0, FILE_NAME).expect("stat path");

        assert_eq!(stat.size, 200, "expected a file size of 200");

        wasi::path_unlink_file(dir_fd, FILE_NAME).expect("unlinking file");
    }
}

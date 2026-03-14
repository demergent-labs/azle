mod common;

use common::{create_empty_test_file, create_test_file};
use ic_wasi_polyfill::{init, wasi};

use common::create_test_file_with_content;

#[test]
fn test_path_open_create_existing() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        let fd = create_test_file(dir_fd, "file");
        wasi::fd_close(fd).unwrap();

        assert_eq!(
            wasi::path_open(
                dir_fd,
                0,
                "file",
                wasi::OFLAGS_CREAT | wasi::OFLAGS_EXCL,
                0,
                0,
                0,
            )
            .expect_err("trying to create a file that already exists"),
            wasi::ERRNO_EXIST
        );
        wasi::path_unlink_file(dir_fd, "file").expect("removing a file");
    }
}

#[test]
fn test_dirfd_not_dir() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        // Open a file.
        let file_fd = wasi::path_open(dir_fd, 0, "file", wasi::OFLAGS_CREAT, 0, 0, 0)
            .expect("opening a file");

        // Now try to open a file underneath it as if it were a directory.
        assert_eq!(
            wasi::path_open(file_fd, 0, "foo", wasi::OFLAGS_CREAT, 0, 0, 0)
                .expect_err("non-directory base fd should get ERRNO_NOTDIR"),
            wasi::ERRNO_NOTDIR
        );
        wasi::fd_close(file_fd).expect("closing a file");
    }
}

#[test]
fn test_path_open_lots() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        let fd = create_test_file_with_content(dir_fd, "file", vec!["".to_string()]);
        wasi::fd_close(fd).unwrap();

        for _ in 0..2000 {
            let f_readonly = wasi::path_open(dir_fd, 0, "file", 0, wasi::RIGHTS_FD_READ, 0, 0)
                .expect("open file readonly");

            let buffer = &mut [0u8; 100];
            let iovec = wasi::Iovec {
                buf: buffer.as_mut_ptr(),
                buf_len: buffer.len(),
            };
            let nread = wasi::fd_read(f_readonly, &[iovec]).expect("reading readonly file");

            assert_eq!(nread, 0, "readonly file is empty");

            wasi::fd_close(f_readonly).expect("close readonly");
        }

        for _ in 0..2000 {
            let f_readonly = wasi::path_open(dir_fd, 0, "file", 0, wasi::RIGHTS_FD_READ, 0, 0)
                .expect("open file readonly");

            let buffer = &mut [0u8; 100];
            let iovec = wasi::Iovec {
                buf: buffer.as_mut_ptr(),
                buf_len: buffer.len(),
            };
            let nread = wasi::fd_pread(f_readonly, &[iovec], 0).expect("reading readonly file");
            assert_eq!(nread, 0, "readonly file is empty");

            wasi::fd_close(f_readonly).expect("close readonly");
        }

        for _ in 0..2000 {
            let f = wasi::path_open(
                dir_fd,
                0,
                "file",
                0,
                wasi::RIGHTS_FD_READ | wasi::RIGHTS_FD_WRITE,
                0,
                0,
            )
            .unwrap();

            let buffer = &[0u8; 100];
            let ciovec = wasi::Ciovec {
                buf: buffer.as_ptr(),
                buf_len: buffer.len(),
            };
            let nwritten = wasi::fd_write(f, &[ciovec]).expect("write failed");
            assert_eq!(nwritten, 100);

            wasi::fd_close(f).unwrap();
        }

        for _ in 0..2000 {
            let f = wasi::path_open(
                dir_fd,
                0,
                "file",
                0,
                wasi::RIGHTS_FD_READ | wasi::RIGHTS_FD_WRITE,
                0,
                0,
            )
            .unwrap();

            let buffer = &[0u8; 100];
            let ciovec = wasi::Ciovec {
                buf: buffer.as_ptr(),
                buf_len: buffer.len(),
            };
            let nwritten = wasi::fd_pwrite(f, &[ciovec], 0).expect("write failed");
            assert_eq!(nwritten, 100);

            wasi::fd_close(f).unwrap();
        }

        wasi::path_unlink_file(dir_fd, "file").expect("removing a file");
    }
}

#[test]
fn test_path_open_missing_or_non_block() {
    init(&[], &[]);

    let dir_fd = 3;
    unsafe {
        assert_eq!(
            wasi::path_open(
                dir_fd, 0, "file", 0, // not passing O_CREAT here
                0, 0, 0,
            )
            .expect_err("trying to open a file that doesn't exist"),
            wasi::ERRNO_NOENT
        );

        let _fd = wasi::path_open(dir_fd, 0, ".", 0, 0, 0, wasi::FDFLAGS_NONBLOCK)
            .expect("opening the dir");
    }
}

// Hard-code the set of rights expected for a preopened directory. This is
// more brittle than we wanted to test for, but various userland
// implementations expect (at least) this set of rights to be present on all
// directories:

fn directory_base_rights() -> Vec<(wasi::Rights, &'static str)> {
    vec![
        (wasi::RIGHTS_PATH_CREATE_DIRECTORY, "PATH_CREATE_DIRECTORY"),
        (wasi::RIGHTS_PATH_CREATE_FILE, "PATH_CREATE_FILE"),
        (wasi::RIGHTS_PATH_LINK_SOURCE, "PATH_LINK_SOURCE"),
        (wasi::RIGHTS_PATH_LINK_TARGET, "PATH_LINK_TARGET"),
        (wasi::RIGHTS_PATH_OPEN, "PATH_OPEN"),
        (wasi::RIGHTS_FD_READDIR, "FD_READDIR"),
        (wasi::RIGHTS_PATH_READLINK, "PATH_READLINK"),
        (wasi::RIGHTS_PATH_RENAME_SOURCE, "PATH_RENAME_SOURCE"),
        (wasi::RIGHTS_PATH_RENAME_TARGET, "PATH_RENAME_TARGET"),
        (wasi::RIGHTS_PATH_SYMLINK, "PATH_SYMLINK"),
        (wasi::RIGHTS_PATH_REMOVE_DIRECTORY, "PATH_REMOVE_DIRECTORY"),
        (wasi::RIGHTS_PATH_UNLINK_FILE, "PATH_UNLINK_FILE"),
        (wasi::RIGHTS_PATH_FILESTAT_GET, "PATH_FILESTAT_GET"),
        (
            wasi::RIGHTS_PATH_FILESTAT_SET_TIMES,
            "PATH_FILESTAT_SET_TIMES",
        ),
        (wasi::RIGHTS_FD_FILESTAT_GET, "FD_FILESTAT_GET"),
        (wasi::RIGHTS_FD_FILESTAT_SET_TIMES, "FD_FILESTAT_SET_TIMES"),
    ]
}

fn directory_inheriting_rights() -> Vec<(wasi::Rights, &'static str)> {
    let mut rights = directory_base_rights();
    rights.extend_from_slice(&[
        (wasi::RIGHTS_FD_DATASYNC, "FD_DATASYNC"),
        (wasi::RIGHTS_FD_READ, "FD_READ"),
        (wasi::RIGHTS_FD_SEEK, "FD_SEEK"),
        (wasi::RIGHTS_FD_FDSTAT_SET_FLAGS, "FD_FDSTAT_SET_FLAGS"),
        (wasi::RIGHTS_FD_SYNC, "FD_SYNC"),
        (wasi::RIGHTS_FD_TELL, "FD_TELL"),
        (wasi::RIGHTS_FD_WRITE, "FD_WRITE"),
        (wasi::RIGHTS_FD_ADVISE, "FD_ADVISE"),
        (wasi::RIGHTS_FD_ALLOCATE, "FD_ALLOCATE"),
        (wasi::RIGHTS_FD_FILESTAT_GET, "FD_FILESTAT_GET"),
        (wasi::RIGHTS_FD_FILESTAT_SET_SIZE, "FD_FILESTAT_SET_SIZE"),
        (wasi::RIGHTS_FD_FILESTAT_SET_TIMES, "FD_FILESTAT_SET_TIMES"),
        (wasi::RIGHTS_POLL_FD_READWRITE, "POLL_FD_READWRITE"),
    ]);
    rights
}

const FIRST_PREOPEN: u32 = 3;

#[test]
fn path_open_preopen() {
    init(&[], &[]);

    unsafe {
        let prestat = wasi::fd_prestat_get(FIRST_PREOPEN).expect("fd 3 is a preopen");
        assert_eq!(
            prestat.tag,
            wasi::PREOPENTYPE_DIR.raw(),
            "prestat is a directory"
        );
        let mut dst = Vec::with_capacity(prestat.u.dir.pr_name_len);
        wasi::fd_prestat_dir_name(FIRST_PREOPEN, dst.as_mut_ptr(), dst.capacity())
            .expect("get preopen dir name");
        dst.set_len(prestat.u.dir.pr_name_len);

        let fdstat = wasi::fd_fdstat_get(FIRST_PREOPEN).expect("get fdstat");

        println!(
            "preopen dir: {:?} base {:?} inheriting {:?}",
            String::from_utf8_lossy(&dst),
            fdstat.fs_rights_base,
            fdstat.fs_rights_inheriting
        );

        for (right, name) in directory_base_rights() {
            assert!(
                (fdstat.fs_rights_base & right) == right,
                "fs_rights_base does not have required right `{name}`"
            );
        }

        for (right, name) in directory_inheriting_rights() {
            assert!(
                (fdstat.fs_rights_inheriting & right) == right,
                "fs_rights_inheriting does not have required right `{name}`"
            );
        }

        // Open with same rights it has now:
        let _ = wasi::path_open(
            FIRST_PREOPEN,
            0,
            ".",
            0,
            fdstat.fs_rights_base,
            fdstat.fs_rights_inheriting,
            0,
        )
        .expect("open with same rights");

        // Open with an empty set of rights:
        let _ = wasi::path_open(FIRST_PREOPEN, 0, ".", 0, 0, 0, 0).expect("open with empty rights");

        // Open OFLAGS_DIRECTORY with an empty set of rights:
        let _ = wasi::path_open(FIRST_PREOPEN, 0, ".", wasi::OFLAGS_DIRECTORY, 0, 0, 0)
            .expect("open with O_DIRECTORY empty rights");

        // Open OFLAGS_DIRECTORY with just the read right:
        let _ = wasi::path_open(
            FIRST_PREOPEN,
            0,
            ".",
            wasi::OFLAGS_DIRECTORY,
            wasi::RIGHTS_FD_READ,
            0,
            0,
        )
        .expect("open with O_DIRECTORY and read right");

        let _ = wasi::path_open(
            FIRST_PREOPEN,
            0,
            ".",
            wasi::OFLAGS_DIRECTORY,
            wasi::RIGHTS_FD_READ | wasi::RIGHTS_FD_WRITE,
            0,
            0,
        )
        .expect("open with O_DIRECTORY and read/write should succeed on windows");
    }
}

#[test]
fn test_path_open_read_write() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        create_empty_test_file(dir_fd, "file");

        let f_readonly = wasi::path_open(dir_fd, 0, "file", 0, wasi::RIGHTS_FD_READ, 0, 0)
            .expect("open file readonly");

        let stat = wasi::fd_fdstat_get(f_readonly).expect("get fdstat readonly");
        assert!(
            stat.fs_rights_base & wasi::RIGHTS_FD_READ == wasi::RIGHTS_FD_READ,
            "readonly has read right"
        );
        assert!(
            stat.fs_rights_base & wasi::RIGHTS_FD_WRITE == 0,
            "readonly does not have write right"
        );

        let buffer = &mut [0u8; 100];
        let iovec = wasi::Iovec {
            buf: buffer.as_mut_ptr(),
            buf_len: buffer.len(),
        };
        let nread = wasi::fd_read(f_readonly, &[iovec]).expect("reading readonly file");
        assert_eq!(nread, 0, "readonly file is empty");

        let write_buffer = &[1u8; 50];
        let ciovec = wasi::Ciovec {
            buf: write_buffer.as_ptr(),
            buf_len: write_buffer.len(),
        };

        assert_eq!(
            wasi::fd_write(f_readonly, &[ciovec]).expect_err("read of writeonly fails"),
            wasi::ERRNO_PERM
        );

        wasi::fd_close(f_readonly).expect("close readonly");

        // =============== WRITE ONLY ==================
        let f_writeonly = wasi::path_open(dir_fd, 0, "file", 0, wasi::RIGHTS_FD_WRITE, 0, 0)
            .expect("open file writeonly");

        let stat = wasi::fd_fdstat_get(f_writeonly).expect("get fdstat writeonly");
        assert!(
            stat.fs_rights_base & wasi::RIGHTS_FD_READ == 0,
            "writeonly does not have read right"
        );
        assert!(
            stat.fs_rights_base & wasi::RIGHTS_FD_READDIR == 0,
            "writeonly does not have readdir right"
        );
        assert!(
            stat.fs_rights_base & wasi::RIGHTS_FD_WRITE == wasi::RIGHTS_FD_WRITE,
            "writeonly has write right"
        );

        // See above for description of PERM
        assert_eq!(
            wasi::fd_read(f_writeonly, &[iovec]).expect_err("read of writeonly fails"),
            wasi::ERRNO_PERM
        );
        let bytes_written = wasi::fd_write(f_writeonly, &[ciovec]).expect("write to writeonly");
        assert_eq!(bytes_written, write_buffer.len());

        wasi::fd_close(f_writeonly).expect("close writeonly");

        // ============== READ WRITE =======================

        let f_readwrite = wasi::path_open(
            dir_fd,
            0,
            "file",
            0,
            wasi::RIGHTS_FD_READ | wasi::RIGHTS_FD_WRITE,
            0,
            0,
        )
        .expect("open file readwrite");
        let stat = wasi::fd_fdstat_get(f_readwrite).expect("get fdstat readwrite");
        assert!(
            stat.fs_rights_base & wasi::RIGHTS_FD_READ == wasi::RIGHTS_FD_READ,
            "readwrite has read right"
        );
        assert!(
            stat.fs_rights_base & wasi::RIGHTS_FD_WRITE == wasi::RIGHTS_FD_WRITE,
            "readwrite has write right"
        );

        let nread = wasi::fd_read(f_readwrite, &[iovec]).expect("reading readwrite file");
        assert_eq!(
            nread,
            write_buffer.len(),
            "readwrite file contains contents from writeonly open"
        );

        let write_buffer_2 = &[2u8; 25];
        let ciovec = wasi::Ciovec {
            buf: write_buffer_2.as_ptr(),
            buf_len: write_buffer_2.len(),
        };
        let bytes_written = wasi::fd_write(f_readwrite, &[ciovec]).expect("write to readwrite");
        assert_eq!(bytes_written, write_buffer_2.len());

        let filestat = wasi::fd_filestat_get(f_readwrite).expect("get filestat readwrite");
        assert_eq!(
            filestat.size as usize,
            write_buffer.len() + write_buffer_2.len(),
            "total written is both write buffers"
        );

        wasi::fd_close(f_readwrite).expect("close readwrite");

        wasi::path_unlink_file(dir_fd, "file").expect("removing a file");
    }
}

mod common;

use ic_wasi_polyfill::{init, wasi};

use common::libc;

#[test]
fn test_file_read_write() {
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
        .expect("opening a file");
        assert!(
            file_fd > libc::STDERR_FILENO as wasi::Fd,
            "file descriptor range check",
        );

        let contents = &[0u8, 1, 2, 3];
        let ciovec = wasi::Ciovec {
            buf: contents.as_ptr() as *const _,
            buf_len: contents.len(),
        };
        let mut nwritten = wasi::fd_write(file_fd, &[ciovec]).expect("writing bytes at offset 0");
        assert_eq!(nwritten, 4, "nwritten bytes check");

        let contents = &mut [0u8; 4];
        let iovec = wasi::Iovec {
            buf: contents.as_mut_ptr() as *mut _,
            buf_len: contents.len(),
        };
        wasi::fd_seek(file_fd, 0, wasi::WHENCE_SET).expect("seeking to offset 0");
        let mut nread = wasi::fd_read(file_fd, &[iovec]).expect("reading bytes at offset 0");
        assert_eq!(nread, 4, "nread bytes check");
        assert_eq!(contents, &[0u8, 1, 2, 3], "written bytes equal read bytes");

        // Write all the data through multiple iovecs.
        //
        // Note that this needs to be done with a loop, because some
        // platforms do not support writing multiple iovecs at once.
        // See https://github.com/rust-lang/rust/issues/74825.
        let contents = &[0u8, 1, 2, 3];
        let mut offset = 0usize;
        wasi::fd_seek(file_fd, 0, wasi::WHENCE_SET).expect("seeking to offset 0");
        loop {
            let mut ciovecs: Vec<wasi::Ciovec> = Vec::new();
            let mut remaining = contents.len() - offset;
            if remaining > 2 {
                ciovecs.push(wasi::Ciovec {
                    buf: contents[offset..].as_ptr() as *const _,
                    buf_len: 2,
                });
                remaining -= 2;
            }
            ciovecs.push(wasi::Ciovec {
                buf: contents[contents.len() - remaining..].as_ptr() as *const _,
                buf_len: remaining,
            });

            nwritten =
                wasi::fd_write(file_fd, ciovecs.as_slice()).expect("writing bytes at offset 0");

            offset += nwritten;
            if offset == contents.len() {
                break;
            }
        }
        assert_eq!(offset, 4, "nread bytes check");

        // Read all the data through multiple iovecs.
        //
        // Note that this needs to be done with a loop, because some
        // platforms do not support reading multiple iovecs at once.
        // See https://github.com/rust-lang/rust/issues/74825.
        let contents = &mut [0u8; 4];
        let mut offset = 0usize;
        wasi::fd_seek(file_fd, 0, wasi::WHENCE_SET).expect("seeking to offset 0");
        loop {
            let buffer = &mut [0u8; 4];
            let iovecs = &[
                wasi::Iovec {
                    buf: buffer.as_mut_ptr() as *mut _,
                    buf_len: 2,
                },
                wasi::Iovec {
                    buf: buffer[2..].as_mut_ptr() as *mut _,
                    buf_len: 2,
                },
            ];
            nread = wasi::fd_read(file_fd, iovecs).expect("reading bytes at offset 0");
            if nread == 0 {
                break;
            }
            contents[offset..offset + nread].copy_from_slice(&buffer[0..nread]);
            offset += nread;
        }
        assert_eq!(offset, 4, "nread bytes check");
        assert_eq!(contents, &[0u8, 1, 2, 3], "file cursor was overwritten");

        let contents = &mut [0u8; 4];
        let iovec = wasi::Iovec {
            buf: contents.as_mut_ptr() as *mut _,
            buf_len: contents.len(),
        };
        wasi::fd_seek(file_fd, 2, wasi::WHENCE_SET).expect("seeking to offset 2");
        nread = wasi::fd_read(file_fd, &[iovec]).expect("reading bytes at offset 2");
        assert_eq!(nread, 2, "nread bytes check");
        assert_eq!(contents, &[2u8, 3, 0, 0], "file cursor was overwritten");

        let contents = &[1u8, 0];
        let ciovec = wasi::Ciovec {
            buf: contents.as_ptr() as *const _,
            buf_len: contents.len(),
        };
        wasi::fd_seek(file_fd, 2, wasi::WHENCE_SET).expect("seeking to offset 2");
        nwritten = wasi::fd_write(file_fd, &[ciovec]).expect("writing bytes at offset 2");
        assert_eq!(nwritten, 2, "nwritten bytes check");

        let contents = &mut [0u8; 4];
        let iovec = wasi::Iovec {
            buf: contents.as_mut_ptr() as *mut _,
            buf_len: contents.len(),
        };
        wasi::fd_seek(file_fd, 0, wasi::WHENCE_SET).expect("seeking to offset 0");
        nread = wasi::fd_read(file_fd, &[iovec]).expect("reading bytes at offset 0");
        assert_eq!(nread, 4, "nread bytes check");
        assert_eq!(contents, &[0u8, 1, 1, 0], "file cursor was overwritten");

        wasi::fd_close(file_fd).expect("closing a file");
        wasi::path_unlink_file(dir_fd, "file").expect("removing a file");
    }
}

#[test]
fn test_file_write_and_file_pos() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        let path = "file2";
        let file_fd = wasi::path_open(
            dir_fd,
            0,
            path,
            wasi::OFLAGS_CREAT,
            wasi::RIGHTS_FD_READ | wasi::RIGHTS_FD_WRITE,
            0,
            0,
        )
        .expect("opening a file");
        assert!(
            file_fd > libc::STDERR_FILENO as wasi::Fd,
            "file descriptor range check",
        );

        // Perform a 0-sized pwrite at an offset beyond the end of the file. Unix
        // semantics should pop out where nothing is actually written and the size
        // of the file isn't modified.
        assert_eq!(wasi::fd_tell(file_fd).unwrap(), 0);
        let ciovec = wasi::Ciovec {
            buf: [].as_ptr(),
            buf_len: 0,
        };
        wasi::fd_seek(file_fd, 2, wasi::WHENCE_SET).expect("seeking to offset 2");
        let n = wasi::fd_write(file_fd, &[ciovec]).expect("writing bytes at offset 2");
        assert_eq!(n, 0);

        assert_eq!(wasi::fd_tell(file_fd).unwrap(), 2);
        let stat = wasi::fd_filestat_get(file_fd).unwrap();
        assert_eq!(stat.size, 0);

        // Now write a single byte and make sure it actually works
        let buf = [0];
        let ciovec = wasi::Ciovec {
            buf: buf.as_ptr(),
            buf_len: buf.len(),
        };
        wasi::fd_seek(file_fd, 50, wasi::WHENCE_SET).expect("seeking to offset 50");
        let n = wasi::fd_write(file_fd, &[ciovec]).expect("writing bytes at offset 50");
        assert_eq!(n, 1);

        assert_eq!(wasi::fd_tell(file_fd).unwrap(), 51);
        let stat = wasi::fd_filestat_get(file_fd).unwrap();
        assert_eq!(stat.size, 51);

        wasi::fd_close(file_fd).expect("closing a file");
        wasi::path_unlink_file(dir_fd, path).expect("removing a file");
    }
}

#[test]
fn test_file_pread_pwrite() {
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
        .expect("opening a file");
        assert!(
            file_fd > libc::STDERR_FILENO as wasi::Fd,
            "file descriptor range check",
        );

        let contents = &[0u8, 1, 2, 3];
        let ciovec = wasi::Ciovec {
            buf: contents.as_ptr() as *const _,
            buf_len: contents.len(),
        };
        let mut nwritten =
            wasi::fd_pwrite(file_fd, &[ciovec], 0).expect("writing bytes at offset 0");
        assert_eq!(nwritten, 4, "nwritten bytes check");

        let contents = &mut [0u8; 4];
        let iovec = wasi::Iovec {
            buf: contents.as_mut_ptr() as *mut _,
            buf_len: contents.len(),
        };
        let mut nread = wasi::fd_pread(file_fd, &[iovec], 0).expect("reading bytes at offset 0");
        assert_eq!(nread, 4, "nread bytes check");
        assert_eq!(contents, &[0u8, 1, 2, 3], "written bytes equal read bytes");

        // Write all the data through multiple iovecs.
        let contents = &[0u8, 1, 2, 3];
        let mut offset = 0usize;
        loop {
            let mut ciovecs: Vec<wasi::Ciovec> = Vec::new();
            let mut remaining = contents.len() - offset;
            if remaining > 2 {
                ciovecs.push(wasi::Ciovec {
                    buf: contents[offset..].as_ptr() as *const _,
                    buf_len: 2,
                });
                remaining -= 2;
            }
            ciovecs.push(wasi::Ciovec {
                buf: contents[contents.len() - remaining..].as_ptr() as *const _,
                buf_len: remaining,
            });

            nwritten = wasi::fd_pwrite(file_fd, ciovecs.as_slice(), offset.try_into().unwrap())
                .expect("writing bytes at offset 0");

            offset += nwritten;
            if offset == contents.len() {
                break;
            }
        }
        assert_eq!(offset, 4, "nread bytes check");

        // Read all the data through multiple iovecs.
        let contents = &mut [0u8; 4];
        let mut offset = 0usize;
        loop {
            let buffer = &mut [0u8; 4];
            let iovecs = &[
                wasi::Iovec {
                    buf: buffer.as_mut_ptr() as *mut _,
                    buf_len: 2,
                },
                wasi::Iovec {
                    buf: buffer[2..].as_mut_ptr() as *mut _,
                    buf_len: 2,
                },
            ];
            nread =
                wasi::fd_pread(file_fd, iovecs, offset as _).expect("reading bytes at offset 0");
            if nread == 0 {
                break;
            }
            contents[offset..offset + nread].copy_from_slice(&buffer[0..nread]);
            offset += nread;
        }
        assert_eq!(offset, 4, "nread bytes check");
        assert_eq!(contents, &[0u8, 1, 2, 3], "file cursor was overwritten");

        let contents = &mut [0u8; 4];
        let iovec = wasi::Iovec {
            buf: contents.as_mut_ptr() as *mut _,
            buf_len: contents.len(),
        };
        nread = wasi::fd_pread(file_fd, &[iovec], 2).expect("reading bytes at offset 2");
        assert_eq!(nread, 2, "nread bytes check");
        assert_eq!(contents, &[2u8, 3, 0, 0], "file cursor was overwritten");

        let contents = &[1u8, 0];
        let ciovec = wasi::Ciovec {
            buf: contents.as_ptr() as *const _,
            buf_len: contents.len(),
        };
        nwritten = wasi::fd_pwrite(file_fd, &[ciovec], 2).expect("writing bytes at offset 2");
        assert_eq!(nwritten, 2, "nwritten bytes check");

        let contents = &mut [0u8; 4];
        let iovec = wasi::Iovec {
            buf: contents.as_mut_ptr() as *mut _,
            buf_len: contents.len(),
        };
        nread = wasi::fd_pread(file_fd, &[iovec], 0).expect("reading bytes at offset 0");
        assert_eq!(nread, 4, "nread bytes check");
        assert_eq!(contents, &[0u8, 1, 1, 0], "file cursor was overwritten");

        wasi::fd_close(file_fd).expect("closing a file");
        wasi::path_unlink_file(dir_fd, "file").expect("removing a file");
    }
}

#[test]
fn test_file_pwrite_and_file_pos() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        let path = "file2";
        let file_fd = wasi::path_open(
            dir_fd,
            0,
            path,
            wasi::OFLAGS_CREAT,
            wasi::RIGHTS_FD_READ | wasi::RIGHTS_FD_WRITE,
            0,
            0,
        )
        .expect("opening a file");
        assert!(
            file_fd > libc::STDERR_FILENO as wasi::Fd,
            "file descriptor range check",
        );

        // Perform a 0-sized pwrite at an offset beyond the end of the file. Unix
        // semantics should pop out where nothing is actually written and the size
        // of the file isn't modified.
        assert_eq!(wasi::fd_tell(file_fd).unwrap(), 0);
        let ciovec = wasi::Ciovec {
            buf: [].as_ptr(),
            buf_len: 0,
        };
        let n = wasi::fd_pwrite(file_fd, &[ciovec], 50).expect("writing bytes at offset 2");
        assert_eq!(n, 0);

        assert_eq!(wasi::fd_tell(file_fd).unwrap(), 0);
        let stat = wasi::fd_filestat_get(file_fd).unwrap();
        assert_eq!(stat.size, 0);

        // Now write a single byte and make sure it actually works
        let buf = [0];
        let ciovec = wasi::Ciovec {
            buf: buf.as_ptr(),
            buf_len: buf.len(),
        };
        let n = wasi::fd_pwrite(file_fd, &[ciovec], 50).expect("writing bytes at offset 50");
        assert_eq!(n, 1);

        assert_eq!(wasi::fd_tell(file_fd).unwrap(), 0);
        let stat = wasi::fd_filestat_get(file_fd).unwrap();
        assert_eq!(stat.size, 51);

        wasi::fd_close(file_fd).expect("closing a file");
        wasi::path_unlink_file(dir_fd, path).expect("removing a file");
    }
}

#[test]
fn test_file_pwrite_and_append() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        let path = "file3";
        let file_fd = wasi::path_open(
            dir_fd,
            0,
            path,
            wasi::OFLAGS_CREAT,
            wasi::RIGHTS_FD_READ | wasi::RIGHTS_FD_WRITE,
            0,
            wasi::FDFLAGS_APPEND,
        )
        .expect("opening a file");

        // Inherit linux semantics for `pwrite` where if the file is opened in
        // append mode then the offset to `pwrite` is ignored.
        let buf = [0];
        let ciovec = wasi::Ciovec {
            buf: buf.as_ptr(),
            buf_len: buf.len(),
        };
        let n = wasi::fd_pwrite(file_fd, &[ciovec], 50).expect("writing bytes at offset 50");
        assert_eq!(n, 1);

        let stat = wasi::fd_filestat_get(file_fd).unwrap();
        assert_eq!(stat.size, 1);

        let n = wasi::fd_pwrite(file_fd, &[ciovec], 0).expect("writing bytes at offset 50");
        assert_eq!(n, 1);

        let stat = wasi::fd_filestat_get(file_fd).unwrap();
        assert_eq!(stat.size, 2);

        wasi::fd_close(file_fd).expect("closing a file");
        wasi::path_unlink_file(dir_fd, path).expect("removing a file");
    }
}

#[test]
fn test_file_seek_tell() {
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
        .expect("opening a file");
        assert!(
            file_fd > libc::STDERR_FILENO as wasi::Fd,
            "file descriptor range check",
        );

        // Check current offset
        let mut offset = wasi::fd_tell(file_fd).expect("getting initial file offset");
        assert_eq!(offset, 0, "current offset should be 0");

        // Write to file
        let data = &[0u8; 100];
        let iov = wasi::Ciovec {
            buf: data.as_ptr() as *const _,
            buf_len: data.len(),
        };
        let nwritten = wasi::fd_write(file_fd, &[iov]).expect("writing to a file");
        assert_eq!(nwritten, 100, "should write 100 bytes to file");

        // Check current offset
        offset = wasi::fd_tell(file_fd).expect("getting file offset after writing");
        assert_eq!(offset, 100, "offset after writing should be 100");

        // Seek to middle of the file
        let mut newoffset =
            wasi::fd_seek(file_fd, -50, wasi::WHENCE_CUR).expect("seeking to the middle of a file");
        assert_eq!(
            newoffset, 50,
            "offset after seeking to the middle should be at 50"
        );

        // Seek to the beginning of the file
        newoffset = wasi::fd_seek(file_fd, 0, wasi::WHENCE_SET)
            .expect("seeking to the beginning of the file");
        assert_eq!(
            newoffset, 0,
            "offset after seeking to the beginning of the file should be at 0"
        );

        // Seek beyond the file should be possible
        wasi::fd_seek(file_fd, 1000, wasi::WHENCE_CUR).expect("seeking beyond the end of the file");

        // Seek before byte 0 is an error though
        assert_eq!(
            wasi::fd_seek(file_fd, -2000, wasi::WHENCE_CUR)
                .expect_err("seeking before byte 0 should be an error"),
            wasi::ERRNO_INVAL
        );

        // Check that fd_read properly updates the file offset
        wasi::fd_seek(file_fd, 0, wasi::WHENCE_SET)
            .expect("seeking to the beginning of the file again");

        let buffer = &mut [0u8; 100];
        let iovec = wasi::Iovec {
            buf: buffer.as_mut_ptr(),
            buf_len: buffer.len(),
        };
        let nread = wasi::fd_read(file_fd, &[iovec]).expect("reading file");
        assert_eq!(nread, buffer.len(), "should read {} bytes", buffer.len());

        offset = wasi::fd_tell(file_fd).expect("getting file offset after reading");
        assert_eq!(offset, 100, "offset after reading should be 100");

        wasi::fd_close(file_fd).expect("closing a file");
        wasi::path_unlink_file(dir_fd, "file").expect("deleting a file");
    }
}

// Test that when a file is opened with `O_APPEND` that acquiring the current
// position indicates the end of the file.
#[test]
fn seek_and_o_append() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        let path = "file2";
        let file_fd = wasi::path_open(
            dir_fd,
            0,
            path,
            wasi::OFLAGS_CREAT,
            wasi::RIGHTS_FD_READ | wasi::RIGHTS_FD_WRITE,
            0,
            wasi::FDFLAGS_APPEND,
        )
        .expect("opening a file");
        assert!(
            file_fd > libc::STDERR_FILENO as wasi::Fd,
            "file descriptor range check",
        );

        let mut offset = wasi::fd_seek(file_fd, 0, wasi::WHENCE_CUR).unwrap();
        assert_eq!(offset, 0);
        offset = wasi::fd_tell(file_fd).unwrap();
        assert_eq!(offset, 0);

        let data = &[0u8; 100];
        let iov = wasi::Ciovec {
            buf: data.as_ptr() as *const _,
            buf_len: data.len(),
        };
        let nwritten = wasi::fd_write(file_fd, &[iov]).unwrap();
        assert_eq!(nwritten, 100);

        let mut offset = wasi::fd_seek(file_fd, 0, wasi::WHENCE_CUR).unwrap();
        assert_eq!(offset, 100);
        offset = wasi::fd_tell(file_fd).unwrap();
        assert_eq!(offset, 100);

        wasi::fd_close(file_fd).unwrap();
        wasi::path_unlink_file(dir_fd, path).unwrap();
    }
}

#[test]
fn test_directory_seek() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        // Create a directory in the scratch directory.
        wasi::path_create_directory(dir_fd, "dir").expect("failed to make directory");

        // Open the directory and attempt to request rights for seeking.
        let fd = wasi::path_open(dir_fd, 0, "dir", wasi::OFLAGS_DIRECTORY, 0, 0, 0)
            .expect("failed to open file");
        assert!(
            fd > libc::STDERR_FILENO as wasi::Fd,
            "file descriptor range check",
        );

        // Attempt to seek.
        assert_eq!(
            wasi::fd_seek(fd, 0, wasi::WHENCE_CUR).expect_err("seek on a directory"),
            wasi::ERRNO_BADF
        );

        // Clean up.
        wasi::fd_close(fd).expect("failed to close fd");
        wasi::path_remove_directory(dir_fd, "dir").expect("failed to remove dir");
    }
}

#[test]
fn test_file_unbuffered_write() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        // Create and open file for reading
        let fd_read = wasi::path_open(
            dir_fd,
            0,
            "file",
            wasi::OFLAGS_CREAT,
            wasi::RIGHTS_FD_READ,
            0,
            0,
        )
        .expect("create and open file for reading");
        assert!(
            fd_read > libc::STDERR_FILENO as wasi::Fd,
            "file descriptor range check",
        );

        // Open the same file but for writing
        let fd_write = wasi::path_open(dir_fd, 0, "file", 0, wasi::RIGHTS_FD_WRITE, 0, 0)
            .expect("opening file for writing");
        assert!(
            fd_write > libc::STDERR_FILENO as wasi::Fd,
            "file descriptor range check",
        );

        // Write to file
        let contents = &[1u8];
        let ciovec = wasi::Ciovec {
            buf: contents.as_ptr() as *const _,
            buf_len: contents.len(),
        };
        let nwritten = wasi::fd_write(fd_write, &[ciovec]).expect("writing byte to file");
        assert_eq!(nwritten, 1, "nwritten bytes check");

        // Read from file
        let contents = &mut [0u8; 1];
        let iovec = wasi::Iovec {
            buf: contents.as_mut_ptr() as *mut _,
            buf_len: contents.len(),
        };
        let nread = wasi::fd_read(fd_read, &[iovec]).expect("reading bytes from file");
        assert_eq!(nread, 1, "nread bytes check");
        assert_eq!(contents, &[1u8], "written bytes equal read bytes");

        // Clean up
        wasi::fd_close(fd_write).expect("closing a file");
        wasi::fd_close(fd_read).expect("closing a file");
        wasi::path_unlink_file(dir_fd, "file").expect("removing a file");
    }
}

#[test]
fn test_file_long_write() {
    init(&[], &[]);

    let dir_fd = 3;
    let filename: &str = "long_write.txt";

    unsafe {
        // Open a file for writing
        let file_fd = wasi::path_open(
            dir_fd,
            0,
            filename,
            wasi::OFLAGS_CREAT,
            wasi::RIGHTS_FD_WRITE,
            0,
            0,
        )
        .expect("creating a file for writing");

        let mut content = Vec::new();
        // 16 byte string, 4096 times, is 64k
        for n in 0..4096 {
            let chunk = format!("123456789 {n:05} ");
            assert_eq!(chunk.as_str().len(), 16);
            content.extend_from_slice(chunk.as_bytes());
        }

        // Write to the file
        let nwritten = wasi::fd_write(
            file_fd,
            &[wasi::Ciovec {
                buf: content.as_slice().as_ptr() as *const _,
                buf_len: content.len(),
            }],
        )
        .expect("writing file content");
        assert_eq!(nwritten, content.len(), "nwritten bytes check");

        let stat = wasi::fd_filestat_get(file_fd).expect("reading file stats");
        assert_eq!(
            stat.size,
            content.len() as u64,
            "file should be size of content",
        );

        wasi::fd_close(file_fd).expect("closing the file");
        // Open the file for reading
        let file_fd = wasi::path_open(dir_fd, 0, filename, 0, wasi::RIGHTS_FD_READ, 0, 0)
            .expect("open the file for reading");

        // Read the file's contents
        let buffer = &mut [0u8; 100];
        let nread = wasi::fd_read(
            file_fd,
            &[wasi::Iovec {
                buf: buffer.as_mut_ptr(),
                buf_len: buffer.len(),
            }],
        )
        .expect("reading first chunk file content");

        assert_eq!(nread, buffer.len(), "read first chunk");
        assert_eq!(
            buffer,
            &content[..buffer.len()],
            "contents of first read chunk"
        );

        let end_cursor = content.len() - buffer.len();
        wasi::fd_seek(file_fd, end_cursor as i64, wasi::WHENCE_SET)
            .expect("seeking to end of file minus buffer size");

        let nread = wasi::fd_read(
            file_fd,
            &[wasi::Iovec {
                buf: buffer.as_mut_ptr(),
                buf_len: buffer.len(),
            }],
        )
        .expect("reading end chunk of file content");

        assert_eq!(nread, buffer.len(), "read end chunk len");
        assert_eq!(buffer, &content[end_cursor..], "contents of end read chunk");

        wasi::fd_close(file_fd).expect("closing the file");

        // Open a file for writing
        let filename = "test-zero-write-fails.txt";
        let file_fd = wasi::path_open(
            dir_fd,
            0,
            filename,
            wasi::OFLAGS_CREAT,
            wasi::RIGHTS_FD_WRITE,
            0,
            0,
        )
        .expect("creating a file for writing");
        wasi::fd_close(file_fd).expect("closing the file");
        let file_fd = wasi::path_open(dir_fd, 0, filename, 0, wasi::RIGHTS_FD_READ, 0, 0)
            .expect("opening a file for writing");
        let res = wasi::fd_write(
            file_fd,
            &[wasi::Ciovec {
                buf: 3 as *const u8,
                buf_len: 0,
            }],
        );
        assert!(
            res == Err(wasi::ERRNO_BADF) || res == Err(wasi::ERRNO_PERM),
            "bad result {res:?}"
        )
    }
}

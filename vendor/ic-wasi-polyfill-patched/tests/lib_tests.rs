mod common;

use common::*;
use ic_wasi_polyfill::wasi::{self, Fd};
use ic_wasi_polyfill::wasi_helpers::DIRENT_SIZE;
use ic_wasi_polyfill::*;

#[cfg(target_arch = "wasm32")]
use ic_cdk::api::time as ic_time;
#[cfg(not(all(target_arch = "wasm32")))]
fn ic_time() -> u64 {
    use std::time::UNIX_EPOCH;

    std::time::SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_nanos() as u64
}

#[test]
fn test_environ_get() {
    let init_env = [
        ("PATH", "/usr/bin"),
        ("UID", "1028"),
        ("HOME", "/home/user"),
    ];

    let mut lines = Vec::new();

    for pair in init_env.iter() {
        lines.push(String::from(pair.0) + "=" + pair.1 + "\0");
    }

    let lines = lines;

    init(&[12, 3, 54, 1], &init_env);

    // get environment sizes
    let mut entry_count: wasi::Size = 0;
    let mut buffer_size: wasi::Size = 0;

    let ret = unsafe {
        __ic_custom_environ_sizes_get(
            (&mut entry_count) as *mut wasi::Size,
            (&mut buffer_size) as *mut wasi::Size,
        )
    };

    assert!(ret == 0);
    assert!(entry_count == lines.len());

    let mut expected_buffer_size = 0;
    for i in lines.iter().map(|x: &String| x.len()) {
        expected_buffer_size += i;
    }

    assert!(buffer_size == expected_buffer_size);

    let mut entry_table: Vec<wasi::Size> = vec![0; entry_count];
    let mut buffer: Vec<u8> = vec![0; buffer_size];

    // get environment values
    let ret = unsafe {
        __ic_custom_environ_get(
            entry_table.as_mut_ptr() as *mut *mut u8,
            buffer.as_mut_ptr(),
        )
    };

    assert!(ret == 0);

    let computed_string = String::from_utf8(buffer).unwrap();

    let mut expected_string = String::new();
    for env_string in lines.iter() {
        expected_string += env_string;
    }

    assert!(computed_string == expected_string);
}

#[test]
fn test_random_get_reuse_seed() {
    let init_env = [
        ("PATH", "/usr/bin"),
        ("UID", "1028"),
        ("HOME", "/home/user"),
    ];

    let seed = [12, 3, 54, 21];

    init(&seed, &init_env);

    // test large buffer
    let buf_len: wasi::Size = 1024usize;

    let mut random_buf1: Vec<u8> = Vec::with_capacity(buf_len);

    let res = unsafe { __ic_custom_random_get(random_buf1.as_mut_ptr(), buf_len) };

    assert!(res == 0);

    unsafe { random_buf1.set_len(buf_len) };

    init_seed(&seed);

    let mut random_buf2: Vec<u8> = Vec::with_capacity(buf_len);

    let res = unsafe { __ic_custom_random_get(random_buf2.as_mut_ptr(), buf_len) };

    assert!(res == 0);

    unsafe { random_buf2.set_len(buf_len) };

    assert!(random_buf1 == random_buf2)
}

#[test]
fn test_args_get() {
    init(&[], &[]);

    let mut entry_count: wasi::Size = 0;
    let mut buffer_size: wasi::Size = 0;

    let ret = unsafe {
        __ic_custom_args_sizes_get(
            (&mut entry_count) as *mut wasi::Size,
            (&mut buffer_size) as *mut wasi::Size,
        )
    };

    assert!(ret == 0);
    assert!(entry_count == 0);

    let expected_buffer_size = 0;

    assert!(buffer_size == expected_buffer_size);

    let mut entry_table: Vec<wasi::Size> = vec![0; entry_count];
    let mut buffer: Vec<u8> = vec![0; buffer_size];

    // get environment values
    let ret = __ic_custom_args_get(
        entry_table.as_mut_ptr() as *mut *mut u8,
        buffer.as_mut_ptr(),
    );

    assert!(ret == 0);

    let computed_string = String::from_utf8(buffer).unwrap();

    let expected_string = String::new();

    assert!(computed_string == expected_string);
}

#[test]
fn test_clock_res_get_clock_time_get() {
    init(&[], &[]);

    let mut resolution: u64 = 0;

    let res = unsafe { __ic_custom_clock_res_get(0, (&mut resolution) as *mut u64) };

    assert!(res == 0);
    assert!(resolution == 1_000_000_000);

    let res =
        unsafe { __ic_custom_clock_time_get(0, 1_000_000_000, (&mut resolution) as *mut u64) };

    assert!(res == 0);
    assert!(resolution > 0);
}

#[test]
fn test_file_truncation() {
    init(&[], &[]);

    let filename = "test.txt";
    let dir_fd: Fd = 3; // root dir

    let content = "Some content to be written";

    let file_fd = create_test_file_with_content(dir_fd, filename, vec![String::from(content)]);

    let res = __ic_custom_fd_close(file_fd);

    assert_eq!(res, 0); // check there was no error

    // Open the file for truncation
    let res = unsafe {
        __ic_custom_path_open(
            dir_fd,
            0,
            filename.as_ptr(),
            filename.len() as i32,
            (wasi::OFLAGS_CREAT | wasi::OFLAGS_TRUNC) as i32,
            wasi::RIGHTS_FD_WRITE | wasi::RIGHTS_FD_READ,
            0,
            0,
            (&mut (file_fd as u32)) as *mut u32,
        )
    };

    assert_eq!(res, 0); // check there was no error

    // Read the file's contents
    let bytes_read = 0;

    let mut buf_to_read1 = String::from("................");

    let mut read_buf = vec![wasi::Iovec {
        buf: buf_to_read1.as_mut_ptr(),
        buf_len: buf_to_read1.len(),
    }];

    let res = unsafe {
        __ic_custom_fd_read(
            file_fd,
            read_buf.as_mut_ptr(),
            read_buf.len() as i32,
            (&mut (bytes_read as usize)) as *mut usize,
        )
    };

    assert_eq!(res, 0); // check there was no error

    // The file should be empty due to truncation
    assert_eq!(bytes_read, 0, "expected an empty file after truncation");

    let res = __ic_custom_fd_close(file_fd);

    assert_eq!(res, 0);
}

#[test]
fn test_create_dirs_and_file_in_it() {
    init(&[], &[]);

    let root_fd = 3;
    let new_file_name = String::from("file.txt");

    // create dirs
    let new_folder_name1 = String::from("test_folder1");
    let res = unsafe {
        __ic_custom_path_create_directory(
            root_fd,
            new_folder_name1.as_ptr(),
            new_folder_name1.len() as i32,
        )
    };
    assert!(res == 0);

    let new_folder_name2 = String::from("test_folder2");
    let res = unsafe {
        __ic_custom_path_create_directory(
            root_fd,
            new_folder_name2.as_ptr(),
            new_folder_name2.len() as i32,
        )
    };
    assert!(res == 0);

    let new_folder_name3 = String::from("test_folder3");
    let res = unsafe {
        __ic_custom_path_create_directory(
            root_fd,
            new_folder_name3.as_ptr(),
            new_folder_name3.len() as i32,
        )
    };
    assert!(res == 0);

    // open first dir
    let mut parent_folder_fd = 0 as Fd;

    let res = unsafe {
        __ic_custom_path_open(
            root_fd,
            0,
            new_folder_name1.as_ptr(),
            new_folder_name1.len() as i32,
            2,
            wasi::RIGHTS_FD_WRITE | wasi::RIGHTS_FD_READ,
            0,
            0,
            (&mut parent_folder_fd) as *mut Fd,
        )
    };
    assert!(res == 0);

    assert!(parent_folder_fd > 0);

    //
    let mut new_file_fd: Fd = 0;

    let res = unsafe {
        __ic_custom_path_open(
            parent_folder_fd,
            0,
            new_file_name.as_ptr(),
            new_file_name.len() as i32,
            1 + 4 + 8,
            wasi::RIGHTS_FD_WRITE | wasi::RIGHTS_FD_READ,
            0,
            0,
            (&mut new_file_fd) as *mut Fd,
        )
    };

    assert!(res == 0);

    // delete the second directory
    let ret = unsafe {
        __ic_custom_path_remove_directory(
            root_fd,
            new_folder_name2.as_ptr(),
            new_folder_name2.len() as i32,
        )
    };
    assert!(ret == 0);

    // check there are now 2 directories in the root folder and 1 file in the first directory

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

    assert!(folders.len() == 4);
    assert!(folders[0] == ".");
    assert!(folders[1] == "..");
    assert!(folders[2] == "test_folder1");
    assert!(folders[3] == "test_folder3");
}

#[test]
fn test_writing_and_reading() {
    init(&[], &[]);

    let root_fd: Fd = 3;
    let new_file_name = String::from("file.txt");

    let mut file_fd = create_test_file(root_fd as Fd, &new_file_name);

    __ic_custom_fd_close(file_fd);

    // open file for reading
    let res = unsafe {
        __ic_custom_path_open(
            root_fd,
            0,
            new_file_name.as_ptr(),
            new_file_name.len() as i32,
            0,
            wasi::RIGHTS_FD_WRITE | wasi::RIGHTS_FD_READ,
            0,
            0,
            (&mut file_fd) as *mut Fd,
        )
    };

    assert!(res == 0);

    let mut buf_to_read1 = String::from("................");
    let mut buf_to_read2 = String::from("................");

    let mut read_buf = vec![
        wasi::Iovec {
            buf: buf_to_read1.as_mut_ptr(),
            buf_len: buf_to_read1.len(),
        },
        wasi::Iovec {
            buf: buf_to_read2.as_mut_ptr(),
            buf_len: buf_to_read2.len(),
        },
    ];

    let mut bytes_read: wasi::Size = 0;

    let res = unsafe {
        __ic_custom_fd_read(
            file_fd,
            read_buf.as_mut_ptr(),
            read_buf.len() as i32,
            (&mut bytes_read) as *mut wasi::Size,
        )
    };
    assert!(res == 0);

    assert!(buf_to_read1 == "This is a sample");
    assert!(buf_to_read2 == " text.1234567890");
}

#[test]
fn test_writing_and_reading_from_a_stationary_pointer() {
    init(&[], &[]);

    let root_fd = 3;
    let new_file_name = String::from("file.txt");

    let mut file_fd = 0 as Fd;

    let res = unsafe {
        __ic_custom_path_open(
            root_fd,
            0,
            new_file_name.as_ptr(),
            new_file_name.len() as i32,
            1 + 4 + 8,
            wasi::RIGHTS_FD_WRITE | wasi::RIGHTS_FD_READ,
            0,
            0,
            (&mut file_fd) as *mut Fd,
        )
    };
    assert!(res == 0);

    let text_to_write1 = String::from("This is a sample text.");
    let text_to_write2 = String::from("1234567890");

    let src = [
        wasi::Ciovec {
            buf: text_to_write1.as_ptr(),
            buf_len: text_to_write1.len(),
        },
        wasi::Ciovec {
            buf: text_to_write2.as_ptr(),
            buf_len: text_to_write2.len(),
        },
    ];

    let mut bytes_written: wasi::Size = 0;

    unsafe {
        __ic_custom_fd_pwrite(
            file_fd,
            src.as_ptr(),
            src.len() as i32,
            0,
            (&mut bytes_written) as *mut wasi::Size,
        )
    };

    __ic_custom_fd_close(file_fd);

    // open file for reading
    let res = unsafe {
        __ic_custom_path_open(
            root_fd,
            0,
            new_file_name.as_ptr(),
            new_file_name.len() as i32,
            0,
            wasi::RIGHTS_FD_WRITE | wasi::RIGHTS_FD_READ,
            0,
            0,
            (&mut file_fd) as *mut Fd,
        )
    };
    assert!(res == 0);

    let mut buf_to_read1 = String::from("................");
    let mut buf_to_read2 = String::from("................");

    let mut read_buf = [
        wasi::Iovec {
            buf: buf_to_read1.as_mut_ptr(),
            buf_len: buf_to_read1.len(),
        },
        wasi::Iovec {
            buf: buf_to_read2.as_mut_ptr(),
            buf_len: buf_to_read2.len(),
        },
    ];

    let mut bytes_read: wasi::Size = 0;

    let res = unsafe {
        __ic_custom_fd_pread(
            file_fd,
            read_buf.as_mut_ptr(),
            (read_buf.len()) as i32,
            2,
            (&mut bytes_read) as *mut wasi::Size,
        )
    };

    assert!(res == 0);

    assert!(buf_to_read1 == "is is a sample t");
    assert!(buf_to_read2 == "ext.1234567890..");
}

#[test]
fn test_writing_and_reading_file_stats() {
    init(&[], &[]);

    let root_fd = 3;
    let new_file_name = String::from("file.txt");

    let mut file_fd = 0 as Fd;

    unsafe {
        __ic_custom_path_open(
            root_fd,
            0,
            new_file_name.as_ptr(),
            new_file_name.len() as i32,
            1 + 4 + 8,
            wasi::RIGHTS_FD_WRITE | wasi::RIGHTS_FD_READ,
            0,
            0,
            (&mut file_fd) as *mut Fd,
        )
    };

    let text_to_write1 = String::from("This is a sample text.");
    let text_to_write2 = String::from("1234567890");

    let src = [
        wasi::Ciovec {
            buf: text_to_write1.as_ptr(),
            buf_len: text_to_write1.len(),
        },
        wasi::Ciovec {
            buf: text_to_write2.as_ptr(),
            buf_len: text_to_write2.len(),
        },
    ];

    let mut bytes_written: wasi::Size = 0;

    unsafe {
        __ic_custom_fd_write(
            file_fd,
            src.as_ptr(),
            src.len() as i32,
            (&mut bytes_written) as *mut wasi::Size,
        )
    };

    __ic_custom_fd_sync(file_fd);

    let mut file_stat: wasi::Filestat = wasi::Filestat {
        dev: 0,
        ino: 0,
        filetype: wasi::FILETYPE_UNKNOWN,
        nlink: 0,
        size: 0,
        atim: 0,
        mtim: 0,
        ctim: 0,
    };

    unsafe {
        __ic_custom_fd_filestat_get(file_fd, &mut file_stat as *mut wasi::Filestat);
    }

    let mtime = ic_time();
    let atime = ic_time();

    __ic_custom_fd_filestat_set_times(file_fd, 1i64, 2i64, 1 + 2 + 4 + 8);

    unsafe {
        __ic_custom_fd_filestat_get(file_fd, &mut file_stat as *mut wasi::Filestat);
    }

    assert!(file_stat.filetype == wasi::FILETYPE_REGULAR_FILE);
    assert!(file_stat.nlink == 1);
    assert!(file_stat.size == 32);
    assert!(file_stat.atim > file_stat.ctim);
    assert!(file_stat.mtim > file_stat.ctim);

    unsafe {
        __ic_custom_fd_write(
            file_fd,
            src.as_ptr(),
            src.len() as i32,
            (&mut bytes_written) as *mut wasi::Size,
        )
    };

    __ic_custom_fd_filestat_set_times(file_fd, atime as i64, mtime as i64, 1 + 4);

    unsafe {
        __ic_custom_fd_filestat_get(file_fd, &mut file_stat as *mut wasi::Filestat);
    }

    assert!(file_stat.filetype == wasi::FILETYPE_REGULAR_FILE);
    assert!(file_stat.nlink == 1);
    assert!(file_stat.size == 64);
    assert!(file_stat.atim == atime);
    assert!(file_stat.mtim == mtime);
}

#[test]
fn test_forward_to_debug_is_called() {
    init(&[], &[]);

    let text_to_write1 = String::from("This is a sample text.");
    let text_to_write2 = String::from("1234567890");

    let src = [
        wasi::Ciovec {
            buf: text_to_write1.as_ptr(),
            buf_len: text_to_write1.len(),
        },
        wasi::Ciovec {
            buf: text_to_write2.as_ptr(),
            buf_len: text_to_write2.len(),
        },
    ];

    let mut bytes_written: wasi::Size = 0;

    let res = unsafe {
        __ic_custom_fd_write(
            1,
            src.as_ptr(),
            src.len() as i32,
            (&mut bytes_written) as *mut wasi::Size,
        )
    };

    assert!(res == 0);
    assert!(bytes_written > 0);
}

#[test]
fn test_link_seek_tell() {
    init(&[], &[]);

    let root_fd = 3;
    let new_file_name = String::from("file.txt");

    let file_fd = create_test_file(root_fd as Fd, &new_file_name);

    // test seek and tell
    let mut position: wasi::Filesize = 0;

    unsafe { __ic_custom_fd_tell(file_fd, &mut position as *mut wasi::Filesize) };

    assert!(position == 32);

    let mut position_after_seek: wasi::Filesize = 0;
    unsafe {
        __ic_custom_fd_seek(
            file_fd,
            10,
            0,
            &mut position_after_seek as *mut wasi::Filesize,
        )
    };

    assert!(position_after_seek == 10);

    // create link
    let link_file_name = String::from("file_link.txt");

    let res = unsafe {
        __ic_custom_path_link(
            root_fd,
            0,
            new_file_name.as_ptr(),
            new_file_name.len() as i32,
            root_fd,
            link_file_name.as_ptr(),
            link_file_name.len() as i32,
        )
    };

    assert!(res == 0);

    let mut link_file_fd = 0 as Fd;

    // open file for reading
    let res = unsafe {
        __ic_custom_path_open(
            root_fd,
            0,
            link_file_name.as_ptr(),
            link_file_name.len() as i32,
            0,
            wasi::RIGHTS_FD_WRITE | wasi::RIGHTS_FD_READ,
            0,
            0,
            (&mut link_file_fd) as *mut Fd,
        )
    };
    assert!(res == 0);

    // the file should be on the position
    let mut position_link: wasi::Filesize = 0;
    unsafe {
        __ic_custom_fd_seek(
            link_file_fd,
            10,
            0,
            &mut position_link as *mut wasi::Filesize,
        )
    };

    assert!(position_link == 10);

    let mut buf_to_read1 = String::from("................");

    let mut read_buf = vec![wasi::Iovec {
        buf: buf_to_read1.as_mut_ptr(),
        buf_len: buf_to_read1.len(),
    }];

    let mut bytes_read: wasi::Size = 0;

    let res = unsafe {
        __ic_custom_fd_read(
            link_file_fd,
            read_buf.as_mut_ptr(),
            (read_buf.len()) as i32,
            (&mut bytes_read) as *mut wasi::Size,
        )
    };

    assert!(res == 0);

    assert!(buf_to_read1 == "sample text.1234");
}

#[test]
fn test_seek_types() {
    init(&[], &[]);

    let file_fd = create_test_file(3 as Fd, "file.txt");

    // test seek and tell
    let mut position: wasi::Filesize = 0;
    unsafe { __ic_custom_fd_tell(file_fd, &mut position as *mut wasi::Filesize) };
    assert!(position == 32);

    let mut position_after_seek: wasi::Filesize = 0;
    unsafe {
        __ic_custom_fd_seek(
            file_fd,
            10,
            0,
            &mut position_after_seek as *mut wasi::Filesize,
        )
    };
    assert!(position_after_seek == 10);

    let mut position_after_seek: wasi::Filesize = 0;
    unsafe {
        __ic_custom_fd_seek(
            file_fd,
            2,
            1,
            &mut position_after_seek as *mut wasi::Filesize,
        )
    };
    assert!(position_after_seek == 12);

    let mut position_after_seek: wasi::Filesize = 0;
    unsafe {
        __ic_custom_fd_seek(
            file_fd,
            -2,
            2,
            &mut position_after_seek as *mut wasi::Filesize,
        )
    };

    assert!(position_after_seek == 30);
}

#[test]
fn test_advice() {
    init(&[], &[]);

    let file_fd = create_test_file(3, "file.txt");

    assert!(__ic_custom_fd_advise(file_fd, 0, 500, 0) == 0);

    assert!(__ic_custom_fd_advise(file_fd + 10, 0, 500, 0) > 0);

    assert!(__ic_custom_fd_advise(file_fd, 0, 500, 10) > 0);
}

#[test]
fn test_allocate() {
    init(&[], &[]);

    let file_fd = create_test_file(3, "file.txt");

    assert!(__ic_custom_fd_allocate(file_fd, 0, 500) == 0);
    assert!(__ic_custom_fd_allocate(7, 0, 500) == wasi::ERRNO_BADF.raw() as i32);
}

#[test]
fn test_datasync() {
    init(&[], &[]);

    let file_fd = create_test_file(3, "file.txt");

    assert!(__ic_custom_fd_datasync(file_fd) == 0);

    let res = __ic_custom_fd_datasync(7);
    assert!(res == wasi::ERRNO_BADF.raw() as i32);
}

#[test]
fn test_rename_unlink() {
    init(&[], &[]);

    let filename1 = "file1.txt";
    let filename2 = "file2.txt";
    let filename3 = "file3.txt";
    let filename1_renamed = "file1_renamed.txt";

    let file_fd = create_test_file(3, filename1);
    __ic_custom_fd_close(file_fd);
    let file_fd = create_test_file(3, filename2);
    __ic_custom_fd_close(file_fd);
    let file_fd = create_test_file(3, filename3);
    __ic_custom_fd_close(file_fd);

    let res = unsafe {
        __ic_custom_path_rename(
            3,
            filename1.as_ptr(),
            filename1.len() as i32,
            3,
            filename1_renamed.as_ptr(),
            filename1_renamed.len() as i32,
        )
    };
    assert!(res == 0);

    let res =
        unsafe { __ic_custom_path_unlink_file(3, filename3.as_ptr(), filename3.len() as i32) };
    assert!(res == 0);

    // list files, include . and ..
    let files = read_directory(3);

    assert_eq!(files.len(), 4);

    assert!(files.contains(&String::from(".")));
    assert!(files.contains(&String::from("..")));
    assert!(files.contains(&String::from("file1_renamed.txt")));
    assert!(files.contains(&String::from("file2.txt")));
}

#[test]
fn test_fd_stat_get_fd_stat_set_flags() {
    init(&[], &[]);

    let mut stat: wasi::Fdstat = wasi::Fdstat {
        fs_filetype: wasi::FILETYPE_UNKNOWN,
        fs_flags: 0,
        fs_rights_base: wasi::RIGHTS_FD_READ,
        fs_rights_inheriting: wasi::RIGHTS_FD_READ,
    };

    let file_fd = create_test_file(3, "file.txt");

    let ret = unsafe { __ic_custom_fd_fdstat_get(file_fd, (&mut stat) as *mut wasi::Fdstat) };
    assert!(ret == 0);

    let mut fs_flags = stat.fs_flags;
    assert!(fs_flags == 0);

    fs_flags = 4;

    __ic_custom_fd_fdstat_set_flags(file_fd, fs_flags as i32);

    let ret = unsafe { __ic_custom_fd_fdstat_get(file_fd, (&mut stat) as *mut wasi::Fdstat) };
    assert!(ret == 0);

    assert!(stat.fs_flags == fs_flags);
}

#[test]
fn test_path_filestat_get_set_times() {
    init(&[], &[]);

    let filename = "file.txt";

    let file_fd = create_test_file(3, filename);
    __ic_custom_fd_close(file_fd);

    let mut filestat: wasi::Filestat = wasi::Filestat {
        dev: 0,
        ino: 0,
        filetype: wasi::FILETYPE_UNKNOWN,
        nlink: 0,
        size: 0,
        atim: 0,
        mtim: 0,
        ctim: 0,
    };

    unsafe {
        __ic_custom_path_filestat_get(
            3,
            0,
            filename.as_ptr(),
            filename.len() as i32,
            &mut filestat as *mut wasi::Filestat,
        )
    };

    unsafe {
        __ic_custom_path_filestat_set_times(
            3,
            0,
            filename.as_ptr(),
            filename.len() as i32,
            123,
            456,
            1 + 4,
        );
    }

    let mut filestat2: wasi::Filestat = wasi::Filestat {
        dev: 0,
        ino: 0,
        filetype: wasi::FILETYPE_UNKNOWN,
        nlink: 0,
        size: 0,
        atim: 0,
        mtim: 0,
        ctim: 0,
    };

    unsafe {
        __ic_custom_path_filestat_get(
            3,
            0,
            filename.as_ptr(),
            filename.len() as i32,
            &mut filestat2 as *mut wasi::Filestat,
        )
    };

    assert!(filestat2.atim == 123);
    assert!(filestat2.mtim == 456);
}

#[test]
fn test_fd_renumber_over_opened_file() {
    init(&[], &[]);

    let filename = "file.txt";

    let file_fd = create_test_file(3, filename);

    let filename2 = "file2.txt";
    let second_file_fd = create_test_file_with_content(3, filename2, vec![String::from("12345")]);

    let mut position: wasi::Filesize = 0 as wasi::Filesize;
    unsafe { __ic_custom_fd_tell(second_file_fd, &mut position as *mut wasi::Filesize) };

    assert!(position == 5);

    __ic_custom_fd_renumber(file_fd, second_file_fd);

    unsafe { __ic_custom_fd_tell(second_file_fd, &mut position as *mut wasi::Filesize) };

    // we expect the create_test_file to leave the cursor at the position 32
    assert!(position == 32);
}

use ic_stable_structures::VectorMemory;

// create new vector memory
pub fn new_vector_memory() -> VectorMemory {
    use std::{cell::RefCell, rc::Rc};

    Rc::new(RefCell::new(Vec::new()))
}

// initialize existing memory
fn new_vector_memory_init(v: Vec<u8>) -> VectorMemory {
    use std::{cell::RefCell, rc::Rc};

    Rc::new(RefCell::new(v))
}

#[test]
fn test_with_custom_memory() {
    let memory = new_vector_memory();

    init_with_memory(&[], &[], memory.clone());

    // do something with the file system
    //...

    // copy memory into a second vector
    let v: Vec<u8> = memory.borrow().clone();

    // init system with a new memory
    let memory2 = new_vector_memory_init(v);
    init_with_memory(&[], &[], memory2.clone());

    //
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

/*
// TODO: this test brakes coverage for some reason

#[test]
fn test_overwrite_preopen() {
    init(&[], &[]);

    let root_fd = 3;

    unsafe {
        let file_fd = create_test_file(3, "test/file.txt");
        wasi::fd_close(file_fd).unwrap();

        let dir_fd = wasi::path_open(root_fd, 0, "test", wasi::OFLAGS_DIRECTORY, 0, 0, 0).unwrap();

        let pre_fd: wasi::Fd = (libc::STDERR_FILENO + 1) as wasi::Fd;

        assert!(dir_fd > pre_fd, "dir_fd number");

        let old_dir_filestat = wasi::fd_filestat_get(dir_fd).expect("failed fd_filestat_get");

        // Try to renumber over a preopened directory handle.
        wasi::fd_renumber(dir_fd, pre_fd).expect("renumbering over a preopened file descriptor");

        // Ensure that pre_fd is still open.
        let new_dir_filestat = wasi::fd_filestat_get(pre_fd).expect("failed fd_filestat_get");

        // Ensure that we renumbered.
        assert_eq!(old_dir_filestat.dev, new_dir_filestat.dev);
        assert_eq!(old_dir_filestat.ino, new_dir_filestat.ino);

        // Ensure that dir_fd is closed.
        assert_eq!(
            wasi::fd_fdstat_get(dir_fd).expect_err("failed fd_fdstat_get"),
            wasi::ERRNO_BADF
        );
    }
}

*/

#[test]
fn test_renumber() {
    init(&[], &[]);

    let root_fd = 3;

    unsafe {
        let file_fd = create_test_file(3, "test/file.txt");
        wasi::fd_close(file_fd).unwrap();

        let dir_fd = wasi::path_open(root_fd, 0, "test", wasi::OFLAGS_DIRECTORY, 0, 0, 0).unwrap();

        let pre_fd: wasi::Fd = (libc::STDERR_FILENO + 1) as wasi::Fd;

        assert!(dir_fd > pre_fd, "dir_fd number");

        // Create a file in the scratch directory.
        let fd_from = wasi::path_open(
            dir_fd,
            0,
            "file1",
            wasi::OFLAGS_CREAT,
            wasi::RIGHTS_FD_READ | wasi::RIGHTS_FD_WRITE,
            0,
            0,
        )
        .expect("opening a file");

        assert!(
            fd_from > libc::STDERR_FILENO as wasi::Fd,
            "file descriptor range check",
        );

        // Get fd_from fdstat attributes
        let fdstat_from =
            wasi::fd_fdstat_get(fd_from).expect("calling fd_fdstat on the open file descriptor");

        // Create another file in the scratch directory.
        let fd_to = wasi::path_open(
            dir_fd,
            0,
            "file2",
            wasi::OFLAGS_CREAT,
            wasi::RIGHTS_FD_READ | wasi::RIGHTS_FD_WRITE,
            0,
            0,
        )
        .expect("opening a file");
        assert!(
            fd_to > libc::STDERR_FILENO as wasi::Fd,
            "file descriptor range check",
        );

        // Renumber fd of file1 into fd of file2
        wasi::fd_renumber(fd_from, fd_to).expect("renumbering two descriptors");

        // Ensure that fd_from is closed
        assert_eq!(
            wasi::fd_close(fd_from).expect_err("closing already closed file descriptor"),
            wasi::ERRNO_BADF
        );

        // Ensure that fd_to is still open.
        let fdstat_to =
            wasi::fd_fdstat_get(fd_to).expect("calling fd_fdstat on the open file descriptor");
        assert_eq!(
            fdstat_from.fs_filetype, fdstat_to.fs_filetype,
            "expected fd_to have the same fdstat as fd_from"
        );
        assert_eq!(
            fdstat_from.fs_flags, fdstat_to.fs_flags,
            "expected fd_to have the same fdstat as fd_from"
        );
        assert_eq!(
            fdstat_from.fs_rights_base, fdstat_to.fs_rights_base,
            "expected fd_to have the same fdstat as fd_from"
        );
        assert_eq!(
            fdstat_from.fs_rights_inheriting, fdstat_to.fs_rights_inheriting,
            "expected fd_to have the same fdstat as fd_from"
        );

        wasi::fd_close(fd_to).expect("closing a file");
    }
}

#[test]
fn test_remove_directory() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        // Create a directory in the scratch directory.
        wasi::path_create_directory(dir_fd, "dir").expect("creating a directory");

        // Test that removing it succeeds.
        wasi::path_remove_directory(dir_fd, "dir")
            .expect("remove_directory on a directory should succeed");

        // There isn't consistient behavior across operating systems of whether removing with a
        // directory where the path has a trailing slash succeeds or fails, so we won't test
        // that behavior.

        // Create a temporary file.
        create_empty_test_file(dir_fd, "file");

        // Test that removing it with no trailing slash fails.
        assert_eq!(
            wasi::path_remove_directory(dir_fd, "file")
                .expect_err("remove_directory without a trailing slash on a file should fail"),
            wasi::ERRNO_NOTDIR
        );

        // Test that removing it with a trailing slash fails.
        assert_eq!(
            wasi::path_remove_directory(dir_fd, "file/")
                .expect_err("remove_directory with a trailing slash on a file should fail"),
            wasi::ERRNO_NOTDIR
        );

        wasi::path_unlink_file(dir_fd, "file").expect("removing a file");
    }
}

#[test]
fn test_remove_nonempty_directory() {
    init(&[], &[]);

    let dir_fd = 3;

    unsafe {
        // Create a directory in the scratch directory.
        wasi::path_create_directory(dir_fd, "dir").expect("creating a directory");

        // Create a directory in the directory we just created.
        wasi::path_create_directory(dir_fd, "dir/nested").expect("creating a subdirectory");

        // Test that attempting to unlink the first directory returns the expected error code.
        assert_eq!(
            wasi::path_remove_directory(dir_fd, "dir")
                .expect_err("remove_directory on a directory should return ENOTEMPTY"),
            wasi::ERRNO_NOTEMPTY
        );

        // Removing the directories.
        wasi::path_remove_directory(dir_fd, "dir/nested")
            .expect("remove_directory on a nested directory should succeed");
        wasi::path_remove_directory(dir_fd, "dir").expect("removing a directory");
    }
}

#[test]
fn unicode_write() {
    let text = "مرحبا بكم\n";

    let ciovecs = [wasi::Ciovec {
        buf: text.as_bytes().as_ptr(),
        buf_len: text.len(),
    }];

    let written = unsafe { wasi::fd_write(libc::STDOUT_FILENO, &ciovecs) }.expect("write succeeds");
    assert_eq!(written, text.len(), "full contents should be written");
}

#[test]
fn test_ic_custom_fd_fdstat_set_rights_success() {
    let dir_fd = 3;

    init(&[], &[]);

    unsafe {
        let fd = create_test_file(dir_fd, "file.txt");

        let fdstat =
            wasi::fd_fdstat_get(fd).expect("calling fd_fdstat on the open file descriptor");

        assert_eq!(fdstat.fs_rights_base, common::DEFAULT_RIGHTS);
        assert_eq!(fdstat.fs_rights_inheriting, common::DEFAULT_RIGHTS);

        wasi::fd_fdstat_set_rights(fd, 6, 6).unwrap();

        let fdstat =
            wasi::fd_fdstat_get(fd).expect("calling fd_fdstat on the open file descriptor");

        assert_eq!(fdstat.fs_rights_base, 6 & common::DEFAULT_RIGHTS);
        assert_eq!(fdstat.fs_rights_inheriting, 6 & common::DEFAULT_RIGHTS);
    }
}

#[test]
fn test_mounts() {
    let dir_fd = 3;

    init(&[], &[]);

    let memory = new_vector_memory();
    let file_name = "file.txt";
    let hello_message = "Hello host".to_string();
    let hello_message2 = "Hello from regular file".to_string();

    mount_memory_file(
        file_name,
        Box::new(memory.clone()),
        MountedFileSizePolicy::PreviousOrZero,
    );

    // write something into a host memory file
    let fd = create_test_file_with_content(dir_fd, file_name, vec![hello_message.clone()]);
    fd_close(fd);

    // the memory should contain the file now
    let v: Vec<u8> = memory.borrow().clone();
    assert_eq!(&v[0..hello_message.len()], hello_message.as_bytes());

    let str = read_file_to_string(file_name);
    assert_eq!(str, hello_message);

    // unmount file, the file.txt should become empty
    unmount_memory_file(file_name);
    let str = read_file_to_string(file_name);
    assert_eq!(str, "".to_string());

    // mount again, the old content should recover
    mount_memory_file(
        file_name,
        Box::new(memory.clone()),
        MountedFileSizePolicy::PreviousOrZero,
    );
    let str = read_file_to_string(file_name);
    assert_eq!(str, hello_message);

    // store mounted contents into the host file, check the host file content is renewed
    store_memory_file(file_name);
    unmount_memory_file(file_name);
    let str = read_file_to_string(file_name);
    assert_eq!(str, hello_message);

    // write some other content message,
    // check there is a new content now
    let fd = create_test_file_with_content(dir_fd, file_name, vec![hello_message2.clone()]);
    fd_close(fd);
    let str = read_file_to_string(file_name);
    assert_eq!(str, hello_message2);

    // after mounting, we still have the old content
    mount_memory_file(
        file_name,
        Box::new(memory.clone()),
        MountedFileSizePolicy::PreviousOrZero,
    );
    let str = read_file_to_string(file_name);
    assert_eq!(str, hello_message);

    // initializing should recover the data from the host file to the mounted memory
    init_memory_file(file_name);
    let str = read_file_to_string(file_name);
    assert_eq!(str, hello_message2);
}

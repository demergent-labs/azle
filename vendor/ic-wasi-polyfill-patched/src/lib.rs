use std::cell::RefCell;
use std::ops::Range;

use ic_stable_structures::memory_manager::MemoryManager;
use ic_stable_structures::{DefaultMemoryImpl, Memory};

use rand::{RngCore, SeedableRng};

use stable_fs::fs::{DstBuf, Fd, SrcBuf};
use stable_fs::fs::{FdFlags, FdStat, FileSize, OpenFlags};

use stable_fs::storage::dummy::DummyStorage;

#[cfg(target_arch = "wasm32")]
pub mod wasi;

#[cfg(not(all(target_arch = "wasm32")))]
pub mod wasi_mock;
#[cfg(not(all(target_arch = "wasm32")))]
pub use wasi_mock as wasi;

use environment::*;
use wasi_helpers::*;

mod environment;
pub mod wasi_helpers;

pub use stable_fs::fs::FileSystem;

pub use stable_fs::fs::{ChunkSize, ChunkType};
pub use stable_fs::storage::stable::StableStorage;
pub use stable_fs::storage::transient::TransientStorage;
pub use stable_fs::storage::types::MountedFileSizePolicy;

#[allow(dead_code)]
#[allow(unused_imports)]
#[cfg(target_arch = "wasm32")]
use ic_cdk::api::instruction_counter as ic_instruction_counter;
#[allow(dead_code)]
#[cfg(not(all(target_arch = "wasm32")))]
fn ic_instruction_counter() -> u64 {
    0
}

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

#[cfg(target_arch = "wasm32")]
use ic_cdk::api::debug_print as ic_print;
#[cfg(not(all(target_arch = "wasm32")))]
fn ic_print(value: &str) {
    println!("{value}");
}

#[allow(clippy::missing_safety_doc)]
pub unsafe fn forward_to_debug(iovs: *const wasi::Ciovec, len: i32, res: *mut wasi::Size) -> i32 {
    let iovs = unsafe { std::slice::from_raw_parts(iovs, len as usize) };

    let mut written = 0;

    for iov in iovs {
        let buf = unsafe { std::slice::from_raw_parts(iov.buf, iov.buf_len) };
        let str = std::str::from_utf8(buf).unwrap_or("");
        ic_print(str);
        written += iov.buf_len;
    }

    unsafe { *res = written };

    wasi::ERRNO_SUCCESS.raw() as i32
}

thread_local! {
    /// Random number generator
    pub static RNG : RefCell<rand::rngs::StdRng> = RefCell::new(rand::rngs::StdRng::from_seed([0;32]));

    /// File system storage
    pub static FS: RefCell<FileSystem> = RefCell::new(
        FileSystem::new(
            if cfg!(feature = "transient") {
                // transient feature does not require explicit initialization
                Box::new(TransientStorage::new())
            } else {
                Box::new(DummyStorage::new())
            }
        ).unwrap()
    );

    /// Accumulative instruction counter
    pub static COUNTER : RefCell<u64> = const { RefCell::new(0) };

    /// Current environment
    pub static ENV: RefCell<Environment> = RefCell::new(Environment::new());
}

#[cfg(feature = "count_wasi_calls")]
fn update_counter(start: u64) {
    COUNTER.with_borrow_mut(|counter| {
        *counter += ic_instruction_counter() - start;
    })
}

#[allow(unused_macros)]
macro_rules! debug_instructions {
    ($fn_name:literal) => {
        ic_print(&format!("\t{}", $fn_name))
    };
    ($fn_name:literal, $params:expr) => {
        ic_print(&format!(
            "\t{}\tparameters:\t{}\t",
            $fn_name,
            format!($params)
        ))
    };
    ($fn_name:literal, $sresult:expr, $stime:expr) => {
        let etime = ic_instruction_counter();

        ic_print(&format!(
            "\t -> {}\tinstructions:\t{}\n",
            $sresult,
            etime - ($stime)
        ))
    };
    ($fn_name:literal, $sresult:expr, $stime:expr, $out_params:expr) => {
        let etime = ic_instruction_counter();

        ic_print(&format!(
            "\t -> {}\tinstructions:\t{}\tout parameters:\t{}\n",
            $sresult,
            etime - ($stime),
            format!($out_params)
        ))
    };
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_fd_write(
    fd: Fd,
    iovs: *const wasi::Ciovec,
    len: i32,
    res: *mut wasi::Size,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_write");

    let src_io_vec: *const SrcBuf = iovs as *const SrcBuf;
    let src_io_vec: &[SrcBuf] =
        unsafe { std::slice::from_raw_parts(src_io_vec, len as wasi::Size) };

    #[cfg(feature = "report_wasi_calls")]
    {
        let lengths: Vec<_> = src_io_vec.iter().map(|x| x.len).collect();

        let l = format!("iovs.lengths={lengths:?}");
        debug_instructions!("__ic_custom_fd_write", "fd={fd:?} iovs.len={len:?} {l}");
    }

    let result = if fd < 3 {
        unsafe { forward_to_debug(iovs, len, res) }
    } else {
        FS.with(|fs| {
            let mut fs = fs.borrow_mut();

            match fs.write_vec(fd as Fd, src_io_vec) {
                Ok(r) => {
                    unsafe { *res = r as wasi::Size };
                    wasi::ERRNO_SUCCESS.raw() as i32
                }
                Err(er) => {
                    unsafe { *res = 0 };
                    into_errno(er)
                }
            }
        })
    };

    #[cfg(feature = "report_wasi_calls")]
    {
        let r = format!("res={}", *res);
        debug_instructions!("__ic_custom_fd_write", result, start, "{r}");
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);

    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_fd_read(
    fd: Fd,
    iovs: *const wasi::Iovec,
    len: i32,
    res: *mut wasi::Size,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_read");

    let dst_io_vec = iovs as *const DstBuf;
    let dst_io_vec: &[DstBuf] =
        unsafe { std::slice::from_raw_parts(dst_io_vec, len as wasi::Size) };

    #[cfg(feature = "report_wasi_calls")]
    {
        let lengths: Vec<_> = dst_io_vec.iter().map(|x: &DstBuf| x.len).collect();
        let l = format!("iovs.lengths={lengths:?}");

        debug_instructions!("__ic_custom_fd_read", "fd={fd:?} iovs.lengths={l}");
    }

    // for now we don't support reading from the standard streams
    if fd < 3 {
        #[cfg(feature = "count_wasi_calls")]
        update_counter(start);

        return wasi::ERRNO_INVAL.raw() as i32;
    }

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        match fs.read_vec(fd as Fd, dst_io_vec) {
            Ok(r) => {
                unsafe { *res = r as wasi::Size };
                wasi::ERRNO_SUCCESS.raw() as i32
            }
            Err(er) => {
                unsafe { *res = 0 };
                into_errno(er)
            }
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    {
        let r = format!("res={}", *res);
        debug_instructions!("__ic_custom_fd_read", result, start, "{r}");
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_fd_pwrite(
    fd: Fd,
    iovs: *const wasi::Ciovec,
    len: i32,
    offset: i64,
    res: *mut wasi::Size,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_pwrite");

    let src_io_vec: *const SrcBuf = iovs as *const SrcBuf;
    let src_io_vec: &[SrcBuf] =
        unsafe { std::slice::from_raw_parts(src_io_vec, len as wasi::Size) };

    #[cfg(feature = "report_wasi_calls")]
    {
        let lengths: Vec<_> = src_io_vec.iter().map(|x: &SrcBuf| x.len).collect();
        let l = format!("iovs.lengths={lengths:?}");
        debug_instructions!(
            "__ic_custom_fd_pwrite",
            "fd={fd:?} iovs.len={len:?} offset={offset} iovs.lengths={l}"
        );
    }

    let result = if fd < 3 {
        unsafe { forward_to_debug(iovs, len, res) }
    } else {
        FS.with(|fs| {
            let mut fs = fs.borrow_mut();
            match fs.write_vec_with_offset(fd as Fd, src_io_vec, offset as FileSize) {
                Ok(r) => {
                    unsafe { *res = r as wasi::Size };

                    wasi::ERRNO_SUCCESS.raw() as i32
                }
                Err(er) => {
                    unsafe { *res = 0 };
                    into_errno(er)
                }
            }
        })
    };

    #[cfg(feature = "report_wasi_calls")]
    {
        let r = format!("res={}", *res);
        debug_instructions!("__ic_custom_fd_pwrite", result, start, "{r}");
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);

    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_fd_pread(
    fd: Fd,
    iovs: *const wasi::Iovec,
    len: i32,
    offset: i64,
    res: *mut wasi::Size,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    let dst_io_vec = iovs as *const DstBuf;
    let dst_io_vec = unsafe { std::slice::from_raw_parts(dst_io_vec, len as wasi::Size) };

    #[cfg(feature = "report_wasi_calls")]
    {
        let lengths: Vec<_> = dst_io_vec.iter().map(|x: &DstBuf| x.len).collect();
        let l = format!("iovs.lengths={lengths:?}");

        debug_instructions!(
            "__ic_custom_fd_pread",
            "fd={fd:?} iovs.lengths={l} offset={offset:?}"
        );
    }

    // for now we don't support reading from the standard streams
    if fd < 3 {
        #[cfg(feature = "count_wasi_calls")]
        update_counter(start);

        return wasi::ERRNO_INVAL.raw() as i32;
    }

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let reading_result = fs.read_vec_with_offset(fd as Fd, dst_io_vec, offset as FileSize);

        match reading_result {
            Ok(r) => {
                unsafe { *res = r as wasi::Size };
                wasi::ERRNO_SUCCESS.raw() as i32
            }
            Err(er) => {
                unsafe { *res = 0 };
                into_errno(er)
            }
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    {
        let r = format!("res={}", *res);
        debug_instructions!("__ic_custom_fd_pread", result, start, "{r}");
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);

    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_fd_seek(
    fd: Fd,
    delta: i64,
    whence: i32,
    res: *mut wasi::Filesize,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_fd_seek",
        "fd={fd:?} delta={delta:?} whence={whence:?}"
    );

    // standart streams not supported
    if fd < 3 {
        #[cfg(feature = "count_wasi_calls")]
        update_counter(start);

        return wasi::ERRNO_INVAL.raw() as i32;
    }

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        match fs.seek(
            fd as Fd,
            delta,
            wasi_helpers::into_stable_fs_wence(whence as u8),
        ) {
            Ok(r) => {
                unsafe { *res = r as wasi::Filesize };

                wasi::ERRNO_SUCCESS.raw() as i32
            }
            Err(er) => {
                unsafe { *res = 0 };
                into_errno(er)
            }
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    {
        let r = format!("res={}", unsafe { *res });
        debug_instructions!("__ic_custom_fd_seek", result, start, "{r}");
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);

    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_path_open(
    parent_fd: Fd,
    dirflags: i32,
    path: *const u8,
    path_len: i32,

    oflags: i32,
    fs_rights_base: wasi::Rights,
    fs_rights_inheriting: wasi::Rights,

    fdflags: i32,
    res: *mut Fd,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    let file_name = unsafe { get_file_name(path, path_len as wasi::Size) };

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_path_open",
        "parent_fd={parent_fd} dirflags={dirflags} path={file_name} oflags={oflags} fdflags={fdflags}"
    );

    // dirflags contains the information on whether to follow the symlinks,
    // the symlinks are not supported yet by the file system
    prevent_elimination(&[dirflags]);

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let fd_stat = FdStat {
            flags: FdFlags::from_bits_truncate(fdflags as u16),
            rights_base: fs_rights_base,
            rights_inheriting: fs_rights_inheriting,
        };

        let open_flags = OpenFlags::from_bits_truncate(oflags as u16);

        let now = ic_time();

        let r = fs.open(parent_fd as Fd, file_name, fd_stat, open_flags, now);

        match r {
            Ok(r) => {
                unsafe { *res = r as Fd };
                wasi::ERRNO_SUCCESS.raw() as i32
            }
            Err(er) => {
                unsafe { *res = 0 };
                into_errno(er)
            }
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    {
        let par = format!("res={}", *res);
        debug_instructions!("__ic_custom_path_open", result, start, "{par}");
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);

    result
}

#[unsafe(no_mangle)]
#[inline(never)]
pub extern "C" fn __ic_custom_fd_close(fd: Fd) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_close", "fd={fd:?}");

    let result = FS.with(|fs| {
        let res = fs.borrow_mut().close(fd as Fd);

        match res {
            Ok(_) => wasi::ERRNO_SUCCESS.raw() as i32,
            Err(er) => into_errno(er),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_close", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_fd_filestat_get(fd: Fd, ret_val: *mut wasi::Filestat) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_filestat_get", "fd={fd:?}");

    let result = FS.with(|fs| {
        let fs = fs.borrow();
        let res = fs.metadata(fd);

        match res {
            Ok(metadata) => {
                let value: wasi::Filestat = wasi::Filestat {
                    dev: 0,
                    ino: metadata.node,
                    filetype: into_wasi_filetype(metadata.file_type),
                    nlink: metadata.link_count,
                    size: metadata.size,
                    atim: metadata.times.accessed,
                    mtim: metadata.times.modified,
                    ctim: metadata.times.created,
                };

                unsafe {
                    *ret_val = value;
                }

                wasi::ERRNO_SUCCESS.raw() as i32
            }
            Err(er) => into_errno(er),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    {
        let ret = format!("ret_val={:?}", unsafe { *ret_val });
        debug_instructions!("__ic_custom_fd_filestat_get", result, start, "{ret}");
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
pub extern "C" fn __ic_custom_fd_sync(fd: Fd) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_sync", "fd={fd}");

    let result = FS.with(|fs| match fs.borrow_mut().flush(fd as Fd) {
        Ok(()) => wasi::ERRNO_SUCCESS.raw() as i32,
        Err(er) => into_errno(er),
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_sync", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_fd_tell(fd: Fd, res: *mut wasi::Filesize) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_tell", "fd={fd}");

    // standard streams not supported
    if fd < 3 {
        return wasi::ERRNO_BADF.raw() as i32;
    }

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        match fs.tell(fd as Fd) {
            Ok(pos) => {
                unsafe { *res = pos as wasi::Filesize };

                wasi::ERRNO_SUCCESS.raw() as i32
            }
            Err(er) => {
                unsafe { *res = 0 };
                into_errno(er)
            }
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    {
        let r = format!("{}", unsafe { *res });
        debug_instructions!("__ic_custom_fd_tell", result, start, "{r}");
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_fd_prestat_get(fd: i32, prestat: *mut wasi::Prestat) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_prestat_get", "fd={fd:?}");

    let ret = FS.with(|fs| {
        let fs = fs.borrow();

        if fd as Fd == fs.root_fd() {
            let root_len = fs.root_path().len();

            let pstat = wasi::Prestat {
                tag: 0,
                u: wasi::PrestatU {
                    dir: wasi::PrestatDir {
                        pr_name_len: root_len,
                    },
                },
            };

            unsafe { *prestat = pstat };

            wasi::ERRNO_SUCCESS.raw() as i32
        } else {
            wasi::ERRNO_BADF.raw() as i32
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    {
        let r = format!("prestat.u.dir.pr_name_len={}", unsafe {
            (*prestat).u.dir.pr_name_len
        });
        debug_instructions!("__ic_custom_fd_prestat_get fd={}", ret, start, "{r}");
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    ret
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_fd_prestat_dir_name(
    fd: i32,
    path: *mut u8,
    max_len: i32,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_fd_prestat_dir_name",
        "fd={fd} max_len={max_len}"
    );

    let max_len = max_len as wasi::Size;

    let result = FS.with(|fs| {
        let fs = fs.borrow();

        if fd as Fd == fs.root_fd() {
            let max_len = std::cmp::min(max_len as i32, fs.root_path().len() as i32) as usize;

            for i in 0..max_len {
                unsafe {
                    path.add(i).write(fs.root_path().as_bytes()[i]);
                }
            }

            wasi::ERRNO_SUCCESS.raw() as i32
        } else {
            wasi::ERRNO_BADF.raw() as i32
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    {
        let mn = std::cmp::min(max_len as usize, 50);
        let buf = unsafe { std::slice::from_raw_parts_mut(path, mn) };

        let ret_path = format!("buf={buf:?}... ");

        debug_instructions!(
            "__ic_custom_fd_prestat_dir_name",
            result,
            start,
            "ret_path={ret_path}"
        );
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
pub extern "C" fn __ic_custom_fd_advise(fd: Fd, offset: i64, len: i64, advice: i32) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_fd_advise",
        "fd={fd} offset={offset} len={len} advice={advice}"
    );

    let result = if advice > 5 {
        wasi::ERRNO_INVAL.raw() as i32
    } else {
        FS.with(|fs| {
            let advice = stable_fs::fs::Advice::try_from(advice as u8);

            match advice {
                Ok(advice) => {
                    match fs.borrow_mut().advice(
                        fd as Fd,
                        offset as FileSize,
                        len as FileSize,
                        advice,
                    ) {
                        Ok(()) => wasi::ERRNO_SUCCESS.raw() as i32,
                        Err(er) => into_errno(er),
                    }
                }
                Err(err) => into_errno(err),
            }
        })
    };

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_advise", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
pub extern "C" fn __ic_custom_fd_allocate(fd: Fd, offset: i64, len: i64) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_fd_allocate",
        "fd={fd:?} offset={offset:?} len={len:?}"
    );

    let result = FS.with(|fs| {
        match fs
            .borrow_mut()
            .allocate(fd as Fd, offset as FileSize, len as FileSize)
        {
            Ok(()) => wasi::ERRNO_SUCCESS.raw() as i32,
            Err(er) => into_errno(er),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_allocate", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
pub extern "C" fn __ic_custom_fd_datasync(fd: Fd) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_datasync", "fd={fd:?}");

    let result = FS.with(|fs| match fs.borrow_mut().flush(fd as Fd) {
        Ok(()) => wasi::ERRNO_SUCCESS.raw() as i32,
        Err(er) => into_errno(er),
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_datasync", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_fd_fdstat_get(fd: Fd, ret_fdstat: *mut wasi::Fdstat) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_fdstat_get", "fd={fd:?}");

    let result = FS.with(|fs| {
        let fs = fs.borrow();

        let stat = fs.get_stat(fd as Fd);

        match stat {
            Ok((ftype, fdstat)) => {
                let tmp_fd_stat = wasi::Fdstat {
                    fs_filetype: into_wasi_filetype(ftype),
                    fs_flags: fdstat.flags.bits(),
                    fs_rights_base: fdstat.rights_base,
                    fs_rights_inheriting: fdstat.rights_inheriting,
                };

                unsafe { *ret_fdstat = tmp_fd_stat };

                wasi::ERRNO_SUCCESS.raw() as i32
            }
            Err(err) => wasi_helpers::into_errno(err),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    {
        let r = format!("ret_fdstat={:?}", unsafe { *ret_fdstat });
        debug_instructions!("__ic_custom_fd_fdstat_get", result, start, "{r}");
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
pub extern "C" fn __ic_custom_fd_fdstat_set_flags(fd: Fd, new_flags: i32) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_fd_fdstat_set_flags",
        "fd={fd} new_flags={new_flags}"
    );

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let stat = fs.get_stat(fd as Fd);

        match stat {
            Ok((_ftype, mut fdstat)) => {
                let new_flags = FdFlags::from_bits(new_flags as u16);

                if new_flags.is_none() {
                    return wasi::ERRNO_INVAL.raw() as i32;
                }

                fdstat.flags = new_flags.unwrap();

                match fs.set_stat(fd as Fd, fdstat) {
                    Ok(_) => wasi::ERRNO_SUCCESS.raw() as i32,
                    Err(err) => wasi_helpers::into_errno(err),
                }
            }
            Err(err) => wasi_helpers::into_errno(err),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_fdstat_set_flags", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
pub extern "C" fn __ic_custom_fd_fdstat_set_rights(
    fd: i32,
    rights_base: i64,
    rights_inheriting: i64,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_fd_fdstat_set_rights",
        "fd={fd} rights_base={rights_base} rights_inheriting={rights_inheriting}"
    );

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let stat = fs.get_stat(fd as Fd);

        match stat {
            Ok((_ftype, mut fdstat)) => {
                fdstat.rights_base &= rights_base as u64;
                fdstat.rights_inheriting &= rights_inheriting as u64;

                match fs.set_stat(fd as Fd, fdstat) {
                    Ok(_) => wasi::ERRNO_SUCCESS.raw() as i32,
                    Err(err) => wasi_helpers::into_errno(err),
                }
            }
            Err(err) => wasi_helpers::into_errno(err),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_fdstat_set_rights", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
pub extern "C" fn __ic_custom_fd_filestat_set_size(fd: Fd, size: i64) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_fd_filestat_set_size",
        "fd={fd:?} size={size:?}"
    );

    let result = FS.with(
        |fs| match fs.borrow_mut().set_file_size(fd, size as FileSize) {
            Ok(_) => wasi::ERRNO_SUCCESS.raw() as i32,
            Err(err) => wasi_helpers::into_errno(err),
        },
    );

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_filestat_set_size", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
pub extern "C" fn __ic_custom_fd_filestat_set_times(
    fd: Fd,
    atim: i64,
    mtim: i64,
    fst_flags: i32,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_fd_filestat_set_times",
        "fd={fd} atim={atim} mtim={mtim} fst_flags={fst_flags}"
    );

    let fst_flags = fst_flags as wasi::Fstflags;

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();
        let mut atim = atim as u64;
        let mut mtim = mtim as u64;

        let meta = fs.metadata(fd);

        match meta {
            Ok(_) => {
                let now = ic_time();

                if fst_flags & wasi::FSTFLAGS_ATIM_NOW > 0 {
                    atim = now;
                }

                if fst_flags & wasi::FSTFLAGS_MTIM_NOW > 0 {
                    mtim = now;
                }

                if fst_flags & wasi::FSTFLAGS_ATIM > 0 {
                    let _ = fs.set_accessed_time(fd as Fd, atim);
                }

                if fst_flags & wasi::FSTFLAGS_MTIM > 0 {
                    let _ = fs.set_modified_time(fd as Fd, mtim);
                }

                wasi::ERRNO_SUCCESS.raw() as i32
            }
            Err(err) => wasi_helpers::into_errno(err),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_filestat_set_times", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_fd_readdir(
    fd: Fd,
    bytes: *mut u8,
    bytes_len: i32,
    cookie: i64,
    res: *mut wasi::Size,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    {
        let parms = format!("fd={fd:?} bytes_len={bytes_len:?} cookie={cookie:?}");
        debug_instructions!("__ic_custom_fd_readdir", "{parms}");
    }

    let result = FS.with(|fs| {
        let fs = fs.borrow();
        unsafe { wasi_helpers::fd_readdir(&fs, fd, cookie, bytes, bytes_len, res) }
    });

    #[cfg(feature = "report_wasi_calls")]
    {
        let mn = std::cmp::min(
            #[allow(clippy::unnecessary_cast)]
            std::cmp::min(bytes_len as usize, unsafe { *res } as usize),
            50,
        );

        let buf = unsafe { std::slice::from_raw_parts_mut(bytes, mn) };

        let t = format!("buf={buf:?}... res={}", unsafe { *res });

        debug_instructions!("__ic_custom_fd_readdir", result, start, "{t}");
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
pub extern "C" fn __ic_custom_fd_renumber(fd_from: Fd, fd_to: Fd) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_renumber", "fd_from={fd_from} fd_to={fd_to}");

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let result = fs.renumber(fd_from as Fd, fd_to as Fd);

        match result {
            Ok(()) => wasi::ERRNO_SUCCESS.raw() as i32,
            Err(err) => into_errno(err),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_fd_renumber", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_random_get(buf: *mut u8, buf_len: wasi::Size) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_random_get");

    let buf = unsafe { std::slice::from_raw_parts_mut(buf, buf_len) };
    RNG.with(|rng| {
        let mut rng = rng.borrow_mut();
        rng.fill_bytes(buf);
    });

    let result = wasi::ERRNO_SUCCESS.raw() as i32;

    #[cfg(feature = "report_wasi_calls")]
    {
        debug_instructions!("__ic_custom_random_get", result, start, "buf={buf:?}");
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_environ_get(
    environment: *mut *mut u8,
    environment_buffer: *mut u8,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_environ_get");

    let result = ENV.with(|env| {
        let env = env.borrow();

        unsafe { env.environ_get(environment, environment_buffer) }
    });

    let result = result.raw() as i32;

    #[cfg(feature = "report_wasi_calls")]
    {
        ENV.with(|env| {
            let env = env.borrow();

            let t = format!("values={:?}", env.get_data_values());
            debug_instructions!("__ic_custom_environ_get", result, start, "{t}");
        });
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_environ_sizes_get(
    entry_count: *mut wasi::Size,
    buffer_size: *mut wasi::Size,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_environ_sizes_get");

    ENV.with(|env| {
        let env = env.borrow();
        let (count, size) = env.environ_sizes_get();

        unsafe { *entry_count = count };
        unsafe { *buffer_size = size };
    });

    let result = 0;

    #[cfg(feature = "report_wasi_calls")]
    {
        ENV.with(|env| {
            let env = env.borrow();

            let t = format!("env_size={:?}", env.get_data_values().len());
            debug_instructions!("__ic_custom_environ_sizes_get", result, start, "{t}");
        });
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
pub extern "C" fn __ic_custom_proc_exit(code: i32) -> ! {
    panic!("WASI proc_exit called with code: {code}");
}

#[unsafe(no_mangle)]
#[inline(never)]
pub extern "C" fn __ic_custom_args_get(arg_entries: *mut *mut u8, arg_buffer: *mut u8) -> i32 {
    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_args_get -> 0");

    prevent_elimination(&[arg_entries as i32, arg_buffer as i32]);
    // No-op.
    0
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_args_sizes_get(
    len1: *mut wasi::Size,
    len2: *mut wasi::Size,
) -> i32 {
    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_arg_sizes_get -> 0");

    unsafe {
        *len1 = 0;
        *len2 = 0;
    }
    0
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_clock_res_get(id: i32, result: *mut u64) -> i32 {
    prevent_elimination(&[id]);

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_clock_res_get -> 0");

    unsafe { *result = 1_000_000_000 }; // 1 second.
    wasi::ERRNO_SUCCESS.raw() as i32
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_clock_time_get(
    id: i32,
    precision: i64,
    time: *mut u64,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_clock_time_get");

    prevent_elimination(&[id, precision as i32]);

    unsafe { *time = ic_time() };
    let result = wasi::ERRNO_SUCCESS.raw() as i32;

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_clock_time_get", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_path_create_directory(
    parent_fd: Fd,
    path: *const u8,
    path_len: i32,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_path_create_directory");

    let dir_name = unsafe { get_file_name(path, path_len as wasi::Size) };

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_path_create_directory",
        "parent_fd={parent_fd} path={dir_name}"
    );

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let fd_stat = FdStat::default();

        let now = ic_time();

        match fs.mkdir(parent_fd, dir_name, fd_stat, now) {
            Ok(_) => wasi::ERRNO_SUCCESS.raw() as i32,
            Err(er) => into_errno(er),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_path_create_directory", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_path_filestat_get(
    parent_fd: i32,
    simlink_flags: i32,
    path: *const u8,
    path_len: i32,
    result: *mut wasi::Filestat,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_path_filestat_get");

    let file_name = unsafe { get_file_name(path, path_len as wasi::Size) };

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_path_filestat_get",
        "parent_fd={parent_fd:?} file_name={file_name:?}"
    );

    prevent_elimination(&[simlink_flags]);

    let r = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let fd_stat = FdStat::default();

        let open_flags = OpenFlags::empty();

        let fd = fs.open(parent_fd as Fd, file_name, fd_stat, open_flags, 0);

        // don't leave result undefined
        unsafe {
            *result = wasi::Filestat {
                dev: 0,
                ino: 0,
                filetype: wasi::FILETYPE_UNKNOWN,
                nlink: 0,
                size: 0,
                atim: 0,
                mtim: 0,
                ctim: 0,
            }
        };

        match fd {
            Ok(fd) => {
                let res = fs.metadata(fd);
                let _ = fs.close(fd);

                match res {
                    Ok(metadata) => {
                        unsafe {
                            *result = wasi::Filestat {
                                dev: 0,
                                ino: metadata.node,
                                filetype: into_wasi_filetype(metadata.file_type),
                                nlink: metadata.link_count,
                                size: metadata.size,
                                atim: metadata.times.accessed,
                                mtim: metadata.times.modified,
                                ctim: metadata.times.created,
                            }
                        };
                        wasi::ERRNO_SUCCESS.raw() as i32
                    }
                    Err(er) => into_errno(er),
                }
            }
            Err(er) => into_errno(er),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    {
        let t = format!("res={:?}", *result);
        debug_instructions!("__ic_custom_path_filestat_get", r, start, "{t}");
    }

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    r
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_path_filestat_set_times(
    parent_fd: i32,
    flags: i32,
    path: *const u8,
    path_len: i32,
    atim: i64,
    mtim: i64,
    fst_flags: i32,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_path_filestat_set_times");

    prevent_elimination(&[flags]);
    let file_name = unsafe { get_file_name(path, path_len as wasi::Size) };

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_path_filestat_set_times",
        "parent_fd={parent_fd} flags={flags} path={file_name} atim={atim} mtim={mtim} fst_flags={fst_flags}"
    );

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let fd_stat = FdStat::default();

        let fst_flags = fst_flags as wasi::Fstflags;

        let atim = atim as u64;
        let mtim = mtim as u64;

        if ((fst_flags & wasi::FSTFLAGS_ATIM_NOW) > 0 && (fst_flags & wasi::FSTFLAGS_ATIM) > 0)
            || ((fst_flags & wasi::FSTFLAGS_MTIM_NOW) > 0 && (fst_flags & wasi::FSTFLAGS_MTIM) > 0)
        {
            return into_errno(stable_fs::error::Error::InvalidArgument);
        }

        let open_flags = OpenFlags::empty();

        let fd = fs.open(parent_fd as Fd, file_name, fd_stat, open_flags, 0);

        match fd {
            Ok(fd) => {
                let res = fs.metadata(fd);

                match res {
                    Ok(mut metadata) => {
                        let now = ic_time();

                        if fst_flags & wasi::FSTFLAGS_ATIM_NOW > 0 {
                            metadata.times.accessed = now;
                        }

                        if fst_flags & wasi::FSTFLAGS_MTIM_NOW > 0 {
                            metadata.times.modified = now;
                        }

                        if fst_flags & wasi::FSTFLAGS_ATIM > 0 {
                            metadata.times.accessed = atim;
                        }

                        if fst_flags & wasi::FSTFLAGS_MTIM > 0 {
                            metadata.times.modified = mtim;
                        }

                        let res = fs.set_metadata(fd, metadata);

                        let _ = fs.close(fd);

                        match res {
                            Ok(_) => wasi::ERRNO_SUCCESS.raw() as i32,
                            Err(er) => into_errno(er),
                        }
                    }
                    Err(er) => {
                        let _ = fs.close(fd);
                        into_errno(er)
                    }
                }
            }
            Err(er) => into_errno(er),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_path_filestat_set_times", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_path_link(
    old_fd: Fd,
    sym_flags: i32,
    old_path: *const u8,
    old_path_len: i32,
    new_fd: Fd,
    new_path: *const u8,
    new_path_len: i32,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_path_link");

    prevent_elimination(&[sym_flags]);
    let old_path = unsafe { get_file_name(old_path, old_path_len as wasi::Size) };
    let new_path = unsafe { get_file_name(new_path, new_path_len as wasi::Size) };

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_path_link",
        "old_parent_fd={old_fd} sym_flags={sym_flags} old_path={old_path} <- new_parent_fd={new_fd} new_path={new_path}"
    );

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let fd = fs.create_hard_link(old_fd as Fd, old_path, new_fd as Fd, new_path);

        match fd {
            Ok(fd) => {
                let _ = fs.close(fd);
                wasi::ERRNO_SUCCESS.raw() as i32
            }
            Err(er) => into_errno(er),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_path_link", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[cfg(not(feature = "skip_unimplemented_functions"))]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_path_readlink(
    fd: i32,
    path: *const u8,
    path_len: i32,
    buf: i32,
    buf_len: i32,
    rp0: *mut usize,
) -> i32 {
    let _file_name = unsafe { get_file_name(path, path_len as wasi::Size) };
    prevent_elimination(&[fd, path as i32, path_len, buf, buf_len, rp0 as i32]);
    unimplemented!("WASI path_readlink is not implemented");
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_path_remove_directory(
    parent_fd: Fd,
    path: *const u8,
    path_len: i32,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_path_remove_directory");

    let file_name = unsafe { get_file_name(path, path_len as wasi::Size) };

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_path_remove_directory",
        "parent_fd={parent_fd} path={file_name:?}"
    );

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let res = fs.remove_dir(parent_fd as Fd, file_name);
        match res {
            Ok(()) => wasi::ERRNO_SUCCESS.raw() as i32,
            Err(er) => into_errno(er),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_path_remove_directory", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_path_rename(
    old_fd: i32,
    old_path: *const u8,
    old_path_len: i32,
    new_fd: i32,
    new_path: *const u8,
    new_path_len: i32,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_path_rename");

    let old_path = unsafe { get_file_name(old_path, old_path_len as wasi::Size) };
    let new_path = unsafe { get_file_name(new_path, new_path_len as wasi::Size) };

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_path_rename",
        "old_parent_fd={old_fd} old_path={old_path} -> new_parent_fd={new_fd} new_path={new_path}"
    );

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let fd = fs.rename(old_fd as Fd, old_path, new_fd as Fd, new_path);

        match fd {
            Ok(fd) => {
                let _ = fs.close(fd);
                wasi::ERRNO_SUCCESS.raw() as i32
            }
            Err(er) => into_errno(er),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_path_rename", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[cfg(not(feature = "skip_unimplemented_functions"))]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_path_symlink(
    old_path: *const u8,
    old_path_len: i32,
    fd: i32,
    new_path: *const u8,
    new_path_len: i32,
) -> i32 {
    let _old_path = unsafe { get_file_name(old_path, old_path_len as wasi::Size) };
    let _new_path = unsafe { get_file_name(new_path, new_path_len as wasi::Size) };

    prevent_elimination(&[
        old_path as i32,
        old_path_len,
        fd,
        new_path as i32,
        new_path_len,
    ]);
    unimplemented!("WASI path_symlink is not implemented");
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_path_unlink_file(
    parent_fd: i32,
    path: *const u8,
    path_len: i32,
) -> i32 {
    #[cfg(feature = "count_wasi_calls")]
    let start = ic_instruction_counter();

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_path_unlink");

    let file_name = unsafe { get_file_name(path, path_len as wasi::Size) };

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!(
        "__ic_custom_path_unlink",
        "parent_fd={parent_fd:?} file_name={file_name:?}"
    );

    let result = FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let res = fs.remove_file(parent_fd as Fd, file_name);
        match res {
            Ok(()) => wasi::ERRNO_SUCCESS.raw() as i32,
            Err(er) => into_errno(er),
        }
    });

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_path_unlink", result, start);

    #[cfg(feature = "count_wasi_calls")]
    update_counter(start);
    result
}

#[unsafe(no_mangle)]
#[inline(never)]
#[cfg(not(feature = "skip_unimplemented_functions"))]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_poll_oneoff(
    in_: *const wasi::Subscription,
    out: *mut wasi::Event,
    nsubscriptions: i32,
    neventsp: *mut wasi::Size,
) -> i32 {
    prevent_elimination(&[in_ as i32, out as i32, nsubscriptions, neventsp as i32]);

    #[cfg(feature = "report_wasi_calls")]
    debug_instructions!("__ic_custom_poll_oneoff");

    // avoid panic, just return an error because the function is not supported yet
    wasi::ERRNO_IO.raw() as i32
}

#[unsafe(no_mangle)]
#[inline(never)]
#[cfg(not(feature = "skip_unimplemented_functions"))]
pub extern "C" fn __ic_custom_proc_raise(sig: i32) -> i32 {
    prevent_elimination(&[sig]);
    unimplemented!("WASI proc_raise is not implemented");
}

#[unsafe(no_mangle)]
#[inline(never)]
pub extern "C" fn __ic_custom_sched_yield() -> i32 {
    // No-op.
    0
}

#[unsafe(no_mangle)]
#[inline(never)]
#[cfg(not(feature = "skip_unimplemented_functions"))]
pub extern "C" fn __ic_custom_sock_accept(arg0: i32, arg1: *mut u32) -> i32 {
    prevent_elimination(&[arg0, arg1 as i32]);
    unimplemented!("WASI sock_accept is not supported");
}

#[unsafe(no_mangle)]
#[inline(never)]
#[cfg(not(feature = "skip_unimplemented_functions"))]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __ic_custom_sock_recv(
    arg0: i32,
    arg1: *const wasi::Iovec,
    arg2: i32,
    arg3: i32,
    arg4: *mut usize,
    arg5: *mut u16,
) -> i32 {
    prevent_elimination(&[arg0, arg1 as i32, arg2, arg3, arg4 as i32, arg5 as i32]);
    unimplemented!("WASI sock_recv is not supported");
}

#[unsafe(no_mangle)]
#[inline(never)]
#[cfg(not(feature = "skip_unimplemented_functions"))]
#[allow(clippy::missing_safety_doc)]
pub extern "C" fn __ic_custom_sock_send(
    arg0: i32,
    arg1: *const wasi::Ciovec,
    arg2: i32,
    arg3: i32,
    arg4: *mut wasi::Size,
) -> i32 {
    prevent_elimination(&[arg0, arg1 as i32, arg2, arg3, arg4 as i32]);
    unimplemented!("WASI sock_send is not supported");
}

#[unsafe(no_mangle)]
#[inline(never)]
#[cfg(not(feature = "skip_unimplemented_functions"))]
pub extern "C" fn __ic_custom_sock_shutdown(arg0: i32, arg1: i32) -> i32 {
    prevent_elimination(&[arg0, arg1]);
    unimplemented!("WASI sock_shutdown is not supported");
}

fn prevent_elimination(args: &[i32]) {
    COUNTER.with(|var| {
        if *var.borrow() == 1 {
            ic_cdk::api::debug_print(format!("args: {args:?}"));
        }
    });
}

#[unsafe(no_mangle)]
pub fn init_seed(seed: &[u8]) {
    unsafe {
        raw_init_seed(seed.as_ptr(), seed.len());
    }
}

#[unsafe(no_mangle)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn raw_init_seed(seed: *const u8, len: usize) {
    let len = usize::min(len, 32);

    let mut seed_buf: [u8; 32] = [0u8; 32];
    unsafe { std::ptr::copy_nonoverlapping(seed, seed_buf.as_mut_ptr(), len) }

    RNG.with(|rng| {
        let mut rng = rng.borrow_mut();
        *rng = rand::rngs::StdRng::from_seed(seed_buf);
    });
}

#[unsafe(no_mangle)]
#[inline(never)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn __dummy_wasi_calls() {
    // dummy calls to trick the linker not to throw away the functions

    use std::ptr::{null, null_mut};

    COUNTER.with_borrow(|var| {
        if *var == 1 {
            unsafe {
                // coverage:ignore-start
                __ic_custom_fd_write(0, null::<wasi::Ciovec>(), 0, null_mut::<wasi::Size>());
                __ic_custom_fd_read(0, null::<wasi::Iovec>(), 0, null_mut::<wasi::Size>());
                __ic_custom_fd_close(0);

                __ic_custom_fd_prestat_get(0, null_mut::<wasi::Prestat>());
                __ic_custom_fd_prestat_dir_name(0, null_mut::<u8>(), 0);

                __ic_custom_path_open(0, 0, null::<u8>(), 0, 0, 0, 0, 0, null_mut::<u32>());
                __ic_custom_random_get(null_mut::<u8>(), 0);

                __ic_custom_environ_get(null_mut::<*mut u8>(), null_mut::<u8>());
                __ic_custom_environ_sizes_get(null_mut::<wasi::Size>(), null_mut::<wasi::Size>());

                __ic_custom_args_get(null_mut::<*mut u8>(), null_mut::<u8>());
                __ic_custom_args_sizes_get(null_mut::<wasi::Size>(), null_mut::<wasi::Size>());
                __ic_custom_clock_res_get(0, null_mut::<u64>());
                __ic_custom_clock_time_get(0, 0, null_mut::<u64>());

                __ic_custom_fd_advise(0, 0, 0, 0);
                __ic_custom_fd_allocate(0, 0, 0);
                __ic_custom_fd_datasync(0);
                __ic_custom_fd_fdstat_get(0, null_mut::<wasi::Fdstat>());
                __ic_custom_fd_fdstat_set_flags(0, 0);
                __ic_custom_fd_fdstat_set_rights(0, 0, 0);
                __ic_custom_fd_filestat_get(0, null_mut::<wasi::Filestat>());
                __ic_custom_fd_filestat_set_size(0, 0);
                __ic_custom_fd_filestat_set_times(0, 0, 0, 0);
                __ic_custom_fd_pread(0, null::<wasi::Iovec>(), 0, 0, null_mut::<wasi::Size>());
                __ic_custom_fd_pwrite(0, null::<wasi::Ciovec>(), 0, 0, null_mut::<wasi::Size>());
                __ic_custom_fd_readdir(0, null_mut::<u8>(), 0, 0, null_mut::<wasi::Size>());
                __ic_custom_fd_renumber(0, 0);
                __ic_custom_fd_seek(0, 0, 0, null_mut::<wasi::Filesize>());
                __ic_custom_fd_sync(0);
                __ic_custom_fd_tell(0, null_mut::<wasi::Filesize>());
                __ic_custom_path_create_directory(0, null::<u8>(), 0);
                __ic_custom_path_filestat_get(0, 0, null::<u8>(), 0, null_mut::<wasi::Filestat>());
                __ic_custom_path_filestat_set_times(0, 0, null::<u8>(), 0, 0, 0, 0);
                __ic_custom_path_link(0, 0, null::<u8>(), 0, 0, null::<u8>(), 0);

                #[cfg(not(feature = "skip_unimplemented_functions"))]
                __ic_custom_path_readlink(0, null::<u8>(), 0, 0, 0, null_mut());

                __ic_custom_path_remove_directory(0, null::<u8>(), 0);
                __ic_custom_path_rename(0, null::<u8>(), 0, 0, null::<u8>(), 0);

                #[cfg(not(feature = "skip_unimplemented_functions"))]
                __ic_custom_path_symlink(null::<u8>(), 0, 0, null::<u8>(), 0);

                __ic_custom_path_unlink_file(0, null::<u8>(), 0);

                #[cfg(not(feature = "skip_unimplemented_functions"))]
                __ic_custom_poll_oneoff(
                    null::<wasi::Subscription>(),
                    null_mut::<wasi::Event>(),
                    0,
                    null_mut(),
                );

                #[cfg(not(feature = "skip_unimplemented_functions"))]
                __ic_custom_proc_raise(0);

                __ic_custom_sched_yield();

                #[cfg(not(feature = "skip_unimplemented_functions"))]
                __ic_custom_sock_accept(0, null_mut());
                #[cfg(not(feature = "skip_unimplemented_functions"))]
                __ic_custom_sock_recv(0, null(), 0, 0, null_mut(), null_mut());
                #[cfg(not(feature = "skip_unimplemented_functions"))]
                __ic_custom_sock_send(0, null(), 0, 0, null_mut());
                #[cfg(not(feature = "skip_unimplemented_functions"))]
                __ic_custom_sock_shutdown(0, 0);

                __ic_custom_proc_exit(0);
                // coverage:ignore-end
            }
        }
    })
}

#[unsafe(no_mangle)]
#[allow(clippy::missing_safety_doc)]
pub unsafe extern "C" fn raw_init(seed: *const u8, len: usize) {
    FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        if fs.get_storage_version() == 0 {
            *fs = if cfg!(feature = "transient") {
                FileSystem::new(Box::new(TransientStorage::new())).unwrap()
            } else {
                FileSystem::new(Box::new(StableStorage::new(DefaultMemoryImpl::default()))).unwrap()
            }
        }
    });

    unsafe { raw_init_seed(seed, len) };

    //
    __dummy_wasi_calls();
}

/// Reset the cumulative instruction counter
#[cfg(feature = "count_wasi_calls")]
pub fn reset_counter() {
    COUNTER.with_borrow_mut(|counter| {
        *counter = 0;
    })
}

/// Get the current cumulative instructions
#[cfg(feature = "count_wasi_calls")]
pub fn get_counter() -> u64 {
    COUNTER.with_borrow(|counter| *counter)
}

/// Initializes the runtime environment and the random number generator.
///
/// # Parameters
/// - `seed`: A byte slice (up to 32 bytes) used to seed the random number generator
/// - `env_pairs`: A list of key-value pairs representing environment variables to initialize
///
/// # Safety
/// This function calls an `unsafe` function `raw_init`, passing a raw pointer and length of the seed slice.
/// It is safe to call this function as long as `seed` is a valid slice.
///
pub fn init(seed: &[u8], env_pairs: &[(&str, &str)]) {
    ENV.with(|env| {
        let mut env = env.borrow_mut();
        env.set_environment(env_pairs);
    });

    unsafe {
        raw_init(seed.as_ptr(), seed.len());
    }
}

/// Initializes the runtime environment, the random number generator, and the file system which will be stored in the memory provided.
///
/// # Parameters
/// - `seed`: A byte slice (up to 32 bytes) used to seed the random number generator
/// - `env_pairs`: A list of key-value pairs representing environment variables to initialize
/// - `memory`: A memory container used for the file system
#[allow(clippy::missing_safety_doc)]
pub fn init_with_memory<M: Memory + 'static>(seed: &[u8], env_pairs: &[(&str, &str)], memory: M) {
    FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        *fs = FileSystem::new(Box::new(StableStorage::new(memory))).unwrap();
    });

    init(seed, env_pairs);
}

/// Initializes the runtime environment, the random number generator, and the file system which will be stored in the memory provided provided by the memory manager and located in the memory index range.
///
/// # Parameters
/// - `seed`: A byte slice (up to 32 bytes) used to seed the random number generator.
/// - `env_pairs`: A list of key-value pairs representing environment variables to initialize.
/// - `memory_manager`: A memory manager used to create memories.
/// - `memory_index_range`: A range of memory IDs used for file system storage.
#[allow(clippy::missing_safety_doc)]
pub fn init_with_memory_manager<M: Memory + 'static>(
    seed: &[u8],
    env_pairs: &[(&str, &str)],
    memory_manager: &MemoryManager<M>,
    memory_index_range: Range<u8>,
) {
    FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        *fs = FileSystem::new(Box::new(StableStorage::new_with_memory_manager(
            memory_manager,
            memory_index_range,
        )))
        .unwrap();
    });

    init(seed, env_pairs);
}

/// Mounts external memory onto a file to speed-up file access. All further file reads and writes be forwarded to this memory.
///
/// # Parameters
/// - `file_name`    -  Name of the host file to mount on
/// - `memory`       -  Memory to use as an actual file storage
/// - `policy`       -  Mounted memory file size policy
///
pub fn mount_memory_file(
    file_name: &str,
    memory: Box<dyn Memory>,
    size_policy: MountedFileSizePolicy,
) -> i32 {
    FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let result = fs.mount_memory_file(file_name, memory, size_policy);

        match result {
            Ok(_) => wasi::ERRNO_SUCCESS.raw() as i32,
            Err(er) => into_errno(er),
        }
    })
}

/// unmounts external memory from a host file. All further file reads and writes are written to a normal file.
///
/// # Parameters
/// `file_name`    -  Name of the host file holding the mount
///
pub fn unmount_memory_file(file_name: &str) -> i32 {
    FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let result = fs.unmount_memory_file(file_name);

        match result {
            Ok(_) => wasi::ERRNO_SUCCESS.raw() as i32,
            Err(er) => into_errno(er),
        }
    })
}

/// Initializes mouned memory with the contents of the host file.
///
/// # Parameters
/// `file_name`    -  Name of the host file holding the mount
///
pub fn init_memory_file(file_name: &str) -> i32 {
    FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let result = fs.init_memory_file(file_name);

        match result {
            Ok(_) => wasi::ERRNO_SUCCESS.raw() as i32,
            Err(er) => into_errno(er),
        }
    })
}

/// Store memory contents into the host file.
///
/// # Parameters
/// `file_name`    -  Name of the host file holding the mount
///
pub fn store_memory_file(file_name: &str) -> i32 {
    FS.with(|fs| {
        let mut fs = fs.borrow_mut();

        let result = fs.store_memory_file(file_name);

        match result {
            Ok(_) => wasi::ERRNO_SUCCESS.raw() as i32,
            Err(er) => into_errno(er),
        }
    })
}

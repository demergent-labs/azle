use stable_fs::{
    error::Error,
    fs::{Fd, FileSystem},
    storage::types::{
        DirEntry, DirEntryIndex, FileType, DUMMY_DOT_DOT_ENTRY_INDEX, DUMMY_DOT_ENTRY_INDEX,
    },
};

#[cfg(target_arch = "wasm32")]
use crate::wasi;
#[cfg(not(all(target_arch = "wasm32")))]
use crate::wasi_mock as wasi;

/// Returns a UTF-8 string slice from a raw pointer and length.
///
/// # Safety
///
/// This function is `unsafe` because it dereferences a raw pointer and
/// uses `from_utf8_unchecked`, both of which can lead to undefined behavior
/// if used improperly.
///
/// The caller must ensure:
/// - `path` points to a valid memory region that is at least `path_len` bytes long.
/// - The memory referenced by `path` must remain valid for the returned lifetime `'a`.
/// - The memory must contain valid UTF-8 data; otherwise, the behavior is undefined.
/// - The pointer must not be null.
pub unsafe fn get_file_name<'a>(path: *const u8, path_len: wasi::Size) -> &'a str {
    let path_bytes = unsafe { std::slice::from_raw_parts(path, path_len as wasi::Size) };
    unsafe { std::str::from_utf8_unchecked(path_bytes) }
}

pub const DIRENT_SIZE: usize = std::mem::size_of::<wasi::Dirent>();

pub fn into_errno(error: Error) -> i32 {
    let errno = match error {
        stable_fs::error::Error::ArgumentListTooLong => wasi::ERRNO_2BIG,
        stable_fs::error::Error::PermissionDenied => wasi::ERRNO_ACCES,
        stable_fs::error::Error::AddressInUse => wasi::ERRNO_ADDRINUSE,
        stable_fs::error::Error::AddressNotAvailable => wasi::ERRNO_ADDRNOTAVAIL,
        stable_fs::error::Error::AddressFamilyNotSupported => wasi::ERRNO_AFNOSUPPORT,
        stable_fs::error::Error::ResourceUnavailableOrOperationWouldBlock => wasi::ERRNO_AGAIN,
        stable_fs::error::Error::ConnectionAlreadyInProgress => wasi::ERRNO_ALREADY,
        stable_fs::error::Error::BadFileDescriptor => wasi::ERRNO_BADF,
        stable_fs::error::Error::BadMessage => wasi::ERRNO_BADMSG,
        stable_fs::error::Error::DeviceOrResourceBusy => wasi::ERRNO_BUSY,
        stable_fs::error::Error::OperationCanceled => wasi::ERRNO_CANCELED,
        stable_fs::error::Error::NoChildProcesses => wasi::ERRNO_CHILD,
        stable_fs::error::Error::ConnectionAborted => wasi::ERRNO_CONNABORTED,
        stable_fs::error::Error::ConnectionRefused => wasi::ERRNO_CONNREFUSED,
        stable_fs::error::Error::ConnectionReset => wasi::ERRNO_CONNRESET,
        stable_fs::error::Error::ResourceDeadlockWouldOccur => wasi::ERRNO_DEADLK,
        stable_fs::error::Error::DestinationAddressRequired => wasi::ERRNO_DESTADDRREQ,
        stable_fs::error::Error::MathematicsArgumentOutOfDomainOfFunction => wasi::ERRNO_DOM,
        stable_fs::error::Error::Reserved19 => wasi::ERRNO_DQUOT,
        stable_fs::error::Error::FileExists => wasi::ERRNO_EXIST,
        stable_fs::error::Error::BadAddress => wasi::ERRNO_FAULT,
        stable_fs::error::Error::FileTooLarge => wasi::ERRNO_FBIG,
        stable_fs::error::Error::HostIsUnreachable => wasi::ERRNO_HOSTUNREACH,
        stable_fs::error::Error::IdentifierRemoved => wasi::ERRNO_IDRM,
        stable_fs::error::Error::IllegalByteSequence => wasi::ERRNO_ILSEQ,
        stable_fs::error::Error::OperationInProgress => wasi::ERRNO_INPROGRESS,
        stable_fs::error::Error::InterruptedFunction => wasi::ERRNO_INTR,
        stable_fs::error::Error::InvalidArgument => wasi::ERRNO_INVAL,
        stable_fs::error::Error::IOError => wasi::ERRNO_IO,
        stable_fs::error::Error::SocketIsConnected => wasi::ERRNO_ISCONN,
        stable_fs::error::Error::IsDirectory => wasi::ERRNO_ISDIR,
        stable_fs::error::Error::TooManyLevelsOfSymbolicLinks => wasi::ERRNO_LOOP,
        stable_fs::error::Error::FileDescriptorValueTooLarge => wasi::ERRNO_MFILE,
        stable_fs::error::Error::TooManyLinks => wasi::ERRNO_MLINK,
        stable_fs::error::Error::MessageTooLarge => wasi::ERRNO_MSGSIZE,
        stable_fs::error::Error::Reserved36 => wasi::ERRNO_MULTIHOP,
        stable_fs::error::Error::FilenameTooLong => wasi::ERRNO_NAMETOOLONG,
        stable_fs::error::Error::NetworkIsDown => wasi::ERRNO_NETDOWN,
        stable_fs::error::Error::ConnectionAbortedByNetwork => wasi::ERRNO_NETRESET,
        stable_fs::error::Error::NetworkUnreachable => wasi::ERRNO_NETUNREACH,
        stable_fs::error::Error::TooManyFilesOpenInSystem => wasi::ERRNO_NFILE,
        stable_fs::error::Error::NoBufferSpaceAvailable => wasi::ERRNO_NOBUFS,
        stable_fs::error::Error::NoSuchDevice => wasi::ERRNO_NODEV,
        stable_fs::error::Error::NoSuchFileOrDirectory => wasi::ERRNO_NOENT,
        stable_fs::error::Error::ExecutableFileFormatError => wasi::ERRNO_NOEXEC,
        stable_fs::error::Error::NoLocksAvailable => wasi::ERRNO_NOLCK,
        stable_fs::error::Error::Reserved47 => wasi::ERRNO_NOLINK,
        stable_fs::error::Error::NotEnoughSpace => wasi::ERRNO_NOMEM,
        stable_fs::error::Error::NoMessageOfTheDesiredType => wasi::ERRNO_NOMSG,
        stable_fs::error::Error::ProtocolNotAvailable => wasi::ERRNO_NOPROTOOPT,
        stable_fs::error::Error::NoSpaceLeftOnDevice => wasi::ERRNO_NOSPC,
        stable_fs::error::Error::FunctionNotSupported => wasi::ERRNO_NOSYS,
        stable_fs::error::Error::SocketNotConnected => wasi::ERRNO_NOTCONN,
        stable_fs::error::Error::NotADirectoryOrSymbolicLink => wasi::ERRNO_NOTDIR,
        stable_fs::error::Error::DirectoryNotEmpty => wasi::ERRNO_NOTEMPTY,
        stable_fs::error::Error::StateNotRecoverable => wasi::ERRNO_NOTRECOVERABLE,
        stable_fs::error::Error::NotASocket => wasi::ERRNO_NOTSOCK,
        stable_fs::error::Error::NotSupportedOrOperationNotSupportedOnSocket => wasi::ERRNO_NOTSUP,
        stable_fs::error::Error::InappropriateIOControlOperation => wasi::ERRNO_NOTTY,
        stable_fs::error::Error::NoSuchDeviceOrAddress => wasi::ERRNO_NXIO,
        stable_fs::error::Error::ValueTooLargeToBeStoredInDataType => wasi::ERRNO_OVERFLOW,
        stable_fs::error::Error::PreviousOwnerDied => wasi::ERRNO_OWNERDEAD,
        stable_fs::error::Error::OperationNotPermitted => wasi::ERRNO_PERM,
        stable_fs::error::Error::BrokenPipe => wasi::ERRNO_PIPE,
        stable_fs::error::Error::ProtocolError => wasi::ERRNO_PROTO,
        stable_fs::error::Error::ProtocolNotSupported => wasi::ERRNO_PROTONOSUPPORT,
        stable_fs::error::Error::ProtocolWrongTypeForSocket => wasi::ERRNO_PROTOTYPE,
        stable_fs::error::Error::ResultTooLarge => wasi::ERRNO_RANGE,
        stable_fs::error::Error::ReadOnlyFileSystem => wasi::ERRNO_ROFS,
        stable_fs::error::Error::InvalidSeek => wasi::ERRNO_SPIPE,
        stable_fs::error::Error::NoSuchProcess => wasi::ERRNO_SRCH,
        stable_fs::error::Error::Reserved72 => wasi::ERRNO_STALE,
        stable_fs::error::Error::ConnectionTimedOut => wasi::ERRNO_TIMEDOUT,
        stable_fs::error::Error::TextFileBusy => wasi::ERRNO_TXTBSY,
        stable_fs::error::Error::CrossDeviceLink => wasi::ERRNO_XDEV,
        stable_fs::error::Error::ExtensionCapabilitiesInsufficient => wasi::ERRNO_NOTCAPABLE,
    };

    errno.raw() as i32
}

pub fn into_wasi_filetype(file_type: stable_fs::storage::types::FileType) -> wasi::Filetype {
    match file_type {
        stable_fs::storage::types::FileType::Directory => wasi::FILETYPE_DIRECTORY,
        stable_fs::storage::types::FileType::RegularFile => wasi::FILETYPE_REGULAR_FILE,
        stable_fs::storage::types::FileType::SymbolicLink => wasi::FILETYPE_SYMBOLIC_LINK,
    }
}

pub fn _into_stable_fs_filetype(
    file_type: wasi::Filetype,
) -> Result<stable_fs::storage::types::FileType, stable_fs::error::Error> {
    match file_type {
        wasi::FILETYPE_DIRECTORY => Ok(stable_fs::storage::types::FileType::Directory),
        wasi::FILETYPE_REGULAR_FILE => Ok(stable_fs::storage::types::FileType::RegularFile),
        wasi::FILETYPE_SYMBOLIC_LINK => Ok(stable_fs::storage::types::FileType::SymbolicLink),
        _ => Err(stable_fs::error::Error::InvalidArgument),
    }
}

/// Reads directory entries from a file descriptor into the provided buffer.
///
/// # Safety
///
/// This function is `unsafe` because it operates on raw pointers (`bytes`, `res`)
/// and assumes the caller provides valid memory.
///
/// The caller **must** ensure the following:
///
/// - `bytes` must be a valid, writable pointer to a buffer of at least `bytes_len` bytes.
/// - `bytes` must be aligned properly for arbitrary byte writes.
/// - `res` must be a valid, writable pointer to a `wasi::Size`.
/// - Both `bytes` and `res` must remain valid for the duration of the function call.
/// - The buffer behind `bytes` must not be mutated or deallocated by other threads during the call.
/// - The memory must not alias with other references passed to or held by `fs`.
///
///
pub unsafe fn fd_readdir(
    fs: &FileSystem,
    fd: Fd,
    cookie: i64,
    bytes: *mut u8,
    bytes_len: i32,
    res: *mut wasi::Size,
) -> i32 {
    let fd = fd as Fd;
    let bytes_len = bytes_len as usize;
    let mut result = 0usize;

    let buf = unsafe { std::slice::from_raw_parts_mut(bytes, bytes_len) };

    let entry_index = if cookie == 0 {
        None
    } else {
        Some(cookie as DirEntryIndex)
    };

    let r = fs.with_direntries(fd, entry_index, &mut |idx, entry| {
        let put_result = put_single_entry(fs, *idx, entry, &mut buf[result..]);

        let put_result = put_result.unwrap();

        result += put_result;

        if result == bytes_len {
            // stop iterations
            false
        } else {
            // continue collecting entries
            true
        }
    });

    if let Err(err) = r {
        return into_errno(err);
    }

    unsafe { *res = std::cmp::min(result, bytes_len) };

    wasi::ERRNO_SUCCESS.raw() as i32
}

pub fn put_single_entry(
    fs: &FileSystem,
    index: DirEntryIndex,
    dir_entry: &DirEntry,
    buf: &mut [u8],
) -> Result<usize, Error> {
    // we assume the next index can always be current index + 1, hence no need to rely on .._next index field
    // appart from the dummy "DOT" entries
    let mut next_index = index + 1;
    if index == DUMMY_DOT_DOT_ENTRY_INDEX {
        next_index = 1; // the first non-zero index in the folder
    }

    if index == DUMMY_DOT_ENTRY_INDEX {
        next_index = DUMMY_DOT_DOT_ENTRY_INDEX;
    }

    let file_type: FileType = if let Some(file_type) = dir_entry.entry_type {
        file_type
    } else {
        fs.metadata_from_node(dir_entry.node)?.file_type
    };

    //let file_type = fs.metadata_from_node(dir_entry.node)?.file_type;

    let wasi_dirent = wasi::Dirent {
        d_next: next_index as u64,
        d_ino: dir_entry.node,
        d_namlen: (dir_entry.name.length as wasi::Dirnamlen),
        d_type: into_wasi_filetype(file_type),
    };

    let result = fill_buffer(wasi_dirent, buf, &dir_entry.name);

    Ok(result)
}

fn fill_buffer(
    wasi_dirent: wasi::Dirent,
    buf: &mut [u8],
    filename: &stable_fs::storage::types::FileName,
) -> usize {
    use std::slice;

    let p: *const wasi::Dirent = &wasi_dirent;
    let p: *const u8 = p as *const u8;

    let s: &[u8] = unsafe { slice::from_raw_parts(p, DIRENT_SIZE) };

    let result = usize::min(s.len(), buf.len());
    buf[0..result].copy_from_slice(&s[0..result]);

    // pre-fill 0 to avoid random data in buf
    if buf.len() >= DIRENT_SIZE {
        buf[DIRENT_SIZE - 3..DIRENT_SIZE].copy_from_slice(&[0, 0, 0]);
    }

    let buf_len = buf.len();
    let buf = &mut buf[result..buf_len];

    let filename = &filename.bytes[0..filename.length as usize];

    let result2 = usize::min(filename.len(), buf.len());
    buf[0..result2].copy_from_slice(&filename[0..result2]);
    result + result2
}

pub fn into_stable_fs_wence(whence: u8) -> stable_fs::fs::Whence {
    if whence == wasi::WHENCE_SET.raw() {
        return stable_fs::fs::Whence::SET;
    }

    if whence == wasi::WHENCE_CUR.raw() {
        return stable_fs::fs::Whence::CUR;
    }

    if whence == wasi::WHENCE_END.raw() {
        return stable_fs::fs::Whence::END;
    }

    panic!("Unsupported whence type!");
}

#[cfg(test)]
mod tests {
    use crate::{wasi, wasi_helpers::put_single_entry, DIRENT_SIZE};
    use ic_stable_structures::DefaultMemoryImpl;
    use stable_fs::{
        fs::{FdStat, FileSystem, OpenFlags},
        storage::{
            stable::StableStorage,
            transient::TransientStorage,
            types::{DirEntry, DirEntryIndex, FileName, Node},
        },
    };

    use super::{fd_readdir, fill_buffer};

    fn test_fs() -> FileSystem {
        FileSystem::new(Box::new(StableStorage::new(DefaultMemoryImpl::default()))).unwrap()
    }

    fn transient_fs() -> FileSystem {
        FileSystem::new(Box::new(TransientStorage::new())).unwrap()
    }

    #[test]
    fn test_fill_buffer_normal_and_trimmed() {
        let direntry = DirEntry {
            name: FileName::new("test.txt".as_bytes()).unwrap(),
            node: 45 as Node,
            entry_type: None,
        };

        let wasi_dirent = wasi::Dirent {
            d_next: 123 as wasi::Dircookie,
            d_ino: 234 as wasi::Inode,
            d_namlen: direntry.name.length as wasi::Dirnamlen,
            d_type: wasi::FILETYPE_REGULAR_FILE,
        };

        let expected = [
            123, 0, 0, 0, 0, 0, 0, 0, 234, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 4, 243, 243, 243, 116,
            101, 115, 116, 46, 116, 120, 116,
        ];

        let mut buf = [0u8; 100];
        let len = fill_buffer(wasi_dirent, &mut buf, &direntry.name);

        // stabilize test, the three bytes can take random value here...
        buf[DIRENT_SIZE - 3] = 243;
        buf[DIRENT_SIZE - 2] = 243;
        buf[DIRENT_SIZE - 1] = 243;

        assert_eq!(&expected[0..len], &buf[0..len]);
        assert_eq!(len, expected.len());

        let mut buf = [0u8; 27];
        let len = fill_buffer(wasi_dirent, &mut buf, &direntry.name);

        // stabilize test, the three bytes can take random value here...
        buf[DIRENT_SIZE - 3] = 243;
        buf[DIRENT_SIZE - 2] = 243;
        buf[DIRENT_SIZE - 1] = 243;

        assert_eq!(&expected[0..len], &buf[0..len]);
        assert_eq!(len, buf.len());

        let mut buf = [0u8; 3];
        let len = fill_buffer(wasi_dirent, &mut buf, &direntry.name);

        assert_eq!(&expected[0..len], &buf[0..len]);
        assert_eq!(len, buf.len());
    }

    #[test]
    fn test_put_single_entry() {
        let mut fs = test_fs();

        let dir_fd = fs.root_fd();

        let _fd1 = fs
            .open(dir_fd, "test.txt", FdStat::default(), OpenFlags::CREATE, 0)
            .unwrap();
        let _fd2 = fs
            .open(dir_fd, "test2.txt", FdStat::default(), OpenFlags::CREATE, 0)
            .unwrap();
        let _fd3 = fs
            .open(dir_fd, "test3.txt", FdStat::default(), OpenFlags::CREATE, 0)
            .unwrap();
        let _fd4 = fs
            .open(dir_fd, "test4.txt", FdStat::default(), OpenFlags::CREATE, 0)
            .unwrap();

        let first_entry = 1; // get the first entry

        let expected = [
            2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 116, 101, 115,
            116, 46, 116, 120, 116,
        ];

        let mut buf = [0u8; 100];

        let dir_entry = fs.get_direntry(dir_fd, first_entry).unwrap();

        let len =
            put_single_entry(&fs, first_entry as DirEntryIndex, &dir_entry, &mut buf).unwrap();

        assert_eq!(&expected[0..len], &buf[0..len]);
        assert_eq!(len, expected.len());
    }

    #[test]
    fn test_fd_readdir() {
        for mut fs in [test_fs(), transient_fs()] {
            let dir_fd = fs.root_fd();

            let _fd1 = fs
                .open(dir_fd, "test.txt", FdStat::default(), OpenFlags::CREATE, 0)
                .unwrap();

            let _fd2 = fs
                .open(dir_fd, "test2.txt", FdStat::default(), OpenFlags::CREATE, 0)
                .unwrap();
            let _fd3 = fs
                .open(dir_fd, "test3.txt", FdStat::default(), OpenFlags::CREATE, 0)
                .unwrap();
            let _fd4 = fs
                .open(dir_fd, "test4.txt", FdStat::default(), OpenFlags::CREATE, 0)
                .unwrap();

            let mut buf = [0u8; 200];

            let p = &mut buf as *mut u8;

            let mut bytes_used: wasi::Size = 0usize;

            // read folder with special files
            let result = unsafe {
                fd_readdir(
                    &fs,
                    fs.root_fd(),
                    0,
                    p,
                    buf.len() as i32,
                    &mut bytes_used as *mut wasi::Size,
                )
            };

            assert_eq!(result, 0);

            // 6 file entries + 1 + 2 + corresponding file sizes
            let expected_bytes = DIRENT_SIZE * 6 + 1 + 2 + 8 + 9 + 9 + 9;
            assert_eq!(bytes_used, expected_bytes);

            // read files starting with test2.txt (it has entry index 2)
            let result = unsafe {
                fd_readdir(
                    &fs,
                    fs.root_fd(),
                    2,
                    p,
                    buf.len() as i32,
                    &mut bytes_used as *mut wasi::Size,
                )
            };

            assert_eq!(result, 0);

            // 3 file entries + corresponding file sizes
            let expected_bytes = (DIRENT_SIZE + 9) * 3;
            assert_eq!(bytes_used, expected_bytes);
        }
    }
}

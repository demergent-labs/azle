- [x] make sure it works on a local windows machine
- [ ] Make sure github actions is on the latests wsl
- [ ] Log all of the artifacts that should exist
    - [ ] .azle direcotry
        - [ ] main.js
        - [ ] wasm binary size
        - [ ] make sure the candid file looks good
    - [ ] try and get the wasm binary and other artifacts off of that machine and run it on a local machine
        - [ ] use llms to get files out, maybe commit the files to the branch?
- [ ] Compare WSL environments between local and GitHub Actions
    - [ ] WSL version differences (wsl --version)
    - [ ] Ubuntu version differences (/etc/os-release)
    - [ ] Kernel version differences (uname -a)
    - [ ] Available disk space and memory
    - [ ] Node.js installation paths and versions
    - [ ] dfx installation paths and versions
    - [ ] Environment variables comparison
- [ ] Enhanced logging and diagnostics
    - [ ] Add step to log all environment info before tests
    - [ ] Add step to log artifacts after build/test
    - [ ] Upload artifacts as GitHub Actions artifacts for download
    - [ ] Capture dfx logs and .dfx directory contents
    - [ ] Log npm link status and azle package location
- [ ] Potential issues to investigate
    - [ ] File permissions differences
    - [ ] Line ending issues (CRLF vs LF)
    - [ ] Path differences or missing PATH entries
    - [ ] Different versions of system dependencies
    - [ ] WSL filesystem performance differences
    - [ ] Network/firewall issues affecting downloads
- [ ] Test isolation and reproducibility
    - [ ] Try running the same test multiple times in sequence
    - [ ] Test with minimal example first
    - [ ] Compare build output byte-for-byte with local
    - [ ] Check if issue is specific to certain test types

## Findings from GitHub Actions WSL Environment:

### Environment Details (from diagnostics):

- **Kernel**: Linux 4.4.0-20348-Microsoft (November 2024)
- **Ubuntu**: 22.04.5 LTS (Jammy Jellyfish)
- **Hardware**: AMD EPYC 7763 64-Core Processor, 15GB RAM
- **User**: root (not regular user)
- **Disk**: 85G available space

### Potential Issues Identified:

- **PATH Pollution**: Many Windows paths in PATH (/mnt/c/...) could cause conflicts
    - `/mnt/c/Program Files/Git/bin` - might conflict with Linux git
    - `/mnt/c/npm/prefix` - could interfere with npm operations
    - `/mnt/c/Program Files/dotnet` - might cause .NET conflicts
    - Multiple Python/Node paths from Windows side

### Additional Investigation Steps:

- [ ] Test with clean PATH (only Linux paths) to isolate Windows conflicts
- [ ] Compare exact Node.js/npm versions and installation paths
- [ ] Check if running as root vs regular user causes permission issues
- [ ] Test kernel version differences (local vs GitHub Actions)
- [ ] Verify if Windows-mounted paths are causing file system issues
- [ ] Check for WSL-specific file system limitations or differences

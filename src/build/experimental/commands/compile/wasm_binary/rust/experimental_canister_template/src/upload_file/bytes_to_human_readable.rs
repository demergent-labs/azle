pub fn bytes_to_human_readable(size_in_bytes: u64) -> String {
    let suffixes = ["B", "KiB", "MiB", "GiB"];
    let size = size_in_bytes as f64;

    let result = suffixes.iter().fold(
        (size, suffixes[0], false),
        |(remaining_size, selected_suffix, done), suffix| {
            if done {
                return (remaining_size, selected_suffix, done);
            }
            if remaining_size < 1024.0 {
                (remaining_size, suffix, true)
            } else {
                (remaining_size / 1024.0, suffix, false)
            }
        },
    );

    format!("{:.2} {}", result.0, result.1)
}

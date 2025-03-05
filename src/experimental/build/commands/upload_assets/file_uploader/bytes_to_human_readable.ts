export function bytesToHumanReadable(sizeInBytes: number): string {
    const suffixes = ['B', 'KiB', 'MiB', 'GiB'];

    const result = suffixes.reduce(
        (acc, suffix) => {
            if (acc.done) {
                return acc;
            }
            if (acc.size < 1024.0) {
                return {
                    ...acc,
                    unit: suffix,
                    done: true
                };
            }
            return {
                ...acc,
                size: acc.size / 1024.0
            };
        },
        { size: sizeInBytes, unit: '', done: false }
    );

    return `${result.size.toFixed(2)} ${result.unit}`;
}

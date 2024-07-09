export function markExperimental(): void {
    if (process.env.AZLE_EXPERIMENTAL !== 'true') {
        throw new Error(`Azle: the experimental flag must be set`);
    }
}

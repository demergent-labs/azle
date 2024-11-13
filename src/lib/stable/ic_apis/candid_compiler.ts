/**
 * Converts a Candid string into its corresponding IDL as a string
 * @param candidPath a valid Candid file path
 * @returns the IDL string
 */
export function candidCompiler(candidPath: string): string {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return '';
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.candidCompiler(candidPath);
    }

    return globalThis._azleIcStable.candidCompiler(candidPath);
}

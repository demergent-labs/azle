/**
 * Converts a Candid file into its corresponding IDL as a string
 * @param candidPath a valid Candid file path
 * @returns the IDL string
 */
export function candidCompiler(candidPath: string): string {
    if (globalThis._azleIc === undefined) {
        return '';
    }

    return globalThis._azleIc.candidCompiler(candidPath);
}

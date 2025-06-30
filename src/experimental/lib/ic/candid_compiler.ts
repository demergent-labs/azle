import '#experimental/lib/assert_experimental';

/**
 * Converts a Candid string into its corresponding IDL as a string
 * @param candidString a valid Candid string
 * @returns the IDL string
 */
export function candidCompiler(candidPath: string): string {
    if (globalThis._azleIcExperimental === undefined) {
        return '';
    }

    return globalThis._azleIcExperimental.candidCompiler(candidPath);
}

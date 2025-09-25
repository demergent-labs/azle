import { readFile } from 'fs/promises';

import { candid_to_ts_js } from './rust/candid_to_ts_js/pkg/candid_to_ts_js';

/**
 * Generates TypeScript types and JavaScript IDL types from a Candid file.
 *
 * @param candidPath - Path to the Candid file to convert
 *
 * @returns The generated types are written to stdout
 *
 * @remarks
 *
 * The generated types can be used with `@query`/`@update`/other method decorators and for inter-canister calls using the `call` function
 */
export async function runCommand(candidPath: string): Promise<void> {
    const candid = await readFile(candidPath, 'utf-8');
    const result = candid_to_ts_js(candid) as string;
    // TODO remove this replacement once the candid JavaScript and TypeScript bindings are updated with @icp-sdk/core instead of @dfinity
    const updatedResult = result.replaceAll('@dfinity/', '@icp-sdk/core/');

    process.stdout.write(updatedResult);
}

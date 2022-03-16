// TODO first compile TypeScript to JavaScript
// TODO then compile TypeScript to Candid
// TODO then compile Candid to Rust
// TODO then combine all of the above

import { compileTypeScriptToCandid } from '../typescript_to_candid';
import { compileTypeScriptToJavaScript } from '../typescript_to_javascript';
import { compileCandidToRustTypes } from '../candid_to_rust_types';
import {
    Candid,
    JavaScript,
    Rust
} from '../../types';

export async function compileTypeScriptToRust(
    tsPath: string,
    candidPath: string
): Promise<Rust> {
    const candid: Candid = compileTypeScriptToCandid(tsPath);
    const js: JavaScript = await compileTypeScriptToJavaScript(tsPath);
    const rustTypes: Rust = compileCandidToRustTypes(candidPath);

    console.log(candid);

    // TODO then we have to generate the function bodies
    return '';
}
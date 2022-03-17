import * as fs from 'fs';
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

    // TODO it would be nice to have the option of doing this
    // TODO it would also be nice if we could pass in the candid to the Rust types generation process
    // TODO instead of having to write to a file first
    fs.writeFileSync(candidPath, candid);

    const js: JavaScript = await compileTypeScriptToJavaScript(tsPath);
    const rustTypes: Rust = compileCandidToRustTypes(candidPath);

    console.log(rustTypes);

    // TODO then we have to generate the function bodies
    return '';
}
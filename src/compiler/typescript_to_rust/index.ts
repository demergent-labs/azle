import { compileCandidToRustTypes } from '../candid_to_rust_types';
import * as fs from 'fs';
import { generateLibFile } from './generators/lib_file';
import {
    JavaScript,
    Rust
} from '../../types';
import * as tsc from 'typescript';
import { compileTypeScriptToCandid } from '../typescript_to_candid';
import { compileTypeScriptToJavaScript } from '../typescript_to_javascript';

export async function compileTypeScriptToRust(
    tsPath: string,
    candidPath: string
): Promise<Rust> {
    const program = tsc.createProgram(
        [tsPath],
        {}
    );
    
    const sourceFiles = program.getSourceFiles();

    const {
        candid,
        candidWithDummyMethod,
        queryMethodFunctionNames,
        updateMethodFunctionNames
    } = compileTypeScriptToCandid(sourceFiles);

    // TODO it would be nice to have the option of doing this
    // TODO it would also be nice if we could pass in the candid to the Rust types generation process
    // TODO instead of having to write to a file first
    fs.writeFileSync(candidPath, candidWithDummyMethod);

    const rustCandidTypes: Rust = compileCandidToRustTypes(candidPath);

    fs.writeFileSync(candidPath, candid);

    const js: JavaScript = await compileTypeScriptToJavaScript(tsPath);
    const libFile: Rust = await generateLibFile(
        js,
        rustCandidTypes,
        queryMethodFunctionNames,
        updateMethodFunctionNames,
        sourceFiles
    );

    return libFile;
}
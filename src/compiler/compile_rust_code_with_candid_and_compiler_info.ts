import { IOType } from 'child_process';
import { writeFile } from 'fs/promises';

import { compileRustCode } from './compile_rust_code';
import { CompilerInfo } from './utils/types';

export async function compileRustCodeWithCandidAndCompilerInfo(
    rustStagingCandidPath: string,
    candid: string,
    compilerInfoPath: string,
    compilerInfo: CompilerInfo,
    canisterName: string,
    stdioType: IOType,
    nativeCompilation: boolean,
    js: string
): Promise<void> {
    // This is for the Rust canister to have access to the candid file
    // TODO why not just write the dfx.json file here as well?
    await Promise.all([
        writeFile(rustStagingCandidPath, candid),
        writeFile(compilerInfoPath, JSON.stringify(compilerInfo))
    ]);

    await compileRustCode(
        canisterName,
        stdioType,
        nativeCompilation,
        js,
        compilerInfo
    );
}

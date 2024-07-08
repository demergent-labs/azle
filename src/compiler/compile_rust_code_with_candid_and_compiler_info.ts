import { IOType } from 'child_process';
import { writeFileSync } from 'fs';

import { compileRustCode } from './compile_rust_code';
import { CompilerInfo } from './utils/types';

export function compileRustCodeWithCandidAndCompilerInfo(
    rustStagingCandidPath: string,
    candid: string,
    compilerInfoPath: string,
    compilerInfo: CompilerInfo,
    canisterName: string,
    stdioType: IOType,
    nativeCompilation: boolean,
    js: string
) {
    // This is for the Rust canister to have access to the candid file
    writeFileSync(rustStagingCandidPath, candid);

    // TODO why not just write the dfx.json file here as well?
    writeFileSync(compilerInfoPath, JSON.stringify(compilerInfo));

    compileRustCode(
        canisterName,
        stdioType,
        nativeCompilation,
        js,
        compilerInfo
    );
}

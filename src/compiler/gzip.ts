import { execSync, IOType } from 'child_process';

export function gzipWasmBinary(wasmFilePath: string, stdio: IOType) {
    execSync(`gzip -9 -f -k ${wasmFilePath}`, { stdio });
}

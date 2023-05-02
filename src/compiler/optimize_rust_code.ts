import { execSync, IOType } from 'child_process';
import { time } from './utils';

export function optimizeRustCode(wasmFilePath: string, stdio: IOType) {
    time(`[3/3] 🚀 Optimizing Wasm binary...`, 'inline', () => {
        execSync(`gzip -9 -f -k ${wasmFilePath}`, { stdio });
    });
}

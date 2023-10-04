import { dim, green } from './colors';

export function logSuccess(canisterPath: string, canisterName: string): void {
    console.info(
        `\n🎉 Built canister ${green(canisterName)} ${dim(
            `at ${canisterPath}/${canisterName}.wasm\n`
        )}`
    );
}

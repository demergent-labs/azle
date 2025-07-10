import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { AZLE_ROOT } from './global_paths';
import { getLocalCargoAuditVersion } from './versions/cargo_audit';
import { getLocalCargoAuditableVersion } from './versions/cargo_auditable';
import { getLocalCargoDenyVersion } from './versions/cargo_deny';
import { getLocalDfxVersion } from './versions/dfx';
import { getLocalNodeVersion } from './versions/node';
import { getLocalRustVersion } from './versions/rust';
import { getLocalWasi2icVersion } from './versions/wasi2ic';

export async function logGlobalDependencies(): Promise<void> {
    const dfxVersion = getLocalDfxVersion();
    const nodeVersion = getLocalNodeVersion();
    const rustVersion = getLocalRustVersion();
    const cargoAuditableVersion = getLocalCargoAuditableVersion();
    const cargoAuditVersion = getLocalCargoAuditVersion();
    const cargoDenyVersion = getLocalCargoDenyVersion();
    const wasiVersion = getLocalWasi2icVersion();

    const globalDependencies = {
        dfx: dfxVersion,
        node: nodeVersion,
        rust: rustVersion,
        'cargo-auditable': cargoAuditableVersion,
        'cargo-audit': cargoAuditVersion,
        'cargo-deny': cargoDenyVersion,
        wasi2ic: wasiVersion
    };

    const packageJsonPath = join(AZLE_ROOT, 'package.json');

    const packageJsonContent = await readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);

    await writeFile(
        packageJsonPath,
        `${JSON.stringify(
            { ...packageJson, azle: { globalDependencies } },
            null,
            4
        )}\n`
    );
}

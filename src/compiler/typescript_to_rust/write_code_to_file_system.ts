import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { copySync } from 'fs-extra';
import { JavaScript, Toml } from '../utils/types';

export function writeCodeToFileSystem(
    rootPath: string,
    canisterPath: string,
    workspaceCargoToml: Toml,
    workspaceCargoLock: Toml,
    libCargoToml: Toml,
    mainJs: JavaScript
) {
    writeFileSync(`${canisterPath}/Cargo.toml`, workspaceCargoToml);
    writeFileSync(`${canisterPath}/Cargo.lock`, workspaceCargoLock);

    if (!existsSync(`${canisterPath}/${rootPath}`)) {
        mkdirSync(`${canisterPath}/${rootPath}`, { recursive: true });
    }

    writeFileSync(`${canisterPath}/${rootPath}/Cargo.toml`, libCargoToml);

    if (!existsSync(`${canisterPath}/${rootPath}/src`)) {
        mkdirSync(`${canisterPath}/${rootPath}/src`);
    }

    if (!existsSync(`${canisterPath}/${rootPath}/src/lib.rs`)) {
        writeFileSync(`${canisterPath}/${rootPath}/src/lib.rs`, '');
    }

    if (!existsSync(`${canisterPath}/${rootPath}/azle_vm_value_derive`)) {
        mkdirSync(`${canisterPath}/${rootPath}/azle_vm_value_derive`);
    }

    copySync(
        `${__dirname}/azle_vm_value_derive`,
        `${canisterPath}/${rootPath}/azle_vm_value_derive`
    );

    if (!existsSync(`${canisterPath}/${rootPath}/azle_generate`)) {
        mkdirSync(`${canisterPath}/${rootPath}/azle_generate`);
    }

    copySync(
        `${__dirname}/azle_generate`,
        `${canisterPath}/${rootPath}/azle_generate`
    );

    // writeFileSync(`${canisterPath}/${rootPath}/src/main.js`, mainJs);

    if (
        !existsSync(`${canisterPath}/${rootPath}/azle_generate_rearchitecture`)
    ) {
        mkdirSync(`${canisterPath}/${rootPath}/azle_generate_rearchitecture`);
    }

    copySync(
        `${__dirname}/azle_generate_rearchitecture`,
        `${canisterPath}/${rootPath}/azle_generate_rearchitecture`
    );
}

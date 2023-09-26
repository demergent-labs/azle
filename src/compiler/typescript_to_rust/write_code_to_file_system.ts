import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { copySync } from 'fs-extra';
import { JavaScript, Toml } from '../utils/types';

export function writeCodeToFileSystem(
    rootPath: string,
    canisterPath: string,
    workspaceCargoToml: Toml,
    workspaceCargoLock: Toml,
    libCargoToml: Toml,
    mainJs: JavaScript,
    candidPath: string,
    candid: string
) {
    rmSync(canisterPath, { recursive: true, force: true });
    mkdirSync(canisterPath, { recursive: true });

    writeFileSync(`${canisterPath}/Cargo.toml`, workspaceCargoToml);

    // TODO not sure what to do about the cargo.lock
    // writeFileSync(`${canisterPath}/Cargo.lock`, workspaceCargoLock);

    if (!existsSync(`${canisterPath}/azle_generate_rearchitecture`)) {
        mkdirSync(`${canisterPath}/azle_generate_rearchitecture`);
    }

    copySync(
        `${__dirname}/azle_generate_rearchitecture`,
        `${canisterPath}/azle_generate_rearchitecture`
    );

    if (!existsSync(`${canisterPath}/canister_methods`)) {
        mkdirSync(`${canisterPath}/canister_methods`);
    }

    copySync(
        `${__dirname}/canister_methods`,
        `${canisterPath}/canister_methods`
    );

    writeFileSync(
        `${canisterPath}/azle_generate_rearchitecture/src/main.js`,
        mainJs
    );

    writeFileSync(candidPath, candid);
}

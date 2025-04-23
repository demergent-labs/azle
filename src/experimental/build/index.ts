#!/usr/bin/env -S npx tsx

import { execSync, IOType, spawnSync } from 'child_process';
import {
    existsSync,
    lstatSync,
    readdirSync,
    readlinkSync,
    rmSync,
    symlinkSync
} from 'fs';
import { readFile } from 'fs/promises';
import { join, resolve } from 'path';

import { build as stableBuild } from '#build/index';
import { runCommand as runStableDevTemplateCommand } from '#commands/dev/template';
import { runCommand as runStableNewCommand } from '#commands/new';
import { findProjectRoot } from '#experimental/build/utils/find_project_root';
import { runCommand as runBuildCommand } from '#experimental/commands/build/index';
import { runCommand as runDevTemplateCommand } from '#experimental/commands/dev/template';
import { runCommand as runUploadAssetsCommand } from '#experimental/commands/upload_assets/index';
import { getCanisterConfig } from '#utils/get_canister_config';
import { AZLE_ROOT } from '#utils/global_paths';
import {
    Command as StableCommand,
    ExperimentalCommand as Command,
    SubCommand
} from '#utils/types';

import { version as azleVersion } from '../../../package.json';

export async function build(): Promise<void> {
    await assertAzleExperimentalDeps();

    const command = process.argv[2] as StableCommand | Command | undefined;

    if (command === undefined) {
        throw new Error(
            `No command found when running azle. Running azle should start like this: azle [commandName]`
        );
    }

    const ioType = process.env.AZLE_VERBOSE === 'true' ? 'inherit' : 'pipe';

    if (command === 'dev') {
        const handledDevCommand = await handleDevCommand();

        if (handledDevCommand === true) {
            return;
        }
    }

    if (command === 'post-install') {
        await handlePostInstallCommand();

        return;
    }

    if (command === 'upload-assets') {
        await handleUploadAssetsCommand();

        return;
    }

    if (command === 'build') {
        await handleBuildCommand(ioType);

        return;
    }

    if (command === 'new') {
        await handleNewCommand();

        return;
    }

    stableBuild();
}

async function handleDevCommand(): Promise<boolean> {
    const subCommand = process.argv[3] as SubCommand['dev'];

    if (subCommand === 'template') {
        await handleDevTemplateCommand('inherit');

        return true;
    }

    return false;
}

async function handleDevTemplateCommand(ioType: IOType): Promise<void> {
    const all = process.argv.includes('--all');

    if (all === true) {
        await runStableDevTemplateCommand(ioType);
        await runDevTemplateCommand(ioType);
    } else {
        const experimental =
            process.argv.includes('--experimental') ||
            process.env.AZLE_EXPERIMENTAL === 'true';

        if (experimental === false) {
            await runStableDevTemplateCommand(ioType);
        } else {
            await runDevTemplateCommand(ioType);
        }
    }
}

async function handlePostInstallCommand(): Promise<void> {
    // Currently, the only post-install step is uploading assets.
    // This function can be expanded if more steps are needed in the future.
    await runUploadAssetsCommand();
}

async function handleUploadAssetsCommand(): Promise<void> {
    await runUploadAssetsCommand();
}

async function handleBuildCommand(ioType: IOType): Promise<void> {
    const canisterName = process.argv[3];
    const canisterConfig = await getCanisterConfig(canisterName);

    await runBuildCommand(canisterName, canisterConfig, ioType);
}

async function handleNewCommand(): Promise<void> {
    const httpServer = process.argv.includes('--http-server');
    const projectName =
        httpServer === true ? 'hello_world_http_server' : 'hello_world';

    const templatePath = join(
        AZLE_ROOT,
        'examples',
        httpServer === true ? 'experimental' : 'stable',
        'demo',
        projectName
    );

    await runStableNewCommand(azleVersion, templatePath, httpServer === true);
}

async function assertAzleExperimentalDeps(): Promise<void> {
    // Skip installing experimental deps when running tarball tests
    if (process.env.AZLE_SKIP_EXPERIMENTAL_DEPS_INSTALL === 'true') {
        console.log(
            'Skipping installation of azle-experimental-deps (AZLE_SKIP_EXPERIMENTAL_DEPS_INSTALL=true)'
        );
        return;
    }
    const projectRoot = await findProjectRoot();
    const theirAzleExperimentalDepsVersion =
        await getAzleExperimentalDepsVersion(projectRoot);

    const ourAzleExperimentalDepsVersion =
        await getAzleExperimentalDepsVersion(AZLE_ROOT);

    if (ourAzleExperimentalDepsVersion === undefined) {
        const beChill = true;
        if (beChill === true) {
            throw new Error('Unreachable');
        }
        throw new Error(
            'Something has gone horribly wrong. Please open an issue right away, this must be fixed in azle immediately. Reach out to Jordan and tell him that Some How Azle Suffers Total Annihilation. He will know what to do.'
        );
    }

    if (theirAzleExperimentalDepsVersion !== ourAzleExperimentalDepsVersion) {
        installAzleExperimentalDeps(
            projectRoot,
            ourAzleExperimentalDepsVersion
        );
    }
}

async function getAzleExperimentalDepsVersion(
    resolveDir: string
): Promise<string | undefined> {
    const packageJsonPath = join(resolveDir, 'package.json');
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
    const packageName = 'azle-experimental-deps';
    return (
        packageJson.dependencies?.[packageName] ??
        packageJson.devDependencies?.[packageName]
    );
}

function installAzleExperimentalDeps(
    resolveDir: string,
    version: string
): void {
    // Snapshot existing symlinked top-level modules
    const modulesDir = join(resolveDir, 'node_modules');
    const linkedModules: Array<{ path: string; target: string }> = [];
    if (existsSync(modulesDir)) {
        for (const name of readdirSync(modulesDir)) {
            const entryPath = join(modulesDir, name);
            try {
                if (lstatSync(entryPath).isSymbolicLink()) {
                    linkedModules.push({
                        path: entryPath,
                        target: readlinkSync(entryPath)
                    });
                } else if (
                    lstatSync(entryPath).isDirectory() &&
                    name.startsWith('@')
                ) {
                    for (const scoped of readdirSync(entryPath)) {
                        const scopedPath = join(entryPath, scoped);
                        if (lstatSync(scopedPath).isSymbolicLink()) {
                            linkedModules.push({
                                path: scopedPath,
                                target: readlinkSync(scopedPath)
                            });
                        }
                    }
                }
            } catch {
                // ignore
            }
        }
    }

    // Build a minimal environment for the installer
    const cleanEnv: NodeJS.ProcessEnv = Object.fromEntries(
        Object.entries(process.env).filter(
            ([key]) =>
                // whitelist only essential vars
                key === 'PATH'
        )
    );
    const result = spawnSync(
        'npm',
        ['install', `azle-experimental-deps@${version}`, '--no-prune'],
        { cwd: resolveDir, env: cleanEnv, stdio: 'inherit' }
    );

    // Pack hack for testing
    const azleRoot =
        process.env.GITHUB_WORKSPACE ?? resolve(__dirname, '..', '..', '..');
    const isPackMode = process.env.AZLE_END_TO_END_TEST_PACK_AZLE === 'true';
    if (isPackMode) {
        const distDir = join(azleRoot, 'dist');
        const packPath = join(distDir, 'azle.tgz');

        execSync(`npm install ${packPath} --no-save`, { cwd: resolveDir });
    }

    // Restore any symlinked modules that npm may have unlinked
    for (const mod of linkedModules) {
        try {
            rmSync(mod.path, { force: true, recursive: true });
            symlinkSync(mod.target, mod.path, 'dir');
        } catch (err) {
            console.error(`Failed to restore symlink for ${mod.path}:`, err);
        }
    }

    if (result.error || result.status !== 0) {
        console.error(
            `Failed to install azle-experimental-deps@${version}:`,
            result.error ?? `exit code ${result.status}`
        );
        throw new Error(
            `Failed to install azle-experimental-deps@${version}. Please check your network connection and try again.`
        );
    }
}

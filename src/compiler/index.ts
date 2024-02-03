import { join } from 'path';
import { compileRustCode } from './compile_rust_code';
import { installRustDependencies } from './install_rust_dependencies';
import { generateNewAzleProject } from './new_command';
import {
    getCanisterConfig,
    getCanisterName,
    getStdIoType,
    logSuccess,
    printFirstBuildWarning,
    time,
    unwrap
} from './utils';
import { dim, green, red } from './utils/colors';
import { GLOBAL_AZLE_CONFIG_DIR } from './utils';
import {
    version as azleVersion,
    dfx_version as dfxVersion,
    rust_version as rustVersion
} from '../../package.json';
import { compileTypeScriptToJavaScript } from './compile_typescript_code';
import { Err, ok } from './utils/result';
import {
    AzleError,
    CompilerInfo,
    JSCanisterConfig,
    Toml,
    TsCompilationError,
    TsSyntaxErrorLocation
} from './utils/types';
import { generateWorkspaceCargoToml } from './generate_cargo_toml_files';
import { generateCandidAndCanisterMethods } from './generate_candid_and_canister_methods';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { copySync } from 'fs-extra';
import { execSync } from 'child_process';

azle();

async function azle() {
    if (process.argv[2] === 'new') {
        generateNewAzleProject(azleVersion);
        return;
    }

    if (process.argv[2] === 'clean') {
        rmSync(GLOBAL_AZLE_CONFIG_DIR, {
            recursive: true,
            force: true
        });
        return;
    }

    const stdioType = getStdIoType();
    const canisterName = unwrap(getCanisterName(process.argv));
    const canisterPath = join('.azle', canisterName);

    await time(
        `\nBuilding canister ${green(canisterName)}`,
        'default',
        async () => {
            const canisterConfig = unwrap(getCanisterConfig(canisterName));
            const candidPath = canisterConfig.candid;

            printFirstBuildWarning();

            installRustDependencies(azleVersion, rustVersion);

            const compilationResult = compileTypeScriptToJavaScript(
                canisterConfig.main
            );

            if (!ok(compilationResult)) {
                const azleErrorResult = compilationErrorToAzleErrorResult(
                    compilationResult.err
                );
                unwrap(azleErrorResult);
            }

            const canisterJavaScript = compilationResult.ok as string;

            const workspaceCargoToml: Toml = generateWorkspaceCargoToml(
                canisterConfig.opt_level ?? '0'
            );

            rmSync(canisterPath, { recursive: true, force: true });
            mkdirSync(canisterPath, { recursive: true });

            writeFileSync(`${canisterPath}/Cargo.toml`, workspaceCargoToml);

            // TODO not sure what to do about the cargo.lock
            // writeFileSync(`${canisterPath}/Cargo.lock`, workspaceCargoLock);

            if (!existsSync(`${canisterPath}/canister`)) {
                mkdirSync(`${canisterPath}/canister`);
            }

            copySync(`${__dirname}/rust/canister`, `${canisterPath}/canister`);

            if (!existsSync(`${canisterPath}/canister_methods`)) {
                mkdirSync(`${canisterPath}/canister_methods`);
            }

            copySync(
                `${__dirname}/rust/canister_methods`,
                `${canisterPath}/canister_methods`
            );

            writeFileSync(
                `${canisterPath}/canister/src/main.js`,
                canisterJavaScript
            );

            if (
                canisterConfig.build_assets !== undefined &&
                canisterConfig.build_assets !== null
            ) {
                execSync(canisterConfig.build_assets);
            }

            for (const [src, dest] of canisterConfig.assets ?? []) {
                copySync(
                    src,
                    join(canisterPath, 'canister', 'src', 'assets', dest)
                );
            }

            // TODO a lot of this file writing and compiler_info.json
            // TODO stuff is repeated which is messy and bad of course
            writeFileSync(`${canisterPath}/canister/src/candid.did`, ''); // This is for the Rust canister to have access to the candid file

            const envVars = getEnvVars(canisterConfig);

            const compilerInfo0: CompilerInfo = {
                canister_methods: {
                    candid: '',
                    queries: [],
                    updates: [],
                    callbacks: {}
                },
                env_vars: envVars
            };

            const compilerInfoPath0 = join(
                canisterPath,
                'canister',
                'src',
                'compiler_info.json'
            );

            // TODO why not just write the dfx.json file here as well?
            writeFileSync(compilerInfoPath0, JSON.stringify(compilerInfo0));

            compileRustCode(canisterName, canisterPath, stdioType);

            const { candid, canisterMethods } =
                generateCandidAndCanisterMethods(
                    `${canisterPath}/${canisterName}.wasm`
                );

            writeFileSync(candidPath, candid); // This is for the dfx.json candid property
            writeFileSync(`${canisterPath}/canister/src/candid.did`, candid); // This is for the Rust canister to have access to the candid file

            const compilerInfo: CompilerInfo = {
                // TODO The spread is because canisterMethods is a function with properties
                canister_methods: {
                    ...canisterMethods
                }, // TODO we should probably just grab the props out that we need
                env_vars: envVars
            };

            const compilerInfoPath = join(
                canisterPath,
                'canister',
                'src',
                'compiler_info.json'
            );

            // TODO why not just write the dfx.json file here as well?
            writeFileSync(compilerInfoPath, JSON.stringify(compilerInfo));

            compileRustCode(canisterName, canisterPath, stdioType);
        }
    );

    logSuccess(canisterPath, canisterName);
}

function compilationErrorToAzleErrorResult(error: unknown): Err<AzleError> {
    if (isTsCompilationError(error)) {
        const firstError = error.errors[0];
        const codeSnippet = generateVisualDisplayOfErrorLocation(
            firstError.location
        );
        return Err({
            error: `TypeScript error: ${firstError.text}`,
            suggestion: codeSnippet,
            exitCode: 5
        });
    } else {
        return Err({
            error: `Unable to compile TS to JS: ${error}`,
            exitCode: 6
        });
    }
}

function isTsCompilationError(error: unknown): error is TsCompilationError {
    if (
        error &&
        typeof error === 'object' &&
        'stack' in error &&
        'message' in error &&
        'errors' in error &&
        'warnings' in error
    ) {
        return true;
    }
    return false;
}

function generateVisualDisplayOfErrorLocation(
    location: TsSyntaxErrorLocation
): string {
    const { file, line, column, lineText } = location;
    const marker = red('^'.padStart(column + 1));
    const preciseLocation = dim(`${file}:${line}:${column}`);
    const previousLine =
        line > 1
            ? dim(`${(line - 1).toString().padStart(line.toString().length)}| `)
            : '';
    const offendingLine = `${dim(`${line}| `)}${lineText}`;
    const subsequentLine = `${dim(
        `${(line + 1).toString().padStart(line.toString().length)}| `
    )}${marker}`;
    return `${preciseLocation}\n${previousLine}\n${offendingLine}\n${subsequentLine}`;
}

function getEnvVars(canisterConfig: JSCanisterConfig): [string, string][] {
    return (canisterConfig.env ?? []).map((envVarName) => {
        return [envVarName, process.env[envVarName] ?? ''];
    });
}

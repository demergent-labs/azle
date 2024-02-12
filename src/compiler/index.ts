import { join } from 'path';
import { compileRustCode } from './compile_rust_code';
import { generateNewAzleProject } from './new_command';
import {
    getCanisterConfig,
    getCanisterName,
    getStdIoType,
    logSuccess,
    time,
    unwrap
} from './utils';
import { dim, green, red, yellow } from './utils/colors';
import { version as azleVersion } from '../../package.json';
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
import { copySync, readFileSync } from 'fs-extra';
import { execSync, IOType } from 'child_process';
import { GLOBAL_AZLE_CONFIG_DIR } from './utils/global_paths';
import { createHash } from 'crypto';

azle();

async function azle() {
    if (process.argv[2] === 'new') {
        generateNewAzleProject(azleVersion);
        return;
    }

    const stdioType = getStdIoType();

    const dockerfileHash = getDockerfileHash();
    const dockerImagePrefix = 'azle__image__';
    const dockerImageName = `${dockerImagePrefix}${dockerfileHash}`;
    const dockerContainerPrefix = 'azle__container__';
    const dockerContainerName = `${dockerContainerPrefix}${dockerfileHash}`;
    const wasmedgeQuickJsName = `wasmedge_quickjs_${dockerfileHash}`;

    const dockerImagePathTar = join(
        GLOBAL_AZLE_CONFIG_DIR,
        `${dockerImageName}.tar`
    );
    const dockerImagePathTarGz = join(
        GLOBAL_AZLE_CONFIG_DIR,
        `${dockerImageName}.tar.gz`
    );
    const wasmedgeQuickJsPath = join(
        GLOBAL_AZLE_CONFIG_DIR,
        wasmedgeQuickJsName
    );

    if (process.argv[2] === 'dockerfile-hash') {
        execSync(`echo -n "${dockerfileHash}"`, {
            stdio: 'inherit'
        });
        return;
    }

    if (process.argv[2] === 'clean') {
        rmSync(GLOBAL_AZLE_CONFIG_DIR, {
            recursive: true,
            force: true
        });

        console.info(`~/.config/azle directory deleted`);

        rmSync('.azle', {
            recursive: true,
            force: true
        });

        console.info(`.azle directory deleted`);

        execSync(
            `podman stop $(podman ps --filter "name=${dockerContainerPrefix}" --format "{{.ID}}") || true`,
            {
                stdio: stdioType
            }
        );

        console.info(`azle containers stopped`);

        execSync(
            `podman rm $(podman ps -a --filter "name=${dockerContainerPrefix}" --format "{{.ID}}") || true`,
            {
                stdio: stdioType
            }
        );

        console.info(`azle containers removed`);

        execSync(
            `podman image rm $(podman images --filter "reference=${dockerImagePrefix}" --format "{{.ID}}") || true`,
            {
                stdio: stdioType
            }
        );

        console.info(`azle images removed`);

        return;
    }

    const canisterName = unwrap(getCanisterName(process.argv));
    const canisterPath = join('.azle', canisterName);

    await time(
        `\nBuilding canister ${green(canisterName)}`,
        'default',
        async () => {
            const canisterConfig = unwrap(getCanisterConfig(canisterName));
            const candidPath = canisterConfig.candid;

            mkdirSync(GLOBAL_AZLE_CONFIG_DIR, { recursive: true });
            mkdirSync('.azle', { recursive: true });

            const imageHasBeenLoaded = hasImageBeenLoaded(
                dockerImageName,
                stdioType
            );

            if (process.env.AZLE_USE_DOCKERFILE === 'true') {
                try {
                    if (!imageHasBeenLoaded) {
                        if (existsSync(dockerImagePathTar)) {
                            console.info(yellow(`\nLoading image...\n`));

                            execSync(`podman load -i ${dockerImagePathTar}`, {
                                stdio: 'inherit'
                            });
                        } else if (existsSync(dockerImagePathTarGz)) {
                            console.info(yellow(`\nLoading image...\n`));

                            execSync(`podman load -i ${dockerImagePathTarGz}`, {
                                stdio: 'inherit'
                            });
                        } else {
                            throw new Error(
                                `${dockerImagePathTar} or ${dockerImagePathTarGz} does not exist`
                            );
                        }
                    }
                } catch (error) {
                    console.info(yellow(`\nBuilding image...\n`));

                    execSync(
                        `podman build -f ${__dirname}/Dockerfile -t ${dockerImageName} ${__dirname}`,
                        {
                            stdio: 'inherit'
                        }
                    );

                    console.info(yellow(`\nSaving image...\n`));

                    execSync(
                        `podman save -o ${dockerImagePathTar} ${dockerImageName}`,
                        {
                            stdio: 'inherit'
                        }
                    );

                    console.info(yellow(`\nCompiling...`));
                }
            } else {
                try {
                    if (!imageHasBeenLoaded) {
                        if (existsSync(dockerImagePathTar)) {
                            console.info(yellow(`\nLoading image...\n`));

                            execSync(`podman load -i ${dockerImagePathTar}`, {
                                stdio: 'inherit'
                            });
                        } else if (existsSync(dockerImagePathTarGz)) {
                            console.info(yellow(`\nLoading image...\n`));

                            execSync(`podman load -i ${dockerImagePathTarGz}`, {
                                stdio: 'inherit'
                            });
                        } else {
                            throw new Error(
                                `${dockerImagePathTar} or ${dockerImagePathTarGz} does not exist`
                            );
                        }
                    }
                } catch (error) {
                    console.info(yellow(`\nDownloading image...\n`));

                    execSync(
                        `curl -L https://github.com/demergent-labs/azle/releases/download/${azleVersion}/${dockerImageName}.tar.gz -o ${dockerImagePathTarGz}`,
                        {
                            stdio: 'inherit'
                        }
                    );

                    console.info(yellow(`\nLoading image...\n`));

                    execSync(`podman load -i ${dockerImagePathTarGz}`, {
                        stdio: 'inherit'
                    });

                    console.info(yellow(`\nCompiling...`));
                }
            }

            execSync(
                `podman inspect ${dockerContainerName} || podman create --name ${dockerContainerName} ${dockerImageName} tail -f /dev/null`,
                { stdio: stdioType }
            );

            execSync(`podman start ${dockerContainerName}`, {
                stdio: stdioType
            });

            execSync(
                `podman cp ${dockerContainerName}:/wasmedge-quickjs ${wasmedgeQuickJsPath}`,
                { stdio: stdioType }
            );

            const compilationResult = compileTypeScriptToJavaScript(
                canisterConfig.main,
                wasmedgeQuickJsPath
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

            compileRustCode(dockerContainerName, canisterName, stdioType);

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

            compileRustCode(dockerContainerName, canisterName, stdioType);
        }
    );

    logSuccess(canisterName);
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

function hasImageBeenLoaded(
    dockerImageName: string,
    stdioType: IOType
): boolean {
    try {
        execSync(`podman image inspect ${dockerImageName}`, {
            stdio: stdioType
        });

        return true;
    } catch (error) {
        return false;
    }
}

function getDockerfileHash(): string {
    let hash = createHash('sha256');

    const dockerfile = readFileSync(join(__dirname, 'Dockerfile'));

    hash.update(dockerfile);

    return hash.digest('hex');
}

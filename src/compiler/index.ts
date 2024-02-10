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
    CandidGen,
    CanisterMethods,
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

    const commandExecuted = handleCli(
        stdioType,
        dockerfileHash,
        dockerContainerPrefix,
        dockerImagePrefix
    );

    if (commandExecuted === true) {
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

            prepareDockerImage(
                stdioType,
                dockerImageName,
                dockerImagePathTar,
                dockerImagePathTarGz,
                dockerContainerName,
                wasmedgeQuickJsPath
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

            const envVars = getEnvVars(canisterConfig);

            const compilerInfoPath = join(
                canisterPath,
                'canister',
                'src',
                'compiler_info.json'
            );

            const { candid, canisterMethods } = getCandidAndCanisterMethods(
                canisterConfig.candid_gen,
                canisterPath,
                candidPath,
                compilerInfoPath,
                dockerContainerName,
                canisterName,
                stdioType,
                envVars
            );

            writeFileSync(candidPath, candid); // This is for the dfx.json candid property

            const compilerInfo: CompilerInfo = {
                // The spread is because canisterMethods is a function with properties
                canister_methods: {
                    ...canisterMethods
                },
                env_vars: envVars
            };

            compileRustCodeWithCompilerInfo(
                canisterPath,
                candid,
                compilerInfoPath,
                compilerInfo,
                dockerContainerName,
                canisterName,
                stdioType
            );
        }
    );

    logSuccess(canisterName);
}

function handleCli(
    stdioType: IOType,
    dockerfileHash: string,
    dockerContainerPrefix: string,
    dockerImagePrefix: string
): boolean {
    const commandName = process.argv[2];

    if (commandName === 'new') {
        generateNewAzleProject(azleVersion);

        return true;
    }

    if (commandName === 'dockerfile-hash') {
        execSync(`echo -n "${dockerfileHash}"`, {
            stdio: 'inherit'
        });

        return true;
    }

    if (commandName === 'clean') {
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

        return true;
    }

    return false;
}

function prepareDockerImage(
    stdioType: IOType,
    dockerImageName: string,
    dockerImagePathTar: string,
    dockerImagePathTarGz: string,
    dockerContainerName: string,
    wasmedgeQuickJsPath: string
) {
    const imageHasBeenLoaded = hasImageBeenLoaded(dockerImageName, stdioType);

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
}

function compileRustCodeWithCompilerInfo(
    canisterPath: string,
    candid: string,
    compilerInfoPath: string,
    compilerInfo: CompilerInfo,
    dockerContainerName: string,
    canisterName: string,
    stdioType: IOType
) {
    // This is for the Rust canister to have access to the candid file
    writeFileSync(`${canisterPath}/canister/src/candid.did`, candid);

    // TODO why not just write the dfx.json file here as well?
    writeFileSync(compilerInfoPath, JSON.stringify(compilerInfo));

    compileRustCode(dockerContainerName, canisterName, stdioType);
}

function getCandidAndCanisterMethods(
    candidGen: CandidGen = 'automatic',
    canisterPath: string,
    candidPath: string,
    compilerInfoPath: string,
    dockerContainerName: string,
    canisterName: string,
    stdioType: IOType,
    envVars: [string, string][]
): {
    candid: string;
    canisterMethods: CanisterMethods;
} {
    if (candidGen === 'automatic' || candidGen === 'custom') {
        const customCandid =
            candidGen === 'custom' ? readFileSync(candidPath).toString() : '';

        const compilerInfo: CompilerInfo = {
            canister_methods: {
                candid: customCandid,
                queries: [],
                updates: [],
                callbacks: {}
            },
            env_vars: envVars
        };

        compileRustCodeWithCompilerInfo(
            canisterPath,
            customCandid,
            compilerInfoPath,
            compilerInfo,
            dockerContainerName,
            canisterName,
            stdioType
        );

        const { candid, canisterMethods } = generateCandidAndCanisterMethods(
            `${canisterPath}/${canisterName}.wasm`
        );

        return {
            candid: candidGen === 'custom' ? customCandid : candid,
            canisterMethods
        };
    }

    if (candidGen === 'http') {
        if (require.main?.path === undefined) {
            throw new Error(`require.main?.path must be defined`);
        }

        const candid = readFileSync(
            join(require.main?.path, 'server.did')
        ).toString();

        const canisterMethods: CanisterMethods = {
            candid,
            queries: [
                {
                    name: 'http_request',
                    composite: true
                }
            ],
            updates: [
                {
                    name: 'http_request_update'
                }
            ],
            init: { name: 'init' },
            post_upgrade: { name: 'postUpgrade' },
            callbacks: {}
        };

        return {
            candid,
            canisterMethods
        };
    }

    throw new Error(`Unsupported candid_gen: ${candidGen}`);
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

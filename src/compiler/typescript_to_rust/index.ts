import { join } from 'path';
import { compileTypeScriptToJavaScript } from './typescript_to_javascript';
import {
    generateLibCargoToml,
    generateWorkspaceCargoLock,
    generateWorkspaceCargoToml
} from './typescript_to_javascript/cargo_toml_files';
import { writeCodeToFileSystem } from './write_code_to_file_system';
import { Err, ok, unwrap } from '../utils/result';
import {
    AzleError,
    CompilerInfo,
    JSCanisterConfig,
    Toml,
    TsCompilationError,
    TsSyntaxErrorLocation
} from '../utils/types';
import { time } from '../utils';
import { writeFileSync } from 'fs';
import { red, dim } from '../utils/colors';
import { generateCandidAndCanisterMethods } from '../generate_candid_and_canister_methods';

export async function compileTypeScriptToRust(
    canisterName: string,
    canisterPath: string,
    canisterConfig: JSCanisterConfig,
    candidPath: string
) {
    return await time(
        '[1/2] 🔨 Compiling TypeScript...',
        'inline',
        async () => {
            const compilationResult = compileTypeScriptToJavaScript(
                canisterConfig.ts,
                canisterConfig
            );

            if (!ok(compilationResult)) {
                const azleErrorResult = compilationErrorToAzleErrorResult(
                    compilationResult.err
                );
                unwrap(azleErrorResult);
            }

            const { canisterJavaScript, candidJavaScript } =
                compilationResult.ok as {
                    canisterJavaScript: string;
                    candidJavaScript: string;
                };
            const workspaceCargoToml: Toml = generateWorkspaceCargoToml(
                canisterConfig.root,
                canisterConfig.opt_level ?? '0'
            );
            const workspaceCargoLock: Toml = generateWorkspaceCargoLock();
            const libCargoToml: Toml = generateLibCargoToml(canisterName, '');

            const { candid, canisterMethods } =
                generateCandidAndCanisterMethods(candidJavaScript);

            writeCodeToFileSystem(
                canisterConfig.root,
                canisterPath,
                workspaceCargoToml,
                workspaceCargoLock,
                libCargoToml,
                canisterJavaScript,
                candidPath,
                candid
            );

            const compilerInfo: CompilerInfo = {
                // TODO The spread is because canisterMethods is a function with properties
                canister_methods: {
                    ...canisterMethods
                } // TODO we should probably just grab the props out that we need
            };

            const compilerInfoPath = join(
                canisterPath,
                'canister',
                'src',
                'compiler_info.json'
            );

            // TODO why not just write the dfx.json file here as well?
            writeFileSync(compilerInfoPath, JSON.stringify(compilerInfo));

            if (isCompileOnlyMode()) {
                console.log('Compilation complete!');
                process.exit(0);
            }
        }
    );
}

function isCompileOnlyMode(): boolean {
    return (
        process.argv.includes('--compile-only') || process.argv.includes('-c')
    );
}

function compilationErrorToAzleErrorResult(error: unknown): Err<AzleError> {
    if (isTsCompilationError(error)) {
        const firstError = error.errors[0];
        const codeSnippet = generateVisualDisplayOfErrorLocation(
            firstError.location
        );
        return Err({
            error: `There's something wrong in your TypeScript: ${firstError.text}`,
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

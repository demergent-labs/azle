import { describe, expect, test } from '@jest/globals';
export { expect } from '@jest/globals';
import { dirname } from 'path';
import {
    createProgram,
    findConfigFile,
    flattenDiagnosticMessageText,
    getPreEmitDiagnostics,
    parseJsonConfigFileContent,
    readConfigFile,
    sys
} from 'typescript';

export type Test = () => void;

export function runTests(
    canisterName: string,
    tests: Test,
    cwd: string = process.cwd()
) {
    const { shouldRunTests, shouldRunTypeChecks, shouldRunBenchmark } =
        processEnvVars();
    if (shouldRunTests) {
        describe(`Azle ${canisterName} tests`, tests);
    }
    if (shouldRunTypeChecks) {
        describe(`Azle ${canisterName} type checks`, () => {
            it('checks types', () => {
                expect(runTypeCheck(cwd)).toHaveLength(0);
            });
        });
    }
    if (shouldRunBenchmark) {
        describe(`Azle ${canisterName} benchmark`, () => {});
    }
}

export function wait(name: string, delay: number) {
    test(
        `wait ${name}`,
        async () => {
            console.info(`Waiting: ${delay} milliseconds ${name}`);
            await new Promise((resolve) => {
                setTimeout(resolve, delay);
            });
            expect(true);
        },
        delay > 2_500 ? delay * 2 : 5_000 // Calling this function takes a few more milliseconds than what is specified in the delay. Since we never want the delay to time out we will add an ample amount of extra time to the timeout. Since doubling a short delay may not give us enough extra time we will have a reasonable floor.
    );
}

export function please(
    name: string,
    fn: () => void | Promise<void>,
    timeout?: number
) {
    test(
        `please ${name}`,
        async () => {
            console.info(`Preparing: ${name}`);
            await fn();
        },
        timeout
    );
}

export function it(
    name: string,
    fn: () => void | Promise<void>,
    timeout?: number
) {
    test(
        `it ${name}`,
        async () => {
            console.info(`Testing: ${name}`);
            await fn();
        },
        timeout
    );
}

function runTypeCheck(projectDir: string): string[] {
    const configPath = findConfigFile(
        projectDir,
        sys.fileExists,
        'tsconfig.json'
    );

    if (!configPath) {
        throw new Error("Could not find a valid 'tsconfig.json'.");
    }

    const configFile = readConfigFile(configPath, sys.readFile);
    const parsedCommandLine = parseJsonConfigFileContent(
        configFile.config,
        sys,
        dirname(configPath)
    );

    const compilerOptions = {
        ...parsedCommandLine.options,
        noEmit: true,
        skipLibCheck: true
    };

    const program = createProgram(parsedCommandLine.fileNames, compilerOptions);
    const emitResult = program.emit();

    const allDiagnostics = getPreEmitDiagnostics(program).concat(
        emitResult.diagnostics
    );

    const errorMessages = allDiagnostics.map((diagnostic) => {
        if (diagnostic.file !== undefined && diagnostic.start !== undefined) {
            const { line, character } =
                diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            const message = flattenDiagnosticMessageText(
                diagnostic.messageText,
                '\n'
            );
            return `${diagnostic.file.fileName} (${line + 1},${
                character + 1
            }): ${message}`;
        } else {
            return flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        }
    });

    return errorMessages;
}

function processEnvVars(): {
    shouldRunTests: boolean;
    shouldRunTypeChecks: boolean;
    shouldRunBenchmark: boolean;
} {
    const shouldRunTests =
        process.env.AZLE_INTEGRATION_TEST_RUN_TESTS !== undefined;
    const shouldRunTypeChecks =
        process.env.AZLE_INTEGRATION_TEST_RUN_TYPE_CHECKS !== undefined;
    const shouldRunBenchmark =
        process.env.AZLE_INTEGRATION_TEST_RUN_BENCHMARKS !== undefined;

    return {
        shouldRunTests:
            shouldRunTests || (!shouldRunTypeChecks && !shouldRunBenchmark),
        shouldRunTypeChecks:
            shouldRunTypeChecks || (!shouldRunTests && !shouldRunBenchmark),
        shouldRunBenchmark:
            shouldRunBenchmark || (!shouldRunTests && !shouldRunTypeChecks)
    };
}

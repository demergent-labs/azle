import { spawn } from 'child_process';
import { CuzzConfig } from 'cuzz';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { getCanisterNames } from '.';

export async function runFuzzTests(): Promise<void> {
    const cuzzConfig = await getCuzzConfig();

    if (cuzzConfig.skip === true) {
        console.log('Skipping fuzz tests as per cuzz configuration.');
        return;
    }

    const canisterNames = await getCanisterNames();
    const callDelay = getCallDelay(cuzzConfig);

    await Promise.all(
        canisterNames.map((canisterName) =>
            fuzzTestCanister(canisterName, callDelay)
        )
    );
}

async function getCuzzConfig(): Promise<CuzzConfig> {
    try {
        const cuzzFile = await readFile(
            join(process.cwd(), 'cuzz.json'),
            'utf-8'
        );

        return JSON.parse(cuzzFile);
    } catch {
        return {};
    }
}

function getCallDelay(cuzzConfig: CuzzConfig): string {
    return (
        process.env.AZLE_FUZZ_CALL_DELAY ??
        cuzzConfig.callDelay?.toString() ??
        '.1'
    );
}

function fuzzTestCanister(
    canisterName: string,
    callDelay: string
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const baseCuzzArgs = [
            'exec',
            '--offline',
            'cuzz',
            '--',
            '--canister-name',
            canisterName,
            '--skip-deploy',
            '--call-delay',
            callDelay,
            '--clear-console',
            ...(process.env.AZLE_RUNNING_IN_GITHUB_ACTIONS === 'true'
                ? ['--silent']
                : [])
        ];

        const cuzzArgs = [
            ...baseCuzzArgs,
            ...(process.env.AZLE_FUZZ_TERMINAL === 'true'
                ? ['--terminal']
                : []),
            ...(process.env.AZLE_FUZZ_TIME_LIMIT !== undefined
                ? ['--time-limit', process.env.AZLE_FUZZ_TIME_LIMIT]
                : [])
        ];

        const cuzzProcess = spawn('npm', cuzzArgs, {
            stdio: 'inherit'
        });

        cuzzProcess.on('exit', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(
                    new Error(
                        `Fuzz test for canister ${canisterName} failed with exit code ${code}`
                    )
                );
            }
        });

        cuzzProcess.on('error', (error) => {
            reject(
                new Error(
                    `Failed to start fuzz test for canister ${canisterName}: ${error.message}`
                )
            );
        });
    });
}

import { spawn } from 'child_process';
import { CuzzConfig } from 'cuzz';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { getCanisterNames } from '.';

export async function runFuzzTests(): Promise<void> {
    const cuzzConfig = await getCuzzConfig();
    const canisterNames = await getCanisterNames();
    const callDelay = getCallDelay(cuzzConfig);

    for (const canisterName of canisterNames) {
        fuzzTestCanister(canisterName, callDelay);
    }
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

function fuzzTestCanister(canisterName: string, callDelay: string): void {
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
        ...(process.env.AZLE_FUZZ_TERMINAL === 'true' ? ['--terminal'] : []),
        ...(process.env.AZLE_FUZZ_TIME_LIMIT !== undefined
            ? ['--time-limit', process.env.AZLE_FUZZ_TIME_LIMIT]
            : [])
    ];

    let cuzzProcess = spawn('npm', cuzzArgs, {
        stdio: 'inherit'
    });

    cuzzProcess.on('exit', (code) => {
        if (code !== 0) {
            process.exit(code ?? 1);
        }
    });
}

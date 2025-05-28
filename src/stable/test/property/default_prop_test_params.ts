import * as fc from 'fast-check';

export function defaultPropTestParams<T = unknown>(): fc.Parameters<T> {
    const baseParams = {
        numRuns: Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1),
        reporter: (runDetails: fc.RunDetails<T>): void => {
            const seed = runDetails.seed;
            const path = runDetails.counterexamplePath;
            const experimental = process.env.AZLE_EXPERIMENTAL === 'true';
            const reproductionCommand = `${experimental ? 'AZLE_EXPERIMENTAL=true ' : ''}AZLE_PROPTEST_SEED=${seed}${path !== null ? ` AZLE_PROPTEST_PATH="${path}"` : ''} AZLE_VERBOSE=true AZLE_DEV_TEMPLATE=true npm test`;
            const reproductionMessage = `To reproduce this exact test case, run:\ncd ${process.cwd()}\n${reproductionCommand}`;
            console.info(reproductionMessage);
            if (runDetails.failed) {
                const error =
                    runDetails.errorInstance === undefined ||
                    runDetails.errorInstance === null
                        ? ''
                        : `${runDetails.errorInstance.toString()}\n\n`;

                throw new Error(
                    `${reproductionMessage}\n\n${error}${fc.defaultReportMessage(runDetails)}`
                );
            }
        },
        endOnFailure: process.env.AZLE_PROPTEST_SHRINK === 'true' ? false : true
    };

    const seed =
        process.env.AZLE_PROPTEST_SEED !== undefined
            ? Number(process.env.AZLE_PROPTEST_SEED)
            : undefined;

    const path = process.env.AZLE_PROPTEST_PATH;

    return seed !== undefined ? { ...baseParams, seed, path } : baseParams;
}

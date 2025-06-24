import { execSync } from 'node:child_process';

import { expect } from '@jest/globals';

import { getDfxRoot } from '#utils/dfx_root';

import { getCanisterNames } from './canister_names';

type GlobalState = {
    azleRejectCallbacksLen: number;
    azleResolveCallbacksLen: number;
    azleTimerCallbacksLen: number;
    azleInterCanisterCallFuturesLen: number;
    azleActionsLen: number;
    azleIsJobQueueEmpty: boolean;
};

/**
 * Checks the global state of all canisters defined in the dfx.json file.
 *
 * @remarks
 *
 * It checks the state recursively with exponential backoff, waiting for critical states to clear.
 * If critical states are not clear after a certain amount of time, it will stop checking with a jest failure.
 */
export async function runGlobalStateChecks(): Promise<void> {
    const canisterNames = await getCanisterNames();

    for (const canisterName of canisterNames) {
        await checkCanisterGlobalStateWithRetry(canisterName);
    }
}

async function checkCanisterGlobalStateWithRetry(
    canisterName: string
): Promise<void> {
    const maxWaitTimePower = 8; // 2^8 = 256 seconds

    const { finalGlobalState, previousActionsLen } =
        await checkCanisterGlobalStateRecursively(
            canisterName,
            {
                checkCount: 0,
                currentWaitTimePower: 0,
                totalWaitTime: 0,
                previousActionsLen: undefined
            },
            maxWaitTimePower
        );

    expect(areCriticalStatesClear(finalGlobalState, previousActionsLen)).toBe(
        true
    );
}

async function checkCanisterGlobalStateRecursively(
    canisterName: string,
    state: {
        checkCount: number;
        currentWaitTimePower: number;
        totalWaitTime: number;
        previousActionsLen: number | undefined;
    },
    maxWaitTimePower: number
): Promise<{
    finalGlobalState: GlobalState;
    previousActionsLen: number | undefined;
}> {
    console.info(
        `Global state check ${state.checkCount} for canister ${canisterName}`
    );

    const globalState = await getCanisterGlobalState(canisterName);

    console.info(`Check ${state.checkCount} results:`, globalState);

    const criticalStatesClear = areCriticalStatesClear(
        globalState,
        state.previousActionsLen
    );

    if (criticalStatesClear === true && state.checkCount >= 2) {
        return {
            finalGlobalState: globalState,
            previousActionsLen: state.previousActionsLen
        };
    }

    const hasReachedMaxWaitTime =
        state.currentWaitTimePower >= maxWaitTimePower;

    if (hasReachedMaxWaitTime === true) {
        return {
            finalGlobalState: globalState,
            previousActionsLen: state.previousActionsLen
        };
    }

    const currentWaitTimeMs = Math.pow(2, state.currentWaitTimePower) * 1_000;

    console.info(
        `Waiting ${currentWaitTimeMs}ms (2^${state.currentWaitTimePower} seconds) before next check (total wait: ${state.totalWaitTime}ms)`
    );

    await new Promise((resolve) => setTimeout(resolve, currentWaitTimeMs));

    const nextState = {
        checkCount: state.checkCount + 1,
        currentWaitTimePower: state.currentWaitTimePower + 1,
        totalWaitTime: state.totalWaitTime + currentWaitTimeMs,
        previousActionsLen: globalState.azleActionsLen
    };

    return checkCanisterGlobalStateRecursively(
        canisterName,
        nextState,
        maxWaitTimePower
    );
}

async function getCanisterGlobalState(
    canisterName: string
): Promise<GlobalState> {
    const azleRejectCallbacksLen = Number(
        execSync(
            `dfx canister call ${canisterName} _azle_reject_callbacks_len --output json`,
            {
                cwd: getDfxRoot(),
                encoding: 'utf-8'
            }
        ).trim()
    );
    const azleResolveCallbacksLen = Number(
        execSync(
            `dfx canister call ${canisterName} _azle_resolve_callbacks_len --output json`,
            {
                cwd: getDfxRoot(),
                encoding: 'utf-8'
            }
        ).trim()
    );
    const azleTimerCallbacksLen = Number(
        execSync(
            `dfx canister call ${canisterName} _azle_timer_callbacks_len --output json`,
            {
                cwd: getDfxRoot(),
                encoding: 'utf-8'
            }
        ).trim()
    );
    const azleInterCanisterCallFuturesLen = Number(
        execSync(
            `dfx canister call ${canisterName} _azle_inter_canister_call_futures_len --output json`,
            {
                cwd: getDfxRoot(),
                encoding: 'utf-8'
            }
        ).trim()
    );
    const azleActionsLen = Number(
        execSync(
            `dfx canister call ${canisterName} _azle_actions_len --output json`,
            {
                cwd: getDfxRoot(),
                encoding: 'utf-8'
            }
        ).trim()
    );
    const azleIsJobQueueEmpty = JSON.parse(
        execSync(
            `dfx canister call ${canisterName} _azle_is_job_queue_empty --output json`,
            { cwd: getDfxRoot(), encoding: 'utf-8' }
        ).trim()
    ) as boolean;

    return {
        azleRejectCallbacksLen,
        azleResolveCallbacksLen,
        azleTimerCallbacksLen,
        azleInterCanisterCallFuturesLen,
        azleActionsLen,
        azleIsJobQueueEmpty
    };
}

function areCriticalStatesClear(
    globalState: GlobalState,
    previousActionsLen: number | undefined
): boolean {
    const globalActionsLengthUnchanged =
        previousActionsLen === undefined ||
        globalState.azleActionsLen === previousActionsLen;

    return (
        globalState.azleRejectCallbacksLen === 0 &&
        globalState.azleResolveCallbacksLen === 0 &&
        globalState.azleTimerCallbacksLen === 0 &&
        globalState.azleInterCanisterCallFuturesLen === 0 &&
        globalState.azleIsJobQueueEmpty === true &&
        globalActionsLengthUnchanged === true
    );
}

import { cleanDeploy, Ok, ok, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/rejections';
import { RejectCodeResult } from './dfx_generated/rejections/rejections.did';

const rejections_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...cleanDeploy('some_service', 'rejections'),
    {
        name: 'reject code NO_ERROR',
        test: async () => {
            const result = await rejections_canister.getRejectionCodeNoError();
            return matchesVariant('NoError', result);
        }
    },
    {
        name: 'reject code DESTINATION_INVALID',
        test: async () => {
            const result =
                await rejections_canister.getRejectionCodeDestinationInvalid();
            return matchesVariant('DestinationInvalid', result);
        }
    },
    {
        name: 'reject code CANISTER_REJECT',
        test: async () => {
            const result =
                await rejections_canister.getRejectionCodeCanisterReject(
                    'custom rejection message'
                );
            return matchesVariant('CanisterReject', result);
        }
    },
    {
        name: 'reject code CANISTER_ERROR',
        test: async () => {
            const result =
                await rejections_canister.getRejectionCodeCanisterError();
            return matchesVariant('CanisterError', result);
        }
    }
];

run_tests(tests);

function matchesVariant(
    variant: string,
    result: RejectCodeResult
): Ok<boolean> {
    if (!ok(result)) {
        return { ok: false };
    }

    return {
        ok: variant in result.ok
    };
}

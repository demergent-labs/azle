import { cleanDeploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/rejections';

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
            return {
                ok: 'NoError' in result
            };
        }
    },
    {
        name: 'reject code DESTINATION_INVALID',
        test: async () => {
            const result =
                await rejections_canister.getRejectionCodeDestinationInvalid();
            return {
                ok: 'DestinationInvalid' in result
            };
        }
    },
    {
        name: 'reject code CANISTER_REJECT',
        test: async () => {
            const result =
                await rejections_canister.getRejectionCodeCanisterReject();
            return {
                ok: 'CanisterReject' in result
            };
        }
    },
    {
        name: 'reject code CANISTER_ERROR',
        test: async () => {
            const result =
                await rejections_canister.getRejectionCodeCanisterError();
            return {
                ok: 'CanisterError' in result
            };
        }
    }
];

run_tests(tests);

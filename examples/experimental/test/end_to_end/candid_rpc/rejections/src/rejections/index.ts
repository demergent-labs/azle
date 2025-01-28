import { call, IDL, rejectCode, rejectMessage } from 'azle';
import {
    Canister,
    RejectionCode,
    serialize,
    text,
    update
} from 'azle/experimental';

export default Canister({
    getRejectionCodeNoError: update([], RejectionCode, async () => {
        const someCanisterPrincipal = getSomeCanisterPrincipal();

        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://${someCanisterPrincipal}/accept`, {
                body: serialize({
                    candidPath: `/candid/some_canister.did`
                })
            });
        } else {
            await call(someCanisterPrincipal, 'accept', {
                returnIdlType: IDL.Bool
            });
        }

        return rejectCode();
    }),
    getRejectionCodeDestinationInvalid: update([], RejectionCode, async () => {
        try {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://rkp4c-7iaaa-aaaaa-aaaca-cai/method`, {
                    body: serialize({
                        candidPath: `/candid/nonexistent.did`
                    })
                });
            } else {
                await call('rkp4c-7iaaa-aaaaa-aaaca-cai', 'method');
            }
        } catch {
            // continue regardless of error
        }

        return rejectCode();
    }),
    getRejectionCodeCanisterReject: update([], RejectionCode, async () => {
        const someCanisterPrincipal = getSomeCanisterPrincipal();

        try {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://${someCanisterPrincipal}/reject`, {
                    body: serialize({
                        candidPath: `/candid/some_canister.did`,
                        args: ['reject']
                    })
                });
            } else {
                await call(someCanisterPrincipal, 'reject', {
                    paramIdlTypes: [IDL.Text],
                    returnIdlType: IDL.Empty,
                    args: ['reject']
                });
            }
        } catch {
            // continue regardless of error
        }

        return rejectCode();
    }),
    getRejectionCodeCanisterError: update([], RejectionCode, async () => {
        const someCanisterPrincipal = getSomeCanisterPrincipal();

        try {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://${someCanisterPrincipal}/error`, {
                    body: serialize({
                        candidPath: `/candid/some_canister.did`
                    })
                });
            } else {
                await call(someCanisterPrincipal, 'error', {
                    returnIdlType: IDL.Empty
                });
            }
        } catch {
            // continue regardless of error
        }

        return rejectCode();
    }),
    getRejectionMessage: update([text], text, async (message: text) => {
        const someCanisterPrincipal = getSomeCanisterPrincipal();

        try {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://${someCanisterPrincipal}/reject`, {
                    body: serialize({
                        candidPath: `/candid/some_canister.did`,
                        args: [message]
                    })
                });
            } else {
                await call(someCanisterPrincipal, 'reject', {
                    paramIdlTypes: [IDL.Text],
                    returnIdlType: IDL.Empty,
                    args: [message]
                });
            }
        } catch {
            // continue regardless of error
        }

        return rejectMessage();
    })
});

function getSomeCanisterPrincipal(): string {
    if (process.env.SOME_CANISTER_PRINCIPAL !== undefined) {
        return process.env.SOME_CANISTER_PRINCIPAL;
    }

    throw new Error(`process.env.SOME_CANISTER_PRINCIPAL is not defined`);
}

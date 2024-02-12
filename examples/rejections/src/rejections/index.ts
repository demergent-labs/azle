import {
    Canister,
    ic,
    init,
    Principal,
    RejectionCode,
    serialize,
    text,
    update,
    Void
} from 'azle';
import SomeCanister from '../some_canister';

const Nonexistent = Canister({
    method: update([], Void)
});

let someCanister: typeof SomeCanister;
let nonexistentCanister: typeof Nonexistent;

export default Canister({
    init: init([], () => {
        someCanister = SomeCanister(
            Principal.fromText(getSomeCanisterPrincipal())
        );

        nonexistentCanister = Nonexistent(
            Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
        );
    }),
    getRejectionCodeNoError: update([], RejectionCode, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://${getSomeCanisterPrincipal()}/accept`, {
                body: serialize({
                    candidPath: `/src/some_canister.did`
                })
            });
        } else {
            await ic.call(someCanister.accept);
        }

        return ic.rejectCode();
    }),
    getRejectionCodeDestinationInvalid: update([], RejectionCode, async () => {
        try {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://rkp4c-7iaaa-aaaaa-aaaca-cai/method`, {
                    body: serialize({
                        candidPath: `/src/nonexistent.did`
                    })
                });
            } else {
                await ic.call(nonexistentCanister.method);
            }
        } catch (error) {}

        return ic.rejectCode();
    }),
    getRejectionCodeCanisterReject: update([], RejectionCode, async () => {
        try {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://${getSomeCanisterPrincipal()}/reject`, {
                    body: serialize({
                        candidPath: `/src/some_canister.did`,
                        args: ['reject']
                    })
                });
            } else {
                await ic.call(someCanister.reject, { args: ['reject'] });
            }
        } catch (error) {}

        return ic.rejectCode();
    }),
    getRejectionCodeCanisterError: update([], RejectionCode, async () => {
        try {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://${getSomeCanisterPrincipal()}/error`, {
                    body: serialize({
                        candidPath: `/src/some_canister.did`
                    })
                });
            } else {
                await ic.call(someCanister.error);
            }
        } catch (error) {}

        return ic.rejectCode();
    }),
    getRejectionMessage: update([text], text, async (message: text) => {
        try {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://${getSomeCanisterPrincipal()}/reject`, {
                    body: serialize({
                        candidPath: `/src/some_canister.did`,
                        args: [message]
                    })
                });
            } else {
                await ic.call(someCanister.reject, { args: [message] });
            }
        } catch (error) {}

        return ic.rejectMessage();
    })
});

function getSomeCanisterPrincipal(): string {
    if (process.env.SOME_CANISTER_PRINCIPAL !== undefined) {
        return process.env.SOME_CANISTER_PRINCIPAL;
    }

    throw new Error(`process.env.SOME_CANISTER_PRINCIPAL is not defined`);
}

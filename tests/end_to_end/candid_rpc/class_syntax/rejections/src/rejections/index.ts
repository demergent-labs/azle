import {
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

export default class {
    @init([])
    init() {
        someCanister = SomeCanister(
            Principal.fromText(getSomeCanisterPrincipal())
        );

        nonexistentCanister = Nonexistent(
            Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
        );
    }
    @update([], RejectionCode)
    async getRejectionCodeNoError() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://${getSomeCanisterPrincipal()}/accept`, {
                body: serialize({
                    candidPath: `/candid/some_canister.did`
                })
            });
        } else {
            await ic.call(someCanister.accept);
        }

        return ic.rejectCode();
    }
    @update([], RejectionCode)
    async getRejectionCodeDestinationInvalid() {
        try {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://rkp4c-7iaaa-aaaaa-aaaca-cai/method`, {
                    body: serialize({
                        candidPath: `/candid/nonexistent.did`
                    })
                });
            } else {
                await ic.call(nonexistentCanister.method);
            }
        } catch (error) {
            // continue regardless of error
        }

        return ic.rejectCode();
    }
    @update([], RejectionCode)
    async getRejectionCodeCanisterReject() {
        try {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://${getSomeCanisterPrincipal()}/reject`, {
                    body: serialize({
                        candidPath: `/candid/some_canister.did`,
                        args: ['reject']
                    })
                });
            } else {
                await ic.call(someCanister.reject, { args: ['reject'] });
            }
        } catch (error) {
            // continue regardless of error
        }

        return ic.rejectCode();
    }
    @update([], RejectionCode)
    async getRejectionCodeCanisterError() {
        try {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://${getSomeCanisterPrincipal()}/error`, {
                    body: serialize({
                        candidPath: `/candid/some_canister.did`
                    })
                });
            } else {
                await ic.call(someCanister.error);
            }
        } catch (error) {
            // continue regardless of error
        }

        return ic.rejectCode();
    }
    @update([text], text)
    async getRejectionMessage(message: text) {
        try {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                await fetch(`icp://${getSomeCanisterPrincipal()}/reject`, {
                    body: serialize({
                        candidPath: `/candid/some_canister.did`,
                        args: [message]
                    })
                });
            } else {
                await ic.call(someCanister.reject, { args: [message] });
            }
        } catch (error) {
            // continue regardless of error
        }

        return ic.rejectMessage();
    }
}

function getSomeCanisterPrincipal(): string {
    if (process.env.SOME_CANISTER_PRINCIPAL !== undefined) {
        return process.env.SOME_CANISTER_PRINCIPAL;
    }

    throw new Error(`process.env.SOME_CANISTER_PRINCIPAL is not defined`);
}

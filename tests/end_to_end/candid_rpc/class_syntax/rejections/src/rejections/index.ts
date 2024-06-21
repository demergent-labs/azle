import { call, IDL, query, update } from 'azle';

import SomeCanister from '../some_canister';

const Nonexistent = Canister({
    method: update([])
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
        await call(someCanister.accept);

        return ic.rejectCode();
    }
    @update([], RejectionCode)
    async getRejectionCodeDestinationInvalid() {
        try {
            await call(nonexistentCanister.method);
        } catch (error) {
            // continue regardless of error
        }

        return ic.rejectCode();
    }
    @update([], RejectionCode)
    async getRejectionCodeCanisterReject() {
        try {
            await call(someCanister.reject, { args: ['reject'] });
        } catch (error) {
            // continue regardless of error
        }

        return ic.rejectCode();
    }
    @update([], RejectionCode)
    async getRejectionCodeCanisterError() {
        try {
            await call(someCanister.error);
        } catch (error) {
            // continue regardless of error
        }

        return ic.rejectCode();
    }
    @update([IDL.Text], IDL.Text)
    async getRejectionMessage(message: string) {
        try {
            await call(someCanister.reject, { args: [message] });
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

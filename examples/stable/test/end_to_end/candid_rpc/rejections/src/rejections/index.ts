import { call, IDL, msgRejectCode, msgRejectMsg, update } from 'azle';

export default class {
    @update([], IDL.Nat32)
    async getRejectCodeNoError(): Promise<number> {
        await call<undefined, boolean>(getSomeCanisterPrincipal(), 'accept', {
            returnIdlType: IDL.Bool
        });

        return msgRejectCode();
    }

    @update([], IDL.Nat32)
    async getRejectCodeDestinationInvalid(): Promise<number> {
        try {
            await call<undefined, void>(
                'rkp4c-7iaaa-aaaaa-aaaca-cai',
                'method'
            );
        } catch {
            // continue regardless of error
        }

        return msgRejectCode();
    }

    @update([], IDL.Nat32)
    async getRejectCodeCanisterReject(): Promise<number> {
        try {
            await call<[string], void>(getSomeCanisterPrincipal(), 'reject', {
                paramIdlTypes: [IDL.Text],
                args: ['reject']
            });
        } catch {
            // continue regardless of error
        }

        return msgRejectCode();
    }

    @update([], IDL.Nat32)
    async getRejectCodeCanisterError(): Promise<number> {
        try {
            await call<undefined, void>(getSomeCanisterPrincipal(), 'error');
        } catch {
            // continue regardless of error
        }

        return msgRejectCode();
    }

    @update([IDL.Text], IDL.Text)
    async getRejectMessage(message: string): Promise<string> {
        try {
            await call<[string], void>(getSomeCanisterPrincipal(), 'reject', {
                paramIdlTypes: [IDL.Text],
                args: [message]
            });
        } catch {
            // continue regardless of error
        }

        return msgRejectMsg();
    }
}

function getSomeCanisterPrincipal(): string {
    if (process.env.SOME_CANISTER_PRINCIPAL !== undefined) {
        return process.env.SOME_CANISTER_PRINCIPAL;
    }

    throw new Error(`process.env.SOME_CANISTER_PRINCIPAL is not defined`);
}

import {
    call,
    IDL,
    rejectCode,
    RejectionCode,
    rejectMessage,
    update
} from 'azle';

export default class {
    @update([], RejectionCode)
    async getRejectionCodeNoError(): Promise<RejectionCode> {
        await call(getSomeCanisterPrincipal(), 'accept', {
            returnIdl: IDL.Bool
        });

        return rejectCode();
    }

    @update([], RejectionCode)
    async getRejectionCodeDestinationInvalid(): Promise<RejectionCode> {
        try {
            await call('rkp4c-7iaaa-aaaaa-aaaca-cai', 'method');
        } catch (error) {
            // continue regardless of error
        }

        return rejectCode();
    }

    @update([], RejectionCode)
    async getRejectionCodeCanisterReject(): Promise<RejectionCode> {
        try {
            await call(getSomeCanisterPrincipal(), 'reject', {
                paramIdls: [IDL.Text],
                args: ['reject']
            });
        } catch (error) {
            // continue regardless of error
        }

        return rejectCode();
    }

    @update([], RejectionCode)
    async getRejectionCodeCanisterError(): Promise<RejectionCode> {
        try {
            await call(getSomeCanisterPrincipal(), 'error');
        } catch (error) {
            // continue regardless of error
        }

        return rejectCode();
    }

    @update([IDL.Text], IDL.Text)
    async getRejectionMessage(message: string): Promise<string> {
        try {
            await call(getSomeCanisterPrincipal(), 'reject', {
                paramIdls: [IDL.Text],
                args: [message]
            });
        } catch (error) {
            // continue regardless of error
        }

        return rejectMessage();
    }
}

function getSomeCanisterPrincipal(): string {
    if (process.env.SOME_CANISTER_PRINCIPAL !== undefined) {
        return process.env.SOME_CANISTER_PRINCIPAL;
    }

    throw new Error(`process.env.SOME_CANISTER_PRINCIPAL is not defined`);
}

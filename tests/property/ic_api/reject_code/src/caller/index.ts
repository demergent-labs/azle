import { call, IDL, rejectCode, RejectionCode, trap, update } from 'azle';

export default class {
    rejectorPrincipal = getRejectorPrincipal();

    @update([], RejectionCode)
    async getRejectCodeCanisterThrowError(): Promise<RejectionCode> {
        try {
            await call(this.rejectorPrincipal, 'throwError', {
                returnIdlType: IDL.Text
            });
        } catch (error) {
            return rejectCode();
        }
        throw new Error('This should never be thrown');
    }

    @update([], RejectionCode)
    async getRejectCodeCanisterReject(): Promise<RejectionCode> {
        try {
            await call(this.rejectorPrincipal, 'rejectWithMessage', {
                returnIdlType: IDL.Text
            });
        } catch (error) {
            return rejectCode();
        }
        throw new Error('This should never be thrown');
    }

    @update([], RejectionCode)
    async getRejectNoError(): Promise<RejectionCode> {
        await call(this.rejectorPrincipal, 'noError');
        return rejectCode();
    }
}

function getRejectorPrincipal(): string {
    return (
        process.env.REJECTOR_PRINCIPAL ??
        trap('process.env.REJECTOR_PRINCIPAL is undefined')
    );
}

import {
    call,
    IDL,
    query,
    reject,
    rejectCode,
    RejectionCode,
    rejectMessage,
    reply,
    trap,
    update
} from 'azle';

export default class {
    rejectorPrincipal = getRejectorPrincipal();

    @query([IDL.Text], IDL.Text, { manual: true })
    alwaysReplyQuery(input: string): void {
        reply({ data: input, idlType: IDL.Text });
    }

    @query([IDL.Text], IDL.Text, { manual: true })
    alwaysRejectQuery(message: string): void {
        reject(message);
    }

    @query([IDL.Int], IDL.Int, { manual: true })
    evenOrRejectQuery(number: bigint): void {
        if (number % 2n === 0n) {
            reply({ data: number, idlType: IDL.Int });
        } else {
            reject('Odd numbers are rejected');
        }
    }

    @update([IDL.Text], IDL.Text)
    async echoThroughReject(message: string): Promise<string> {
        try {
            await call(this.rejectorPrincipal, 'echoReject', {
                paramIdlTypes: [IDL.Text],
                returnIdlType: IDL.Text,
                args: [message]
            });
        } catch (error) {
            return rejectMessage();
        }
        throw new Error('This should never be thrown');
    }

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

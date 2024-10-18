import {
    call,
    IDL,
    query,
    reject,
    rejectCode,
    rejectMessage,
    reply,
    trap,
    update
} from 'azle';

const RejectionCodeVariant = IDL.Variant({
    NoError: IDL.Null,
    SysFatal: IDL.Null,
    SysTransient: IDL.Null,
    DestinationInvalid: IDL.Null,
    CanisterReject: IDL.Null,
    CanisterError: IDL.Null,
    Unknown: IDL.Null
});

type RejectionCodeVariant =
    | {
          NoError: null;
      }
    | {
          SysFatal: null;
      }
    | {
          SysTransient: null;
      }
    | {
          DestinationInvalid: null;
      }
    | {
          CanisterReject: null;
      }
    | {
          CanisterError: null;
      }
    | {
          Unknown: null;
      };

export default class {
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
            await call(getRejectorPrincipal(), 'echoReject', {
                paramIdlTypes: [IDL.Text],
                returnIdlType: IDL.Text,
                args: [message]
            });
        } catch (error) {
            console.log('echoThroughReject caught an error', error);
            return rejectMessage();
        }
        throw new Error('This should never be thrown');
    }

    @update([], RejectionCodeVariant)
    async getRejectCodeCanisterError(): Promise<RejectionCodeVariant> {
        try {
            await call(getRejectorPrincipal(), 'throwError', {
                returnIdlType: IDL.Text
            });
        } catch (error) {
            console.log('getRejectCodeCanisterError caught an error', error);
            return rejectCode();
        }
        throw new Error('This should never be thrown');
    }

    @update([], RejectionCodeVariant)
    async getRejectCodeCanisterReject(): Promise<RejectionCodeVariant> {
        try {
            await call(getRejectorPrincipal(), 'rejectWithMessage', {
                returnIdlType: IDL.Text
            });
        } catch (error) {
            console.log('getRejectCodeCanisterReject caught an error', error);
            return rejectCode();
        }
        throw new Error('This should never be thrown');
    }
}

function getRejectorPrincipal(): string {
    return (
        process.env.REJECTOR_PRINCIPAL ??
        trap('process.env.REJECTOR_PRINCIPAL is undefined')
    );
}

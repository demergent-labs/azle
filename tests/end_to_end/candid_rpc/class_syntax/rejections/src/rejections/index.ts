import { call, IDL, rejectCode, rejectMessage, update } from 'azle';

const RejectionCode = IDL.Variant({
    NoError: IDL.Null,
    SysFatal: IDL.Null,
    SysTransient: IDL.Null,
    DestinationInvalid: IDL.Null,
    CanisterReject: IDL.Null,
    CanisterError: IDL.Null,
    Unknown: IDL.Null
});

type RejectionCode =
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

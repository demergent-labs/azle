import { call, IDL, msgRejectCode, update } from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/type_tests/assert_type';

export default class {
    rejectorPrincipal = getRejectorPrincipal();

    @update([], IDL.Nat32)
    async getRejectCodeCanisterThrowError(): Promise<number> {
        return getThrowErrorRejectCode(this.rejectorPrincipal);
    }

    @update([], IDL.Nat32)
    async getRejectCodeCanisterReject(): Promise<number> {
        return getRejectWithMessageRejectCode(this.rejectorPrincipal);
    }

    @update([], IDL.Nat32)
    async getRejectNoError(): Promise<number> {
        return getNoErrorRejectCode(this.rejectorPrincipal);
    }

    @update([], IDL.Bool)
    async assertTypes(): Promise<boolean> {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof msgRejectCode>, number>
        >;
        const throwErrorRejectCode = await getThrowErrorRejectCode(
            this.rejectorPrincipal
        );
        const rejectWithMessageRejectCode =
            await getRejectWithMessageRejectCode(this.rejectorPrincipal);
        const noErrorRejectCode = await getNoErrorRejectCode(
            this.rejectorPrincipal
        );
        return (
            isRejectionCode(throwErrorRejectCode) &&
            isRejectionCode(rejectWithMessageRejectCode) &&
            isRejectionCode(noErrorRejectCode)
        );
    }
}

async function getThrowErrorRejectCode(
    rejectorPrincipal: string
): Promise<number> {
    try {
        await call(rejectorPrincipal, 'throwError', {
            returnIdlType: IDL.Text
        });
    } catch {
        return msgRejectCode();
    }
    throw new Error('This should never be thrown');
}

async function getRejectWithMessageRejectCode(
    rejectorPrincipal: string
): Promise<number> {
    try {
        await call(rejectorPrincipal, 'rejectWithMessage', {
            returnIdlType: IDL.Text
        });
    } catch {
        return msgRejectCode();
    }
    throw new Error('This should never be thrown');
}

async function getNoErrorRejectCode(
    rejectorPrincipal: string
): Promise<number> {
    await call(rejectorPrincipal, 'noError');
    return msgRejectCode();
}

/**
 * Type guard that checks if a value is a valid RejectionCode.
 * @param code The value to check
 * @returns True if the value is a RejectionCode, false otherwise
 */
function isRejectionCode(code: number): boolean {
    return code >= 0 && code <= 6;
}

function getRejectorPrincipal(): string {
    if (process.env.REJECTOR_PRINCIPAL !== undefined) {
        return process.env.REJECTOR_PRINCIPAL;
    }

    throw new Error(`process.env.REJECTOR_PRINCIPAL is undefined`);
}

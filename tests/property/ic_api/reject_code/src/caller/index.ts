import { call, IDL, rejectCode, RejectionCode, trap, update } from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/type_tests/assert_type';

export default class {
    rejectorPrincipal = getRejectorPrincipal();

    @update([], RejectionCode)
    async getRejectCodeCanisterThrowError(): Promise<RejectionCode> {
        return getThrowErrorRejectCode(this.rejectorPrincipal);
    }

    @update([], RejectionCode)
    async getRejectCodeCanisterReject(): Promise<RejectionCode> {
        return getRejectWithMessageRejectCode(this.rejectorPrincipal);
    }

    @update([], RejectionCode)
    async getRejectNoError(): Promise<RejectionCode> {
        return getNoErrorRejectCode(this.rejectorPrincipal);
    }

    @update([], IDL.Bool)
    async assertTypes(): Promise<boolean> {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof rejectCode>, RejectionCode>
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
            checkIsValidRejectCode(throwErrorRejectCode) &&
            checkIsValidRejectCode(rejectWithMessageRejectCode) &&
            checkIsValidRejectCode(noErrorRejectCode)
        );
    }
}

async function getThrowErrorRejectCode(
    rejectorPrincipal: string
): Promise<RejectionCode> {
    try {
        await call(rejectorPrincipal, 'throwError', {
            returnIdlType: IDL.Text
        });
    } catch (error) {
        return rejectCode();
    }
    throw new Error('This should never be thrown');
}

async function getRejectWithMessageRejectCode(
    rejectorPrincipal: string
): Promise<RejectionCode> {
    try {
        await call(rejectorPrincipal, 'rejectWithMessage', {
            returnIdlType: IDL.Text
        });
    } catch (error) {
        return rejectCode();
    }
    throw new Error('This should never be thrown');
}

async function getNoErrorRejectCode(
    rejectorPrincipal: string
): Promise<RejectionCode> {
    await call(rejectorPrincipal, 'noError');
    return rejectCode();
}

function checkIsValidRejectCode(code: RejectionCode): boolean {
    // Check if the returned value is an object with exactly one key
    // that matches one of the expected RejectionCode variants
    const validKeys = [
        'NoError',
        'SysFatal',
        'SysTransient',
        'DestinationInvalid',
        'CanisterReject',
        'CanisterError',
        'Unknown'
    ];
    const keys = Object.keys(code);
    return (
        keys.length === 1 &&
        validKeys.includes(keys[0]) &&
        (code as any)[keys[0]] === null
    );
}

function getRejectorPrincipal(): string {
    return (
        process.env.REJECTOR_PRINCIPAL ??
        trap('process.env.REJECTOR_PRINCIPAL is undefined')
    );
}

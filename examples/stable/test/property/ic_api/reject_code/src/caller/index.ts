import { call, IDL, rejectCode, RejectionCode, update } from 'azle';
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
            isRejectionCode(throwErrorRejectCode) &&
            isRejectionCode(rejectWithMessageRejectCode) &&
            isRejectionCode(noErrorRejectCode)
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
    } catch {
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
    } catch {
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

/**
 * Type guard that checks if a value is a valid RejectionCode.
 * @param code The value to check
 * @returns True if the value is a RejectionCode, false otherwise
 */
function isRejectionCode(code: RejectionCode): boolean {
    // RejectionCode is a discriminated union type that can't be checked with typeof/instanceof.
    // Instead, we verify that:
    // 1. The value is a non-null object
    // 2. It has exactly one key that matches a RejectionCode variant
    // 3. The value for that key is null

    const RejectionCodeMap = {
        NoError: null,
        SysFatal: null,
        SysTransient: null,
        DestinationInvalid: null,
        CanisterReject: null,
        CanisterError: null,
        Unknown: null
    };

    if (typeof code !== 'object' || code === null) {
        return false;
    }

    const keys = Object.keys(code) as (keyof RejectionCode)[];

    if (keys.length !== 1) {
        return false;
    }

    const [variant] = keys;

    return variant in RejectionCodeMap && code[variant] === null;
}

function getRejectorPrincipal(): string {
    if (process.env.REJECTOR_PRINCIPAL !== undefined) {
        return process.env.REJECTOR_PRINCIPAL;
    }

    throw new Error(`process.env.REJECTOR_PRINCIPAL is undefined`);
}

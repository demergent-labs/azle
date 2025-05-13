import { call, IDL, msgRejectCode, update } from 'azle';
import {
    AssertType,
    NotAnyAndExact
} from 'azle/_internal/type_tests/assert_type';

export default class {
    @update([], IDL.Nat32)
    async getRejectCodeCanisterThrowError(): Promise<number> {
        return getThrowErrorRejectCode(getRejectorPrincipal());
    }

    @update([], IDL.Nat32)
    async getRejectCodeCanisterReject(): Promise<number> {
        return getRejectWithMessageRejectCode(getRejectorPrincipal());
    }

    @update([], IDL.Nat32)
    async getRejectNoError(): Promise<number> {
        return getNoErrorRejectCode(getRejectorPrincipal());
    }

    @update([], IDL.Bool)
    async assertTypes(): Promise<boolean> {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<
                ReturnType<typeof msgRejectCode>,
                0 | 1 | 2 | 3 | 4 | 5 | 6
            >
        >;
        const throwErrorRejectCode = await getThrowErrorRejectCode(
            getRejectorPrincipal()
        );
        const rejectWithMessageRejectCode =
            await getRejectWithMessageRejectCode(getRejectorPrincipal());
        const noErrorRejectCode = await getNoErrorRejectCode(
            getRejectorPrincipal()
        );
        return (
            isRejectCode(throwErrorRejectCode) &&
            isRejectCode(rejectWithMessageRejectCode) &&
            isRejectCode(noErrorRejectCode)
        );
    }
}

async function getThrowErrorRejectCode(
    rejectorPrincipal: string
): Promise<number> {
    try {
        await call<undefined, string>(rejectorPrincipal, 'throwError', {
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
        await call<undefined, string>(rejectorPrincipal, 'rejectWithMessage', {
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
    await call<undefined, void>(rejectorPrincipal, 'noError');
    return msgRejectCode();
}

/**
 * Type guard that checks if a value is a valid RejectCode.
 * @param code The value to check
 * @returns True if the value is a RejectCode, false otherwise
 */
function isRejectCode(code: number): boolean {
    return code >= 0 && code <= 6;
}

function getRejectorPrincipal(): string {
    if (process.env.REJECTOR_PRINCIPAL !== undefined) {
        return process.env.REJECTOR_PRINCIPAL;
    }

    throw new Error(`process.env.REJECTOR_PRINCIPAL is undefined`);
}

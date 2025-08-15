import { call, IDL, msgRejectMsg, update } from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/_internal/test/assert_type';

export default class {
    @update([IDL.Text], IDL.Text)
    async echoThroughReject(message: string): Promise<string> {
        return await getRejectMessage(getRejectorPrincipal(), message);
    }

    @update([IDL.Text], IDL.Bool)
    async assertTypes(message: string): Promise<boolean> {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof msgRejectMsg>, string>
        >;
        return (
            typeof (await getRejectMessage(getRejectorPrincipal(), message)) ===
            'string'
        );
    }
}

async function getRejectMessage(
    rejectorPrincipal: string,
    message: string
): Promise<string> {
    try {
        await call<[string], string>(rejectorPrincipal, 'echoReject', {
            paramIdlTypes: [IDL.Text],
            returnIdlType: IDL.Text,
            args: [message]
        });
    } catch {
        return msgRejectMsg();
    }
    throw new Error('This should never be thrown');
}

function getRejectorPrincipal(): string {
    if (process.env.REJECTOR_PRINCIPAL !== undefined) {
        return process.env.REJECTOR_PRINCIPAL;
    }

    throw new Error(`process.env.REJECTOR_PRINCIPAL is undefined`);
}

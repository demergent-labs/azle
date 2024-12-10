import { call, IDL, rejectMessage, trap, update } from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/type_tests/assert_type';

export default class {
    rejectorPrincipal = getRejectorPrincipal();

    @update([IDL.Text], IDL.Text)
    async echoThroughReject(message: string): Promise<string> {
        return await getRejectMessage(this.rejectorPrincipal, message);
    }

    @update([IDL.Text], IDL.Bool)
    async assertTypes(message: string): Promise<boolean> {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof rejectMessage>, string>
        >;
        return (
            typeof (await getRejectMessage(this.rejectorPrincipal, message)) ===
            'string'
        );
    }
}

async function getRejectMessage(
    rejectorPrincipal: string,
    message: string
): Promise<string> {
    try {
        await call(rejectorPrincipal, 'echoReject', {
            paramIdlTypes: [IDL.Text],
            returnIdlType: IDL.Text,
            args: [message]
        });
    } catch (error) {
        return rejectMessage();
    }
    throw new Error('This should never be thrown');
}

function getRejectorPrincipal(): string {
    return (
        process.env.REJECTOR_PRINCIPAL ??
        trap('process.env.REJECTOR_PRINCIPAL is undefined')
    );
}

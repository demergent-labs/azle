import { call, IDL, rejectMessage, trap, update } from 'azle';

export default class {
    rejectorPrincipal = getRejectorPrincipal();

    @update([IDL.Text], IDL.Text)
    async echoThroughReject(message: string): Promise<string> {
        return await getRejectMessage(this.rejectorPrincipal, message);
    }

    @update([IDL.Text], IDL.Bool)
    async rejectMessageTypesAreCorrect(message: string): Promise<boolean> {
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

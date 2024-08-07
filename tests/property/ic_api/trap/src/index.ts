import {
    acceptMessage,
    argDataRaw,
    IDL,
    inspectMessage,
    methodName,
    query,
    trap,
    update
} from 'azle';

export default class {
    @inspectMessage
    inspectMessage(): void {
        if (methodName() === 'inspectMessageTrap') {
            const message = IDL.decode([IDL.Text], argDataRaw())[0] as string;

            trap(message);
        } else {
            acceptMessage();
        }
    }

    @update([IDL.Text])
    inspectMessageTrap(_message: string): void {}

    @query([IDL.Text])
    queryTrap(message: string): void {
        trap(message);
    }

    @update([IDL.Text])
    updateTrap(message: string): void {
        trap(message);
    }
}

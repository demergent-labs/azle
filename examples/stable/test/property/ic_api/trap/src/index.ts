import {
    acceptMessage,
    IDL,
    inspectMessage,
    methodName,
    msgArgData,
    query,
    trap,
    update
} from 'azle';

export default class {
    @inspectMessage
    inspectMessage(): void {
        if (methodName() === 'inspectMessageTrap') {
            const message = IDL.decode([IDL.Text], msgArgData())[0] as string;

            trap(`trap proptest message: ${message}`);
        } else {
            acceptMessage();
        }
    }

    @update([IDL.Text])
    inspectMessageTrap(_message: string): void {}

    @query([IDL.Text])
    queryTrap(message: string): void {
        trap(`trap proptest message: ${message}`);
    }

    @update([IDL.Text])
    updateTrap(message: string): void {
        trap(`trap proptest message: ${message}`);
    }
}

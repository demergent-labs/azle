import {
    IDL,
    inspectMessage,
    msgArgData,
    msgMethodName,
    query,
    trap,
    update
} from 'azle';

export default class {
    @inspectMessage({ manual: true })
    inspectMessage(methodName: string, arg: string): boolean {
        if (methodName !== undefined || arg !== undefined) {
            throw new Error('manual is not working');
        }

        if (msgMethodName() === 'inspectMessageTrap') {
            const argData = msgArgData();

            const message = IDL.decode(
                [IDL.Text],
                argData.buffer instanceof ArrayBuffer
                    ? argData.buffer
                    : new Uint8Array(argData).buffer
            )[0] as string;

            trap(`trap proptest message: ${message}`);
        } else {
            return true;
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

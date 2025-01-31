import {
    acceptMessage,
    IDL,
    inspectMessage,
    msgMethodName,
    update
} from 'azle';

export default class {
    @inspectMessage
    inspectMessage(): void {
        console.info('inspectMessage called');

        if (
            msgMethodName() === 'accessible' ||
            msgMethodName() === '_azle_get_benchmarks'
        ) {
            acceptMessage();
            return;
        }

        if (msgMethodName() === 'inaccessible') {
            return;
        }

        throw `Method "${msgMethodName()}" not allowed`;
    }

    @update([], IDL.Bool)
    accessible(): boolean {
        return true;
    }

    @update([], IDL.Bool)
    inaccessible(): boolean {
        return false;
    }

    @update([], IDL.Bool)
    alsoInaccessible(): boolean {
        return false;
    }
}

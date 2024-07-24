// TODO to improve these tests we would also test init, postUpgrade, and preUpgrade

import {
    acceptMessage,
    argDataRaw,
    IDL,
    // init,
    inspectMessage,
    methodName,
    // postUpgrade,
    // preUpgrade,
    query,
    trap,
    update
} from 'azle';

export default class {
    // @init([])
    // init(): void {
    //     trap(`trapped from init`);
    // }

    // @postUpgrade([])
    // postUpgrade(): void {
    //     trap(`trapped from postUpgrade`);
    // }

    // @preUpgrade
    // preUpgrade(): void {
    //     trap(`trapped from preUpgrade`);
    // }

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

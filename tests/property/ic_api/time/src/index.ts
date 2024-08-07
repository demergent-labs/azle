// TODO to improve these tests we would also test init, postUpgrade, and preUpgrade

import {
    acceptMessage,
    // argDataRaw,
    IDL,
    // init,
    inspectMessage,
    methodName,
    // postUpgrade,
    // preUpgrade,
    query,
    time,
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
        if (methodName() === 'inspectMessageTime') {
            trap(time().toString());
        } else {
            acceptMessage();
        }
    }

    @update([])
    inspectMessageTime(): void {}

    @query([], IDL.Nat64)
    queryTime(): bigint {
        return time();
    }

    @update([], IDL.Nat64)
    updateTime(): bigint {
        return time();
    }
}

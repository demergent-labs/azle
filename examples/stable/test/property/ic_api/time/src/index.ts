// TODO to improve these tests we would also test init, postUpgrade, and preUpgrade

import {
    acceptMessage,
    IDL,
    // init,
    inspectMessage,
    msgMethodName,
    // msgArgData,
    // postUpgrade,
    // preUpgrade,
    query,
    time,
    trap,
    update
} from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/type_tests/assert_type';

export default class {
    // @init
    // init(): void {
    //     trap(`trapped from init`);
    // }

    // @postUpgrade
    // postUpgrade(): void {
    //     trap(`trapped from postUpgrade`);
    // }

    // @preUpgrade
    // preUpgrade(): void {
    //     trap(`trapped from preUpgrade`);
    // }

    @inspectMessage
    inspectMessage(): void {
        if (msgMethodName() === 'inspectMessageTime') {
            trap(`inspectMessageTime trap message: ${time()}`);
        } else {
            acceptMessage();
        }
    }

    @update
    inspectMessageTime(): void {}

    @query([], IDL.Nat64)
    queryTime(): bigint {
        return time();
    }

    @update([], IDL.Nat64)
    updateTime(): bigint {
        return time();
    }

    @query([], IDL.Bool)
    assertTypes(): boolean {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof time>, bigint>
        >;
        return typeof time() === 'bigint';
    }
}

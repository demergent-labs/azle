// TODO to improve these tests we would also test init, postUpgrade, and preUpgrade

import {
    IDL,
    // init,
    inspectMessage,
    // msgArgData,
    // postUpgrade,
    // preUpgrade,
    query,
    time,
    trap,
    update
} from 'azle';
import {
    AssertType,
    NotAnyAndExact
} from 'azle/_internal/type_tests/assert_type';

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
    inspectMessage(methodName: string): boolean {
        if (methodName === 'inspectMessageTime') {
            trap(`inspectMessageTime trap message: ${time()}`);

            return false;
        } else {
            return true;
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

import {
    IDL,
    init,
    inspectMessage,
    msgCaller,
    postUpgrade,
    preUpgrade,
    Principal,
    query,
    StableBTreeMap,
    update
} from 'azle';
import {
    AssertType,
    NotAnyAndExact
} from 'azle/_internal/type_tests/assert_type';

export default class {
    initCaller: Principal | null = null;
    postUpgradeCaller: Principal | null = null;
    preUpgradeCaller = new StableBTreeMap<'PRE_UPGRADE_CALLER', Principal>(0);
    inspectMessageCaller: Principal | null = null;

    @init
    init(): void {
        this.initCaller = msgCaller();
    }

    @query([], IDL.Opt(IDL.Principal))
    getInitCaller(): [Principal] | [] {
        if (this.initCaller === null) {
            return [];
        } else {
            return [this.initCaller];
        }
    }

    @postUpgrade
    postUpgrade(): void {
        this.postUpgradeCaller = msgCaller();
    }

    @query([], IDL.Opt(IDL.Principal))
    getPostUpgradeCaller(): [Principal] | [] {
        if (this.postUpgradeCaller === null) {
            return [];
        } else {
            return [this.postUpgradeCaller];
        }
    }

    @preUpgrade
    preUpgrade(): void {
        this.preUpgradeCaller.insert('PRE_UPGRADE_CALLER', msgCaller());
    }

    @query([], IDL.Opt(IDL.Principal))
    getPreUpgradeCaller(): [Principal] | [] {
        const preUpgradeCaller =
            this.preUpgradeCaller.get('PRE_UPGRADE_CALLER');

        if (preUpgradeCaller === undefined) {
            return [];
        } else {
            return [preUpgradeCaller];
        }
    }

    @inspectMessage
    inspectMessage(methodName: string): boolean {
        if (methodName === 'getInspectMessageCaller') {
            if (msgCaller().toText() === this.inspectMessageCaller?.toText()) {
                return true;
            }
        } else {
            return true;
        }

        return false;
    }

    @update
    setInspectMessageCaller(): void {
        this.inspectMessageCaller = msgCaller();
    }

    @query([], IDL.Opt(IDL.Principal))
    getInspectMessageCaller(): [Principal] | [] {
        if (this.inspectMessageCaller === null) {
            return [];
        } else {
            return [this.inspectMessageCaller];
        }
    }

    @query([], IDL.Principal)
    getQueryCaller(): Principal {
        return msgCaller();
    }

    @update([], IDL.Principal)
    getUpdateCaller(): Principal {
        return msgCaller();
    }

    @query([], IDL.Bool)
    assertTypes(): boolean {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof msgCaller>, Principal>
        >;
        return msgCaller() instanceof Principal;
    }
}

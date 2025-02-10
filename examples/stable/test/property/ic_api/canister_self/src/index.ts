import {
    canisterSelf,
    IDL,
    init,
    inspectMessage,
    postUpgrade,
    preUpgrade,
    Principal,
    query,
    StableBTreeMap,
    update
} from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/type_tests/assert_type';

export default class {
    initCanisterSelf: Principal | null = null;
    postUpgradeCanisterSelf: Principal | null = null;
    preUpgradeCanisterSelf = new StableBTreeMap<
        'PRE_UPGRADE_CANISTER_SELF',
        Principal
    >(0);
    inspectMessageCanisterSelf: Principal | null = null;

    @init
    init(): void {
        this.initCanisterSelf = canisterSelf();
    }

    @query([], IDL.Opt(IDL.Principal))
    getInitCanisterSelf(): [Principal] | [] {
        if (this.initCanisterSelf === null) {
            return [];
        } else {
            return [this.initCanisterSelf];
        }
    }

    @postUpgrade
    postUpgrade(): void {
        this.postUpgradeCanisterSelf = canisterSelf();
    }

    @query([], IDL.Opt(IDL.Principal))
    getPostUpgradeCanisterSelf(): [Principal] | [] {
        if (this.postUpgradeCanisterSelf === null) {
            return [];
        } else {
            return [this.postUpgradeCanisterSelf];
        }
    }

    @preUpgrade
    preUpgrade(): void {
        this.preUpgradeCanisterSelf.insert(
            'PRE_UPGRADE_CANISTER_SELF',
            canisterSelf()
        );
    }

    @query([], IDL.Opt(IDL.Principal))
    getPreUpgradeCanisterSelf(): [Principal] | [] {
        const preUpgradeCanisterSelf = this.preUpgradeCanisterSelf.get(
            'PRE_UPGRADE_CANISTER_SELF'
        );

        if (preUpgradeCanisterSelf === undefined) {
            return [];
        } else {
            return [preUpgradeCanisterSelf];
        }
    }

    @inspectMessage
    inspectMessage(methodName: string): boolean {
        if (methodName === 'getInspectMessageCanisterSelf') {
            if (
                canisterSelf().toText() ===
                this.inspectMessageCanisterSelf?.toText()
            ) {
                return true;
            }
        } else {
            return true;
        }

        return false;
    }

    @update
    setInspectMessageCanisterSelf(): void {
        this.inspectMessageCanisterSelf = canisterSelf();
    }

    @query([], IDL.Opt(IDL.Principal))
    getInspectMessageCanisterSelf(): [Principal] | [] {
        if (this.inspectMessageCanisterSelf === null) {
            return [];
        } else {
            return [this.inspectMessageCanisterSelf];
        }
    }

    @query([], IDL.Principal)
    getQueryCanisterSelf(): Principal {
        return canisterSelf();
    }

    @update([], IDL.Principal)
    getUpdateCanisterSelf(): Principal {
        return canisterSelf();
    }

    @query([], IDL.Bool)
    assertTypes(): boolean {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof canisterSelf>, Principal>
        >;
        return canisterSelf() instanceof Principal;
    }
}

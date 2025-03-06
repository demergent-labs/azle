import '#experimental/lib/assert_experimental';

// JS docs licensed under:
//
// - https://github.com/dfinity/cdk-rs/blob/main/LICENSE
//
// Some documentation changed from original work.
import { Opt } from '#experimental/lib/candid/types/constructed/opt';
import { Record } from '#experimental/lib/candid/types/constructed/record';
import { Variant } from '#experimental/lib/candid/types/constructed/variant';
import { Vec } from '#experimental/lib/candid/types/constructed/vec';
import { nat8 } from '#experimental/lib/candid/types/primitive/nats/nat8';
import { nat64 } from '#experimental/lib/candid/types/primitive/nats/nat64';
import { Null } from '#experimental/lib/candid/types/primitive/null';
import { Principal } from '#experimental/lib/candid/types/reference/principal';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { managementCanister } from '.'; // Used for links in comments

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
/** Argument type of {@link managementCanister.canister_info}. */
export const CanisterInfoArgs = Record({
    /** Principle of the canister. */
    canister_id: Principal,
    /**
     * Number of most recent changes requested to be retrieved from canister
     * history. No changes are retrieved if this field is `None`.
     */
    num_requested_changes: Opt(nat64)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CanisterInfoArgs = typeof CanisterInfoArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
/** Details about a canister creation. */
export const CreationRecord = Record({
    /** Initial set of canister controllers. */
    controllers: Vec(Principal)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CreationRecord = typeof CreationRecord.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
/** The mode with which a canister is installed. */
export const CanisterInstallMode = Variant({
    /** A fresh install of a new canister. */
    install: Null,
    /** Reinstalling a canister that was already installed. */
    reinstall: Null,
    /** Upgrade an existing canister. */
    upgrade: Null
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CanisterInstallMode = typeof CanisterInstallMode.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
/** Details about a canister code deployment. */
export const CodeDeploymentRecord = Record({
    /** See {@link CanisterInstallMode}. */
    mode: CanisterInstallMode,
    /** A SHA256 hash of the new module installed on the canister. */
    module_hash: Vec(nat8)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CodeDeploymentRecord = typeof CodeDeploymentRecord.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
/** Details about updating canister controllers. */
export const ControllersChangeRecord = Record({
    /** The full new set of canister controllers. */
    controllers: Vec(Principal)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type ControllersChangeRecord = typeof ControllersChangeRecord.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
/** Provides details on the respective canister change. */
export const CanisterChangeDetails = Variant({
    /** See {@link CreationRecord}. */
    creation: CreationRecord,
    /** Uninstalling canister's module */
    code_uninstall: Null,
    /** See {@link CodeDeploymentRecord}. */
    code_deployment: CodeDeploymentRecord,
    /** See {@link ControllersChangeRecord}. */
    controllers_change: ControllersChangeRecord
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CanisterChangeDetails = typeof CanisterChangeDetails.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
/** Details about a canister change initiated by a user. */
export const FromUserRecord = Record({
    /** Principle of the user. */
    user_id: Principal
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type FromUserRecord = typeof FromUserRecord.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
/**
 * Details about a canister change initiated by a canister (called *originator*).
 */
export const FromCanisterRecord = Record({
    /** Principle of the originator. */
    canister_id: Principal,
    /**
     * Canister version of the originator when the originator initiated the
     * change. This is `None` if the original does not include its canister
     * version in the field `sender_canister_version` of the management canister
     * payload.
     */
    canister_version: Opt(nat64)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type FromCanisterRecord = typeof FromCanisterRecord.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
/** Provides details on who initiated a canister change. */
export const CanisterChangeOrigin = Variant({
    /** See {@link FromUserRecord}. */
    from_user: FromUserRecord,
    /** See {@link FromCanisterRecord}. */
    from_canister: FromCanisterRecord
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CanisterChangeOrigin = typeof CanisterChangeOrigin.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
/** Represents a canister change as stored in the canister history. */
export const CanisterChange = Record({
    /**
     * The system timestamp (in nanoseconds since Unix Epoch) at which the
     * change was performed
     */
    timestamp_nanos: nat64,
    /** The canister version after performing the change. */
    canister_version: nat64,
    /** The change’s origin (a user or a canister). */
    origin: CanisterChangeOrigin,
    /** The change’s details. */
    details: CanisterChangeDetails
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CanisterChange = typeof CanisterChange.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
/** Return type of {@link managementCanister.canister_info}. */
export const CanisterInfoResult = Record({
    /**
     * Total number of changes ever recorded in canister history. This might be
     * higher than the number of canister changes in recent_changes because the
     * IC might drop old canister changes from its history (with 20 most recent
     * canister changes to always remain in the list).
     */
    total_num_changes: nat64,
    /**
     * The canister changes stored in the order from the oldest to the most
     * recent.
     */
    recent_changes: Vec(CanisterChange),
    /**
     * A SHA256 hash of the module installed on the canister. This is null if
     * the canister is empty.
     */
    module_hash: Opt(Vec(nat8)),
    /** Controllers of the canister. */
    controllers: Vec(Principal)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CanisterInfoResult = typeof CanisterInfoResult.tsType;

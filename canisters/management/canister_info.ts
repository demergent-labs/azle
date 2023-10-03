// JS docs licensed under:
//
// - https://github.com/dfinity/cdk-rs/blob/main/LICENSE
//
// Some documentation changed from original work.

import {
    Record,
    Opt,
    Vec,
    Principal,
    Variant,
    nat64,
    nat8,
    Null
} from '../../src/lib';
import { managementCanister } from '.';

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

/** Details about a canister creation. */
export const CreationRecord = Record({
    /** Initial set of canister controllers. */
    controllers: Vec(Principal)
});

/** The mode with which a canister is installed. */
export const CanisterInstallMode = Variant({
    /** A fresh install of a new canister. */
    install: Null,
    /** Reinstalling a canister that was already installed. */
    reinstall: Null,
    /** Upgrade an existing canister. */
    upgrade: Null
});

/** Details about a canister code deployment. */
export const CodeDeploymentRecord = Record({
    /** See {@link CanisterInstallMode}. */
    mode: CanisterInstallMode,
    /** A SHA256 hash of the new module installed on the canister. */
    module_hash: Vec(nat8)
});

/** Details about updating canister controllers. */
export const ControllersChangeRecord = Record({
    /** The full new set of canister controllers. */
    controllers: Vec(Principal)
});

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

/** Details about a canister change initiated by a user. */
export const FromUserRecord = Record({
    /** Principle of the user. */
    user_id: Principal
});

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

/** Provides details on who initiated a canister change. */
export const CanisterChangeOrigin = Variant({
    /** See {@link FromUserRecord}. */
    from_user: FromUserRecord,
    /** See {@link FromCanisterRecord}. */
    from_canister: FromCanisterRecord
});

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

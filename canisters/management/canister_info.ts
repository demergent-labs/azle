// JS docs licensed under:
//
// - https://github.com/dfinity/cdk-rs/blob/main/LICENSE
//
// Some documentation changed from original work.

import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

/** Argument type of managementCanister.canister_info. */
export const CanisterInfoArgs = IDL.Record({
    /** Principal of the canister. */
    canister_id: IDL.Principal,
    /**
     * Number of most recent changes requested to be retrieved from canister
     * history. No changes are retrieved if this field is `None`.
     */
    num_requested_changes: IDL.Opt(IDL.Nat64)
});
export type CanisterInfoArgs = {
    canister_id: Principal;
    num_requested_changes: [bigint] | [];
};

/** Details about a canister creation. */
export const CreationRecord = IDL.Record({
    /** Initial set of canister controllers. */
    controllers: IDL.Vec(IDL.Principal)
});
export type CreationRecord = {
    controllers: Principal[];
};

/** The mode with which a canister is installed. */
export const CanisterInstallMode = IDL.Variant({
    /** A fresh install of a new canister. */
    install: IDL.Null,
    /** Reinstalling a canister that was already installed. */
    reinstall: IDL.Null,
    /** Upgrade an existing canister. */
    upgrade: IDL.Null
});
export type CanisterInstallMode =
    | {
          install: null;
      }
    | {
          reinstall: null;
      }
    | {
          upgrade: null;
      };

/** Details about a canister code deployment. */
export const CodeDeploymentRecord = IDL.Record({
    /** See {@link CanisterInstallMode}. */
    mode: CanisterInstallMode,
    /** A SHA256 hash of the new module installed on the canister. */
    module_hash: IDL.Vec(IDL.Nat8)
});
export type CodeDeploymentRecord = {
    mode: CanisterInstallMode;
    module_hash: Uint8Array;
};

/** Details about updating canister controllers. */
export const ControllersChangeRecord = IDL.Record({
    /** The full new set of canister controllers. */
    controllers: IDL.Vec(IDL.Principal)
});
export type ControllersChangeRecord = {
    controllers: Principal[];
};

/** Provides details on the respective canister change. */
export const CanisterChangeDetails = IDL.Variant({
    /** See {@link CreationRecord}. */
    creation: CreationRecord,
    /** Uninstalling canister's module */
    code_uninstall: IDL.Null,
    /** See {@link CodeDeploymentRecord}. */
    code_deployment: CodeDeploymentRecord,
    /** See {@link ControllersChangeRecord}. */
    controllers_change: ControllersChangeRecord
});
export type CanisterChangeDetails =
    | {
          creation: CreationRecord;
      }
    | {
          code_uninstall: null;
      }
    | {
          code_deployment: CodeDeploymentRecord;
      }
    | {
          controllers_change: ControllersChangeRecord;
      };

/** Details about a canister change initiated by a user. */
export const FromUserRecord = IDL.Record({
    /** Principle of the user. */
    user_id: IDL.Principal
});
export type FromUserRecord = {
    user_id: Principal;
};

/**
 * Details about a canister change initiated by a canister (called *originator*).
 */
export const FromCanisterRecord = IDL.Record({
    /** Principle of the originator. */
    canister_id: IDL.Principal,
    /**
     * Canister version of the originator when the originator initiated the
     * change. This is `None` if the original does not include its canister
     * version in the field `sender_canister_version` of the management canister
     * payload.
     */
    canister_version: IDL.Opt(IDL.Nat64)
});
export type FromCanisterRecord = {
    canister_id: Principal;
    canister_version: [bigint] | [];
};

/** Provides details on who initiated a canister change. */
export const CanisterChangeOrigin = IDL.Variant({
    /** See {@link FromUserRecord}. */
    from_user: FromUserRecord,
    /** See {@link FromCanisterRecord}. */
    from_canister: FromCanisterRecord
});
export type CanisterChangeOrigin =
    | {
          from_user: FromUserRecord;
      }
    | {
          from_canister: FromCanisterRecord;
      };

/** Represents a canister change as stored in the canister history. */
export const CanisterChange = IDL.Record({
    /**
     * The system timestamp (in nanoseconds since Unix Epoch) at which the
     * change was performed
     */
    timestamp_nanos: IDL.Nat64,
    /** The canister version after performing the change. */
    canister_version: IDL.Nat64,
    /** The change’s origin (a user or a canister). */
    origin: CanisterChangeOrigin,
    /** The change’s details. */
    details: CanisterChangeDetails
});
export type CanisterChange = {
    timestamp_nanos: bigint;
    canister_version: bigint;
    origin: CanisterChangeOrigin;
    details: CanisterChangeDetails;
};

/** Return type of managementCanister.canister_info. */
export const CanisterInfoResult = IDL.Record({
    /**
     * Total number of changes ever recorded in canister history. This might be
     * higher than the number of canister changes in recent_changes because the
     * IC might drop old canister changes from its history (with 20 most recent
     * canister changes to always remain in the list).
     */
    total_num_changes: IDL.Nat64,
    /**
     * The canister changes stored in the order from the oldest to the most
     * recent.
     */
    recent_changes: IDL.Vec(CanisterChange),
    /**
     * A SHA256 hash of the module installed on the canister. This is null if
     * the canister is empty.
     */
    module_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
    /** Controllers of the canister. */
    controllers: IDL.Vec(IDL.Principal)
});
export type CanisterInfoResult = {
    total_num_changes: bigint;
    recent_changes: CanisterChange[];
    module_hash: [Uint8Array] | [];
    controllers: Principal[];
};

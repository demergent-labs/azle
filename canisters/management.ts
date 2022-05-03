// Copyright 2021 DFINITY Stiftung

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at

//    http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

// The original license for the DFINITY code can be found here: https://github.com/dfinity/ic/blob/master/LICENSE
// This file contains derivative works licensed as MIT: https://github.com/demergent-labs/azle/blob/main/LICENSE

// TODO created based on this documentation: https://smartcontracts.org/docs/interface-spec/index.html#ic-candid
// TODO I would like to find the canonical did file in the ic repository

import {
    Canister,
    CanisterResult,
    ic,
    nat,
    nat8,
    Opt,
    Principal,
    Variant
} from '../index';

export type CanisterId = Principal;
export type UserId = Principal;
export type WasmModule = nat8[];

export type CanisterSettings = {
    controllers: Opt<Principal[]>;
    compute_allocation: Opt<nat>;
    memory_allocation: Opt<nat>;
    freezing_threshold: Opt<nat>;
};

export type DefiniteCanisterSettings = {
    controllers: Principal[];
    compute_allocation: nat;
    memory_allocation: nat;
    freezing_threshold: nat;
};

export type CreateCanisterArgs = {
    settings: Opt<CanisterSettings>;
};

export type CreateCanisterResult = {
    canister_id: CanisterId;
};

export type UpdateSettingsArgs = {
    canister_id: Principal;
    settings: CanisterSettings;
};

export type InstallCodeArgs = {
    mode: InstallCodeMode;
    canister_id: CanisterId;
    wasm_module: WasmModule;
    arg: nat8[];
};

export type InstallCodeMode = Variant<{
    install: null;
    reinstall: null;
    upgrade: null;
}>;

export type UninstallCodeArgs = {
    canister_id: CanisterId;
};

export type StartCanisterArgs = {
    canister_id: CanisterId;
};

export type StopCanisterArgs = {
    canister_id: CanisterId;
};

export type CanisterStatusArgs = {
    canister_id: Principal;
};

export type CanisterStatusResult = {
    status: CanisterStatus;
    settings: DefiniteCanisterSettings;
    module_hash: Opt<nat8[]>;
    memory_size: nat;
    cycles: nat;
};

export type CanisterStatus = Variant<{
    running?: null;
    stopping?: null;
    stopped?: null;
}>;

export type DeleteCanisterArgs = {
    canister_id: CanisterId;
};

export type DepositCyclesArgs = {
    canister_id: CanisterId;
};

export type ProvisionalCreateCanisterWithCyclesArgs = {
    amount: Opt<nat>;
    settings: Opt<CanisterSettings>;
};

export type ProvisionalCreateCanisterWithCyclesResult = {
    canister_id: CanisterId;
};

export type ProvisionalTopUpCanisterArgs = {
    canister_id: CanisterId;
    amount: nat;
};

export type Management = Canister<{
    create_canister(args: CreateCanisterArgs): CanisterResult<CreateCanisterResult>;
    update_settings(args: UpdateSettingsArgs): CanisterResult<void>;
    install_code(args: InstallCodeArgs): CanisterResult<void>;
    uninstall_code(args: UninstallCodeArgs): CanisterResult<void>;
    start_canister(args: StartCanisterArgs): CanisterResult<void>;
    stop_canister(args: StopCanisterArgs): CanisterResult<void>;
    canister_status(args: CanisterStatusArgs): CanisterResult<CanisterStatusResult>;
    delete_canister(args: DeleteCanisterArgs): CanisterResult<void>;
    deposit_cycles(args: DepositCyclesArgs): CanisterResult<void>;
    raw_rand(): CanisterResult<nat8[]>;
    provisional_create_canister_with_cycles(args: ProvisionalCreateCanisterWithCyclesArgs): CanisterResult<ProvisionalCreateCanisterWithCyclesResult>;
    provisional_top_up_canister(args: ProvisionalTopUpCanisterArgs): CanisterResult<void>;
}>;

export const ManagementCanister = ic.canisters.Management<Management>('aaaaa-aa');
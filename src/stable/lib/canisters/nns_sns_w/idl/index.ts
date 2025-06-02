import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

export interface AddWasmRequest {
    hash: Uint8Array | number[];
    wasm: [] | [SnsWasm];
}
export interface AddWasmResponse {
    result: [] | [Result];
}
export interface AirdropDistribution {
    airdrop_neurons: Array<NeuronDistribution>;
}
export interface Canister {
    id: [] | [Principal];
}
export interface Countries {
    iso_codes: Array<string>;
}
export interface DappCanisters {
    canisters: Array<Canister>;
}
export interface DappCanistersTransferResult {
    restored_dapp_canisters: Array<Canister>;
    nns_controlled_dapp_canisters: Array<Canister>;
    sns_controlled_dapp_canisters: Array<Canister>;
}
export interface DeployNewSnsRequest {
    sns_init_payload: [] | [SnsInitPayload];
}
export interface DeployNewSnsResponse {
    dapp_canisters_transfer_result: [] | [DappCanistersTransferResult];
    subnet_id: [] | [Principal];
    error: [] | [SnsWasmError];
    canisters: [] | [SnsCanisterIds];
}
export interface DeployedSns {
    root_canister_id: [] | [Principal];
    governance_canister_id: [] | [Principal];
    index_canister_id: [] | [Principal];
    swap_canister_id: [] | [Principal];
    ledger_canister_id: [] | [Principal];
}
export interface DeveloperDistribution {
    developer_neurons: Array<NeuronDistribution>;
}
export interface FractionalDeveloperVotingPower {
    treasury_distribution: [] | [TreasuryDistribution];
    developer_distribution: [] | [DeveloperDistribution];
    airdrop_distribution: [] | [AirdropDistribution];
    swap_distribution: [] | [SwapDistribution];
}
export interface GetAllowedPrincipalsResponse {
    allowed_principals: Array<Principal>;
}
export interface GetDeployedSnsByProposalIdRequest {
    proposal_id: bigint;
}
export interface GetDeployedSnsByProposalIdResponse {
    get_deployed_sns_by_proposal_id_result:
        | []
        | [GetDeployedSnsByProposalIdResult];
}
export type GetDeployedSnsByProposalIdResult =
    | { Error: SnsWasmError }
    | { DeployedSns: DeployedSns };
export interface GetNextSnsVersionRequest {
    governance_canister_id: [] | [Principal];
    current_version: [] | [SnsVersion];
}
export interface GetNextSnsVersionResponse {
    next_version: [] | [SnsVersion];
}
export interface GetProposalIdThatAddedWasmRequest {
    hash: Uint8Array | number[];
}
export interface GetProposalIdThatAddedWasmResponse {
    proposal_id: [] | [bigint];
}
export interface GetSnsSubnetIdsResponse {
    sns_subnet_ids: Array<Principal>;
}
export interface GetWasmMetadataRequest {
    hash: [] | [Uint8Array | number[]];
}
export interface GetWasmMetadataResponse {
    result: [] | [Result_1];
}
export interface GetWasmRequest {
    hash: Uint8Array | number[];
}
export interface GetWasmResponse {
    wasm: [] | [SnsWasm];
}
export interface IdealMatchedParticipationFunction {
    serialized_representation: [] | [string];
}
export type InitialTokenDistribution = {
    FractionalDeveloperVotingPower: FractionalDeveloperVotingPower;
};
export interface InsertUpgradePathEntriesRequest {
    upgrade_path: Array<SnsUpgrade>;
    sns_governance_canister_id: [] | [Principal];
}
export interface InsertUpgradePathEntriesResponse {
    error: [] | [SnsWasmError];
}
export interface LinearScalingCoefficient {
    slope_numerator: [] | [bigint];
    intercept_icp_e8s: [] | [bigint];
    from_direct_participation_icp_e8s: [] | [bigint];
    slope_denominator: [] | [bigint];
    to_direct_participation_icp_e8s: [] | [bigint];
}
export interface ListDeployedSnsesResponse {
    instances: Array<DeployedSns>;
}
export interface ListUpgradeStep {
    pretty_version: [] | [PrettySnsVersion];
    version: [] | [SnsVersion];
}
export interface ListUpgradeStepsRequest {
    limit: number;
    starting_at: [] | [SnsVersion];
    sns_governance_canister_id: [] | [Principal];
}
export interface ListUpgradeStepsResponse {
    steps: Array<ListUpgradeStep>;
}
export interface MetadataSection {
    contents: [] | [Uint8Array | number[]];
    name: [] | [string];
    visibility: [] | [string];
}
export interface NeuronBasketConstructionParameters {
    dissolve_delay_interval_seconds: bigint;
    count: bigint;
}
export interface NeuronDistribution {
    controller: [] | [Principal];
    dissolve_delay_seconds: bigint;
    memo: bigint;
    stake_e8s: bigint;
    vesting_period_seconds: [] | [bigint];
}
export interface NeuronsFundParticipationConstraints {
    coefficient_intervals: Array<LinearScalingCoefficient>;
    max_neurons_fund_participation_icp_e8s: [] | [bigint];
    min_direct_participation_threshold_icp_e8s: [] | [bigint];
    ideal_matched_participation_function:
        | []
        | [IdealMatchedParticipationFunction];
}
export interface Ok {
    sections: Array<MetadataSection>;
}
export interface PrettySnsVersion {
    archive_wasm_hash: string;
    root_wasm_hash: string;
    swap_wasm_hash: string;
    ledger_wasm_hash: string;
    governance_wasm_hash: string;
    index_wasm_hash: string;
}
export type Result = { Error: SnsWasmError } | { Hash: Uint8Array | number[] };
export type Result_1 = { Ok: Ok } | { Error: SnsWasmError };
export interface SnsCanisterIds {
    root: [] | [Principal];
    swap: [] | [Principal];
    ledger: [] | [Principal];
    index: [] | [Principal];
    governance: [] | [Principal];
}
export interface SnsInitPayload {
    url: [] | [string];
    max_dissolve_delay_seconds: [] | [bigint];
    max_dissolve_delay_bonus_percentage: [] | [bigint];
    nns_proposal_id: [] | [bigint];
    neurons_fund_participation: [] | [boolean];
    min_participant_icp_e8s: [] | [bigint];
    neuron_basket_construction_parameters:
        | []
        | [NeuronBasketConstructionParameters];
    fallback_controller_principal_ids: Array<string>;
    token_symbol: [] | [string];
    final_reward_rate_basis_points: [] | [bigint];
    max_icp_e8s: [] | [bigint];
    neuron_minimum_stake_e8s: [] | [bigint];
    confirmation_text: [] | [string];
    logo: [] | [string];
    name: [] | [string];
    swap_start_timestamp_seconds: [] | [bigint];
    swap_due_timestamp_seconds: [] | [bigint];
    initial_voting_period_seconds: [] | [bigint];
    neuron_minimum_dissolve_delay_to_vote_seconds: [] | [bigint];
    description: [] | [string];
    max_neuron_age_seconds_for_age_bonus: [] | [bigint];
    min_participants: [] | [bigint];
    initial_reward_rate_basis_points: [] | [bigint];
    wait_for_quiet_deadline_increase_seconds: [] | [bigint];
    transaction_fee_e8s: [] | [bigint];
    dapp_canisters: [] | [DappCanisters];
    neurons_fund_participation_constraints:
        | []
        | [NeuronsFundParticipationConstraints];
    max_age_bonus_percentage: [] | [bigint];
    initial_token_distribution: [] | [InitialTokenDistribution];
    reward_rate_transition_duration_seconds: [] | [bigint];
    token_logo: [] | [string];
    token_name: [] | [string];
    max_participant_icp_e8s: [] | [bigint];
    min_direct_participation_icp_e8s: [] | [bigint];
    proposal_reject_cost_e8s: [] | [bigint];
    restricted_countries: [] | [Countries];
    min_icp_e8s: [] | [bigint];
    max_direct_participation_icp_e8s: [] | [bigint];
}
export interface SnsUpgrade {
    next_version: [] | [SnsVersion];
    current_version: [] | [SnsVersion];
}
export interface SnsVersion {
    archive_wasm_hash: Uint8Array | number[];
    root_wasm_hash: Uint8Array | number[];
    swap_wasm_hash: Uint8Array | number[];
    ledger_wasm_hash: Uint8Array | number[];
    governance_wasm_hash: Uint8Array | number[];
    index_wasm_hash: Uint8Array | number[];
}
export interface SnsWasm {
    wasm: Uint8Array | number[];
    proposal_id: [] | [bigint];
    canister_type: number;
}
export interface SnsWasmCanisterInitPayload {
    allowed_principals: Array<Principal>;
    access_controls_enabled: boolean;
    sns_subnet_ids: Array<Principal>;
}
export interface SnsWasmError {
    message: string;
}
export interface SwapDistribution {
    total_e8s: bigint;
    initial_swap_amount_e8s: bigint;
}
export interface TreasuryDistribution {
    total_e8s: bigint;
}
export interface UpdateAllowedPrincipalsRequest {
    added_principals: Array<Principal>;
    removed_principals: Array<Principal>;
}
export interface UpdateAllowedPrincipalsResponse {
    update_allowed_principals_result: [] | [UpdateAllowedPrincipalsResult];
}
export type UpdateAllowedPrincipalsResult =
    | { Error: SnsWasmError }
    | { AllowedPrincipals: GetAllowedPrincipalsResponse };
export interface UpdateSnsSubnetListRequest {
    sns_subnet_ids_to_add: Array<Principal>;
    sns_subnet_ids_to_remove: Array<Principal>;
}
export interface UpdateSnsSubnetListResponse {
    error: [] | [SnsWasmError];
}
export interface _SERVICE {
    add_wasm: ActorMethod<[AddWasmRequest], AddWasmResponse>;
    deploy_new_sns: ActorMethod<[DeployNewSnsRequest], DeployNewSnsResponse>;
    get_allowed_principals: ActorMethod<[{}], GetAllowedPrincipalsResponse>;
    get_deployed_sns_by_proposal_id: ActorMethod<
        [GetDeployedSnsByProposalIdRequest],
        GetDeployedSnsByProposalIdResponse
    >;
    get_latest_sns_version_pretty: ActorMethod<[null], Array<[string, string]>>;
    get_next_sns_version: ActorMethod<
        [GetNextSnsVersionRequest],
        GetNextSnsVersionResponse
    >;
    get_proposal_id_that_added_wasm: ActorMethod<
        [GetProposalIdThatAddedWasmRequest],
        GetProposalIdThatAddedWasmResponse
    >;
    get_sns_subnet_ids: ActorMethod<[{}], GetSnsSubnetIdsResponse>;
    get_wasm: ActorMethod<[GetWasmRequest], GetWasmResponse>;
    get_wasm_metadata: ActorMethod<
        [GetWasmMetadataRequest],
        GetWasmMetadataResponse
    >;
    insert_upgrade_path_entries: ActorMethod<
        [InsertUpgradePathEntriesRequest],
        InsertUpgradePathEntriesResponse
    >;
    list_deployed_snses: ActorMethod<[{}], ListDeployedSnsesResponse>;
    list_upgrade_steps: ActorMethod<
        [ListUpgradeStepsRequest],
        ListUpgradeStepsResponse
    >;
    update_allowed_principals: ActorMethod<
        [UpdateAllowedPrincipalsRequest],
        UpdateAllowedPrincipalsResponse
    >;
    update_sns_subnet_list: ActorMethod<
        [UpdateSnsSubnetListRequest],
        UpdateSnsSubnetListResponse
    >;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const SnsWasmCanisterInitPayload = IDL.Record({
    allowed_principals: IDL.Vec(IDL.Principal),
    access_controls_enabled: IDL.Bool,
    sns_subnet_ids: IDL.Vec(IDL.Principal)
});
export const SnsWasm = IDL.Record({
    wasm: IDL.Vec(IDL.Nat8),
    proposal_id: IDL.Opt(IDL.Nat64),
    canister_type: IDL.Int32
});
export const AddWasmRequest = IDL.Record({
    hash: IDL.Vec(IDL.Nat8),
    wasm: IDL.Opt(SnsWasm)
});
export const SnsWasmError = IDL.Record({ message: IDL.Text });
export const Result = IDL.Variant({
    Error: SnsWasmError,
    Hash: IDL.Vec(IDL.Nat8)
});
export const AddWasmResponse = IDL.Record({ result: IDL.Opt(Result) });
export const NeuronBasketConstructionParameters = IDL.Record({
    dissolve_delay_interval_seconds: IDL.Nat64,
    count: IDL.Nat64
});
export const Canister = IDL.Record({ id: IDL.Opt(IDL.Principal) });
export const DappCanisters = IDL.Record({ canisters: IDL.Vec(Canister) });
export const LinearScalingCoefficient = IDL.Record({
    slope_numerator: IDL.Opt(IDL.Nat64),
    intercept_icp_e8s: IDL.Opt(IDL.Nat64),
    from_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
    slope_denominator: IDL.Opt(IDL.Nat64),
    to_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64)
});
export const IdealMatchedParticipationFunction = IDL.Record({
    serialized_representation: IDL.Opt(IDL.Text)
});
export const NeuronsFundParticipationConstraints = IDL.Record({
    coefficient_intervals: IDL.Vec(LinearScalingCoefficient),
    max_neurons_fund_participation_icp_e8s: IDL.Opt(IDL.Nat64),
    min_direct_participation_threshold_icp_e8s: IDL.Opt(IDL.Nat64),
    ideal_matched_participation_function: IDL.Opt(
        IdealMatchedParticipationFunction
    )
});
export const TreasuryDistribution = IDL.Record({ total_e8s: IDL.Nat64 });
export const NeuronDistribution = IDL.Record({
    controller: IDL.Opt(IDL.Principal),
    dissolve_delay_seconds: IDL.Nat64,
    memo: IDL.Nat64,
    stake_e8s: IDL.Nat64,
    vesting_period_seconds: IDL.Opt(IDL.Nat64)
});
export const DeveloperDistribution = IDL.Record({
    developer_neurons: IDL.Vec(NeuronDistribution)
});
export const AirdropDistribution = IDL.Record({
    airdrop_neurons: IDL.Vec(NeuronDistribution)
});
export const SwapDistribution = IDL.Record({
    total_e8s: IDL.Nat64,
    initial_swap_amount_e8s: IDL.Nat64
});
export const FractionalDeveloperVotingPower = IDL.Record({
    treasury_distribution: IDL.Opt(TreasuryDistribution),
    developer_distribution: IDL.Opt(DeveloperDistribution),
    airdrop_distribution: IDL.Opt(AirdropDistribution),
    swap_distribution: IDL.Opt(SwapDistribution)
});
export const InitialTokenDistribution = IDL.Variant({
    FractionalDeveloperVotingPower: FractionalDeveloperVotingPower
});
export const Countries = IDL.Record({ iso_codes: IDL.Vec(IDL.Text) });
export const SnsInitPayload = IDL.Record({
    url: IDL.Opt(IDL.Text),
    max_dissolve_delay_seconds: IDL.Opt(IDL.Nat64),
    max_dissolve_delay_bonus_percentage: IDL.Opt(IDL.Nat64),
    nns_proposal_id: IDL.Opt(IDL.Nat64),
    neurons_fund_participation: IDL.Opt(IDL.Bool),
    min_participant_icp_e8s: IDL.Opt(IDL.Nat64),
    neuron_basket_construction_parameters: IDL.Opt(
        NeuronBasketConstructionParameters
    ),
    fallback_controller_principal_ids: IDL.Vec(IDL.Text),
    token_symbol: IDL.Opt(IDL.Text),
    final_reward_rate_basis_points: IDL.Opt(IDL.Nat64),
    max_icp_e8s: IDL.Opt(IDL.Nat64),
    neuron_minimum_stake_e8s: IDL.Opt(IDL.Nat64),
    confirmation_text: IDL.Opt(IDL.Text),
    logo: IDL.Opt(IDL.Text),
    name: IDL.Opt(IDL.Text),
    swap_start_timestamp_seconds: IDL.Opt(IDL.Nat64),
    swap_due_timestamp_seconds: IDL.Opt(IDL.Nat64),
    initial_voting_period_seconds: IDL.Opt(IDL.Nat64),
    neuron_minimum_dissolve_delay_to_vote_seconds: IDL.Opt(IDL.Nat64),
    description: IDL.Opt(IDL.Text),
    max_neuron_age_seconds_for_age_bonus: IDL.Opt(IDL.Nat64),
    min_participants: IDL.Opt(IDL.Nat64),
    initial_reward_rate_basis_points: IDL.Opt(IDL.Nat64),
    wait_for_quiet_deadline_increase_seconds: IDL.Opt(IDL.Nat64),
    transaction_fee_e8s: IDL.Opt(IDL.Nat64),
    dapp_canisters: IDL.Opt(DappCanisters),
    neurons_fund_participation_constraints: IDL.Opt(
        NeuronsFundParticipationConstraints
    ),
    max_age_bonus_percentage: IDL.Opt(IDL.Nat64),
    initial_token_distribution: IDL.Opt(InitialTokenDistribution),
    reward_rate_transition_duration_seconds: IDL.Opt(IDL.Nat64),
    token_logo: IDL.Opt(IDL.Text),
    token_name: IDL.Opt(IDL.Text),
    max_participant_icp_e8s: IDL.Opt(IDL.Nat64),
    min_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
    proposal_reject_cost_e8s: IDL.Opt(IDL.Nat64),
    restricted_countries: IDL.Opt(Countries),
    min_icp_e8s: IDL.Opt(IDL.Nat64),
    max_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64)
});
export const DeployNewSnsRequest = IDL.Record({
    sns_init_payload: IDL.Opt(SnsInitPayload)
});
export const DappCanistersTransferResult = IDL.Record({
    restored_dapp_canisters: IDL.Vec(Canister),
    nns_controlled_dapp_canisters: IDL.Vec(Canister),
    sns_controlled_dapp_canisters: IDL.Vec(Canister)
});
export const SnsCanisterIds = IDL.Record({
    root: IDL.Opt(IDL.Principal),
    swap: IDL.Opt(IDL.Principal),
    ledger: IDL.Opt(IDL.Principal),
    index: IDL.Opt(IDL.Principal),
    governance: IDL.Opt(IDL.Principal)
});
export const DeployNewSnsResponse = IDL.Record({
    dapp_canisters_transfer_result: IDL.Opt(DappCanistersTransferResult),
    subnet_id: IDL.Opt(IDL.Principal),
    error: IDL.Opt(SnsWasmError),
    canisters: IDL.Opt(SnsCanisterIds)
});
export const GetAllowedPrincipalsResponse = IDL.Record({
    allowed_principals: IDL.Vec(IDL.Principal)
});
export const GetDeployedSnsByProposalIdRequest = IDL.Record({
    proposal_id: IDL.Nat64
});
export const DeployedSns = IDL.Record({
    root_canister_id: IDL.Opt(IDL.Principal),
    governance_canister_id: IDL.Opt(IDL.Principal),
    index_canister_id: IDL.Opt(IDL.Principal),
    swap_canister_id: IDL.Opt(IDL.Principal),
    ledger_canister_id: IDL.Opt(IDL.Principal)
});
export const GetDeployedSnsByProposalIdResult = IDL.Variant({
    Error: SnsWasmError,
    DeployedSns: DeployedSns
});
export const GetDeployedSnsByProposalIdResponse = IDL.Record({
    get_deployed_sns_by_proposal_id_result: IDL.Opt(
        GetDeployedSnsByProposalIdResult
    )
});
export const SnsVersion = IDL.Record({
    archive_wasm_hash: IDL.Vec(IDL.Nat8),
    root_wasm_hash: IDL.Vec(IDL.Nat8),
    swap_wasm_hash: IDL.Vec(IDL.Nat8),
    ledger_wasm_hash: IDL.Vec(IDL.Nat8),
    governance_wasm_hash: IDL.Vec(IDL.Nat8),
    index_wasm_hash: IDL.Vec(IDL.Nat8)
});
export const GetNextSnsVersionRequest = IDL.Record({
    governance_canister_id: IDL.Opt(IDL.Principal),
    current_version: IDL.Opt(SnsVersion)
});
export const GetNextSnsVersionResponse = IDL.Record({
    next_version: IDL.Opt(SnsVersion)
});
export const GetProposalIdThatAddedWasmRequest = IDL.Record({
    hash: IDL.Vec(IDL.Nat8)
});
export const GetProposalIdThatAddedWasmResponse = IDL.Record({
    proposal_id: IDL.Opt(IDL.Nat64)
});
export const GetSnsSubnetIdsResponse = IDL.Record({
    sns_subnet_ids: IDL.Vec(IDL.Principal)
});
export const GetWasmRequest = IDL.Record({ hash: IDL.Vec(IDL.Nat8) });
export const GetWasmResponse = IDL.Record({ wasm: IDL.Opt(SnsWasm) });
export const GetWasmMetadataRequest = IDL.Record({
    hash: IDL.Opt(IDL.Vec(IDL.Nat8))
});
export const MetadataSection = IDL.Record({
    contents: IDL.Opt(IDL.Vec(IDL.Nat8)),
    name: IDL.Opt(IDL.Text),
    visibility: IDL.Opt(IDL.Text)
});
export const Ok = IDL.Record({ sections: IDL.Vec(MetadataSection) });
export const Result_1 = IDL.Variant({ Ok: Ok, Error: SnsWasmError });
export const GetWasmMetadataResponse = IDL.Record({
    result: IDL.Opt(Result_1)
});
export const SnsUpgrade = IDL.Record({
    next_version: IDL.Opt(SnsVersion),
    current_version: IDL.Opt(SnsVersion)
});
export const InsertUpgradePathEntriesRequest = IDL.Record({
    upgrade_path: IDL.Vec(SnsUpgrade),
    sns_governance_canister_id: IDL.Opt(IDL.Principal)
});
export const InsertUpgradePathEntriesResponse = IDL.Record({
    error: IDL.Opt(SnsWasmError)
});
export const ListDeployedSnsesResponse = IDL.Record({
    instances: IDL.Vec(DeployedSns)
});
export const ListUpgradeStepsRequest = IDL.Record({
    limit: IDL.Nat32,
    starting_at: IDL.Opt(SnsVersion),
    sns_governance_canister_id: IDL.Opt(IDL.Principal)
});
export const PrettySnsVersion = IDL.Record({
    archive_wasm_hash: IDL.Text,
    root_wasm_hash: IDL.Text,
    swap_wasm_hash: IDL.Text,
    ledger_wasm_hash: IDL.Text,
    governance_wasm_hash: IDL.Text,
    index_wasm_hash: IDL.Text
});
export const ListUpgradeStep = IDL.Record({
    pretty_version: IDL.Opt(PrettySnsVersion),
    version: IDL.Opt(SnsVersion)
});
export const ListUpgradeStepsResponse = IDL.Record({
    steps: IDL.Vec(ListUpgradeStep)
});
export const UpdateAllowedPrincipalsRequest = IDL.Record({
    added_principals: IDL.Vec(IDL.Principal),
    removed_principals: IDL.Vec(IDL.Principal)
});
export const UpdateAllowedPrincipalsResult = IDL.Variant({
    Error: SnsWasmError,
    AllowedPrincipals: GetAllowedPrincipalsResponse
});
export const UpdateAllowedPrincipalsResponse = IDL.Record({
    update_allowed_principals_result: IDL.Opt(UpdateAllowedPrincipalsResult)
});
export const UpdateSnsSubnetListRequest = IDL.Record({
    sns_subnet_ids_to_add: IDL.Vec(IDL.Principal),
    sns_subnet_ids_to_remove: IDL.Vec(IDL.Principal)
});
export const UpdateSnsSubnetListResponse = IDL.Record({
    error: IDL.Opt(SnsWasmError)
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const SnsWasmCanisterInitPayload = IDL.Record({
        allowed_principals: IDL.Vec(IDL.Principal),
        access_controls_enabled: IDL.Bool,
        sns_subnet_ids: IDL.Vec(IDL.Principal)
    });
    const SnsWasm = IDL.Record({
        wasm: IDL.Vec(IDL.Nat8),
        proposal_id: IDL.Opt(IDL.Nat64),
        canister_type: IDL.Int32
    });
    const AddWasmRequest = IDL.Record({
        hash: IDL.Vec(IDL.Nat8),
        wasm: IDL.Opt(SnsWasm)
    });
    const SnsWasmError = IDL.Record({ message: IDL.Text });
    const Result = IDL.Variant({
        Error: SnsWasmError,
        Hash: IDL.Vec(IDL.Nat8)
    });
    const AddWasmResponse = IDL.Record({ result: IDL.Opt(Result) });
    const NeuronBasketConstructionParameters = IDL.Record({
        dissolve_delay_interval_seconds: IDL.Nat64,
        count: IDL.Nat64
    });
    const Canister = IDL.Record({ id: IDL.Opt(IDL.Principal) });
    const DappCanisters = IDL.Record({ canisters: IDL.Vec(Canister) });
    const LinearScalingCoefficient = IDL.Record({
        slope_numerator: IDL.Opt(IDL.Nat64),
        intercept_icp_e8s: IDL.Opt(IDL.Nat64),
        from_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        slope_denominator: IDL.Opt(IDL.Nat64),
        to_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64)
    });
    const IdealMatchedParticipationFunction = IDL.Record({
        serialized_representation: IDL.Opt(IDL.Text)
    });
    const NeuronsFundParticipationConstraints = IDL.Record({
        coefficient_intervals: IDL.Vec(LinearScalingCoefficient),
        max_neurons_fund_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        min_direct_participation_threshold_icp_e8s: IDL.Opt(IDL.Nat64),
        ideal_matched_participation_function: IDL.Opt(
            IdealMatchedParticipationFunction
        )
    });
    const TreasuryDistribution = IDL.Record({ total_e8s: IDL.Nat64 });
    const NeuronDistribution = IDL.Record({
        controller: IDL.Opt(IDL.Principal),
        dissolve_delay_seconds: IDL.Nat64,
        memo: IDL.Nat64,
        stake_e8s: IDL.Nat64,
        vesting_period_seconds: IDL.Opt(IDL.Nat64)
    });
    const DeveloperDistribution = IDL.Record({
        developer_neurons: IDL.Vec(NeuronDistribution)
    });
    const AirdropDistribution = IDL.Record({
        airdrop_neurons: IDL.Vec(NeuronDistribution)
    });
    const SwapDistribution = IDL.Record({
        total_e8s: IDL.Nat64,
        initial_swap_amount_e8s: IDL.Nat64
    });
    const FractionalDeveloperVotingPower = IDL.Record({
        treasury_distribution: IDL.Opt(TreasuryDistribution),
        developer_distribution: IDL.Opt(DeveloperDistribution),
        airdrop_distribution: IDL.Opt(AirdropDistribution),
        swap_distribution: IDL.Opt(SwapDistribution)
    });
    const InitialTokenDistribution = IDL.Variant({
        FractionalDeveloperVotingPower: FractionalDeveloperVotingPower
    });
    const Countries = IDL.Record({ iso_codes: IDL.Vec(IDL.Text) });
    const SnsInitPayload = IDL.Record({
        url: IDL.Opt(IDL.Text),
        max_dissolve_delay_seconds: IDL.Opt(IDL.Nat64),
        max_dissolve_delay_bonus_percentage: IDL.Opt(IDL.Nat64),
        nns_proposal_id: IDL.Opt(IDL.Nat64),
        neurons_fund_participation: IDL.Opt(IDL.Bool),
        min_participant_icp_e8s: IDL.Opt(IDL.Nat64),
        neuron_basket_construction_parameters: IDL.Opt(
            NeuronBasketConstructionParameters
        ),
        fallback_controller_principal_ids: IDL.Vec(IDL.Text),
        token_symbol: IDL.Opt(IDL.Text),
        final_reward_rate_basis_points: IDL.Opt(IDL.Nat64),
        max_icp_e8s: IDL.Opt(IDL.Nat64),
        neuron_minimum_stake_e8s: IDL.Opt(IDL.Nat64),
        confirmation_text: IDL.Opt(IDL.Text),
        logo: IDL.Opt(IDL.Text),
        name: IDL.Opt(IDL.Text),
        swap_start_timestamp_seconds: IDL.Opt(IDL.Nat64),
        swap_due_timestamp_seconds: IDL.Opt(IDL.Nat64),
        initial_voting_period_seconds: IDL.Opt(IDL.Nat64),
        neuron_minimum_dissolve_delay_to_vote_seconds: IDL.Opt(IDL.Nat64),
        description: IDL.Opt(IDL.Text),
        max_neuron_age_seconds_for_age_bonus: IDL.Opt(IDL.Nat64),
        min_participants: IDL.Opt(IDL.Nat64),
        initial_reward_rate_basis_points: IDL.Opt(IDL.Nat64),
        wait_for_quiet_deadline_increase_seconds: IDL.Opt(IDL.Nat64),
        transaction_fee_e8s: IDL.Opt(IDL.Nat64),
        dapp_canisters: IDL.Opt(DappCanisters),
        neurons_fund_participation_constraints: IDL.Opt(
            NeuronsFundParticipationConstraints
        ),
        max_age_bonus_percentage: IDL.Opt(IDL.Nat64),
        initial_token_distribution: IDL.Opt(InitialTokenDistribution),
        reward_rate_transition_duration_seconds: IDL.Opt(IDL.Nat64),
        token_logo: IDL.Opt(IDL.Text),
        token_name: IDL.Opt(IDL.Text),
        max_participant_icp_e8s: IDL.Opt(IDL.Nat64),
        min_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        proposal_reject_cost_e8s: IDL.Opt(IDL.Nat64),
        restricted_countries: IDL.Opt(Countries),
        min_icp_e8s: IDL.Opt(IDL.Nat64),
        max_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64)
    });
    const DeployNewSnsRequest = IDL.Record({
        sns_init_payload: IDL.Opt(SnsInitPayload)
    });
    const DappCanistersTransferResult = IDL.Record({
        restored_dapp_canisters: IDL.Vec(Canister),
        nns_controlled_dapp_canisters: IDL.Vec(Canister),
        sns_controlled_dapp_canisters: IDL.Vec(Canister)
    });
    const SnsCanisterIds = IDL.Record({
        root: IDL.Opt(IDL.Principal),
        swap: IDL.Opt(IDL.Principal),
        ledger: IDL.Opt(IDL.Principal),
        index: IDL.Opt(IDL.Principal),
        governance: IDL.Opt(IDL.Principal)
    });
    const DeployNewSnsResponse = IDL.Record({
        dapp_canisters_transfer_result: IDL.Opt(DappCanistersTransferResult),
        subnet_id: IDL.Opt(IDL.Principal),
        error: IDL.Opt(SnsWasmError),
        canisters: IDL.Opt(SnsCanisterIds)
    });
    const GetAllowedPrincipalsResponse = IDL.Record({
        allowed_principals: IDL.Vec(IDL.Principal)
    });
    const GetDeployedSnsByProposalIdRequest = IDL.Record({
        proposal_id: IDL.Nat64
    });
    const DeployedSns = IDL.Record({
        root_canister_id: IDL.Opt(IDL.Principal),
        governance_canister_id: IDL.Opt(IDL.Principal),
        index_canister_id: IDL.Opt(IDL.Principal),
        swap_canister_id: IDL.Opt(IDL.Principal),
        ledger_canister_id: IDL.Opt(IDL.Principal)
    });
    const GetDeployedSnsByProposalIdResult = IDL.Variant({
        Error: SnsWasmError,
        DeployedSns: DeployedSns
    });
    const GetDeployedSnsByProposalIdResponse = IDL.Record({
        get_deployed_sns_by_proposal_id_result: IDL.Opt(
            GetDeployedSnsByProposalIdResult
        )
    });
    const SnsVersion = IDL.Record({
        archive_wasm_hash: IDL.Vec(IDL.Nat8),
        root_wasm_hash: IDL.Vec(IDL.Nat8),
        swap_wasm_hash: IDL.Vec(IDL.Nat8),
        ledger_wasm_hash: IDL.Vec(IDL.Nat8),
        governance_wasm_hash: IDL.Vec(IDL.Nat8),
        index_wasm_hash: IDL.Vec(IDL.Nat8)
    });
    const GetNextSnsVersionRequest = IDL.Record({
        governance_canister_id: IDL.Opt(IDL.Principal),
        current_version: IDL.Opt(SnsVersion)
    });
    const GetNextSnsVersionResponse = IDL.Record({
        next_version: IDL.Opt(SnsVersion)
    });
    const GetProposalIdThatAddedWasmRequest = IDL.Record({
        hash: IDL.Vec(IDL.Nat8)
    });
    const GetProposalIdThatAddedWasmResponse = IDL.Record({
        proposal_id: IDL.Opt(IDL.Nat64)
    });
    const GetSnsSubnetIdsResponse = IDL.Record({
        sns_subnet_ids: IDL.Vec(IDL.Principal)
    });
    const GetWasmRequest = IDL.Record({ hash: IDL.Vec(IDL.Nat8) });
    const GetWasmResponse = IDL.Record({ wasm: IDL.Opt(SnsWasm) });
    const GetWasmMetadataRequest = IDL.Record({
        hash: IDL.Opt(IDL.Vec(IDL.Nat8))
    });
    const MetadataSection = IDL.Record({
        contents: IDL.Opt(IDL.Vec(IDL.Nat8)),
        name: IDL.Opt(IDL.Text),
        visibility: IDL.Opt(IDL.Text)
    });
    const Ok = IDL.Record({ sections: IDL.Vec(MetadataSection) });
    const Result_1 = IDL.Variant({ Ok: Ok, Error: SnsWasmError });
    const GetWasmMetadataResponse = IDL.Record({ result: IDL.Opt(Result_1) });
    const SnsUpgrade = IDL.Record({
        next_version: IDL.Opt(SnsVersion),
        current_version: IDL.Opt(SnsVersion)
    });
    const InsertUpgradePathEntriesRequest = IDL.Record({
        upgrade_path: IDL.Vec(SnsUpgrade),
        sns_governance_canister_id: IDL.Opt(IDL.Principal)
    });
    const InsertUpgradePathEntriesResponse = IDL.Record({
        error: IDL.Opt(SnsWasmError)
    });
    const ListDeployedSnsesResponse = IDL.Record({
        instances: IDL.Vec(DeployedSns)
    });
    const ListUpgradeStepsRequest = IDL.Record({
        limit: IDL.Nat32,
        starting_at: IDL.Opt(SnsVersion),
        sns_governance_canister_id: IDL.Opt(IDL.Principal)
    });
    const PrettySnsVersion = IDL.Record({
        archive_wasm_hash: IDL.Text,
        root_wasm_hash: IDL.Text,
        swap_wasm_hash: IDL.Text,
        ledger_wasm_hash: IDL.Text,
        governance_wasm_hash: IDL.Text,
        index_wasm_hash: IDL.Text
    });
    const ListUpgradeStep = IDL.Record({
        pretty_version: IDL.Opt(PrettySnsVersion),
        version: IDL.Opt(SnsVersion)
    });
    const ListUpgradeStepsResponse = IDL.Record({
        steps: IDL.Vec(ListUpgradeStep)
    });
    const UpdateAllowedPrincipalsRequest = IDL.Record({
        added_principals: IDL.Vec(IDL.Principal),
        removed_principals: IDL.Vec(IDL.Principal)
    });
    const UpdateAllowedPrincipalsResult = IDL.Variant({
        Error: SnsWasmError,
        AllowedPrincipals: GetAllowedPrincipalsResponse
    });
    const UpdateAllowedPrincipalsResponse = IDL.Record({
        update_allowed_principals_result: IDL.Opt(UpdateAllowedPrincipalsResult)
    });
    const UpdateSnsSubnetListRequest = IDL.Record({
        sns_subnet_ids_to_add: IDL.Vec(IDL.Principal),
        sns_subnet_ids_to_remove: IDL.Vec(IDL.Principal)
    });
    const UpdateSnsSubnetListResponse = IDL.Record({
        error: IDL.Opt(SnsWasmError)
    });
    return IDL.Service({
        add_wasm: IDL.Func([AddWasmRequest], [AddWasmResponse], []),
        deploy_new_sns: IDL.Func(
            [DeployNewSnsRequest],
            [DeployNewSnsResponse],
            []
        ),
        get_allowed_principals: IDL.Func(
            [IDL.Record({})],
            [GetAllowedPrincipalsResponse],
            ['query']
        ),
        get_deployed_sns_by_proposal_id: IDL.Func(
            [GetDeployedSnsByProposalIdRequest],
            [GetDeployedSnsByProposalIdResponse],
            ['query']
        ),
        get_latest_sns_version_pretty: IDL.Func(
            [IDL.Null],
            [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
            ['query']
        ),
        get_next_sns_version: IDL.Func(
            [GetNextSnsVersionRequest],
            [GetNextSnsVersionResponse],
            ['query']
        ),
        get_proposal_id_that_added_wasm: IDL.Func(
            [GetProposalIdThatAddedWasmRequest],
            [GetProposalIdThatAddedWasmResponse],
            ['query']
        ),
        get_sns_subnet_ids: IDL.Func(
            [IDL.Record({})],
            [GetSnsSubnetIdsResponse],
            ['query']
        ),
        get_wasm: IDL.Func([GetWasmRequest], [GetWasmResponse], ['query']),
        get_wasm_metadata: IDL.Func(
            [GetWasmMetadataRequest],
            [GetWasmMetadataResponse],
            ['query']
        ),
        insert_upgrade_path_entries: IDL.Func(
            [InsertUpgradePathEntriesRequest],
            [InsertUpgradePathEntriesResponse],
            []
        ),
        list_deployed_snses: IDL.Func(
            [IDL.Record({})],
            [ListDeployedSnsesResponse],
            ['query']
        ),
        list_upgrade_steps: IDL.Func(
            [ListUpgradeStepsRequest],
            [ListUpgradeStepsResponse],
            ['query']
        ),
        update_allowed_principals: IDL.Func(
            [UpdateAllowedPrincipalsRequest],
            [UpdateAllowedPrincipalsResponse],
            []
        ),
        update_sns_subnet_list: IDL.Func(
            [UpdateSnsSubnetListRequest],
            [UpdateSnsSubnetListResponse],
            []
        )
    });
};
export const init: init = ({ IDL }) => {
    const SnsWasmCanisterInitPayload = IDL.Record({
        allowed_principals: IDL.Vec(IDL.Principal),
        access_controls_enabled: IDL.Bool,
        sns_subnet_ids: IDL.Vec(IDL.Principal)
    });
    return [SnsWasmCanisterInitPayload];
};

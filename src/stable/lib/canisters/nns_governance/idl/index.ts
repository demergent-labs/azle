import { ActorMethod } from '@icp-sdk/core/agent';
import { IDL } from '@icp-sdk/core/candid';
import { Principal } from '@icp-sdk/core/principal';

export interface AccountIdentifier {
    hash: Uint8Array | number[];
}
export type Action =
    | { RegisterKnownNeuron: KnownNeuron }
    | { ManageNeuron: ManageNeuron }
    | { UpdateCanisterSettings: UpdateCanisterSettings }
    | { InstallCode: InstallCode }
    | { StopOrStartCanister: StopOrStartCanister }
    | { CreateServiceNervousSystem: CreateServiceNervousSystem }
    | { ExecuteNnsFunction: ExecuteNnsFunction }
    | { RewardNodeProvider: RewardNodeProvider }
    | { OpenSnsTokenSwap: OpenSnsTokenSwap }
    | { SetSnsTokenSwapOpenTimeWindow: SetSnsTokenSwapOpenTimeWindow }
    | { SetDefaultFollowees: SetDefaultFollowees }
    | { RewardNodeProviders: RewardNodeProviders }
    | { ManageNetworkEconomics: NetworkEconomics }
    | { ApproveGenesisKyc: Principals }
    | { AddOrRemoveNodeProvider: AddOrRemoveNodeProvider }
    | { Motion: Motion };
export interface AddHotKey {
    new_hot_key: [] | [Principal];
}
export interface AddOrRemoveNodeProvider {
    change: [] | [Change];
}
export interface Amount {
    e8s: bigint;
}
export interface ApproveGenesisKyc {
    principals: Array<Principal>;
}
export interface Ballot {
    vote: number;
    voting_power: bigint;
}
export interface BallotInfo {
    vote: number;
    proposal_id: [] | [ProposalId];
}
export type By =
    | { NeuronIdOrSubaccount: {} }
    | { MemoAndController: ClaimOrRefreshNeuronFromAccount }
    | { Memo: bigint };
export interface Canister {
    id: [] | [Principal];
}
export interface CanisterSettings {
    freezing_threshold: [] | [bigint];
    wasm_memory_threshold: [] | [bigint];
    controllers: [] | [Controllers];
    log_visibility: [] | [number];
    wasm_memory_limit: [] | [bigint];
    memory_allocation: [] | [bigint];
    compute_allocation: [] | [bigint];
}
export interface CanisterStatusResultV2 {
    status: [] | [number];
    freezing_threshold: [] | [bigint];
    controllers: Array<Principal>;
    memory_size: [] | [bigint];
    cycles: [] | [bigint];
    idle_cycles_burned_per_day: [] | [bigint];
    module_hash: Uint8Array | number[];
}
export interface CanisterSummary {
    status: [] | [CanisterStatusResultV2];
    canister_id: [] | [Principal];
}
export type Change = { ToRemove: NodeProvider } | { ToAdd: NodeProvider };
export interface ChangeAutoStakeMaturity {
    requested_setting_for_auto_stake_maturity: boolean;
}
export interface ClaimOrRefresh {
    by: [] | [By];
}
export interface ClaimOrRefreshNeuronFromAccount {
    controller: [] | [Principal];
    memo: bigint;
}
export interface ClaimOrRefreshNeuronFromAccountResponse {
    result: [] | [Result_1];
}
export interface ClaimOrRefreshResponse {
    refreshed_neuron_id: [] | [NeuronId];
}
export type Command =
    | { Spawn: Spawn }
    | { Split: Split }
    | { Follow: Follow }
    | { RefreshVotingPower: RefreshVotingPower }
    | { ClaimOrRefresh: ClaimOrRefresh }
    | { Configure: Configure }
    | { RegisterVote: RegisterVote }
    | { Merge: Merge }
    | { DisburseToNeuron: DisburseToNeuron }
    | { MakeProposal: Proposal }
    | { StakeMaturity: StakeMaturity }
    | { MergeMaturity: MergeMaturity }
    | { Disburse: Disburse };
export type Command_1 =
    | { Error: GovernanceError }
    | { Spawn: SpawnResponse }
    | { Split: SpawnResponse }
    | { Follow: {} }
    | { RefreshVotingPower: RefreshVotingPowerResponse }
    | { ClaimOrRefresh: ClaimOrRefreshResponse }
    | { Configure: {} }
    | { RegisterVote: {} }
    | { Merge: MergeResponse }
    | { DisburseToNeuron: SpawnResponse }
    | { MakeProposal: MakeProposalResponse }
    | { StakeMaturity: StakeMaturityResponse }
    | { MergeMaturity: MergeMaturityResponse }
    | { Disburse: DisburseResponse };
export type Command_2 =
    | { Spawn: NeuronId }
    | { Split: Split }
    | { Configure: Configure }
    | { Merge: Merge }
    | { DisburseToNeuron: DisburseToNeuron }
    | { SyncCommand: {} }
    | { ClaimOrRefreshNeuron: ClaimOrRefresh }
    | { MergeMaturity: MergeMaturity }
    | { Disburse: Disburse };
export interface Committed {
    total_direct_contribution_icp_e8s: [] | [bigint];
    total_neurons_fund_contribution_icp_e8s: [] | [bigint];
    sns_governance_canister_id: [] | [Principal];
}
export interface Committed_1 {
    total_direct_participation_icp_e8s: [] | [bigint];
    total_neurons_fund_participation_icp_e8s: [] | [bigint];
    sns_governance_canister_id: [] | [Principal];
}
export interface Configure {
    operation: [] | [Operation];
}
export interface Controllers {
    controllers: Array<Principal>;
}
export interface Countries {
    iso_codes: Array<string>;
}
export interface CreateServiceNervousSystem {
    url: [] | [string];
    governance_parameters: [] | [GovernanceParameters];
    fallback_controller_principal_ids: Array<Principal>;
    logo: [] | [Image];
    name: [] | [string];
    ledger_parameters: [] | [LedgerParameters];
    description: [] | [string];
    dapp_canisters: Array<Canister>;
    swap_parameters: [] | [SwapParameters];
    initial_token_distribution: [] | [InitialTokenDistribution];
}
export interface DateRangeFilter {
    start_timestamp_seconds: [] | [bigint];
    end_timestamp_seconds: [] | [bigint];
}
export interface Decimal {
    human_readable: [] | [string];
}
export interface DerivedProposalInformation {
    swap_background_information: [] | [SwapBackgroundInformation];
}
export interface DeveloperDistribution {
    developer_neurons: Array<NeuronDistribution>;
}
export interface Disburse {
    to_account: [] | [AccountIdentifier];
    amount: [] | [Amount];
}
export interface DisburseResponse {
    transfer_block_height: bigint;
}
export interface DisburseToNeuron {
    dissolve_delay_seconds: bigint;
    kyc_verified: boolean;
    amount_e8s: bigint;
    new_controller: [] | [Principal];
    nonce: bigint;
}
export type DissolveState =
    | { DissolveDelaySeconds: bigint }
    | { WhenDissolvedTimestampSeconds: bigint };
export interface Duration {
    seconds: [] | [bigint];
}
export interface ExecuteNnsFunction {
    nns_function: number;
    payload: Uint8Array | number[];
}
export interface Follow {
    topic: number;
    followees: Array<NeuronId>;
}
export interface Followees {
    followees: Array<NeuronId>;
}
export interface Followers {
    followers: Array<NeuronId>;
}
export interface FollowersMap {
    followers_map: Array<[bigint, Followers]>;
}
export interface GetNeuronsFundAuditInfoRequest {
    nns_proposal_id: [] | [ProposalId];
}
export interface GetNeuronsFundAuditInfoResponse {
    result: [] | [Result_6];
}
export interface GlobalTimeOfDay {
    seconds_after_utc_midnight: [] | [bigint];
}
export interface Governance {
    default_followees: Array<[number, Followees]>;
    making_sns_proposal: [] | [MakingSnsProposal];
    most_recent_monthly_node_provider_rewards:
        | []
        | [MonthlyNodeProviderRewards];
    maturity_modulation_last_updated_at_timestamp_seconds: [] | [bigint];
    wait_for_quiet_threshold_seconds: bigint;
    metrics: [] | [GovernanceCachedMetrics];
    neuron_management_voting_period_seconds: [] | [bigint];
    node_providers: Array<NodeProvider>;
    cached_daily_maturity_modulation_basis_points: [] | [number];
    economics: [] | [NetworkEconomics];
    restore_aging_summary: [] | [RestoreAgingSummary];
    spawning_neurons: [] | [boolean];
    latest_reward_event: [] | [RewardEvent];
    to_claim_transfers: Array<NeuronStakeTransfer>;
    short_voting_period_seconds: bigint;
    topic_followee_index: Array<[number, FollowersMap]>;
    migrations: [] | [Migrations];
    proposals: Array<[bigint, ProposalData]>;
    xdr_conversion_rate: [] | [XdrConversionRate];
    in_flight_commands: Array<[bigint, NeuronInFlightCommand]>;
    neurons: Array<[bigint, Neuron]>;
    genesis_timestamp_seconds: bigint;
}
export interface GovernanceCachedMetrics {
    total_maturity_e8s_equivalent: bigint;
    not_dissolving_neurons_e8s_buckets: Array<[bigint, number]>;
    dissolving_neurons_staked_maturity_e8s_equivalent_sum: bigint;
    garbage_collectable_neurons_count: bigint;
    dissolving_neurons_staked_maturity_e8s_equivalent_buckets: Array<
        [bigint, number]
    >;
    neurons_with_invalid_stake_count: bigint;
    not_dissolving_neurons_count_buckets: Array<[bigint, bigint]>;
    ect_neuron_count: bigint;
    total_supply_icp: bigint;
    neurons_with_less_than_6_months_dissolve_delay_count: bigint;
    dissolved_neurons_count: bigint;
    community_fund_total_maturity_e8s_equivalent: bigint;
    total_staked_e8s_seed: bigint;
    total_staked_maturity_e8s_equivalent_ect: bigint;
    total_staked_e8s: bigint;
    fully_lost_voting_power_neuron_subset_metrics: [] | [NeuronSubsetMetrics];
    not_dissolving_neurons_count: bigint;
    total_locked_e8s: bigint;
    neurons_fund_total_active_neurons: bigint;
    total_voting_power_non_self_authenticating_controller: [] | [bigint];
    total_staked_maturity_e8s_equivalent: bigint;
    not_dissolving_neurons_e8s_buckets_ect: Array<[bigint, number]>;
    declining_voting_power_neuron_subset_metrics: [] | [NeuronSubsetMetrics];
    total_staked_e8s_ect: bigint;
    not_dissolving_neurons_staked_maturity_e8s_equivalent_sum: bigint;
    dissolved_neurons_e8s: bigint;
    total_staked_e8s_non_self_authenticating_controller: [] | [bigint];
    dissolving_neurons_e8s_buckets_seed: Array<[bigint, number]>;
    neurons_with_less_than_6_months_dissolve_delay_e8s: bigint;
    not_dissolving_neurons_staked_maturity_e8s_equivalent_buckets: Array<
        [bigint, number]
    >;
    dissolving_neurons_count_buckets: Array<[bigint, bigint]>;
    dissolving_neurons_e8s_buckets_ect: Array<[bigint, number]>;
    non_self_authenticating_controller_neuron_subset_metrics:
        | []
        | [NeuronSubsetMetrics];
    dissolving_neurons_count: bigint;
    dissolving_neurons_e8s_buckets: Array<[bigint, number]>;
    total_staked_maturity_e8s_equivalent_seed: bigint;
    community_fund_total_staked_e8s: bigint;
    not_dissolving_neurons_e8s_buckets_seed: Array<[bigint, number]>;
    public_neuron_subset_metrics: [] | [NeuronSubsetMetrics];
    timestamp_seconds: bigint;
    seed_neuron_count: bigint;
}
export interface GovernanceError {
    error_message: string;
    error_type: number;
}
export interface GovernanceParameters {
    neuron_maximum_dissolve_delay_bonus: [] | [Percentage];
    neuron_maximum_age_for_age_bonus: [] | [Duration];
    neuron_maximum_dissolve_delay: [] | [Duration];
    neuron_minimum_dissolve_delay_to_vote: [] | [Duration];
    neuron_maximum_age_bonus: [] | [Percentage];
    neuron_minimum_stake: [] | [Tokens];
    proposal_wait_for_quiet_deadline_increase: [] | [Duration];
    proposal_initial_voting_period: [] | [Duration];
    proposal_rejection_fee: [] | [Tokens];
    voting_reward_parameters: [] | [VotingRewardParameters];
}
export interface IdealMatchedParticipationFunction {
    serialized_representation: [] | [string];
}
export interface Image {
    base64_encoding: [] | [string];
}
export interface IncreaseDissolveDelay {
    additional_dissolve_delay_seconds: number;
}
export interface InitialTokenDistribution {
    treasury_distribution: [] | [SwapDistribution];
    developer_distribution: [] | [DeveloperDistribution];
    swap_distribution: [] | [SwapDistribution];
}
export interface InstallCode {
    skip_stopping_before_installing: [] | [boolean];
    wasm_module_hash: [] | [Uint8Array | number[]];
    canister_id: [] | [Principal];
    arg_hash: [] | [Uint8Array | number[]];
    install_mode: [] | [number];
}
export interface InstallCodeRequest {
    arg: [] | [Uint8Array | number[]];
    wasm_module: [] | [Uint8Array | number[]];
    skip_stopping_before_installing: [] | [boolean];
    canister_id: [] | [Principal];
    install_mode: [] | [number];
}
export interface KnownNeuron {
    id: [] | [NeuronId];
    known_neuron_data: [] | [KnownNeuronData];
}
export interface KnownNeuronData {
    name: string;
    description: [] | [string];
}
export interface LedgerParameters {
    transaction_fee: [] | [Tokens];
    token_symbol: [] | [string];
    token_logo: [] | [Image];
    token_name: [] | [string];
}
export interface ListKnownNeuronsResponse {
    known_neurons: Array<KnownNeuron>;
}
export interface ListNeurons {
    page_size: [] | [bigint];
    include_public_neurons_in_full_neurons: [] | [boolean];
    neuron_ids: BigUint64Array | bigint[];
    page_number: [] | [bigint];
    include_empty_neurons_readable_by_caller: [] | [boolean];
    neuron_subaccounts: [] | [Array<NeuronSubaccount>];
    include_neurons_readable_by_caller: boolean;
}
export interface ListNeuronsResponse {
    neuron_infos: Array<[bigint, NeuronInfo]>;
    full_neurons: Array<Neuron>;
    total_pages_available: [] | [bigint];
}
export interface ListNodeProviderRewardsRequest {
    date_filter: [] | [DateRangeFilter];
}
export interface ListNodeProviderRewardsResponse {
    rewards: Array<MonthlyNodeProviderRewards>;
}
export interface ListNodeProvidersResponse {
    node_providers: Array<NodeProvider>;
}
export interface ListProposalInfo {
    include_reward_status: Int32Array | number[];
    omit_large_fields: [] | [boolean];
    before_proposal: [] | [ProposalId];
    limit: number;
    exclude_topic: Int32Array | number[];
    include_all_manage_neuron_proposals: [] | [boolean];
    include_status: Int32Array | number[];
}
export interface ListProposalInfoResponse {
    proposal_info: Array<ProposalInfo>;
}
export interface MakeProposalRequest {
    url: string;
    title: [] | [string];
    action: [] | [ProposalActionRequest];
    summary: string;
}
export interface MakeProposalResponse {
    message: [] | [string];
    proposal_id: [] | [ProposalId];
}
export interface MakingSnsProposal {
    proposal: [] | [Proposal];
    caller: [] | [Principal];
    proposer_id: [] | [NeuronId];
}
export interface ManageNeuron {
    id: [] | [NeuronId];
    command: [] | [Command];
    neuron_id_or_subaccount: [] | [NeuronIdOrSubaccount];
}
export type ManageNeuronCommandRequest =
    | { Spawn: Spawn }
    | { Split: Split }
    | { Follow: Follow }
    | { RefreshVotingPower: RefreshVotingPower }
    | { ClaimOrRefresh: ClaimOrRefresh }
    | { Configure: Configure }
    | { RegisterVote: RegisterVote }
    | { Merge: Merge }
    | { DisburseToNeuron: DisburseToNeuron }
    | { MakeProposal: MakeProposalRequest }
    | { StakeMaturity: StakeMaturity }
    | { MergeMaturity: MergeMaturity }
    | { Disburse: Disburse };
export interface ManageNeuronRequest {
    id: [] | [NeuronId];
    command: [] | [ManageNeuronCommandRequest];
    neuron_id_or_subaccount: [] | [NeuronIdOrSubaccount];
}
export interface ManageNeuronResponse {
    command: [] | [Command_1];
}
export interface Merge {
    source_neuron_id: [] | [NeuronId];
}
export interface MergeMaturity {
    percentage_to_merge: number;
}
export interface MergeMaturityResponse {
    merged_maturity_e8s: bigint;
    new_stake_e8s: bigint;
}
export interface MergeResponse {
    target_neuron: [] | [Neuron];
    source_neuron: [] | [Neuron];
    target_neuron_info: [] | [NeuronInfo];
    source_neuron_info: [] | [NeuronInfo];
}
export interface Migration {
    status: [] | [number];
    failure_reason: [] | [string];
    progress: [] | [Progress];
}
export interface Migrations {
    neuron_indexes_migration: [] | [Migration];
    copy_inactive_neurons_to_stable_memory_migration: [] | [Migration];
}
export interface MonthlyNodeProviderRewards {
    minimum_xdr_permyriad_per_icp: [] | [bigint];
    registry_version: [] | [bigint];
    node_providers: Array<NodeProvider>;
    timestamp: bigint;
    rewards: Array<RewardNodeProvider>;
    xdr_conversion_rate: [] | [XdrConversionRate];
    maximum_node_provider_rewards_e8s: [] | [bigint];
}
export interface Motion {
    motion_text: string;
}
export interface NetworkEconomics {
    neuron_minimum_stake_e8s: bigint;
    voting_power_economics: [] | [VotingPowerEconomics];
    max_proposals_to_keep_per_topic: number;
    neuron_management_fee_per_proposal_e8s: bigint;
    reject_cost_e8s: bigint;
    transaction_fee_e8s: bigint;
    neuron_spawn_dissolve_delay_seconds: bigint;
    minimum_icp_xdr_rate: bigint;
    maximum_node_provider_rewards_e8s: bigint;
    neurons_fund_economics: [] | [NeuronsFundEconomics];
}
export interface Neuron {
    id: [] | [NeuronId];
    staked_maturity_e8s_equivalent: [] | [bigint];
    controller: [] | [Principal];
    recent_ballots: Array<BallotInfo>;
    voting_power_refreshed_timestamp_seconds: [] | [bigint];
    kyc_verified: boolean;
    potential_voting_power: [] | [bigint];
    neuron_type: [] | [number];
    not_for_profit: boolean;
    maturity_e8s_equivalent: bigint;
    deciding_voting_power: [] | [bigint];
    cached_neuron_stake_e8s: bigint;
    created_timestamp_seconds: bigint;
    auto_stake_maturity: [] | [boolean];
    aging_since_timestamp_seconds: bigint;
    hot_keys: Array<Principal>;
    account: Uint8Array | number[];
    joined_community_fund_timestamp_seconds: [] | [bigint];
    dissolve_state: [] | [DissolveState];
    followees: Array<[number, Followees]>;
    neuron_fees_e8s: bigint;
    visibility: [] | [number];
    transfer: [] | [NeuronStakeTransfer];
    known_neuron_data: [] | [KnownNeuronData];
    spawn_at_timestamp_seconds: [] | [bigint];
}
export interface NeuronBasketConstructionParameters {
    dissolve_delay_interval: [] | [Duration];
    count: [] | [bigint];
}
export interface NeuronBasketConstructionParameters_1 {
    dissolve_delay_interval_seconds: bigint;
    count: bigint;
}
export interface NeuronDistribution {
    controller: [] | [Principal];
    dissolve_delay: [] | [Duration];
    memo: [] | [bigint];
    vesting_period: [] | [Duration];
    stake: [] | [Tokens];
}
export interface NeuronId {
    id: bigint;
}
export type NeuronIdOrSubaccount =
    | { Subaccount: Uint8Array | number[] }
    | { NeuronId: NeuronId };
export interface NeuronInFlightCommand {
    command: [] | [Command_2];
    timestamp: bigint;
}
export interface NeuronInfo {
    dissolve_delay_seconds: bigint;
    recent_ballots: Array<BallotInfo>;
    voting_power_refreshed_timestamp_seconds: [] | [bigint];
    potential_voting_power: [] | [bigint];
    neuron_type: [] | [number];
    deciding_voting_power: [] | [bigint];
    created_timestamp_seconds: bigint;
    state: number;
    stake_e8s: bigint;
    joined_community_fund_timestamp_seconds: [] | [bigint];
    retrieved_at_timestamp_seconds: bigint;
    visibility: [] | [number];
    known_neuron_data: [] | [KnownNeuronData];
    voting_power: bigint;
    age_seconds: bigint;
}
export interface NeuronStakeTransfer {
    to_subaccount: Uint8Array | number[];
    neuron_stake_e8s: bigint;
    from: [] | [Principal];
    memo: bigint;
    from_subaccount: Uint8Array | number[];
    transfer_timestamp: bigint;
    block_height: bigint;
}
export interface NeuronSubaccount {
    subaccount: Uint8Array | number[];
}
export interface NeuronSubsetMetrics {
    total_maturity_e8s_equivalent: [] | [bigint];
    maturity_e8s_equivalent_buckets: Array<[bigint, bigint]>;
    voting_power_buckets: Array<[bigint, bigint]>;
    total_staked_e8s: [] | [bigint];
    count: [] | [bigint];
    deciding_voting_power_buckets: Array<[bigint, bigint]>;
    total_staked_maturity_e8s_equivalent: [] | [bigint];
    total_potential_voting_power: [] | [bigint];
    total_deciding_voting_power: [] | [bigint];
    staked_maturity_e8s_equivalent_buckets: Array<[bigint, bigint]>;
    staked_e8s_buckets: Array<[bigint, bigint]>;
    total_voting_power: [] | [bigint];
    potential_voting_power_buckets: Array<[bigint, bigint]>;
    count_buckets: Array<[bigint, bigint]>;
}
export interface NeuronsFundAuditInfo {
    final_neurons_fund_participation: [] | [NeuronsFundParticipation];
    initial_neurons_fund_participation: [] | [NeuronsFundParticipation];
    neurons_fund_refunds: [] | [NeuronsFundSnapshot];
}
export interface NeuronsFundData {
    final_neurons_fund_participation: [] | [NeuronsFundParticipation];
    initial_neurons_fund_participation: [] | [NeuronsFundParticipation];
    neurons_fund_refunds: [] | [NeuronsFundSnapshot];
}
export interface NeuronsFundEconomics {
    maximum_icp_xdr_rate: [] | [Percentage];
    neurons_fund_matched_funding_curve_coefficients:
        | []
        | [NeuronsFundMatchedFundingCurveCoefficients];
    max_theoretical_neurons_fund_participation_amount_xdr: [] | [Decimal];
    minimum_icp_xdr_rate: [] | [Percentage];
}
export interface NeuronsFundMatchedFundingCurveCoefficients {
    contribution_threshold_xdr: [] | [Decimal];
    one_third_participation_milestone_xdr: [] | [Decimal];
    full_participation_milestone_xdr: [] | [Decimal];
}
export interface NeuronsFundNeuron {
    controller: [] | [Principal];
    hotkeys: [] | [Principals];
    is_capped: [] | [boolean];
    nns_neuron_id: [] | [bigint];
    amount_icp_e8s: [] | [bigint];
}
export interface NeuronsFundNeuronPortion {
    controller: [] | [Principal];
    hotkeys: Array<Principal>;
    is_capped: [] | [boolean];
    maturity_equivalent_icp_e8s: [] | [bigint];
    nns_neuron_id: [] | [NeuronId];
    amount_icp_e8s: [] | [bigint];
}
export interface NeuronsFundParticipation {
    total_maturity_equivalent_icp_e8s: [] | [bigint];
    intended_neurons_fund_participation_icp_e8s: [] | [bigint];
    direct_participation_icp_e8s: [] | [bigint];
    swap_participation_limits: [] | [SwapParticipationLimits];
    max_neurons_fund_swap_participation_icp_e8s: [] | [bigint];
    neurons_fund_reserves: [] | [NeuronsFundSnapshot];
    ideal_matched_participation_function:
        | []
        | [IdealMatchedParticipationFunction];
    allocated_neurons_fund_participation_icp_e8s: [] | [bigint];
}
export interface NeuronsFundSnapshot {
    neurons_fund_neuron_portions: Array<NeuronsFundNeuronPortion>;
}
export interface NodeProvider {
    id: [] | [Principal];
    reward_account: [] | [AccountIdentifier];
}
export interface Ok {
    neurons_fund_audit_info: [] | [NeuronsFundAuditInfo];
}
export interface Ok_1 {
    neurons_fund_neuron_portions: Array<NeuronsFundNeuron>;
}
export interface OpenSnsTokenSwap {
    community_fund_investment_e8s: [] | [bigint];
    target_swap_canister_id: [] | [Principal];
    params: [] | [Params];
}
export type Operation =
    | { RemoveHotKey: RemoveHotKey }
    | { AddHotKey: AddHotKey }
    | { ChangeAutoStakeMaturity: ChangeAutoStakeMaturity }
    | { StopDissolving: {} }
    | { StartDissolving: {} }
    | { IncreaseDissolveDelay: IncreaseDissolveDelay }
    | { SetVisibility: SetVisibility }
    | { JoinCommunityFund: {} }
    | { LeaveCommunityFund: {} }
    | { SetDissolveTimestamp: SetDissolveTimestamp };
export interface Params {
    min_participant_icp_e8s: bigint;
    neuron_basket_construction_parameters:
        | []
        | [NeuronBasketConstructionParameters_1];
    max_icp_e8s: bigint;
    swap_due_timestamp_seconds: bigint;
    min_participants: number;
    sns_token_e8s: bigint;
    sale_delay_seconds: [] | [bigint];
    max_participant_icp_e8s: bigint;
    min_direct_participation_icp_e8s: [] | [bigint];
    min_icp_e8s: bigint;
    max_direct_participation_icp_e8s: [] | [bigint];
}
export interface Percentage {
    basis_points: [] | [bigint];
}
export interface Principals {
    principals: Array<Principal>;
}
export type Progress = { LastNeuronId: NeuronId };
export interface Proposal {
    url: string;
    title: [] | [string];
    action: [] | [Action];
    summary: string;
}
export type ProposalActionRequest =
    | { RegisterKnownNeuron: KnownNeuron }
    | { ManageNeuron: ManageNeuronRequest }
    | { UpdateCanisterSettings: UpdateCanisterSettings }
    | { InstallCode: InstallCodeRequest }
    | { StopOrStartCanister: StopOrStartCanister }
    | { CreateServiceNervousSystem: CreateServiceNervousSystem }
    | { ExecuteNnsFunction: ExecuteNnsFunction }
    | { RewardNodeProvider: RewardNodeProvider }
    | { RewardNodeProviders: RewardNodeProviders }
    | { ManageNetworkEconomics: NetworkEconomics }
    | { ApproveGenesisKyc: Principals }
    | { AddOrRemoveNodeProvider: AddOrRemoveNodeProvider }
    | { Motion: Motion };
export interface ProposalData {
    id: [] | [ProposalId];
    failure_reason: [] | [GovernanceError];
    ballots: Array<[bigint, Ballot]>;
    proposal_timestamp_seconds: bigint;
    reward_event_round: bigint;
    failed_timestamp_seconds: bigint;
    neurons_fund_data: [] | [NeuronsFundData];
    reject_cost_e8s: bigint;
    derived_proposal_information: [] | [DerivedProposalInformation];
    latest_tally: [] | [Tally];
    total_potential_voting_power: [] | [bigint];
    sns_token_swap_lifecycle: [] | [number];
    decided_timestamp_seconds: bigint;
    proposal: [] | [Proposal];
    proposer: [] | [NeuronId];
    wait_for_quiet_state: [] | [WaitForQuietState];
    executed_timestamp_seconds: bigint;
    original_total_community_fund_maturity_e8s_equivalent: [] | [bigint];
}
export interface ProposalId {
    id: bigint;
}
export interface ProposalInfo {
    id: [] | [ProposalId];
    status: number;
    topic: number;
    failure_reason: [] | [GovernanceError];
    ballots: Array<[bigint, Ballot]>;
    proposal_timestamp_seconds: bigint;
    reward_event_round: bigint;
    deadline_timestamp_seconds: [] | [bigint];
    failed_timestamp_seconds: bigint;
    reject_cost_e8s: bigint;
    derived_proposal_information: [] | [DerivedProposalInformation];
    latest_tally: [] | [Tally];
    total_potential_voting_power: [] | [bigint];
    reward_status: number;
    decided_timestamp_seconds: bigint;
    proposal: [] | [Proposal];
    proposer: [] | [NeuronId];
    executed_timestamp_seconds: bigint;
}
export type RefreshVotingPower = {};
export type RefreshVotingPowerResponse = {};
export interface RegisterVote {
    vote: number;
    proposal: [] | [ProposalId];
}
export interface RemoveHotKey {
    hot_key_to_remove: [] | [Principal];
}
export interface RestoreAgingNeuronGroup {
    count: [] | [bigint];
    previous_total_stake_e8s: [] | [bigint];
    current_total_stake_e8s: [] | [bigint];
    group_type: number;
}
export interface RestoreAgingSummary {
    groups: Array<RestoreAgingNeuronGroup>;
    timestamp_seconds: [] | [bigint];
}
export type Result = { Ok: null } | { Err: GovernanceError };
export type Result_1 = { Error: GovernanceError } | { NeuronId: NeuronId };
export type Result_10 = { Ok: Ok_1 } | { Err: GovernanceError };
export type Result_2 = { Ok: Neuron } | { Err: GovernanceError };
export type Result_3 =
    | { Ok: GovernanceCachedMetrics }
    | { Err: GovernanceError };
export type Result_4 =
    | { Ok: MonthlyNodeProviderRewards }
    | { Err: GovernanceError };
export type Result_5 = { Ok: NeuronInfo } | { Err: GovernanceError };
export type Result_6 = { Ok: Ok } | { Err: GovernanceError };
export type Result_7 = { Ok: NodeProvider } | { Err: GovernanceError };
export type Result_8 = { Committed: Committed } | { Aborted: {} };
export type Result_9 = { Committed: Committed_1 } | { Aborted: {} };
export interface RewardEvent {
    rounds_since_last_distribution: [] | [bigint];
    day_after_genesis: bigint;
    actual_timestamp_seconds: bigint;
    total_available_e8s_equivalent: bigint;
    latest_round_available_e8s_equivalent: [] | [bigint];
    distributed_e8s_equivalent: bigint;
    settled_proposals: Array<ProposalId>;
}
export type RewardMode =
    | { RewardToNeuron: RewardToNeuron }
    | { RewardToAccount: RewardToAccount };
export interface RewardNodeProvider {
    node_provider: [] | [NodeProvider];
    reward_mode: [] | [RewardMode];
    amount_e8s: bigint;
}
export interface RewardNodeProviders {
    use_registry_derived_rewards: [] | [boolean];
    rewards: Array<RewardNodeProvider>;
}
export interface RewardToAccount {
    to_account: [] | [AccountIdentifier];
}
export interface RewardToNeuron {
    dissolve_delay_seconds: bigint;
}
export interface SetDefaultFollowees {
    default_followees: Array<[number, Followees]>;
}
export interface SetDissolveTimestamp {
    dissolve_timestamp_seconds: bigint;
}
export interface SetOpenTimeWindowRequest {
    open_time_window: [] | [TimeWindow];
}
export interface SetSnsTokenSwapOpenTimeWindow {
    request: [] | [SetOpenTimeWindowRequest];
    swap_canister_id: [] | [Principal];
}
export interface SetVisibility {
    visibility: [] | [number];
}
export interface SettleCommunityFundParticipation {
    result: [] | [Result_8];
    open_sns_token_swap_proposal_id: [] | [bigint];
}
export interface SettleNeuronsFundParticipationRequest {
    result: [] | [Result_9];
    nns_proposal_id: [] | [bigint];
}
export interface SettleNeuronsFundParticipationResponse {
    result: [] | [Result_10];
}
export interface Spawn {
    percentage_to_spawn: [] | [number];
    new_controller: [] | [Principal];
    nonce: [] | [bigint];
}
export interface SpawnResponse {
    created_neuron_id: [] | [NeuronId];
}
export interface Split {
    amount_e8s: bigint;
}
export interface StakeMaturity {
    percentage_to_stake: [] | [number];
}
export interface StakeMaturityResponse {
    maturity_e8s: bigint;
    staked_maturity_e8s: bigint;
}
export interface StopOrStartCanister {
    action: [] | [number];
    canister_id: [] | [Principal];
}
export interface SwapBackgroundInformation {
    ledger_index_canister_summary: [] | [CanisterSummary];
    fallback_controller_principal_ids: Array<Principal>;
    ledger_archive_canister_summaries: Array<CanisterSummary>;
    ledger_canister_summary: [] | [CanisterSummary];
    swap_canister_summary: [] | [CanisterSummary];
    governance_canister_summary: [] | [CanisterSummary];
    root_canister_summary: [] | [CanisterSummary];
    dapp_canister_summaries: Array<CanisterSummary>;
}
export interface SwapDistribution {
    total: [] | [Tokens];
}
export interface SwapParameters {
    minimum_participants: [] | [bigint];
    neurons_fund_participation: [] | [boolean];
    duration: [] | [Duration];
    neuron_basket_construction_parameters:
        | []
        | [NeuronBasketConstructionParameters];
    confirmation_text: [] | [string];
    maximum_participant_icp: [] | [Tokens];
    minimum_icp: [] | [Tokens];
    minimum_direct_participation_icp: [] | [Tokens];
    minimum_participant_icp: [] | [Tokens];
    start_time: [] | [GlobalTimeOfDay];
    maximum_direct_participation_icp: [] | [Tokens];
    maximum_icp: [] | [Tokens];
    neurons_fund_investment_icp: [] | [Tokens];
    restricted_countries: [] | [Countries];
}
export interface SwapParticipationLimits {
    min_participant_icp_e8s: [] | [bigint];
    max_participant_icp_e8s: [] | [bigint];
    min_direct_participation_icp_e8s: [] | [bigint];
    max_direct_participation_icp_e8s: [] | [bigint];
}
export interface Tally {
    no: bigint;
    yes: bigint;
    total: bigint;
    timestamp_seconds: bigint;
}
export interface TimeWindow {
    start_timestamp_seconds: bigint;
    end_timestamp_seconds: bigint;
}
export interface Tokens {
    e8s: [] | [bigint];
}
export interface UpdateCanisterSettings {
    canister_id: [] | [Principal];
    settings: [] | [CanisterSettings];
}
export interface UpdateNodeProvider {
    reward_account: [] | [AccountIdentifier];
}
export interface VotingPowerEconomics {
    start_reducing_voting_power_after_seconds: [] | [bigint];
    clear_following_after_seconds: [] | [bigint];
}
export interface VotingRewardParameters {
    reward_rate_transition_duration: [] | [Duration];
    initial_reward_rate: [] | [Percentage];
    final_reward_rate: [] | [Percentage];
}
export interface WaitForQuietState {
    current_deadline_timestamp_seconds: bigint;
}
export interface XdrConversionRate {
    xdr_permyriad_per_icp: [] | [bigint];
    timestamp_seconds: [] | [bigint];
}
export interface _SERVICE {
    claim_gtc_neurons: ActorMethod<[Principal, Array<NeuronId>], Result>;
    claim_or_refresh_neuron_from_account: ActorMethod<
        [ClaimOrRefreshNeuronFromAccount],
        ClaimOrRefreshNeuronFromAccountResponse
    >;
    get_build_metadata: ActorMethod<[], string>;
    get_full_neuron: ActorMethod<[bigint], Result_2>;
    get_full_neuron_by_id_or_subaccount: ActorMethod<
        [NeuronIdOrSubaccount],
        Result_2
    >;
    get_latest_reward_event: ActorMethod<[], RewardEvent>;
    get_metrics: ActorMethod<[], Result_3>;
    get_monthly_node_provider_rewards: ActorMethod<[], Result_4>;
    get_most_recent_monthly_node_provider_rewards: ActorMethod<
        [],
        [] | [MonthlyNodeProviderRewards]
    >;
    get_network_economics_parameters: ActorMethod<[], NetworkEconomics>;
    get_neuron_ids: ActorMethod<[], BigUint64Array | bigint[]>;
    get_neuron_info: ActorMethod<[bigint], Result_5>;
    get_neuron_info_by_id_or_subaccount: ActorMethod<
        [NeuronIdOrSubaccount],
        Result_5
    >;
    get_neurons_fund_audit_info: ActorMethod<
        [GetNeuronsFundAuditInfoRequest],
        GetNeuronsFundAuditInfoResponse
    >;
    get_node_provider_by_caller: ActorMethod<[null], Result_7>;
    get_pending_proposals: ActorMethod<[], Array<ProposalInfo>>;
    get_proposal_info: ActorMethod<[bigint], [] | [ProposalInfo]>;
    get_restore_aging_summary: ActorMethod<[], RestoreAgingSummary>;
    list_known_neurons: ActorMethod<[], ListKnownNeuronsResponse>;
    list_neurons: ActorMethod<[ListNeurons], ListNeuronsResponse>;
    list_node_provider_rewards: ActorMethod<
        [ListNodeProviderRewardsRequest],
        ListNodeProviderRewardsResponse
    >;
    list_node_providers: ActorMethod<[], ListNodeProvidersResponse>;
    list_proposals: ActorMethod<[ListProposalInfo], ListProposalInfoResponse>;
    manage_neuron: ActorMethod<[ManageNeuronRequest], ManageNeuronResponse>;
    settle_community_fund_participation: ActorMethod<
        [SettleCommunityFundParticipation],
        Result
    >;
    settle_neurons_fund_participation: ActorMethod<
        [SettleNeuronsFundParticipationRequest],
        SettleNeuronsFundParticipationResponse
    >;
    simulate_manage_neuron: ActorMethod<
        [ManageNeuronRequest],
        ManageNeuronResponse
    >;
    transfer_gtc_neuron: ActorMethod<[NeuronId, NeuronId], Result>;
    update_node_provider: ActorMethod<[UpdateNodeProvider], Result>;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const ManageNeuronRequest = IDL.Rec();
export const Proposal = IDL.Rec();
export const NeuronId = IDL.Record({ id: IDL.Nat64 });
export const Followees = IDL.Record({ followees: IDL.Vec(NeuronId) });
export const KnownNeuronData = IDL.Record({
    name: IDL.Text,
    description: IDL.Opt(IDL.Text)
});
export const KnownNeuron = IDL.Record({
    id: IDL.Opt(NeuronId),
    known_neuron_data: IDL.Opt(KnownNeuronData)
});
export const Spawn = IDL.Record({
    percentage_to_spawn: IDL.Opt(IDL.Nat32),
    new_controller: IDL.Opt(IDL.Principal),
    nonce: IDL.Opt(IDL.Nat64)
});
export const Split = IDL.Record({ amount_e8s: IDL.Nat64 });
export const Follow = IDL.Record({
    topic: IDL.Int32,
    followees: IDL.Vec(NeuronId)
});
export const RefreshVotingPower = IDL.Record({});
export const ClaimOrRefreshNeuronFromAccount = IDL.Record({
    controller: IDL.Opt(IDL.Principal),
    memo: IDL.Nat64
});
export const By = IDL.Variant({
    NeuronIdOrSubaccount: IDL.Record({}),
    MemoAndController: ClaimOrRefreshNeuronFromAccount,
    Memo: IDL.Nat64
});
export const ClaimOrRefresh = IDL.Record({ by: IDL.Opt(By) });
export const RemoveHotKey = IDL.Record({
    hot_key_to_remove: IDL.Opt(IDL.Principal)
});
export const AddHotKey = IDL.Record({ new_hot_key: IDL.Opt(IDL.Principal) });
export const ChangeAutoStakeMaturity = IDL.Record({
    requested_setting_for_auto_stake_maturity: IDL.Bool
});
export const IncreaseDissolveDelay = IDL.Record({
    additional_dissolve_delay_seconds: IDL.Nat32
});
export const SetVisibility = IDL.Record({ visibility: IDL.Opt(IDL.Int32) });
export const SetDissolveTimestamp = IDL.Record({
    dissolve_timestamp_seconds: IDL.Nat64
});
export const Operation = IDL.Variant({
    RemoveHotKey: RemoveHotKey,
    AddHotKey: AddHotKey,
    ChangeAutoStakeMaturity: ChangeAutoStakeMaturity,
    StopDissolving: IDL.Record({}),
    StartDissolving: IDL.Record({}),
    IncreaseDissolveDelay: IncreaseDissolveDelay,
    SetVisibility: SetVisibility,
    JoinCommunityFund: IDL.Record({}),
    LeaveCommunityFund: IDL.Record({}),
    SetDissolveTimestamp: SetDissolveTimestamp
});
export const Configure = IDL.Record({ operation: IDL.Opt(Operation) });
export const ProposalId = IDL.Record({ id: IDL.Nat64 });
export const RegisterVote = IDL.Record({
    vote: IDL.Int32,
    proposal: IDL.Opt(ProposalId)
});
export const Merge = IDL.Record({ source_neuron_id: IDL.Opt(NeuronId) });
export const DisburseToNeuron = IDL.Record({
    dissolve_delay_seconds: IDL.Nat64,
    kyc_verified: IDL.Bool,
    amount_e8s: IDL.Nat64,
    new_controller: IDL.Opt(IDL.Principal),
    nonce: IDL.Nat64
});
export const StakeMaturity = IDL.Record({
    percentage_to_stake: IDL.Opt(IDL.Nat32)
});
export const MergeMaturity = IDL.Record({ percentage_to_merge: IDL.Nat32 });
export const AccountIdentifier = IDL.Record({ hash: IDL.Vec(IDL.Nat8) });
export const Amount = IDL.Record({ e8s: IDL.Nat64 });
export const Disburse = IDL.Record({
    to_account: IDL.Opt(AccountIdentifier),
    amount: IDL.Opt(Amount)
});
export const Command = IDL.Variant({
    Spawn: Spawn,
    Split: Split,
    Follow: Follow,
    RefreshVotingPower: RefreshVotingPower,
    ClaimOrRefresh: ClaimOrRefresh,
    Configure: Configure,
    RegisterVote: RegisterVote,
    Merge: Merge,
    DisburseToNeuron: DisburseToNeuron,
    MakeProposal: Proposal,
    StakeMaturity: StakeMaturity,
    MergeMaturity: MergeMaturity,
    Disburse: Disburse
});
export const NeuronIdOrSubaccount = IDL.Variant({
    Subaccount: IDL.Vec(IDL.Nat8),
    NeuronId: NeuronId
});
export const ManageNeuron = IDL.Record({
    id: IDL.Opt(NeuronId),
    command: IDL.Opt(Command),
    neuron_id_or_subaccount: IDL.Opt(NeuronIdOrSubaccount)
});
export const Controllers = IDL.Record({
    controllers: IDL.Vec(IDL.Principal)
});
export const CanisterSettings = IDL.Record({
    freezing_threshold: IDL.Opt(IDL.Nat64),
    wasm_memory_threshold: IDL.Opt(IDL.Nat64),
    controllers: IDL.Opt(Controllers),
    log_visibility: IDL.Opt(IDL.Int32),
    wasm_memory_limit: IDL.Opt(IDL.Nat64),
    memory_allocation: IDL.Opt(IDL.Nat64),
    compute_allocation: IDL.Opt(IDL.Nat64)
});
export const UpdateCanisterSettings = IDL.Record({
    canister_id: IDL.Opt(IDL.Principal),
    settings: IDL.Opt(CanisterSettings)
});
export const InstallCode = IDL.Record({
    skip_stopping_before_installing: IDL.Opt(IDL.Bool),
    wasm_module_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
    canister_id: IDL.Opt(IDL.Principal),
    arg_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
    install_mode: IDL.Opt(IDL.Int32)
});
export const StopOrStartCanister = IDL.Record({
    action: IDL.Opt(IDL.Int32),
    canister_id: IDL.Opt(IDL.Principal)
});
export const Percentage = IDL.Record({ basis_points: IDL.Opt(IDL.Nat64) });
export const Duration = IDL.Record({ seconds: IDL.Opt(IDL.Nat64) });
export const Tokens = IDL.Record({ e8s: IDL.Opt(IDL.Nat64) });
export const VotingRewardParameters = IDL.Record({
    reward_rate_transition_duration: IDL.Opt(Duration),
    initial_reward_rate: IDL.Opt(Percentage),
    final_reward_rate: IDL.Opt(Percentage)
});
export const GovernanceParameters = IDL.Record({
    neuron_maximum_dissolve_delay_bonus: IDL.Opt(Percentage),
    neuron_maximum_age_for_age_bonus: IDL.Opt(Duration),
    neuron_maximum_dissolve_delay: IDL.Opt(Duration),
    neuron_minimum_dissolve_delay_to_vote: IDL.Opt(Duration),
    neuron_maximum_age_bonus: IDL.Opt(Percentage),
    neuron_minimum_stake: IDL.Opt(Tokens),
    proposal_wait_for_quiet_deadline_increase: IDL.Opt(Duration),
    proposal_initial_voting_period: IDL.Opt(Duration),
    proposal_rejection_fee: IDL.Opt(Tokens),
    voting_reward_parameters: IDL.Opt(VotingRewardParameters)
});
export const Image = IDL.Record({ base64_encoding: IDL.Opt(IDL.Text) });
export const LedgerParameters = IDL.Record({
    transaction_fee: IDL.Opt(Tokens),
    token_symbol: IDL.Opt(IDL.Text),
    token_logo: IDL.Opt(Image),
    token_name: IDL.Opt(IDL.Text)
});
export const Canister = IDL.Record({ id: IDL.Opt(IDL.Principal) });
export const NeuronBasketConstructionParameters = IDL.Record({
    dissolve_delay_interval: IDL.Opt(Duration),
    count: IDL.Opt(IDL.Nat64)
});
export const GlobalTimeOfDay = IDL.Record({
    seconds_after_utc_midnight: IDL.Opt(IDL.Nat64)
});
export const Countries = IDL.Record({ iso_codes: IDL.Vec(IDL.Text) });
export const SwapParameters = IDL.Record({
    minimum_participants: IDL.Opt(IDL.Nat64),
    neurons_fund_participation: IDL.Opt(IDL.Bool),
    duration: IDL.Opt(Duration),
    neuron_basket_construction_parameters: IDL.Opt(
        NeuronBasketConstructionParameters
    ),
    confirmation_text: IDL.Opt(IDL.Text),
    maximum_participant_icp: IDL.Opt(Tokens),
    minimum_icp: IDL.Opt(Tokens),
    minimum_direct_participation_icp: IDL.Opt(Tokens),
    minimum_participant_icp: IDL.Opt(Tokens),
    start_time: IDL.Opt(GlobalTimeOfDay),
    maximum_direct_participation_icp: IDL.Opt(Tokens),
    maximum_icp: IDL.Opt(Tokens),
    neurons_fund_investment_icp: IDL.Opt(Tokens),
    restricted_countries: IDL.Opt(Countries)
});
export const SwapDistribution = IDL.Record({ total: IDL.Opt(Tokens) });
export const NeuronDistribution = IDL.Record({
    controller: IDL.Opt(IDL.Principal),
    dissolve_delay: IDL.Opt(Duration),
    memo: IDL.Opt(IDL.Nat64),
    vesting_period: IDL.Opt(Duration),
    stake: IDL.Opt(Tokens)
});
export const DeveloperDistribution = IDL.Record({
    developer_neurons: IDL.Vec(NeuronDistribution)
});
export const InitialTokenDistribution = IDL.Record({
    treasury_distribution: IDL.Opt(SwapDistribution),
    developer_distribution: IDL.Opt(DeveloperDistribution),
    swap_distribution: IDL.Opt(SwapDistribution)
});
export const CreateServiceNervousSystem = IDL.Record({
    url: IDL.Opt(IDL.Text),
    governance_parameters: IDL.Opt(GovernanceParameters),
    fallback_controller_principal_ids: IDL.Vec(IDL.Principal),
    logo: IDL.Opt(Image),
    name: IDL.Opt(IDL.Text),
    ledger_parameters: IDL.Opt(LedgerParameters),
    description: IDL.Opt(IDL.Text),
    dapp_canisters: IDL.Vec(Canister),
    swap_parameters: IDL.Opt(SwapParameters),
    initial_token_distribution: IDL.Opt(InitialTokenDistribution)
});
export const ExecuteNnsFunction = IDL.Record({
    nns_function: IDL.Int32,
    payload: IDL.Vec(IDL.Nat8)
});
export const NodeProvider = IDL.Record({
    id: IDL.Opt(IDL.Principal),
    reward_account: IDL.Opt(AccountIdentifier)
});
export const RewardToNeuron = IDL.Record({
    dissolve_delay_seconds: IDL.Nat64
});
export const RewardToAccount = IDL.Record({
    to_account: IDL.Opt(AccountIdentifier)
});
export const RewardMode = IDL.Variant({
    RewardToNeuron: RewardToNeuron,
    RewardToAccount: RewardToAccount
});
export const RewardNodeProvider = IDL.Record({
    node_provider: IDL.Opt(NodeProvider),
    reward_mode: IDL.Opt(RewardMode),
    amount_e8s: IDL.Nat64
});
export const NeuronBasketConstructionParameters_1 = IDL.Record({
    dissolve_delay_interval_seconds: IDL.Nat64,
    count: IDL.Nat64
});
export const Params = IDL.Record({
    min_participant_icp_e8s: IDL.Nat64,
    neuron_basket_construction_parameters: IDL.Opt(
        NeuronBasketConstructionParameters_1
    ),
    max_icp_e8s: IDL.Nat64,
    swap_due_timestamp_seconds: IDL.Nat64,
    min_participants: IDL.Nat32,
    sns_token_e8s: IDL.Nat64,
    sale_delay_seconds: IDL.Opt(IDL.Nat64),
    max_participant_icp_e8s: IDL.Nat64,
    min_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
    min_icp_e8s: IDL.Nat64,
    max_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64)
});
export const OpenSnsTokenSwap = IDL.Record({
    community_fund_investment_e8s: IDL.Opt(IDL.Nat64),
    target_swap_canister_id: IDL.Opt(IDL.Principal),
    params: IDL.Opt(Params)
});
export const TimeWindow = IDL.Record({
    start_timestamp_seconds: IDL.Nat64,
    end_timestamp_seconds: IDL.Nat64
});
export const SetOpenTimeWindowRequest = IDL.Record({
    open_time_window: IDL.Opt(TimeWindow)
});
export const SetSnsTokenSwapOpenTimeWindow = IDL.Record({
    request: IDL.Opt(SetOpenTimeWindowRequest),
    swap_canister_id: IDL.Opt(IDL.Principal)
});
export const SetDefaultFollowees = IDL.Record({
    default_followees: IDL.Vec(IDL.Tuple(IDL.Int32, Followees))
});
export const RewardNodeProviders = IDL.Record({
    use_registry_derived_rewards: IDL.Opt(IDL.Bool),
    rewards: IDL.Vec(RewardNodeProvider)
});
export const VotingPowerEconomics = IDL.Record({
    start_reducing_voting_power_after_seconds: IDL.Opt(IDL.Nat64),
    clear_following_after_seconds: IDL.Opt(IDL.Nat64)
});
export const Decimal = IDL.Record({ human_readable: IDL.Opt(IDL.Text) });
export const NeuronsFundMatchedFundingCurveCoefficients = IDL.Record({
    contribution_threshold_xdr: IDL.Opt(Decimal),
    one_third_participation_milestone_xdr: IDL.Opt(Decimal),
    full_participation_milestone_xdr: IDL.Opt(Decimal)
});
export const NeuronsFundEconomics = IDL.Record({
    maximum_icp_xdr_rate: IDL.Opt(Percentage),
    neurons_fund_matched_funding_curve_coefficients: IDL.Opt(
        NeuronsFundMatchedFundingCurveCoefficients
    ),
    max_theoretical_neurons_fund_participation_amount_xdr: IDL.Opt(Decimal),
    minimum_icp_xdr_rate: IDL.Opt(Percentage)
});
export const NetworkEconomics = IDL.Record({
    neuron_minimum_stake_e8s: IDL.Nat64,
    voting_power_economics: IDL.Opt(VotingPowerEconomics),
    max_proposals_to_keep_per_topic: IDL.Nat32,
    neuron_management_fee_per_proposal_e8s: IDL.Nat64,
    reject_cost_e8s: IDL.Nat64,
    transaction_fee_e8s: IDL.Nat64,
    neuron_spawn_dissolve_delay_seconds: IDL.Nat64,
    minimum_icp_xdr_rate: IDL.Nat64,
    maximum_node_provider_rewards_e8s: IDL.Nat64,
    neurons_fund_economics: IDL.Opt(NeuronsFundEconomics)
});
export const Principals = IDL.Record({ principals: IDL.Vec(IDL.Principal) });
export const Change = IDL.Variant({
    ToRemove: NodeProvider,
    ToAdd: NodeProvider
});
export const AddOrRemoveNodeProvider = IDL.Record({
    change: IDL.Opt(Change)
});
export const Motion = IDL.Record({ motion_text: IDL.Text });
export const Action = IDL.Variant({
    RegisterKnownNeuron: KnownNeuron,
    ManageNeuron: ManageNeuron,
    UpdateCanisterSettings: UpdateCanisterSettings,
    InstallCode: InstallCode,
    StopOrStartCanister: StopOrStartCanister,
    CreateServiceNervousSystem: CreateServiceNervousSystem,
    ExecuteNnsFunction: ExecuteNnsFunction,
    RewardNodeProvider: RewardNodeProvider,
    OpenSnsTokenSwap: OpenSnsTokenSwap,
    SetSnsTokenSwapOpenTimeWindow: SetSnsTokenSwapOpenTimeWindow,
    SetDefaultFollowees: SetDefaultFollowees,
    RewardNodeProviders: RewardNodeProviders,
    ManageNetworkEconomics: NetworkEconomics,
    ApproveGenesisKyc: Principals,
    AddOrRemoveNodeProvider: AddOrRemoveNodeProvider,
    Motion: Motion
});
Proposal.fill(
    IDL.Record({
        url: IDL.Text,
        title: IDL.Opt(IDL.Text),
        action: IDL.Opt(Action),
        summary: IDL.Text
    })
);
export const MakingSnsProposal = IDL.Record({
    proposal: IDL.Opt(Proposal),
    caller: IDL.Opt(IDL.Principal),
    proposer_id: IDL.Opt(NeuronId)
});
export const XdrConversionRate = IDL.Record({
    xdr_permyriad_per_icp: IDL.Opt(IDL.Nat64),
    timestamp_seconds: IDL.Opt(IDL.Nat64)
});
export const MonthlyNodeProviderRewards = IDL.Record({
    minimum_xdr_permyriad_per_icp: IDL.Opt(IDL.Nat64),
    registry_version: IDL.Opt(IDL.Nat64),
    node_providers: IDL.Vec(NodeProvider),
    timestamp: IDL.Nat64,
    rewards: IDL.Vec(RewardNodeProvider),
    xdr_conversion_rate: IDL.Opt(XdrConversionRate),
    maximum_node_provider_rewards_e8s: IDL.Opt(IDL.Nat64)
});
export const NeuronSubsetMetrics = IDL.Record({
    total_maturity_e8s_equivalent: IDL.Opt(IDL.Nat64),
    maturity_e8s_equivalent_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
    voting_power_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
    total_staked_e8s: IDL.Opt(IDL.Nat64),
    count: IDL.Opt(IDL.Nat64),
    deciding_voting_power_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
    total_staked_maturity_e8s_equivalent: IDL.Opt(IDL.Nat64),
    total_potential_voting_power: IDL.Opt(IDL.Nat64),
    total_deciding_voting_power: IDL.Opt(IDL.Nat64),
    staked_maturity_e8s_equivalent_buckets: IDL.Vec(
        IDL.Tuple(IDL.Nat64, IDL.Nat64)
    ),
    staked_e8s_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
    total_voting_power: IDL.Opt(IDL.Nat64),
    potential_voting_power_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
    count_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64))
});
export const GovernanceCachedMetrics = IDL.Record({
    total_maturity_e8s_equivalent: IDL.Nat64,
    not_dissolving_neurons_e8s_buckets: IDL.Vec(
        IDL.Tuple(IDL.Nat64, IDL.Float64)
    ),
    dissolving_neurons_staked_maturity_e8s_equivalent_sum: IDL.Nat64,
    garbage_collectable_neurons_count: IDL.Nat64,
    dissolving_neurons_staked_maturity_e8s_equivalent_buckets: IDL.Vec(
        IDL.Tuple(IDL.Nat64, IDL.Float64)
    ),
    neurons_with_invalid_stake_count: IDL.Nat64,
    not_dissolving_neurons_count_buckets: IDL.Vec(
        IDL.Tuple(IDL.Nat64, IDL.Nat64)
    ),
    ect_neuron_count: IDL.Nat64,
    total_supply_icp: IDL.Nat64,
    neurons_with_less_than_6_months_dissolve_delay_count: IDL.Nat64,
    dissolved_neurons_count: IDL.Nat64,
    community_fund_total_maturity_e8s_equivalent: IDL.Nat64,
    total_staked_e8s_seed: IDL.Nat64,
    total_staked_maturity_e8s_equivalent_ect: IDL.Nat64,
    total_staked_e8s: IDL.Nat64,
    fully_lost_voting_power_neuron_subset_metrics: IDL.Opt(NeuronSubsetMetrics),
    not_dissolving_neurons_count: IDL.Nat64,
    total_locked_e8s: IDL.Nat64,
    neurons_fund_total_active_neurons: IDL.Nat64,
    total_voting_power_non_self_authenticating_controller: IDL.Opt(IDL.Nat64),
    total_staked_maturity_e8s_equivalent: IDL.Nat64,
    not_dissolving_neurons_e8s_buckets_ect: IDL.Vec(
        IDL.Tuple(IDL.Nat64, IDL.Float64)
    ),
    declining_voting_power_neuron_subset_metrics: IDL.Opt(NeuronSubsetMetrics),
    total_staked_e8s_ect: IDL.Nat64,
    not_dissolving_neurons_staked_maturity_e8s_equivalent_sum: IDL.Nat64,
    dissolved_neurons_e8s: IDL.Nat64,
    total_staked_e8s_non_self_authenticating_controller: IDL.Opt(IDL.Nat64),
    dissolving_neurons_e8s_buckets_seed: IDL.Vec(
        IDL.Tuple(IDL.Nat64, IDL.Float64)
    ),
    neurons_with_less_than_6_months_dissolve_delay_e8s: IDL.Nat64,
    not_dissolving_neurons_staked_maturity_e8s_equivalent_buckets: IDL.Vec(
        IDL.Tuple(IDL.Nat64, IDL.Float64)
    ),
    dissolving_neurons_count_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
    dissolving_neurons_e8s_buckets_ect: IDL.Vec(
        IDL.Tuple(IDL.Nat64, IDL.Float64)
    ),
    non_self_authenticating_controller_neuron_subset_metrics:
        IDL.Opt(NeuronSubsetMetrics),
    dissolving_neurons_count: IDL.Nat64,
    dissolving_neurons_e8s_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Float64)),
    total_staked_maturity_e8s_equivalent_seed: IDL.Nat64,
    community_fund_total_staked_e8s: IDL.Nat64,
    not_dissolving_neurons_e8s_buckets_seed: IDL.Vec(
        IDL.Tuple(IDL.Nat64, IDL.Float64)
    ),
    public_neuron_subset_metrics: IDL.Opt(NeuronSubsetMetrics),
    timestamp_seconds: IDL.Nat64,
    seed_neuron_count: IDL.Nat64
});
export const RestoreAgingNeuronGroup = IDL.Record({
    count: IDL.Opt(IDL.Nat64),
    previous_total_stake_e8s: IDL.Opt(IDL.Nat64),
    current_total_stake_e8s: IDL.Opt(IDL.Nat64),
    group_type: IDL.Int32
});
export const RestoreAgingSummary = IDL.Record({
    groups: IDL.Vec(RestoreAgingNeuronGroup),
    timestamp_seconds: IDL.Opt(IDL.Nat64)
});
export const RewardEvent = IDL.Record({
    rounds_since_last_distribution: IDL.Opt(IDL.Nat64),
    day_after_genesis: IDL.Nat64,
    actual_timestamp_seconds: IDL.Nat64,
    total_available_e8s_equivalent: IDL.Nat64,
    latest_round_available_e8s_equivalent: IDL.Opt(IDL.Nat64),
    distributed_e8s_equivalent: IDL.Nat64,
    settled_proposals: IDL.Vec(ProposalId)
});
export const NeuronStakeTransfer = IDL.Record({
    to_subaccount: IDL.Vec(IDL.Nat8),
    neuron_stake_e8s: IDL.Nat64,
    from: IDL.Opt(IDL.Principal),
    memo: IDL.Nat64,
    from_subaccount: IDL.Vec(IDL.Nat8),
    transfer_timestamp: IDL.Nat64,
    block_height: IDL.Nat64
});
export const Followers = IDL.Record({ followers: IDL.Vec(NeuronId) });
export const FollowersMap = IDL.Record({
    followers_map: IDL.Vec(IDL.Tuple(IDL.Nat64, Followers))
});
export const Progress = IDL.Variant({ LastNeuronId: NeuronId });
export const Migration = IDL.Record({
    status: IDL.Opt(IDL.Int32),
    failure_reason: IDL.Opt(IDL.Text),
    progress: IDL.Opt(Progress)
});
export const Migrations = IDL.Record({
    neuron_indexes_migration: IDL.Opt(Migration),
    copy_inactive_neurons_to_stable_memory_migration: IDL.Opt(Migration)
});
export const GovernanceError = IDL.Record({
    error_message: IDL.Text,
    error_type: IDL.Int32
});
export const Ballot = IDL.Record({
    vote: IDL.Int32,
    voting_power: IDL.Nat64
});
export const SwapParticipationLimits = IDL.Record({
    min_participant_icp_e8s: IDL.Opt(IDL.Nat64),
    max_participant_icp_e8s: IDL.Opt(IDL.Nat64),
    min_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
    max_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64)
});
export const NeuronsFundNeuronPortion = IDL.Record({
    controller: IDL.Opt(IDL.Principal),
    hotkeys: IDL.Vec(IDL.Principal),
    is_capped: IDL.Opt(IDL.Bool),
    maturity_equivalent_icp_e8s: IDL.Opt(IDL.Nat64),
    nns_neuron_id: IDL.Opt(NeuronId),
    amount_icp_e8s: IDL.Opt(IDL.Nat64)
});
export const NeuronsFundSnapshot = IDL.Record({
    neurons_fund_neuron_portions: IDL.Vec(NeuronsFundNeuronPortion)
});
export const IdealMatchedParticipationFunction = IDL.Record({
    serialized_representation: IDL.Opt(IDL.Text)
});
export const NeuronsFundParticipation = IDL.Record({
    total_maturity_equivalent_icp_e8s: IDL.Opt(IDL.Nat64),
    intended_neurons_fund_participation_icp_e8s: IDL.Opt(IDL.Nat64),
    direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
    swap_participation_limits: IDL.Opt(SwapParticipationLimits),
    max_neurons_fund_swap_participation_icp_e8s: IDL.Opt(IDL.Nat64),
    neurons_fund_reserves: IDL.Opt(NeuronsFundSnapshot),
    ideal_matched_participation_function: IDL.Opt(
        IdealMatchedParticipationFunction
    ),
    allocated_neurons_fund_participation_icp_e8s: IDL.Opt(IDL.Nat64)
});
export const NeuronsFundData = IDL.Record({
    final_neurons_fund_participation: IDL.Opt(NeuronsFundParticipation),
    initial_neurons_fund_participation: IDL.Opt(NeuronsFundParticipation),
    neurons_fund_refunds: IDL.Opt(NeuronsFundSnapshot)
});
export const CanisterStatusResultV2 = IDL.Record({
    status: IDL.Opt(IDL.Int32),
    freezing_threshold: IDL.Opt(IDL.Nat64),
    controllers: IDL.Vec(IDL.Principal),
    memory_size: IDL.Opt(IDL.Nat64),
    cycles: IDL.Opt(IDL.Nat64),
    idle_cycles_burned_per_day: IDL.Opt(IDL.Nat64),
    module_hash: IDL.Vec(IDL.Nat8)
});
export const CanisterSummary = IDL.Record({
    status: IDL.Opt(CanisterStatusResultV2),
    canister_id: IDL.Opt(IDL.Principal)
});
export const SwapBackgroundInformation = IDL.Record({
    ledger_index_canister_summary: IDL.Opt(CanisterSummary),
    fallback_controller_principal_ids: IDL.Vec(IDL.Principal),
    ledger_archive_canister_summaries: IDL.Vec(CanisterSummary),
    ledger_canister_summary: IDL.Opt(CanisterSummary),
    swap_canister_summary: IDL.Opt(CanisterSummary),
    governance_canister_summary: IDL.Opt(CanisterSummary),
    root_canister_summary: IDL.Opt(CanisterSummary),
    dapp_canister_summaries: IDL.Vec(CanisterSummary)
});
export const DerivedProposalInformation = IDL.Record({
    swap_background_information: IDL.Opt(SwapBackgroundInformation)
});
export const Tally = IDL.Record({
    no: IDL.Nat64,
    yes: IDL.Nat64,
    total: IDL.Nat64,
    timestamp_seconds: IDL.Nat64
});
export const WaitForQuietState = IDL.Record({
    current_deadline_timestamp_seconds: IDL.Nat64
});
export const ProposalData = IDL.Record({
    id: IDL.Opt(ProposalId),
    failure_reason: IDL.Opt(GovernanceError),
    ballots: IDL.Vec(IDL.Tuple(IDL.Nat64, Ballot)),
    proposal_timestamp_seconds: IDL.Nat64,
    reward_event_round: IDL.Nat64,
    failed_timestamp_seconds: IDL.Nat64,
    neurons_fund_data: IDL.Opt(NeuronsFundData),
    reject_cost_e8s: IDL.Nat64,
    derived_proposal_information: IDL.Opt(DerivedProposalInformation),
    latest_tally: IDL.Opt(Tally),
    total_potential_voting_power: IDL.Opt(IDL.Nat64),
    sns_token_swap_lifecycle: IDL.Opt(IDL.Int32),
    decided_timestamp_seconds: IDL.Nat64,
    proposal: IDL.Opt(Proposal),
    proposer: IDL.Opt(NeuronId),
    wait_for_quiet_state: IDL.Opt(WaitForQuietState),
    executed_timestamp_seconds: IDL.Nat64,
    original_total_community_fund_maturity_e8s_equivalent: IDL.Opt(IDL.Nat64)
});
export const Command_2 = IDL.Variant({
    Spawn: NeuronId,
    Split: Split,
    Configure: Configure,
    Merge: Merge,
    DisburseToNeuron: DisburseToNeuron,
    SyncCommand: IDL.Record({}),
    ClaimOrRefreshNeuron: ClaimOrRefresh,
    MergeMaturity: MergeMaturity,
    Disburse: Disburse
});
export const NeuronInFlightCommand = IDL.Record({
    command: IDL.Opt(Command_2),
    timestamp: IDL.Nat64
});
export const BallotInfo = IDL.Record({
    vote: IDL.Int32,
    proposal_id: IDL.Opt(ProposalId)
});
export const DissolveState = IDL.Variant({
    DissolveDelaySeconds: IDL.Nat64,
    WhenDissolvedTimestampSeconds: IDL.Nat64
});
export const Neuron = IDL.Record({
    id: IDL.Opt(NeuronId),
    staked_maturity_e8s_equivalent: IDL.Opt(IDL.Nat64),
    controller: IDL.Opt(IDL.Principal),
    recent_ballots: IDL.Vec(BallotInfo),
    voting_power_refreshed_timestamp_seconds: IDL.Opt(IDL.Nat64),
    kyc_verified: IDL.Bool,
    potential_voting_power: IDL.Opt(IDL.Nat64),
    neuron_type: IDL.Opt(IDL.Int32),
    not_for_profit: IDL.Bool,
    maturity_e8s_equivalent: IDL.Nat64,
    deciding_voting_power: IDL.Opt(IDL.Nat64),
    cached_neuron_stake_e8s: IDL.Nat64,
    created_timestamp_seconds: IDL.Nat64,
    auto_stake_maturity: IDL.Opt(IDL.Bool),
    aging_since_timestamp_seconds: IDL.Nat64,
    hot_keys: IDL.Vec(IDL.Principal),
    account: IDL.Vec(IDL.Nat8),
    joined_community_fund_timestamp_seconds: IDL.Opt(IDL.Nat64),
    dissolve_state: IDL.Opt(DissolveState),
    followees: IDL.Vec(IDL.Tuple(IDL.Int32, Followees)),
    neuron_fees_e8s: IDL.Nat64,
    visibility: IDL.Opt(IDL.Int32),
    transfer: IDL.Opt(NeuronStakeTransfer),
    known_neuron_data: IDL.Opt(KnownNeuronData),
    spawn_at_timestamp_seconds: IDL.Opt(IDL.Nat64)
});
export const Governance = IDL.Record({
    default_followees: IDL.Vec(IDL.Tuple(IDL.Int32, Followees)),
    making_sns_proposal: IDL.Opt(MakingSnsProposal),
    most_recent_monthly_node_provider_rewards: IDL.Opt(
        MonthlyNodeProviderRewards
    ),
    maturity_modulation_last_updated_at_timestamp_seconds: IDL.Opt(IDL.Nat64),
    wait_for_quiet_threshold_seconds: IDL.Nat64,
    metrics: IDL.Opt(GovernanceCachedMetrics),
    neuron_management_voting_period_seconds: IDL.Opt(IDL.Nat64),
    node_providers: IDL.Vec(NodeProvider),
    cached_daily_maturity_modulation_basis_points: IDL.Opt(IDL.Int32),
    economics: IDL.Opt(NetworkEconomics),
    restore_aging_summary: IDL.Opt(RestoreAgingSummary),
    spawning_neurons: IDL.Opt(IDL.Bool),
    latest_reward_event: IDL.Opt(RewardEvent),
    to_claim_transfers: IDL.Vec(NeuronStakeTransfer),
    short_voting_period_seconds: IDL.Nat64,
    topic_followee_index: IDL.Vec(IDL.Tuple(IDL.Int32, FollowersMap)),
    migrations: IDL.Opt(Migrations),
    proposals: IDL.Vec(IDL.Tuple(IDL.Nat64, ProposalData)),
    xdr_conversion_rate: IDL.Opt(XdrConversionRate),
    in_flight_commands: IDL.Vec(IDL.Tuple(IDL.Nat64, NeuronInFlightCommand)),
    neurons: IDL.Vec(IDL.Tuple(IDL.Nat64, Neuron)),
    genesis_timestamp_seconds: IDL.Nat64
});
export const Result = IDL.Variant({ Ok: IDL.Null, Err: GovernanceError });
export const Result_1 = IDL.Variant({
    Error: GovernanceError,
    NeuronId: NeuronId
});
export const ClaimOrRefreshNeuronFromAccountResponse = IDL.Record({
    result: IDL.Opt(Result_1)
});
export const Result_2 = IDL.Variant({ Ok: Neuron, Err: GovernanceError });
export const Result_3 = IDL.Variant({
    Ok: GovernanceCachedMetrics,
    Err: GovernanceError
});
export const Result_4 = IDL.Variant({
    Ok: MonthlyNodeProviderRewards,
    Err: GovernanceError
});
export const NeuronInfo = IDL.Record({
    dissolve_delay_seconds: IDL.Nat64,
    recent_ballots: IDL.Vec(BallotInfo),
    voting_power_refreshed_timestamp_seconds: IDL.Opt(IDL.Nat64),
    potential_voting_power: IDL.Opt(IDL.Nat64),
    neuron_type: IDL.Opt(IDL.Int32),
    deciding_voting_power: IDL.Opt(IDL.Nat64),
    created_timestamp_seconds: IDL.Nat64,
    state: IDL.Int32,
    stake_e8s: IDL.Nat64,
    joined_community_fund_timestamp_seconds: IDL.Opt(IDL.Nat64),
    retrieved_at_timestamp_seconds: IDL.Nat64,
    visibility: IDL.Opt(IDL.Int32),
    known_neuron_data: IDL.Opt(KnownNeuronData),
    voting_power: IDL.Nat64,
    age_seconds: IDL.Nat64
});
export const Result_5 = IDL.Variant({
    Ok: NeuronInfo,
    Err: GovernanceError
});
export const GetNeuronsFundAuditInfoRequest = IDL.Record({
    nns_proposal_id: IDL.Opt(ProposalId)
});
export const NeuronsFundAuditInfo = IDL.Record({
    final_neurons_fund_participation: IDL.Opt(NeuronsFundParticipation),
    initial_neurons_fund_participation: IDL.Opt(NeuronsFundParticipation),
    neurons_fund_refunds: IDL.Opt(NeuronsFundSnapshot)
});
export const Ok = IDL.Record({
    neurons_fund_audit_info: IDL.Opt(NeuronsFundAuditInfo)
});
export const Result_6 = IDL.Variant({ Ok: Ok, Err: GovernanceError });
export const GetNeuronsFundAuditInfoResponse = IDL.Record({
    result: IDL.Opt(Result_6)
});
export const Result_7 = IDL.Variant({
    Ok: NodeProvider,
    Err: GovernanceError
});
export const ProposalInfo = IDL.Record({
    id: IDL.Opt(ProposalId),
    status: IDL.Int32,
    topic: IDL.Int32,
    failure_reason: IDL.Opt(GovernanceError),
    ballots: IDL.Vec(IDL.Tuple(IDL.Nat64, Ballot)),
    proposal_timestamp_seconds: IDL.Nat64,
    reward_event_round: IDL.Nat64,
    deadline_timestamp_seconds: IDL.Opt(IDL.Nat64),
    failed_timestamp_seconds: IDL.Nat64,
    reject_cost_e8s: IDL.Nat64,
    derived_proposal_information: IDL.Opt(DerivedProposalInformation),
    latest_tally: IDL.Opt(Tally),
    total_potential_voting_power: IDL.Opt(IDL.Nat64),
    reward_status: IDL.Int32,
    decided_timestamp_seconds: IDL.Nat64,
    proposal: IDL.Opt(Proposal),
    proposer: IDL.Opt(NeuronId),
    executed_timestamp_seconds: IDL.Nat64
});
export const ListKnownNeuronsResponse = IDL.Record({
    known_neurons: IDL.Vec(KnownNeuron)
});
export const NeuronSubaccount = IDL.Record({
    subaccount: IDL.Vec(IDL.Nat8)
});
export const ListNeurons = IDL.Record({
    page_size: IDL.Opt(IDL.Nat64),
    include_public_neurons_in_full_neurons: IDL.Opt(IDL.Bool),
    neuron_ids: IDL.Vec(IDL.Nat64),
    page_number: IDL.Opt(IDL.Nat64),
    include_empty_neurons_readable_by_caller: IDL.Opt(IDL.Bool),
    neuron_subaccounts: IDL.Opt(IDL.Vec(NeuronSubaccount)),
    include_neurons_readable_by_caller: IDL.Bool
});
export const ListNeuronsResponse = IDL.Record({
    neuron_infos: IDL.Vec(IDL.Tuple(IDL.Nat64, NeuronInfo)),
    full_neurons: IDL.Vec(Neuron),
    total_pages_available: IDL.Opt(IDL.Nat64)
});
export const DateRangeFilter = IDL.Record({
    start_timestamp_seconds: IDL.Opt(IDL.Nat64),
    end_timestamp_seconds: IDL.Opt(IDL.Nat64)
});
export const ListNodeProviderRewardsRequest = IDL.Record({
    date_filter: IDL.Opt(DateRangeFilter)
});
export const ListNodeProviderRewardsResponse = IDL.Record({
    rewards: IDL.Vec(MonthlyNodeProviderRewards)
});
export const ListNodeProvidersResponse = IDL.Record({
    node_providers: IDL.Vec(NodeProvider)
});
export const ListProposalInfo = IDL.Record({
    include_reward_status: IDL.Vec(IDL.Int32),
    omit_large_fields: IDL.Opt(IDL.Bool),
    before_proposal: IDL.Opt(ProposalId),
    limit: IDL.Nat32,
    exclude_topic: IDL.Vec(IDL.Int32),
    include_all_manage_neuron_proposals: IDL.Opt(IDL.Bool),
    include_status: IDL.Vec(IDL.Int32)
});
export const ListProposalInfoResponse = IDL.Record({
    proposal_info: IDL.Vec(ProposalInfo)
});
export const InstallCodeRequest = IDL.Record({
    arg: IDL.Opt(IDL.Vec(IDL.Nat8)),
    wasm_module: IDL.Opt(IDL.Vec(IDL.Nat8)),
    skip_stopping_before_installing: IDL.Opt(IDL.Bool),
    canister_id: IDL.Opt(IDL.Principal),
    install_mode: IDL.Opt(IDL.Int32)
});
export const ProposalActionRequest = IDL.Variant({
    RegisterKnownNeuron: KnownNeuron,
    ManageNeuron: ManageNeuronRequest,
    UpdateCanisterSettings: UpdateCanisterSettings,
    InstallCode: InstallCodeRequest,
    StopOrStartCanister: StopOrStartCanister,
    CreateServiceNervousSystem: CreateServiceNervousSystem,
    ExecuteNnsFunction: ExecuteNnsFunction,
    RewardNodeProvider: RewardNodeProvider,
    RewardNodeProviders: RewardNodeProviders,
    ManageNetworkEconomics: NetworkEconomics,
    ApproveGenesisKyc: Principals,
    AddOrRemoveNodeProvider: AddOrRemoveNodeProvider,
    Motion: Motion
});
export const MakeProposalRequest = IDL.Record({
    url: IDL.Text,
    title: IDL.Opt(IDL.Text),
    action: IDL.Opt(ProposalActionRequest),
    summary: IDL.Text
});
export const ManageNeuronCommandRequest = IDL.Variant({
    Spawn: Spawn,
    Split: Split,
    Follow: Follow,
    RefreshVotingPower: RefreshVotingPower,
    ClaimOrRefresh: ClaimOrRefresh,
    Configure: Configure,
    RegisterVote: RegisterVote,
    Merge: Merge,
    DisburseToNeuron: DisburseToNeuron,
    MakeProposal: MakeProposalRequest,
    StakeMaturity: StakeMaturity,
    MergeMaturity: MergeMaturity,
    Disburse: Disburse
});
ManageNeuronRequest.fill(
    IDL.Record({
        id: IDL.Opt(NeuronId),
        command: IDL.Opt(ManageNeuronCommandRequest),
        neuron_id_or_subaccount: IDL.Opt(NeuronIdOrSubaccount)
    })
);
export const SpawnResponse = IDL.Record({
    created_neuron_id: IDL.Opt(NeuronId)
});
export const RefreshVotingPowerResponse = IDL.Record({});
export const ClaimOrRefreshResponse = IDL.Record({
    refreshed_neuron_id: IDL.Opt(NeuronId)
});
export const MergeResponse = IDL.Record({
    target_neuron: IDL.Opt(Neuron),
    source_neuron: IDL.Opt(Neuron),
    target_neuron_info: IDL.Opt(NeuronInfo),
    source_neuron_info: IDL.Opt(NeuronInfo)
});
export const MakeProposalResponse = IDL.Record({
    message: IDL.Opt(IDL.Text),
    proposal_id: IDL.Opt(ProposalId)
});
export const StakeMaturityResponse = IDL.Record({
    maturity_e8s: IDL.Nat64,
    staked_maturity_e8s: IDL.Nat64
});
export const MergeMaturityResponse = IDL.Record({
    merged_maturity_e8s: IDL.Nat64,
    new_stake_e8s: IDL.Nat64
});
export const DisburseResponse = IDL.Record({
    transfer_block_height: IDL.Nat64
});
export const Command_1 = IDL.Variant({
    Error: GovernanceError,
    Spawn: SpawnResponse,
    Split: SpawnResponse,
    Follow: IDL.Record({}),
    RefreshVotingPower: RefreshVotingPowerResponse,
    ClaimOrRefresh: ClaimOrRefreshResponse,
    Configure: IDL.Record({}),
    RegisterVote: IDL.Record({}),
    Merge: MergeResponse,
    DisburseToNeuron: SpawnResponse,
    MakeProposal: MakeProposalResponse,
    StakeMaturity: StakeMaturityResponse,
    MergeMaturity: MergeMaturityResponse,
    Disburse: DisburseResponse
});
export const ManageNeuronResponse = IDL.Record({
    command: IDL.Opt(Command_1)
});
export const Committed = IDL.Record({
    total_direct_contribution_icp_e8s: IDL.Opt(IDL.Nat64),
    total_neurons_fund_contribution_icp_e8s: IDL.Opt(IDL.Nat64),
    sns_governance_canister_id: IDL.Opt(IDL.Principal)
});
export const Result_8 = IDL.Variant({
    Committed: Committed,
    Aborted: IDL.Record({})
});
export const SettleCommunityFundParticipation = IDL.Record({
    result: IDL.Opt(Result_8),
    open_sns_token_swap_proposal_id: IDL.Opt(IDL.Nat64)
});
export const Committed_1 = IDL.Record({
    total_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
    total_neurons_fund_participation_icp_e8s: IDL.Opt(IDL.Nat64),
    sns_governance_canister_id: IDL.Opt(IDL.Principal)
});
export const Result_9 = IDL.Variant({
    Committed: Committed_1,
    Aborted: IDL.Record({})
});
export const SettleNeuronsFundParticipationRequest = IDL.Record({
    result: IDL.Opt(Result_9),
    nns_proposal_id: IDL.Opt(IDL.Nat64)
});
export const NeuronsFundNeuron = IDL.Record({
    controller: IDL.Opt(IDL.Principal),
    hotkeys: IDL.Opt(Principals),
    is_capped: IDL.Opt(IDL.Bool),
    nns_neuron_id: IDL.Opt(IDL.Nat64),
    amount_icp_e8s: IDL.Opt(IDL.Nat64)
});
export const Ok_1 = IDL.Record({
    neurons_fund_neuron_portions: IDL.Vec(NeuronsFundNeuron)
});
export const Result_10 = IDL.Variant({ Ok: Ok_1, Err: GovernanceError });
export const SettleNeuronsFundParticipationResponse = IDL.Record({
    result: IDL.Opt(Result_10)
});
export const UpdateNodeProvider = IDL.Record({
    reward_account: IDL.Opt(AccountIdentifier)
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const ManageNeuronRequest = IDL.Rec();
    const Proposal = IDL.Rec();
    const NeuronId = IDL.Record({ id: IDL.Nat64 });
    const Followees = IDL.Record({ followees: IDL.Vec(NeuronId) });
    const KnownNeuronData = IDL.Record({
        name: IDL.Text,
        description: IDL.Opt(IDL.Text)
    });
    const KnownNeuron = IDL.Record({
        id: IDL.Opt(NeuronId),
        known_neuron_data: IDL.Opt(KnownNeuronData)
    });
    const Spawn = IDL.Record({
        percentage_to_spawn: IDL.Opt(IDL.Nat32),
        new_controller: IDL.Opt(IDL.Principal),
        nonce: IDL.Opt(IDL.Nat64)
    });
    const Split = IDL.Record({ amount_e8s: IDL.Nat64 });
    const Follow = IDL.Record({
        topic: IDL.Int32,
        followees: IDL.Vec(NeuronId)
    });
    const RefreshVotingPower = IDL.Record({});
    const ClaimOrRefreshNeuronFromAccount = IDL.Record({
        controller: IDL.Opt(IDL.Principal),
        memo: IDL.Nat64
    });
    const By = IDL.Variant({
        NeuronIdOrSubaccount: IDL.Record({}),
        MemoAndController: ClaimOrRefreshNeuronFromAccount,
        Memo: IDL.Nat64
    });
    const ClaimOrRefresh = IDL.Record({ by: IDL.Opt(By) });
    const RemoveHotKey = IDL.Record({
        hot_key_to_remove: IDL.Opt(IDL.Principal)
    });
    const AddHotKey = IDL.Record({ new_hot_key: IDL.Opt(IDL.Principal) });
    const ChangeAutoStakeMaturity = IDL.Record({
        requested_setting_for_auto_stake_maturity: IDL.Bool
    });
    const IncreaseDissolveDelay = IDL.Record({
        additional_dissolve_delay_seconds: IDL.Nat32
    });
    const SetVisibility = IDL.Record({ visibility: IDL.Opt(IDL.Int32) });
    const SetDissolveTimestamp = IDL.Record({
        dissolve_timestamp_seconds: IDL.Nat64
    });
    const Operation = IDL.Variant({
        RemoveHotKey: RemoveHotKey,
        AddHotKey: AddHotKey,
        ChangeAutoStakeMaturity: ChangeAutoStakeMaturity,
        StopDissolving: IDL.Record({}),
        StartDissolving: IDL.Record({}),
        IncreaseDissolveDelay: IncreaseDissolveDelay,
        SetVisibility: SetVisibility,
        JoinCommunityFund: IDL.Record({}),
        LeaveCommunityFund: IDL.Record({}),
        SetDissolveTimestamp: SetDissolveTimestamp
    });
    const Configure = IDL.Record({ operation: IDL.Opt(Operation) });
    const ProposalId = IDL.Record({ id: IDL.Nat64 });
    const RegisterVote = IDL.Record({
        vote: IDL.Int32,
        proposal: IDL.Opt(ProposalId)
    });
    const Merge = IDL.Record({ source_neuron_id: IDL.Opt(NeuronId) });
    const DisburseToNeuron = IDL.Record({
        dissolve_delay_seconds: IDL.Nat64,
        kyc_verified: IDL.Bool,
        amount_e8s: IDL.Nat64,
        new_controller: IDL.Opt(IDL.Principal),
        nonce: IDL.Nat64
    });
    const StakeMaturity = IDL.Record({
        percentage_to_stake: IDL.Opt(IDL.Nat32)
    });
    const MergeMaturity = IDL.Record({ percentage_to_merge: IDL.Nat32 });
    const AccountIdentifier = IDL.Record({ hash: IDL.Vec(IDL.Nat8) });
    const Amount = IDL.Record({ e8s: IDL.Nat64 });
    const Disburse = IDL.Record({
        to_account: IDL.Opt(AccountIdentifier),
        amount: IDL.Opt(Amount)
    });
    const Command = IDL.Variant({
        Spawn: Spawn,
        Split: Split,
        Follow: Follow,
        RefreshVotingPower: RefreshVotingPower,
        ClaimOrRefresh: ClaimOrRefresh,
        Configure: Configure,
        RegisterVote: RegisterVote,
        Merge: Merge,
        DisburseToNeuron: DisburseToNeuron,
        MakeProposal: Proposal,
        StakeMaturity: StakeMaturity,
        MergeMaturity: MergeMaturity,
        Disburse: Disburse
    });
    const NeuronIdOrSubaccount = IDL.Variant({
        Subaccount: IDL.Vec(IDL.Nat8),
        NeuronId: NeuronId
    });
    const ManageNeuron = IDL.Record({
        id: IDL.Opt(NeuronId),
        command: IDL.Opt(Command),
        neuron_id_or_subaccount: IDL.Opt(NeuronIdOrSubaccount)
    });
    const Controllers = IDL.Record({ controllers: IDL.Vec(IDL.Principal) });
    const CanisterSettings = IDL.Record({
        freezing_threshold: IDL.Opt(IDL.Nat64),
        wasm_memory_threshold: IDL.Opt(IDL.Nat64),
        controllers: IDL.Opt(Controllers),
        log_visibility: IDL.Opt(IDL.Int32),
        wasm_memory_limit: IDL.Opt(IDL.Nat64),
        memory_allocation: IDL.Opt(IDL.Nat64),
        compute_allocation: IDL.Opt(IDL.Nat64)
    });
    const UpdateCanisterSettings = IDL.Record({
        canister_id: IDL.Opt(IDL.Principal),
        settings: IDL.Opt(CanisterSettings)
    });
    const InstallCode = IDL.Record({
        skip_stopping_before_installing: IDL.Opt(IDL.Bool),
        wasm_module_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
        canister_id: IDL.Opt(IDL.Principal),
        arg_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
        install_mode: IDL.Opt(IDL.Int32)
    });
    const StopOrStartCanister = IDL.Record({
        action: IDL.Opt(IDL.Int32),
        canister_id: IDL.Opt(IDL.Principal)
    });
    const Percentage = IDL.Record({ basis_points: IDL.Opt(IDL.Nat64) });
    const Duration = IDL.Record({ seconds: IDL.Opt(IDL.Nat64) });
    const Tokens = IDL.Record({ e8s: IDL.Opt(IDL.Nat64) });
    const VotingRewardParameters = IDL.Record({
        reward_rate_transition_duration: IDL.Opt(Duration),
        initial_reward_rate: IDL.Opt(Percentage),
        final_reward_rate: IDL.Opt(Percentage)
    });
    const GovernanceParameters = IDL.Record({
        neuron_maximum_dissolve_delay_bonus: IDL.Opt(Percentage),
        neuron_maximum_age_for_age_bonus: IDL.Opt(Duration),
        neuron_maximum_dissolve_delay: IDL.Opt(Duration),
        neuron_minimum_dissolve_delay_to_vote: IDL.Opt(Duration),
        neuron_maximum_age_bonus: IDL.Opt(Percentage),
        neuron_minimum_stake: IDL.Opt(Tokens),
        proposal_wait_for_quiet_deadline_increase: IDL.Opt(Duration),
        proposal_initial_voting_period: IDL.Opt(Duration),
        proposal_rejection_fee: IDL.Opt(Tokens),
        voting_reward_parameters: IDL.Opt(VotingRewardParameters)
    });
    const Image = IDL.Record({ base64_encoding: IDL.Opt(IDL.Text) });
    const LedgerParameters = IDL.Record({
        transaction_fee: IDL.Opt(Tokens),
        token_symbol: IDL.Opt(IDL.Text),
        token_logo: IDL.Opt(Image),
        token_name: IDL.Opt(IDL.Text)
    });
    const Canister = IDL.Record({ id: IDL.Opt(IDL.Principal) });
    const NeuronBasketConstructionParameters = IDL.Record({
        dissolve_delay_interval: IDL.Opt(Duration),
        count: IDL.Opt(IDL.Nat64)
    });
    const GlobalTimeOfDay = IDL.Record({
        seconds_after_utc_midnight: IDL.Opt(IDL.Nat64)
    });
    const Countries = IDL.Record({ iso_codes: IDL.Vec(IDL.Text) });
    const SwapParameters = IDL.Record({
        minimum_participants: IDL.Opt(IDL.Nat64),
        neurons_fund_participation: IDL.Opt(IDL.Bool),
        duration: IDL.Opt(Duration),
        neuron_basket_construction_parameters: IDL.Opt(
            NeuronBasketConstructionParameters
        ),
        confirmation_text: IDL.Opt(IDL.Text),
        maximum_participant_icp: IDL.Opt(Tokens),
        minimum_icp: IDL.Opt(Tokens),
        minimum_direct_participation_icp: IDL.Opt(Tokens),
        minimum_participant_icp: IDL.Opt(Tokens),
        start_time: IDL.Opt(GlobalTimeOfDay),
        maximum_direct_participation_icp: IDL.Opt(Tokens),
        maximum_icp: IDL.Opt(Tokens),
        neurons_fund_investment_icp: IDL.Opt(Tokens),
        restricted_countries: IDL.Opt(Countries)
    });
    const SwapDistribution = IDL.Record({ total: IDL.Opt(Tokens) });
    const NeuronDistribution = IDL.Record({
        controller: IDL.Opt(IDL.Principal),
        dissolve_delay: IDL.Opt(Duration),
        memo: IDL.Opt(IDL.Nat64),
        vesting_period: IDL.Opt(Duration),
        stake: IDL.Opt(Tokens)
    });
    const DeveloperDistribution = IDL.Record({
        developer_neurons: IDL.Vec(NeuronDistribution)
    });
    const InitialTokenDistribution = IDL.Record({
        treasury_distribution: IDL.Opt(SwapDistribution),
        developer_distribution: IDL.Opt(DeveloperDistribution),
        swap_distribution: IDL.Opt(SwapDistribution)
    });
    const CreateServiceNervousSystem = IDL.Record({
        url: IDL.Opt(IDL.Text),
        governance_parameters: IDL.Opt(GovernanceParameters),
        fallback_controller_principal_ids: IDL.Vec(IDL.Principal),
        logo: IDL.Opt(Image),
        name: IDL.Opt(IDL.Text),
        ledger_parameters: IDL.Opt(LedgerParameters),
        description: IDL.Opt(IDL.Text),
        dapp_canisters: IDL.Vec(Canister),
        swap_parameters: IDL.Opt(SwapParameters),
        initial_token_distribution: IDL.Opt(InitialTokenDistribution)
    });
    const ExecuteNnsFunction = IDL.Record({
        nns_function: IDL.Int32,
        payload: IDL.Vec(IDL.Nat8)
    });
    const NodeProvider = IDL.Record({
        id: IDL.Opt(IDL.Principal),
        reward_account: IDL.Opt(AccountIdentifier)
    });
    const RewardToNeuron = IDL.Record({ dissolve_delay_seconds: IDL.Nat64 });
    const RewardToAccount = IDL.Record({
        to_account: IDL.Opt(AccountIdentifier)
    });
    const RewardMode = IDL.Variant({
        RewardToNeuron: RewardToNeuron,
        RewardToAccount: RewardToAccount
    });
    const RewardNodeProvider = IDL.Record({
        node_provider: IDL.Opt(NodeProvider),
        reward_mode: IDL.Opt(RewardMode),
        amount_e8s: IDL.Nat64
    });
    const NeuronBasketConstructionParameters_1 = IDL.Record({
        dissolve_delay_interval_seconds: IDL.Nat64,
        count: IDL.Nat64
    });
    const Params = IDL.Record({
        min_participant_icp_e8s: IDL.Nat64,
        neuron_basket_construction_parameters: IDL.Opt(
            NeuronBasketConstructionParameters_1
        ),
        max_icp_e8s: IDL.Nat64,
        swap_due_timestamp_seconds: IDL.Nat64,
        min_participants: IDL.Nat32,
        sns_token_e8s: IDL.Nat64,
        sale_delay_seconds: IDL.Opt(IDL.Nat64),
        max_participant_icp_e8s: IDL.Nat64,
        min_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        min_icp_e8s: IDL.Nat64,
        max_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64)
    });
    const OpenSnsTokenSwap = IDL.Record({
        community_fund_investment_e8s: IDL.Opt(IDL.Nat64),
        target_swap_canister_id: IDL.Opt(IDL.Principal),
        params: IDL.Opt(Params)
    });
    const TimeWindow = IDL.Record({
        start_timestamp_seconds: IDL.Nat64,
        end_timestamp_seconds: IDL.Nat64
    });
    const SetOpenTimeWindowRequest = IDL.Record({
        open_time_window: IDL.Opt(TimeWindow)
    });
    const SetSnsTokenSwapOpenTimeWindow = IDL.Record({
        request: IDL.Opt(SetOpenTimeWindowRequest),
        swap_canister_id: IDL.Opt(IDL.Principal)
    });
    const SetDefaultFollowees = IDL.Record({
        default_followees: IDL.Vec(IDL.Tuple(IDL.Int32, Followees))
    });
    const RewardNodeProviders = IDL.Record({
        use_registry_derived_rewards: IDL.Opt(IDL.Bool),
        rewards: IDL.Vec(RewardNodeProvider)
    });
    const VotingPowerEconomics = IDL.Record({
        start_reducing_voting_power_after_seconds: IDL.Opt(IDL.Nat64),
        clear_following_after_seconds: IDL.Opt(IDL.Nat64)
    });
    const Decimal = IDL.Record({ human_readable: IDL.Opt(IDL.Text) });
    const NeuronsFundMatchedFundingCurveCoefficients = IDL.Record({
        contribution_threshold_xdr: IDL.Opt(Decimal),
        one_third_participation_milestone_xdr: IDL.Opt(Decimal),
        full_participation_milestone_xdr: IDL.Opt(Decimal)
    });
    const NeuronsFundEconomics = IDL.Record({
        maximum_icp_xdr_rate: IDL.Opt(Percentage),
        neurons_fund_matched_funding_curve_coefficients: IDL.Opt(
            NeuronsFundMatchedFundingCurveCoefficients
        ),
        max_theoretical_neurons_fund_participation_amount_xdr: IDL.Opt(Decimal),
        minimum_icp_xdr_rate: IDL.Opt(Percentage)
    });
    const NetworkEconomics = IDL.Record({
        neuron_minimum_stake_e8s: IDL.Nat64,
        voting_power_economics: IDL.Opt(VotingPowerEconomics),
        max_proposals_to_keep_per_topic: IDL.Nat32,
        neuron_management_fee_per_proposal_e8s: IDL.Nat64,
        reject_cost_e8s: IDL.Nat64,
        transaction_fee_e8s: IDL.Nat64,
        neuron_spawn_dissolve_delay_seconds: IDL.Nat64,
        minimum_icp_xdr_rate: IDL.Nat64,
        maximum_node_provider_rewards_e8s: IDL.Nat64,
        neurons_fund_economics: IDL.Opt(NeuronsFundEconomics)
    });
    const Principals = IDL.Record({ principals: IDL.Vec(IDL.Principal) });
    const Change = IDL.Variant({
        ToRemove: NodeProvider,
        ToAdd: NodeProvider
    });
    const AddOrRemoveNodeProvider = IDL.Record({ change: IDL.Opt(Change) });
    const Motion = IDL.Record({ motion_text: IDL.Text });
    const Action = IDL.Variant({
        RegisterKnownNeuron: KnownNeuron,
        ManageNeuron: ManageNeuron,
        UpdateCanisterSettings: UpdateCanisterSettings,
        InstallCode: InstallCode,
        StopOrStartCanister: StopOrStartCanister,
        CreateServiceNervousSystem: CreateServiceNervousSystem,
        ExecuteNnsFunction: ExecuteNnsFunction,
        RewardNodeProvider: RewardNodeProvider,
        OpenSnsTokenSwap: OpenSnsTokenSwap,
        SetSnsTokenSwapOpenTimeWindow: SetSnsTokenSwapOpenTimeWindow,
        SetDefaultFollowees: SetDefaultFollowees,
        RewardNodeProviders: RewardNodeProviders,
        ManageNetworkEconomics: NetworkEconomics,
        ApproveGenesisKyc: Principals,
        AddOrRemoveNodeProvider: AddOrRemoveNodeProvider,
        Motion: Motion
    });
    Proposal.fill(
        IDL.Record({
            url: IDL.Text,
            title: IDL.Opt(IDL.Text),
            action: IDL.Opt(Action),
            summary: IDL.Text
        })
    );
    const MakingSnsProposal = IDL.Record({
        proposal: IDL.Opt(Proposal),
        caller: IDL.Opt(IDL.Principal),
        proposer_id: IDL.Opt(NeuronId)
    });
    const XdrConversionRate = IDL.Record({
        xdr_permyriad_per_icp: IDL.Opt(IDL.Nat64),
        timestamp_seconds: IDL.Opt(IDL.Nat64)
    });
    const MonthlyNodeProviderRewards = IDL.Record({
        minimum_xdr_permyriad_per_icp: IDL.Opt(IDL.Nat64),
        registry_version: IDL.Opt(IDL.Nat64),
        node_providers: IDL.Vec(NodeProvider),
        timestamp: IDL.Nat64,
        rewards: IDL.Vec(RewardNodeProvider),
        xdr_conversion_rate: IDL.Opt(XdrConversionRate),
        maximum_node_provider_rewards_e8s: IDL.Opt(IDL.Nat64)
    });
    const NeuronSubsetMetrics = IDL.Record({
        total_maturity_e8s_equivalent: IDL.Opt(IDL.Nat64),
        maturity_e8s_equivalent_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Nat64)
        ),
        voting_power_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
        total_staked_e8s: IDL.Opt(IDL.Nat64),
        count: IDL.Opt(IDL.Nat64),
        deciding_voting_power_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
        total_staked_maturity_e8s_equivalent: IDL.Opt(IDL.Nat64),
        total_potential_voting_power: IDL.Opt(IDL.Nat64),
        total_deciding_voting_power: IDL.Opt(IDL.Nat64),
        staked_maturity_e8s_equivalent_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Nat64)
        ),
        staked_e8s_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
        total_voting_power: IDL.Opt(IDL.Nat64),
        potential_voting_power_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Nat64)
        ),
        count_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64))
    });
    const GovernanceCachedMetrics = IDL.Record({
        total_maturity_e8s_equivalent: IDL.Nat64,
        not_dissolving_neurons_e8s_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        dissolving_neurons_staked_maturity_e8s_equivalent_sum: IDL.Nat64,
        garbage_collectable_neurons_count: IDL.Nat64,
        dissolving_neurons_staked_maturity_e8s_equivalent_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        neurons_with_invalid_stake_count: IDL.Nat64,
        not_dissolving_neurons_count_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Nat64)
        ),
        ect_neuron_count: IDL.Nat64,
        total_supply_icp: IDL.Nat64,
        neurons_with_less_than_6_months_dissolve_delay_count: IDL.Nat64,
        dissolved_neurons_count: IDL.Nat64,
        community_fund_total_maturity_e8s_equivalent: IDL.Nat64,
        total_staked_e8s_seed: IDL.Nat64,
        total_staked_maturity_e8s_equivalent_ect: IDL.Nat64,
        total_staked_e8s: IDL.Nat64,
        fully_lost_voting_power_neuron_subset_metrics:
            IDL.Opt(NeuronSubsetMetrics),
        not_dissolving_neurons_count: IDL.Nat64,
        total_locked_e8s: IDL.Nat64,
        neurons_fund_total_active_neurons: IDL.Nat64,
        total_voting_power_non_self_authenticating_controller: IDL.Opt(
            IDL.Nat64
        ),
        total_staked_maturity_e8s_equivalent: IDL.Nat64,
        not_dissolving_neurons_e8s_buckets_ect: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        declining_voting_power_neuron_subset_metrics:
            IDL.Opt(NeuronSubsetMetrics),
        total_staked_e8s_ect: IDL.Nat64,
        not_dissolving_neurons_staked_maturity_e8s_equivalent_sum: IDL.Nat64,
        dissolved_neurons_e8s: IDL.Nat64,
        total_staked_e8s_non_self_authenticating_controller: IDL.Opt(IDL.Nat64),
        dissolving_neurons_e8s_buckets_seed: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        neurons_with_less_than_6_months_dissolve_delay_e8s: IDL.Nat64,
        not_dissolving_neurons_staked_maturity_e8s_equivalent_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        dissolving_neurons_count_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Nat64)
        ),
        dissolving_neurons_e8s_buckets_ect: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        non_self_authenticating_controller_neuron_subset_metrics:
            IDL.Opt(NeuronSubsetMetrics),
        dissolving_neurons_count: IDL.Nat64,
        dissolving_neurons_e8s_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        total_staked_maturity_e8s_equivalent_seed: IDL.Nat64,
        community_fund_total_staked_e8s: IDL.Nat64,
        not_dissolving_neurons_e8s_buckets_seed: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        public_neuron_subset_metrics: IDL.Opt(NeuronSubsetMetrics),
        timestamp_seconds: IDL.Nat64,
        seed_neuron_count: IDL.Nat64
    });
    const RestoreAgingNeuronGroup = IDL.Record({
        count: IDL.Opt(IDL.Nat64),
        previous_total_stake_e8s: IDL.Opt(IDL.Nat64),
        current_total_stake_e8s: IDL.Opt(IDL.Nat64),
        group_type: IDL.Int32
    });
    const RestoreAgingSummary = IDL.Record({
        groups: IDL.Vec(RestoreAgingNeuronGroup),
        timestamp_seconds: IDL.Opt(IDL.Nat64)
    });
    const RewardEvent = IDL.Record({
        rounds_since_last_distribution: IDL.Opt(IDL.Nat64),
        day_after_genesis: IDL.Nat64,
        actual_timestamp_seconds: IDL.Nat64,
        total_available_e8s_equivalent: IDL.Nat64,
        latest_round_available_e8s_equivalent: IDL.Opt(IDL.Nat64),
        distributed_e8s_equivalent: IDL.Nat64,
        settled_proposals: IDL.Vec(ProposalId)
    });
    const NeuronStakeTransfer = IDL.Record({
        to_subaccount: IDL.Vec(IDL.Nat8),
        neuron_stake_e8s: IDL.Nat64,
        from: IDL.Opt(IDL.Principal),
        memo: IDL.Nat64,
        from_subaccount: IDL.Vec(IDL.Nat8),
        transfer_timestamp: IDL.Nat64,
        block_height: IDL.Nat64
    });
    const Followers = IDL.Record({ followers: IDL.Vec(NeuronId) });
    const FollowersMap = IDL.Record({
        followers_map: IDL.Vec(IDL.Tuple(IDL.Nat64, Followers))
    });
    const Progress = IDL.Variant({ LastNeuronId: NeuronId });
    const Migration = IDL.Record({
        status: IDL.Opt(IDL.Int32),
        failure_reason: IDL.Opt(IDL.Text),
        progress: IDL.Opt(Progress)
    });
    const Migrations = IDL.Record({
        neuron_indexes_migration: IDL.Opt(Migration),
        copy_inactive_neurons_to_stable_memory_migration: IDL.Opt(Migration)
    });
    const GovernanceError = IDL.Record({
        error_message: IDL.Text,
        error_type: IDL.Int32
    });
    const Ballot = IDL.Record({ vote: IDL.Int32, voting_power: IDL.Nat64 });
    const SwapParticipationLimits = IDL.Record({
        min_participant_icp_e8s: IDL.Opt(IDL.Nat64),
        max_participant_icp_e8s: IDL.Opt(IDL.Nat64),
        min_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        max_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64)
    });
    const NeuronsFundNeuronPortion = IDL.Record({
        controller: IDL.Opt(IDL.Principal),
        hotkeys: IDL.Vec(IDL.Principal),
        is_capped: IDL.Opt(IDL.Bool),
        maturity_equivalent_icp_e8s: IDL.Opt(IDL.Nat64),
        nns_neuron_id: IDL.Opt(NeuronId),
        amount_icp_e8s: IDL.Opt(IDL.Nat64)
    });
    const NeuronsFundSnapshot = IDL.Record({
        neurons_fund_neuron_portions: IDL.Vec(NeuronsFundNeuronPortion)
    });
    const IdealMatchedParticipationFunction = IDL.Record({
        serialized_representation: IDL.Opt(IDL.Text)
    });
    const NeuronsFundParticipation = IDL.Record({
        total_maturity_equivalent_icp_e8s: IDL.Opt(IDL.Nat64),
        intended_neurons_fund_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        swap_participation_limits: IDL.Opt(SwapParticipationLimits),
        max_neurons_fund_swap_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        neurons_fund_reserves: IDL.Opt(NeuronsFundSnapshot),
        ideal_matched_participation_function: IDL.Opt(
            IdealMatchedParticipationFunction
        ),
        allocated_neurons_fund_participation_icp_e8s: IDL.Opt(IDL.Nat64)
    });
    const NeuronsFundData = IDL.Record({
        final_neurons_fund_participation: IDL.Opt(NeuronsFundParticipation),
        initial_neurons_fund_participation: IDL.Opt(NeuronsFundParticipation),
        neurons_fund_refunds: IDL.Opt(NeuronsFundSnapshot)
    });
    const CanisterStatusResultV2 = IDL.Record({
        status: IDL.Opt(IDL.Int32),
        freezing_threshold: IDL.Opt(IDL.Nat64),
        controllers: IDL.Vec(IDL.Principal),
        memory_size: IDL.Opt(IDL.Nat64),
        cycles: IDL.Opt(IDL.Nat64),
        idle_cycles_burned_per_day: IDL.Opt(IDL.Nat64),
        module_hash: IDL.Vec(IDL.Nat8)
    });
    const CanisterSummary = IDL.Record({
        status: IDL.Opt(CanisterStatusResultV2),
        canister_id: IDL.Opt(IDL.Principal)
    });
    const SwapBackgroundInformation = IDL.Record({
        ledger_index_canister_summary: IDL.Opt(CanisterSummary),
        fallback_controller_principal_ids: IDL.Vec(IDL.Principal),
        ledger_archive_canister_summaries: IDL.Vec(CanisterSummary),
        ledger_canister_summary: IDL.Opt(CanisterSummary),
        swap_canister_summary: IDL.Opt(CanisterSummary),
        governance_canister_summary: IDL.Opt(CanisterSummary),
        root_canister_summary: IDL.Opt(CanisterSummary),
        dapp_canister_summaries: IDL.Vec(CanisterSummary)
    });
    const DerivedProposalInformation = IDL.Record({
        swap_background_information: IDL.Opt(SwapBackgroundInformation)
    });
    const Tally = IDL.Record({
        no: IDL.Nat64,
        yes: IDL.Nat64,
        total: IDL.Nat64,
        timestamp_seconds: IDL.Nat64
    });
    const WaitForQuietState = IDL.Record({
        current_deadline_timestamp_seconds: IDL.Nat64
    });
    const ProposalData = IDL.Record({
        id: IDL.Opt(ProposalId),
        failure_reason: IDL.Opt(GovernanceError),
        ballots: IDL.Vec(IDL.Tuple(IDL.Nat64, Ballot)),
        proposal_timestamp_seconds: IDL.Nat64,
        reward_event_round: IDL.Nat64,
        failed_timestamp_seconds: IDL.Nat64,
        neurons_fund_data: IDL.Opt(NeuronsFundData),
        reject_cost_e8s: IDL.Nat64,
        derived_proposal_information: IDL.Opt(DerivedProposalInformation),
        latest_tally: IDL.Opt(Tally),
        total_potential_voting_power: IDL.Opt(IDL.Nat64),
        sns_token_swap_lifecycle: IDL.Opt(IDL.Int32),
        decided_timestamp_seconds: IDL.Nat64,
        proposal: IDL.Opt(Proposal),
        proposer: IDL.Opt(NeuronId),
        wait_for_quiet_state: IDL.Opt(WaitForQuietState),
        executed_timestamp_seconds: IDL.Nat64,
        original_total_community_fund_maturity_e8s_equivalent: IDL.Opt(
            IDL.Nat64
        )
    });
    const Command_2 = IDL.Variant({
        Spawn: NeuronId,
        Split: Split,
        Configure: Configure,
        Merge: Merge,
        DisburseToNeuron: DisburseToNeuron,
        SyncCommand: IDL.Record({}),
        ClaimOrRefreshNeuron: ClaimOrRefresh,
        MergeMaturity: MergeMaturity,
        Disburse: Disburse
    });
    const NeuronInFlightCommand = IDL.Record({
        command: IDL.Opt(Command_2),
        timestamp: IDL.Nat64
    });
    const BallotInfo = IDL.Record({
        vote: IDL.Int32,
        proposal_id: IDL.Opt(ProposalId)
    });
    const DissolveState = IDL.Variant({
        DissolveDelaySeconds: IDL.Nat64,
        WhenDissolvedTimestampSeconds: IDL.Nat64
    });
    const Neuron = IDL.Record({
        id: IDL.Opt(NeuronId),
        staked_maturity_e8s_equivalent: IDL.Opt(IDL.Nat64),
        controller: IDL.Opt(IDL.Principal),
        recent_ballots: IDL.Vec(BallotInfo),
        voting_power_refreshed_timestamp_seconds: IDL.Opt(IDL.Nat64),
        kyc_verified: IDL.Bool,
        potential_voting_power: IDL.Opt(IDL.Nat64),
        neuron_type: IDL.Opt(IDL.Int32),
        not_for_profit: IDL.Bool,
        maturity_e8s_equivalent: IDL.Nat64,
        deciding_voting_power: IDL.Opt(IDL.Nat64),
        cached_neuron_stake_e8s: IDL.Nat64,
        created_timestamp_seconds: IDL.Nat64,
        auto_stake_maturity: IDL.Opt(IDL.Bool),
        aging_since_timestamp_seconds: IDL.Nat64,
        hot_keys: IDL.Vec(IDL.Principal),
        account: IDL.Vec(IDL.Nat8),
        joined_community_fund_timestamp_seconds: IDL.Opt(IDL.Nat64),
        dissolve_state: IDL.Opt(DissolveState),
        followees: IDL.Vec(IDL.Tuple(IDL.Int32, Followees)),
        neuron_fees_e8s: IDL.Nat64,
        visibility: IDL.Opt(IDL.Int32),
        transfer: IDL.Opt(NeuronStakeTransfer),
        known_neuron_data: IDL.Opt(KnownNeuronData),
        spawn_at_timestamp_seconds: IDL.Opt(IDL.Nat64)
    });
    const Governance = IDL.Record({
        default_followees: IDL.Vec(IDL.Tuple(IDL.Int32, Followees)),
        making_sns_proposal: IDL.Opt(MakingSnsProposal),
        most_recent_monthly_node_provider_rewards: IDL.Opt(
            MonthlyNodeProviderRewards
        ),
        maturity_modulation_last_updated_at_timestamp_seconds: IDL.Opt(
            IDL.Nat64
        ),
        wait_for_quiet_threshold_seconds: IDL.Nat64,
        metrics: IDL.Opt(GovernanceCachedMetrics),
        neuron_management_voting_period_seconds: IDL.Opt(IDL.Nat64),
        node_providers: IDL.Vec(NodeProvider),
        cached_daily_maturity_modulation_basis_points: IDL.Opt(IDL.Int32),
        economics: IDL.Opt(NetworkEconomics),
        restore_aging_summary: IDL.Opt(RestoreAgingSummary),
        spawning_neurons: IDL.Opt(IDL.Bool),
        latest_reward_event: IDL.Opt(RewardEvent),
        to_claim_transfers: IDL.Vec(NeuronStakeTransfer),
        short_voting_period_seconds: IDL.Nat64,
        topic_followee_index: IDL.Vec(IDL.Tuple(IDL.Int32, FollowersMap)),
        migrations: IDL.Opt(Migrations),
        proposals: IDL.Vec(IDL.Tuple(IDL.Nat64, ProposalData)),
        xdr_conversion_rate: IDL.Opt(XdrConversionRate),
        in_flight_commands: IDL.Vec(
            IDL.Tuple(IDL.Nat64, NeuronInFlightCommand)
        ),
        neurons: IDL.Vec(IDL.Tuple(IDL.Nat64, Neuron)),
        genesis_timestamp_seconds: IDL.Nat64
    });
    const Result = IDL.Variant({ Ok: IDL.Null, Err: GovernanceError });
    const Result_1 = IDL.Variant({
        Error: GovernanceError,
        NeuronId: NeuronId
    });
    const ClaimOrRefreshNeuronFromAccountResponse = IDL.Record({
        result: IDL.Opt(Result_1)
    });
    const Result_2 = IDL.Variant({ Ok: Neuron, Err: GovernanceError });
    const Result_3 = IDL.Variant({
        Ok: GovernanceCachedMetrics,
        Err: GovernanceError
    });
    const Result_4 = IDL.Variant({
        Ok: MonthlyNodeProviderRewards,
        Err: GovernanceError
    });
    const NeuronInfo = IDL.Record({
        dissolve_delay_seconds: IDL.Nat64,
        recent_ballots: IDL.Vec(BallotInfo),
        voting_power_refreshed_timestamp_seconds: IDL.Opt(IDL.Nat64),
        potential_voting_power: IDL.Opt(IDL.Nat64),
        neuron_type: IDL.Opt(IDL.Int32),
        deciding_voting_power: IDL.Opt(IDL.Nat64),
        created_timestamp_seconds: IDL.Nat64,
        state: IDL.Int32,
        stake_e8s: IDL.Nat64,
        joined_community_fund_timestamp_seconds: IDL.Opt(IDL.Nat64),
        retrieved_at_timestamp_seconds: IDL.Nat64,
        visibility: IDL.Opt(IDL.Int32),
        known_neuron_data: IDL.Opt(KnownNeuronData),
        voting_power: IDL.Nat64,
        age_seconds: IDL.Nat64
    });
    const Result_5 = IDL.Variant({ Ok: NeuronInfo, Err: GovernanceError });
    const GetNeuronsFundAuditInfoRequest = IDL.Record({
        nns_proposal_id: IDL.Opt(ProposalId)
    });
    const NeuronsFundAuditInfo = IDL.Record({
        final_neurons_fund_participation: IDL.Opt(NeuronsFundParticipation),
        initial_neurons_fund_participation: IDL.Opt(NeuronsFundParticipation),
        neurons_fund_refunds: IDL.Opt(NeuronsFundSnapshot)
    });
    const Ok = IDL.Record({
        neurons_fund_audit_info: IDL.Opt(NeuronsFundAuditInfo)
    });
    const Result_6 = IDL.Variant({ Ok: Ok, Err: GovernanceError });
    const GetNeuronsFundAuditInfoResponse = IDL.Record({
        result: IDL.Opt(Result_6)
    });
    const Result_7 = IDL.Variant({
        Ok: NodeProvider,
        Err: GovernanceError
    });
    const ProposalInfo = IDL.Record({
        id: IDL.Opt(ProposalId),
        status: IDL.Int32,
        topic: IDL.Int32,
        failure_reason: IDL.Opt(GovernanceError),
        ballots: IDL.Vec(IDL.Tuple(IDL.Nat64, Ballot)),
        proposal_timestamp_seconds: IDL.Nat64,
        reward_event_round: IDL.Nat64,
        deadline_timestamp_seconds: IDL.Opt(IDL.Nat64),
        failed_timestamp_seconds: IDL.Nat64,
        reject_cost_e8s: IDL.Nat64,
        derived_proposal_information: IDL.Opt(DerivedProposalInformation),
        latest_tally: IDL.Opt(Tally),
        total_potential_voting_power: IDL.Opt(IDL.Nat64),
        reward_status: IDL.Int32,
        decided_timestamp_seconds: IDL.Nat64,
        proposal: IDL.Opt(Proposal),
        proposer: IDL.Opt(NeuronId),
        executed_timestamp_seconds: IDL.Nat64
    });
    const ListKnownNeuronsResponse = IDL.Record({
        known_neurons: IDL.Vec(KnownNeuron)
    });
    const NeuronSubaccount = IDL.Record({ subaccount: IDL.Vec(IDL.Nat8) });
    const ListNeurons = IDL.Record({
        page_size: IDL.Opt(IDL.Nat64),
        include_public_neurons_in_full_neurons: IDL.Opt(IDL.Bool),
        neuron_ids: IDL.Vec(IDL.Nat64),
        page_number: IDL.Opt(IDL.Nat64),
        include_empty_neurons_readable_by_caller: IDL.Opt(IDL.Bool),
        neuron_subaccounts: IDL.Opt(IDL.Vec(NeuronSubaccount)),
        include_neurons_readable_by_caller: IDL.Bool
    });
    const ListNeuronsResponse = IDL.Record({
        neuron_infos: IDL.Vec(IDL.Tuple(IDL.Nat64, NeuronInfo)),
        full_neurons: IDL.Vec(Neuron),
        total_pages_available: IDL.Opt(IDL.Nat64)
    });
    const DateRangeFilter = IDL.Record({
        start_timestamp_seconds: IDL.Opt(IDL.Nat64),
        end_timestamp_seconds: IDL.Opt(IDL.Nat64)
    });
    const ListNodeProviderRewardsRequest = IDL.Record({
        date_filter: IDL.Opt(DateRangeFilter)
    });
    const ListNodeProviderRewardsResponse = IDL.Record({
        rewards: IDL.Vec(MonthlyNodeProviderRewards)
    });
    const ListNodeProvidersResponse = IDL.Record({
        node_providers: IDL.Vec(NodeProvider)
    });
    const ListProposalInfo = IDL.Record({
        include_reward_status: IDL.Vec(IDL.Int32),
        omit_large_fields: IDL.Opt(IDL.Bool),
        before_proposal: IDL.Opt(ProposalId),
        limit: IDL.Nat32,
        exclude_topic: IDL.Vec(IDL.Int32),
        include_all_manage_neuron_proposals: IDL.Opt(IDL.Bool),
        include_status: IDL.Vec(IDL.Int32)
    });
    const ListProposalInfoResponse = IDL.Record({
        proposal_info: IDL.Vec(ProposalInfo)
    });
    const InstallCodeRequest = IDL.Record({
        arg: IDL.Opt(IDL.Vec(IDL.Nat8)),
        wasm_module: IDL.Opt(IDL.Vec(IDL.Nat8)),
        skip_stopping_before_installing: IDL.Opt(IDL.Bool),
        canister_id: IDL.Opt(IDL.Principal),
        install_mode: IDL.Opt(IDL.Int32)
    });
    const ProposalActionRequest = IDL.Variant({
        RegisterKnownNeuron: KnownNeuron,
        ManageNeuron: ManageNeuronRequest,
        UpdateCanisterSettings: UpdateCanisterSettings,
        InstallCode: InstallCodeRequest,
        StopOrStartCanister: StopOrStartCanister,
        CreateServiceNervousSystem: CreateServiceNervousSystem,
        ExecuteNnsFunction: ExecuteNnsFunction,
        RewardNodeProvider: RewardNodeProvider,
        RewardNodeProviders: RewardNodeProviders,
        ManageNetworkEconomics: NetworkEconomics,
        ApproveGenesisKyc: Principals,
        AddOrRemoveNodeProvider: AddOrRemoveNodeProvider,
        Motion: Motion
    });
    const MakeProposalRequest = IDL.Record({
        url: IDL.Text,
        title: IDL.Opt(IDL.Text),
        action: IDL.Opt(ProposalActionRequest),
        summary: IDL.Text
    });
    const ManageNeuronCommandRequest = IDL.Variant({
        Spawn: Spawn,
        Split: Split,
        Follow: Follow,
        RefreshVotingPower: RefreshVotingPower,
        ClaimOrRefresh: ClaimOrRefresh,
        Configure: Configure,
        RegisterVote: RegisterVote,
        Merge: Merge,
        DisburseToNeuron: DisburseToNeuron,
        MakeProposal: MakeProposalRequest,
        StakeMaturity: StakeMaturity,
        MergeMaturity: MergeMaturity,
        Disburse: Disburse
    });
    ManageNeuronRequest.fill(
        IDL.Record({
            id: IDL.Opt(NeuronId),
            command: IDL.Opt(ManageNeuronCommandRequest),
            neuron_id_or_subaccount: IDL.Opt(NeuronIdOrSubaccount)
        })
    );
    const SpawnResponse = IDL.Record({ created_neuron_id: IDL.Opt(NeuronId) });
    const RefreshVotingPowerResponse = IDL.Record({});
    const ClaimOrRefreshResponse = IDL.Record({
        refreshed_neuron_id: IDL.Opt(NeuronId)
    });
    const MergeResponse = IDL.Record({
        target_neuron: IDL.Opt(Neuron),
        source_neuron: IDL.Opt(Neuron),
        target_neuron_info: IDL.Opt(NeuronInfo),
        source_neuron_info: IDL.Opt(NeuronInfo)
    });
    const MakeProposalResponse = IDL.Record({
        message: IDL.Opt(IDL.Text),
        proposal_id: IDL.Opt(ProposalId)
    });
    const StakeMaturityResponse = IDL.Record({
        maturity_e8s: IDL.Nat64,
        staked_maturity_e8s: IDL.Nat64
    });
    const MergeMaturityResponse = IDL.Record({
        merged_maturity_e8s: IDL.Nat64,
        new_stake_e8s: IDL.Nat64
    });
    const DisburseResponse = IDL.Record({ transfer_block_height: IDL.Nat64 });
    const Command_1 = IDL.Variant({
        Error: GovernanceError,
        Spawn: SpawnResponse,
        Split: SpawnResponse,
        Follow: IDL.Record({}),
        RefreshVotingPower: RefreshVotingPowerResponse,
        ClaimOrRefresh: ClaimOrRefreshResponse,
        Configure: IDL.Record({}),
        RegisterVote: IDL.Record({}),
        Merge: MergeResponse,
        DisburseToNeuron: SpawnResponse,
        MakeProposal: MakeProposalResponse,
        StakeMaturity: StakeMaturityResponse,
        MergeMaturity: MergeMaturityResponse,
        Disburse: DisburseResponse
    });
    const ManageNeuronResponse = IDL.Record({ command: IDL.Opt(Command_1) });
    const Committed = IDL.Record({
        total_direct_contribution_icp_e8s: IDL.Opt(IDL.Nat64),
        total_neurons_fund_contribution_icp_e8s: IDL.Opt(IDL.Nat64),
        sns_governance_canister_id: IDL.Opt(IDL.Principal)
    });
    const Result_8 = IDL.Variant({
        Committed: Committed,
        Aborted: IDL.Record({})
    });
    const SettleCommunityFundParticipation = IDL.Record({
        result: IDL.Opt(Result_8),
        open_sns_token_swap_proposal_id: IDL.Opt(IDL.Nat64)
    });
    const Committed_1 = IDL.Record({
        total_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        total_neurons_fund_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        sns_governance_canister_id: IDL.Opt(IDL.Principal)
    });
    const Result_9 = IDL.Variant({
        Committed: Committed_1,
        Aborted: IDL.Record({})
    });
    const SettleNeuronsFundParticipationRequest = IDL.Record({
        result: IDL.Opt(Result_9),
        nns_proposal_id: IDL.Opt(IDL.Nat64)
    });
    const NeuronsFundNeuron = IDL.Record({
        controller: IDL.Opt(IDL.Principal),
        hotkeys: IDL.Opt(Principals),
        is_capped: IDL.Opt(IDL.Bool),
        nns_neuron_id: IDL.Opt(IDL.Nat64),
        amount_icp_e8s: IDL.Opt(IDL.Nat64)
    });
    const Ok_1 = IDL.Record({
        neurons_fund_neuron_portions: IDL.Vec(NeuronsFundNeuron)
    });
    const Result_10 = IDL.Variant({ Ok: Ok_1, Err: GovernanceError });
    const SettleNeuronsFundParticipationResponse = IDL.Record({
        result: IDL.Opt(Result_10)
    });
    const UpdateNodeProvider = IDL.Record({
        reward_account: IDL.Opt(AccountIdentifier)
    });
    return IDL.Service({
        claim_gtc_neurons: IDL.Func(
            [IDL.Principal, IDL.Vec(NeuronId)],
            [Result],
            []
        ),
        claim_or_refresh_neuron_from_account: IDL.Func(
            [ClaimOrRefreshNeuronFromAccount],
            [ClaimOrRefreshNeuronFromAccountResponse],
            []
        ),
        get_build_metadata: IDL.Func([], [IDL.Text], ['query']),
        get_full_neuron: IDL.Func([IDL.Nat64], [Result_2], ['query']),
        get_full_neuron_by_id_or_subaccount: IDL.Func(
            [NeuronIdOrSubaccount],
            [Result_2],
            ['query']
        ),
        get_latest_reward_event: IDL.Func([], [RewardEvent], ['query']),
        get_metrics: IDL.Func([], [Result_3], ['query']),
        get_monthly_node_provider_rewards: IDL.Func([], [Result_4], []),
        get_most_recent_monthly_node_provider_rewards: IDL.Func(
            [],
            [IDL.Opt(MonthlyNodeProviderRewards)],
            ['query']
        ),
        get_network_economics_parameters: IDL.Func(
            [],
            [NetworkEconomics],
            ['query']
        ),
        get_neuron_ids: IDL.Func([], [IDL.Vec(IDL.Nat64)], ['query']),
        get_neuron_info: IDL.Func([IDL.Nat64], [Result_5], ['query']),
        get_neuron_info_by_id_or_subaccount: IDL.Func(
            [NeuronIdOrSubaccount],
            [Result_5],
            ['query']
        ),
        get_neurons_fund_audit_info: IDL.Func(
            [GetNeuronsFundAuditInfoRequest],
            [GetNeuronsFundAuditInfoResponse],
            ['query']
        ),
        get_node_provider_by_caller: IDL.Func(
            [IDL.Null],
            [Result_7],
            ['query']
        ),
        get_pending_proposals: IDL.Func([], [IDL.Vec(ProposalInfo)], ['query']),
        get_proposal_info: IDL.Func(
            [IDL.Nat64],
            [IDL.Opt(ProposalInfo)],
            ['query']
        ),
        get_restore_aging_summary: IDL.Func(
            [],
            [RestoreAgingSummary],
            ['query']
        ),
        list_known_neurons: IDL.Func([], [ListKnownNeuronsResponse], ['query']),
        list_neurons: IDL.Func([ListNeurons], [ListNeuronsResponse], ['query']),
        list_node_provider_rewards: IDL.Func(
            [ListNodeProviderRewardsRequest],
            [ListNodeProviderRewardsResponse],
            ['query']
        ),
        list_node_providers: IDL.Func(
            [],
            [ListNodeProvidersResponse],
            ['query']
        ),
        list_proposals: IDL.Func(
            [ListProposalInfo],
            [ListProposalInfoResponse],
            ['query']
        ),
        manage_neuron: IDL.Func(
            [ManageNeuronRequest],
            [ManageNeuronResponse],
            []
        ),
        settle_community_fund_participation: IDL.Func(
            [SettleCommunityFundParticipation],
            [Result],
            []
        ),
        settle_neurons_fund_participation: IDL.Func(
            [SettleNeuronsFundParticipationRequest],
            [SettleNeuronsFundParticipationResponse],
            []
        ),
        simulate_manage_neuron: IDL.Func(
            [ManageNeuronRequest],
            [ManageNeuronResponse],
            []
        ),
        transfer_gtc_neuron: IDL.Func([NeuronId, NeuronId], [Result], []),
        update_node_provider: IDL.Func([UpdateNodeProvider], [Result], [])
    });
};
export const init: init = ({ IDL }) => {
    const Proposal = IDL.Rec();
    const NeuronId = IDL.Record({ id: IDL.Nat64 });
    const Followees = IDL.Record({ followees: IDL.Vec(NeuronId) });
    const KnownNeuronData = IDL.Record({
        name: IDL.Text,
        description: IDL.Opt(IDL.Text)
    });
    const KnownNeuron = IDL.Record({
        id: IDL.Opt(NeuronId),
        known_neuron_data: IDL.Opt(KnownNeuronData)
    });
    const Spawn = IDL.Record({
        percentage_to_spawn: IDL.Opt(IDL.Nat32),
        new_controller: IDL.Opt(IDL.Principal),
        nonce: IDL.Opt(IDL.Nat64)
    });
    const Split = IDL.Record({ amount_e8s: IDL.Nat64 });
    const Follow = IDL.Record({
        topic: IDL.Int32,
        followees: IDL.Vec(NeuronId)
    });
    const RefreshVotingPower = IDL.Record({});
    const ClaimOrRefreshNeuronFromAccount = IDL.Record({
        controller: IDL.Opt(IDL.Principal),
        memo: IDL.Nat64
    });
    const By = IDL.Variant({
        NeuronIdOrSubaccount: IDL.Record({}),
        MemoAndController: ClaimOrRefreshNeuronFromAccount,
        Memo: IDL.Nat64
    });
    const ClaimOrRefresh = IDL.Record({ by: IDL.Opt(By) });
    const RemoveHotKey = IDL.Record({
        hot_key_to_remove: IDL.Opt(IDL.Principal)
    });
    const AddHotKey = IDL.Record({ new_hot_key: IDL.Opt(IDL.Principal) });
    const ChangeAutoStakeMaturity = IDL.Record({
        requested_setting_for_auto_stake_maturity: IDL.Bool
    });
    const IncreaseDissolveDelay = IDL.Record({
        additional_dissolve_delay_seconds: IDL.Nat32
    });
    const SetVisibility = IDL.Record({ visibility: IDL.Opt(IDL.Int32) });
    const SetDissolveTimestamp = IDL.Record({
        dissolve_timestamp_seconds: IDL.Nat64
    });
    const Operation = IDL.Variant({
        RemoveHotKey: RemoveHotKey,
        AddHotKey: AddHotKey,
        ChangeAutoStakeMaturity: ChangeAutoStakeMaturity,
        StopDissolving: IDL.Record({}),
        StartDissolving: IDL.Record({}),
        IncreaseDissolveDelay: IncreaseDissolveDelay,
        SetVisibility: SetVisibility,
        JoinCommunityFund: IDL.Record({}),
        LeaveCommunityFund: IDL.Record({}),
        SetDissolveTimestamp: SetDissolveTimestamp
    });
    const Configure = IDL.Record({ operation: IDL.Opt(Operation) });
    const ProposalId = IDL.Record({ id: IDL.Nat64 });
    const RegisterVote = IDL.Record({
        vote: IDL.Int32,
        proposal: IDL.Opt(ProposalId)
    });
    const Merge = IDL.Record({ source_neuron_id: IDL.Opt(NeuronId) });
    const DisburseToNeuron = IDL.Record({
        dissolve_delay_seconds: IDL.Nat64,
        kyc_verified: IDL.Bool,
        amount_e8s: IDL.Nat64,
        new_controller: IDL.Opt(IDL.Principal),
        nonce: IDL.Nat64
    });
    const StakeMaturity = IDL.Record({
        percentage_to_stake: IDL.Opt(IDL.Nat32)
    });
    const MergeMaturity = IDL.Record({ percentage_to_merge: IDL.Nat32 });
    const AccountIdentifier = IDL.Record({ hash: IDL.Vec(IDL.Nat8) });
    const Amount = IDL.Record({ e8s: IDL.Nat64 });
    const Disburse = IDL.Record({
        to_account: IDL.Opt(AccountIdentifier),
        amount: IDL.Opt(Amount)
    });
    const Command = IDL.Variant({
        Spawn: Spawn,
        Split: Split,
        Follow: Follow,
        RefreshVotingPower: RefreshVotingPower,
        ClaimOrRefresh: ClaimOrRefresh,
        Configure: Configure,
        RegisterVote: RegisterVote,
        Merge: Merge,
        DisburseToNeuron: DisburseToNeuron,
        MakeProposal: Proposal,
        StakeMaturity: StakeMaturity,
        MergeMaturity: MergeMaturity,
        Disburse: Disburse
    });
    const NeuronIdOrSubaccount = IDL.Variant({
        Subaccount: IDL.Vec(IDL.Nat8),
        NeuronId: NeuronId
    });
    const ManageNeuron = IDL.Record({
        id: IDL.Opt(NeuronId),
        command: IDL.Opt(Command),
        neuron_id_or_subaccount: IDL.Opt(NeuronIdOrSubaccount)
    });
    const Controllers = IDL.Record({ controllers: IDL.Vec(IDL.Principal) });
    const CanisterSettings = IDL.Record({
        freezing_threshold: IDL.Opt(IDL.Nat64),
        wasm_memory_threshold: IDL.Opt(IDL.Nat64),
        controllers: IDL.Opt(Controllers),
        log_visibility: IDL.Opt(IDL.Int32),
        wasm_memory_limit: IDL.Opt(IDL.Nat64),
        memory_allocation: IDL.Opt(IDL.Nat64),
        compute_allocation: IDL.Opt(IDL.Nat64)
    });
    const UpdateCanisterSettings = IDL.Record({
        canister_id: IDL.Opt(IDL.Principal),
        settings: IDL.Opt(CanisterSettings)
    });
    const InstallCode = IDL.Record({
        skip_stopping_before_installing: IDL.Opt(IDL.Bool),
        wasm_module_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
        canister_id: IDL.Opt(IDL.Principal),
        arg_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
        install_mode: IDL.Opt(IDL.Int32)
    });
    const StopOrStartCanister = IDL.Record({
        action: IDL.Opt(IDL.Int32),
        canister_id: IDL.Opt(IDL.Principal)
    });
    const Percentage = IDL.Record({ basis_points: IDL.Opt(IDL.Nat64) });
    const Duration = IDL.Record({ seconds: IDL.Opt(IDL.Nat64) });
    const Tokens = IDL.Record({ e8s: IDL.Opt(IDL.Nat64) });
    const VotingRewardParameters = IDL.Record({
        reward_rate_transition_duration: IDL.Opt(Duration),
        initial_reward_rate: IDL.Opt(Percentage),
        final_reward_rate: IDL.Opt(Percentage)
    });
    const GovernanceParameters = IDL.Record({
        neuron_maximum_dissolve_delay_bonus: IDL.Opt(Percentage),
        neuron_maximum_age_for_age_bonus: IDL.Opt(Duration),
        neuron_maximum_dissolve_delay: IDL.Opt(Duration),
        neuron_minimum_dissolve_delay_to_vote: IDL.Opt(Duration),
        neuron_maximum_age_bonus: IDL.Opt(Percentage),
        neuron_minimum_stake: IDL.Opt(Tokens),
        proposal_wait_for_quiet_deadline_increase: IDL.Opt(Duration),
        proposal_initial_voting_period: IDL.Opt(Duration),
        proposal_rejection_fee: IDL.Opt(Tokens),
        voting_reward_parameters: IDL.Opt(VotingRewardParameters)
    });
    const Image = IDL.Record({ base64_encoding: IDL.Opt(IDL.Text) });
    const LedgerParameters = IDL.Record({
        transaction_fee: IDL.Opt(Tokens),
        token_symbol: IDL.Opt(IDL.Text),
        token_logo: IDL.Opt(Image),
        token_name: IDL.Opt(IDL.Text)
    });
    const Canister = IDL.Record({ id: IDL.Opt(IDL.Principal) });
    const NeuronBasketConstructionParameters = IDL.Record({
        dissolve_delay_interval: IDL.Opt(Duration),
        count: IDL.Opt(IDL.Nat64)
    });
    const GlobalTimeOfDay = IDL.Record({
        seconds_after_utc_midnight: IDL.Opt(IDL.Nat64)
    });
    const Countries = IDL.Record({ iso_codes: IDL.Vec(IDL.Text) });
    const SwapParameters = IDL.Record({
        minimum_participants: IDL.Opt(IDL.Nat64),
        neurons_fund_participation: IDL.Opt(IDL.Bool),
        duration: IDL.Opt(Duration),
        neuron_basket_construction_parameters: IDL.Opt(
            NeuronBasketConstructionParameters
        ),
        confirmation_text: IDL.Opt(IDL.Text),
        maximum_participant_icp: IDL.Opt(Tokens),
        minimum_icp: IDL.Opt(Tokens),
        minimum_direct_participation_icp: IDL.Opt(Tokens),
        minimum_participant_icp: IDL.Opt(Tokens),
        start_time: IDL.Opt(GlobalTimeOfDay),
        maximum_direct_participation_icp: IDL.Opt(Tokens),
        maximum_icp: IDL.Opt(Tokens),
        neurons_fund_investment_icp: IDL.Opt(Tokens),
        restricted_countries: IDL.Opt(Countries)
    });
    const SwapDistribution = IDL.Record({ total: IDL.Opt(Tokens) });
    const NeuronDistribution = IDL.Record({
        controller: IDL.Opt(IDL.Principal),
        dissolve_delay: IDL.Opt(Duration),
        memo: IDL.Opt(IDL.Nat64),
        vesting_period: IDL.Opt(Duration),
        stake: IDL.Opt(Tokens)
    });
    const DeveloperDistribution = IDL.Record({
        developer_neurons: IDL.Vec(NeuronDistribution)
    });
    const InitialTokenDistribution = IDL.Record({
        treasury_distribution: IDL.Opt(SwapDistribution),
        developer_distribution: IDL.Opt(DeveloperDistribution),
        swap_distribution: IDL.Opt(SwapDistribution)
    });
    const CreateServiceNervousSystem = IDL.Record({
        url: IDL.Opt(IDL.Text),
        governance_parameters: IDL.Opt(GovernanceParameters),
        fallback_controller_principal_ids: IDL.Vec(IDL.Principal),
        logo: IDL.Opt(Image),
        name: IDL.Opt(IDL.Text),
        ledger_parameters: IDL.Opt(LedgerParameters),
        description: IDL.Opt(IDL.Text),
        dapp_canisters: IDL.Vec(Canister),
        swap_parameters: IDL.Opt(SwapParameters),
        initial_token_distribution: IDL.Opt(InitialTokenDistribution)
    });
    const ExecuteNnsFunction = IDL.Record({
        nns_function: IDL.Int32,
        payload: IDL.Vec(IDL.Nat8)
    });
    const NodeProvider = IDL.Record({
        id: IDL.Opt(IDL.Principal),
        reward_account: IDL.Opt(AccountIdentifier)
    });
    const RewardToNeuron = IDL.Record({ dissolve_delay_seconds: IDL.Nat64 });
    const RewardToAccount = IDL.Record({
        to_account: IDL.Opt(AccountIdentifier)
    });
    const RewardMode = IDL.Variant({
        RewardToNeuron: RewardToNeuron,
        RewardToAccount: RewardToAccount
    });
    const RewardNodeProvider = IDL.Record({
        node_provider: IDL.Opt(NodeProvider),
        reward_mode: IDL.Opt(RewardMode),
        amount_e8s: IDL.Nat64
    });
    const NeuronBasketConstructionParameters_1 = IDL.Record({
        dissolve_delay_interval_seconds: IDL.Nat64,
        count: IDL.Nat64
    });
    const Params = IDL.Record({
        min_participant_icp_e8s: IDL.Nat64,
        neuron_basket_construction_parameters: IDL.Opt(
            NeuronBasketConstructionParameters_1
        ),
        max_icp_e8s: IDL.Nat64,
        swap_due_timestamp_seconds: IDL.Nat64,
        min_participants: IDL.Nat32,
        sns_token_e8s: IDL.Nat64,
        sale_delay_seconds: IDL.Opt(IDL.Nat64),
        max_participant_icp_e8s: IDL.Nat64,
        min_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        min_icp_e8s: IDL.Nat64,
        max_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64)
    });
    const OpenSnsTokenSwap = IDL.Record({
        community_fund_investment_e8s: IDL.Opt(IDL.Nat64),
        target_swap_canister_id: IDL.Opt(IDL.Principal),
        params: IDL.Opt(Params)
    });
    const TimeWindow = IDL.Record({
        start_timestamp_seconds: IDL.Nat64,
        end_timestamp_seconds: IDL.Nat64
    });
    const SetOpenTimeWindowRequest = IDL.Record({
        open_time_window: IDL.Opt(TimeWindow)
    });
    const SetSnsTokenSwapOpenTimeWindow = IDL.Record({
        request: IDL.Opt(SetOpenTimeWindowRequest),
        swap_canister_id: IDL.Opt(IDL.Principal)
    });
    const SetDefaultFollowees = IDL.Record({
        default_followees: IDL.Vec(IDL.Tuple(IDL.Int32, Followees))
    });
    const RewardNodeProviders = IDL.Record({
        use_registry_derived_rewards: IDL.Opt(IDL.Bool),
        rewards: IDL.Vec(RewardNodeProvider)
    });
    const VotingPowerEconomics = IDL.Record({
        start_reducing_voting_power_after_seconds: IDL.Opt(IDL.Nat64),
        clear_following_after_seconds: IDL.Opt(IDL.Nat64)
    });
    const Decimal = IDL.Record({ human_readable: IDL.Opt(IDL.Text) });
    const NeuronsFundMatchedFundingCurveCoefficients = IDL.Record({
        contribution_threshold_xdr: IDL.Opt(Decimal),
        one_third_participation_milestone_xdr: IDL.Opt(Decimal),
        full_participation_milestone_xdr: IDL.Opt(Decimal)
    });
    const NeuronsFundEconomics = IDL.Record({
        maximum_icp_xdr_rate: IDL.Opt(Percentage),
        neurons_fund_matched_funding_curve_coefficients: IDL.Opt(
            NeuronsFundMatchedFundingCurveCoefficients
        ),
        max_theoretical_neurons_fund_participation_amount_xdr: IDL.Opt(Decimal),
        minimum_icp_xdr_rate: IDL.Opt(Percentage)
    });
    const NetworkEconomics = IDL.Record({
        neuron_minimum_stake_e8s: IDL.Nat64,
        voting_power_economics: IDL.Opt(VotingPowerEconomics),
        max_proposals_to_keep_per_topic: IDL.Nat32,
        neuron_management_fee_per_proposal_e8s: IDL.Nat64,
        reject_cost_e8s: IDL.Nat64,
        transaction_fee_e8s: IDL.Nat64,
        neuron_spawn_dissolve_delay_seconds: IDL.Nat64,
        minimum_icp_xdr_rate: IDL.Nat64,
        maximum_node_provider_rewards_e8s: IDL.Nat64,
        neurons_fund_economics: IDL.Opt(NeuronsFundEconomics)
    });
    const Principals = IDL.Record({ principals: IDL.Vec(IDL.Principal) });
    const Change = IDL.Variant({
        ToRemove: NodeProvider,
        ToAdd: NodeProvider
    });
    const AddOrRemoveNodeProvider = IDL.Record({ change: IDL.Opt(Change) });
    const Motion = IDL.Record({ motion_text: IDL.Text });
    const Action = IDL.Variant({
        RegisterKnownNeuron: KnownNeuron,
        ManageNeuron: ManageNeuron,
        UpdateCanisterSettings: UpdateCanisterSettings,
        InstallCode: InstallCode,
        StopOrStartCanister: StopOrStartCanister,
        CreateServiceNervousSystem: CreateServiceNervousSystem,
        ExecuteNnsFunction: ExecuteNnsFunction,
        RewardNodeProvider: RewardNodeProvider,
        OpenSnsTokenSwap: OpenSnsTokenSwap,
        SetSnsTokenSwapOpenTimeWindow: SetSnsTokenSwapOpenTimeWindow,
        SetDefaultFollowees: SetDefaultFollowees,
        RewardNodeProviders: RewardNodeProviders,
        ManageNetworkEconomics: NetworkEconomics,
        ApproveGenesisKyc: Principals,
        AddOrRemoveNodeProvider: AddOrRemoveNodeProvider,
        Motion: Motion
    });
    Proposal.fill(
        IDL.Record({
            url: IDL.Text,
            title: IDL.Opt(IDL.Text),
            action: IDL.Opt(Action),
            summary: IDL.Text
        })
    );
    const MakingSnsProposal = IDL.Record({
        proposal: IDL.Opt(Proposal),
        caller: IDL.Opt(IDL.Principal),
        proposer_id: IDL.Opt(NeuronId)
    });
    const XdrConversionRate = IDL.Record({
        xdr_permyriad_per_icp: IDL.Opt(IDL.Nat64),
        timestamp_seconds: IDL.Opt(IDL.Nat64)
    });
    const MonthlyNodeProviderRewards = IDL.Record({
        minimum_xdr_permyriad_per_icp: IDL.Opt(IDL.Nat64),
        registry_version: IDL.Opt(IDL.Nat64),
        node_providers: IDL.Vec(NodeProvider),
        timestamp: IDL.Nat64,
        rewards: IDL.Vec(RewardNodeProvider),
        xdr_conversion_rate: IDL.Opt(XdrConversionRate),
        maximum_node_provider_rewards_e8s: IDL.Opt(IDL.Nat64)
    });
    const NeuronSubsetMetrics = IDL.Record({
        total_maturity_e8s_equivalent: IDL.Opt(IDL.Nat64),
        maturity_e8s_equivalent_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Nat64)
        ),
        voting_power_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
        total_staked_e8s: IDL.Opt(IDL.Nat64),
        count: IDL.Opt(IDL.Nat64),
        deciding_voting_power_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
        total_staked_maturity_e8s_equivalent: IDL.Opt(IDL.Nat64),
        total_potential_voting_power: IDL.Opt(IDL.Nat64),
        total_deciding_voting_power: IDL.Opt(IDL.Nat64),
        staked_maturity_e8s_equivalent_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Nat64)
        ),
        staked_e8s_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
        total_voting_power: IDL.Opt(IDL.Nat64),
        potential_voting_power_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Nat64)
        ),
        count_buckets: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64))
    });
    const GovernanceCachedMetrics = IDL.Record({
        total_maturity_e8s_equivalent: IDL.Nat64,
        not_dissolving_neurons_e8s_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        dissolving_neurons_staked_maturity_e8s_equivalent_sum: IDL.Nat64,
        garbage_collectable_neurons_count: IDL.Nat64,
        dissolving_neurons_staked_maturity_e8s_equivalent_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        neurons_with_invalid_stake_count: IDL.Nat64,
        not_dissolving_neurons_count_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Nat64)
        ),
        ect_neuron_count: IDL.Nat64,
        total_supply_icp: IDL.Nat64,
        neurons_with_less_than_6_months_dissolve_delay_count: IDL.Nat64,
        dissolved_neurons_count: IDL.Nat64,
        community_fund_total_maturity_e8s_equivalent: IDL.Nat64,
        total_staked_e8s_seed: IDL.Nat64,
        total_staked_maturity_e8s_equivalent_ect: IDL.Nat64,
        total_staked_e8s: IDL.Nat64,
        fully_lost_voting_power_neuron_subset_metrics:
            IDL.Opt(NeuronSubsetMetrics),
        not_dissolving_neurons_count: IDL.Nat64,
        total_locked_e8s: IDL.Nat64,
        neurons_fund_total_active_neurons: IDL.Nat64,
        total_voting_power_non_self_authenticating_controller: IDL.Opt(
            IDL.Nat64
        ),
        total_staked_maturity_e8s_equivalent: IDL.Nat64,
        not_dissolving_neurons_e8s_buckets_ect: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        declining_voting_power_neuron_subset_metrics:
            IDL.Opt(NeuronSubsetMetrics),
        total_staked_e8s_ect: IDL.Nat64,
        not_dissolving_neurons_staked_maturity_e8s_equivalent_sum: IDL.Nat64,
        dissolved_neurons_e8s: IDL.Nat64,
        total_staked_e8s_non_self_authenticating_controller: IDL.Opt(IDL.Nat64),
        dissolving_neurons_e8s_buckets_seed: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        neurons_with_less_than_6_months_dissolve_delay_e8s: IDL.Nat64,
        not_dissolving_neurons_staked_maturity_e8s_equivalent_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        dissolving_neurons_count_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Nat64)
        ),
        dissolving_neurons_e8s_buckets_ect: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        non_self_authenticating_controller_neuron_subset_metrics:
            IDL.Opt(NeuronSubsetMetrics),
        dissolving_neurons_count: IDL.Nat64,
        dissolving_neurons_e8s_buckets: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        total_staked_maturity_e8s_equivalent_seed: IDL.Nat64,
        community_fund_total_staked_e8s: IDL.Nat64,
        not_dissolving_neurons_e8s_buckets_seed: IDL.Vec(
            IDL.Tuple(IDL.Nat64, IDL.Float64)
        ),
        public_neuron_subset_metrics: IDL.Opt(NeuronSubsetMetrics),
        timestamp_seconds: IDL.Nat64,
        seed_neuron_count: IDL.Nat64
    });
    const RestoreAgingNeuronGroup = IDL.Record({
        count: IDL.Opt(IDL.Nat64),
        previous_total_stake_e8s: IDL.Opt(IDL.Nat64),
        current_total_stake_e8s: IDL.Opt(IDL.Nat64),
        group_type: IDL.Int32
    });
    const RestoreAgingSummary = IDL.Record({
        groups: IDL.Vec(RestoreAgingNeuronGroup),
        timestamp_seconds: IDL.Opt(IDL.Nat64)
    });
    const RewardEvent = IDL.Record({
        rounds_since_last_distribution: IDL.Opt(IDL.Nat64),
        day_after_genesis: IDL.Nat64,
        actual_timestamp_seconds: IDL.Nat64,
        total_available_e8s_equivalent: IDL.Nat64,
        latest_round_available_e8s_equivalent: IDL.Opt(IDL.Nat64),
        distributed_e8s_equivalent: IDL.Nat64,
        settled_proposals: IDL.Vec(ProposalId)
    });
    const NeuronStakeTransfer = IDL.Record({
        to_subaccount: IDL.Vec(IDL.Nat8),
        neuron_stake_e8s: IDL.Nat64,
        from: IDL.Opt(IDL.Principal),
        memo: IDL.Nat64,
        from_subaccount: IDL.Vec(IDL.Nat8),
        transfer_timestamp: IDL.Nat64,
        block_height: IDL.Nat64
    });
    const Followers = IDL.Record({ followers: IDL.Vec(NeuronId) });
    const FollowersMap = IDL.Record({
        followers_map: IDL.Vec(IDL.Tuple(IDL.Nat64, Followers))
    });
    const Progress = IDL.Variant({ LastNeuronId: NeuronId });
    const Migration = IDL.Record({
        status: IDL.Opt(IDL.Int32),
        failure_reason: IDL.Opt(IDL.Text),
        progress: IDL.Opt(Progress)
    });
    const Migrations = IDL.Record({
        neuron_indexes_migration: IDL.Opt(Migration),
        copy_inactive_neurons_to_stable_memory_migration: IDL.Opt(Migration)
    });
    const GovernanceError = IDL.Record({
        error_message: IDL.Text,
        error_type: IDL.Int32
    });
    const Ballot = IDL.Record({ vote: IDL.Int32, voting_power: IDL.Nat64 });
    const SwapParticipationLimits = IDL.Record({
        min_participant_icp_e8s: IDL.Opt(IDL.Nat64),
        max_participant_icp_e8s: IDL.Opt(IDL.Nat64),
        min_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        max_direct_participation_icp_e8s: IDL.Opt(IDL.Nat64)
    });
    const NeuronsFundNeuronPortion = IDL.Record({
        controller: IDL.Opt(IDL.Principal),
        hotkeys: IDL.Vec(IDL.Principal),
        is_capped: IDL.Opt(IDL.Bool),
        maturity_equivalent_icp_e8s: IDL.Opt(IDL.Nat64),
        nns_neuron_id: IDL.Opt(NeuronId),
        amount_icp_e8s: IDL.Opt(IDL.Nat64)
    });
    const NeuronsFundSnapshot = IDL.Record({
        neurons_fund_neuron_portions: IDL.Vec(NeuronsFundNeuronPortion)
    });
    const IdealMatchedParticipationFunction = IDL.Record({
        serialized_representation: IDL.Opt(IDL.Text)
    });
    const NeuronsFundParticipation = IDL.Record({
        total_maturity_equivalent_icp_e8s: IDL.Opt(IDL.Nat64),
        intended_neurons_fund_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        direct_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        swap_participation_limits: IDL.Opt(SwapParticipationLimits),
        max_neurons_fund_swap_participation_icp_e8s: IDL.Opt(IDL.Nat64),
        neurons_fund_reserves: IDL.Opt(NeuronsFundSnapshot),
        ideal_matched_participation_function: IDL.Opt(
            IdealMatchedParticipationFunction
        ),
        allocated_neurons_fund_participation_icp_e8s: IDL.Opt(IDL.Nat64)
    });
    const NeuronsFundData = IDL.Record({
        final_neurons_fund_participation: IDL.Opt(NeuronsFundParticipation),
        initial_neurons_fund_participation: IDL.Opt(NeuronsFundParticipation),
        neurons_fund_refunds: IDL.Opt(NeuronsFundSnapshot)
    });
    const CanisterStatusResultV2 = IDL.Record({
        status: IDL.Opt(IDL.Int32),
        freezing_threshold: IDL.Opt(IDL.Nat64),
        controllers: IDL.Vec(IDL.Principal),
        memory_size: IDL.Opt(IDL.Nat64),
        cycles: IDL.Opt(IDL.Nat64),
        idle_cycles_burned_per_day: IDL.Opt(IDL.Nat64),
        module_hash: IDL.Vec(IDL.Nat8)
    });
    const CanisterSummary = IDL.Record({
        status: IDL.Opt(CanisterStatusResultV2),
        canister_id: IDL.Opt(IDL.Principal)
    });
    const SwapBackgroundInformation = IDL.Record({
        ledger_index_canister_summary: IDL.Opt(CanisterSummary),
        fallback_controller_principal_ids: IDL.Vec(IDL.Principal),
        ledger_archive_canister_summaries: IDL.Vec(CanisterSummary),
        ledger_canister_summary: IDL.Opt(CanisterSummary),
        swap_canister_summary: IDL.Opt(CanisterSummary),
        governance_canister_summary: IDL.Opt(CanisterSummary),
        root_canister_summary: IDL.Opt(CanisterSummary),
        dapp_canister_summaries: IDL.Vec(CanisterSummary)
    });
    const DerivedProposalInformation = IDL.Record({
        swap_background_information: IDL.Opt(SwapBackgroundInformation)
    });
    const Tally = IDL.Record({
        no: IDL.Nat64,
        yes: IDL.Nat64,
        total: IDL.Nat64,
        timestamp_seconds: IDL.Nat64
    });
    const WaitForQuietState = IDL.Record({
        current_deadline_timestamp_seconds: IDL.Nat64
    });
    const ProposalData = IDL.Record({
        id: IDL.Opt(ProposalId),
        failure_reason: IDL.Opt(GovernanceError),
        ballots: IDL.Vec(IDL.Tuple(IDL.Nat64, Ballot)),
        proposal_timestamp_seconds: IDL.Nat64,
        reward_event_round: IDL.Nat64,
        failed_timestamp_seconds: IDL.Nat64,
        neurons_fund_data: IDL.Opt(NeuronsFundData),
        reject_cost_e8s: IDL.Nat64,
        derived_proposal_information: IDL.Opt(DerivedProposalInformation),
        latest_tally: IDL.Opt(Tally),
        total_potential_voting_power: IDL.Opt(IDL.Nat64),
        sns_token_swap_lifecycle: IDL.Opt(IDL.Int32),
        decided_timestamp_seconds: IDL.Nat64,
        proposal: IDL.Opt(Proposal),
        proposer: IDL.Opt(NeuronId),
        wait_for_quiet_state: IDL.Opt(WaitForQuietState),
        executed_timestamp_seconds: IDL.Nat64,
        original_total_community_fund_maturity_e8s_equivalent: IDL.Opt(
            IDL.Nat64
        )
    });
    const Command_2 = IDL.Variant({
        Spawn: NeuronId,
        Split: Split,
        Configure: Configure,
        Merge: Merge,
        DisburseToNeuron: DisburseToNeuron,
        SyncCommand: IDL.Record({}),
        ClaimOrRefreshNeuron: ClaimOrRefresh,
        MergeMaturity: MergeMaturity,
        Disburse: Disburse
    });
    const NeuronInFlightCommand = IDL.Record({
        command: IDL.Opt(Command_2),
        timestamp: IDL.Nat64
    });
    const BallotInfo = IDL.Record({
        vote: IDL.Int32,
        proposal_id: IDL.Opt(ProposalId)
    });
    const DissolveState = IDL.Variant({
        DissolveDelaySeconds: IDL.Nat64,
        WhenDissolvedTimestampSeconds: IDL.Nat64
    });
    const Neuron = IDL.Record({
        id: IDL.Opt(NeuronId),
        staked_maturity_e8s_equivalent: IDL.Opt(IDL.Nat64),
        controller: IDL.Opt(IDL.Principal),
        recent_ballots: IDL.Vec(BallotInfo),
        voting_power_refreshed_timestamp_seconds: IDL.Opt(IDL.Nat64),
        kyc_verified: IDL.Bool,
        potential_voting_power: IDL.Opt(IDL.Nat64),
        neuron_type: IDL.Opt(IDL.Int32),
        not_for_profit: IDL.Bool,
        maturity_e8s_equivalent: IDL.Nat64,
        deciding_voting_power: IDL.Opt(IDL.Nat64),
        cached_neuron_stake_e8s: IDL.Nat64,
        created_timestamp_seconds: IDL.Nat64,
        auto_stake_maturity: IDL.Opt(IDL.Bool),
        aging_since_timestamp_seconds: IDL.Nat64,
        hot_keys: IDL.Vec(IDL.Principal),
        account: IDL.Vec(IDL.Nat8),
        joined_community_fund_timestamp_seconds: IDL.Opt(IDL.Nat64),
        dissolve_state: IDL.Opt(DissolveState),
        followees: IDL.Vec(IDL.Tuple(IDL.Int32, Followees)),
        neuron_fees_e8s: IDL.Nat64,
        visibility: IDL.Opt(IDL.Int32),
        transfer: IDL.Opt(NeuronStakeTransfer),
        known_neuron_data: IDL.Opt(KnownNeuronData),
        spawn_at_timestamp_seconds: IDL.Opt(IDL.Nat64)
    });
    const Governance = IDL.Record({
        default_followees: IDL.Vec(IDL.Tuple(IDL.Int32, Followees)),
        making_sns_proposal: IDL.Opt(MakingSnsProposal),
        most_recent_monthly_node_provider_rewards: IDL.Opt(
            MonthlyNodeProviderRewards
        ),
        maturity_modulation_last_updated_at_timestamp_seconds: IDL.Opt(
            IDL.Nat64
        ),
        wait_for_quiet_threshold_seconds: IDL.Nat64,
        metrics: IDL.Opt(GovernanceCachedMetrics),
        neuron_management_voting_period_seconds: IDL.Opt(IDL.Nat64),
        node_providers: IDL.Vec(NodeProvider),
        cached_daily_maturity_modulation_basis_points: IDL.Opt(IDL.Int32),
        economics: IDL.Opt(NetworkEconomics),
        restore_aging_summary: IDL.Opt(RestoreAgingSummary),
        spawning_neurons: IDL.Opt(IDL.Bool),
        latest_reward_event: IDL.Opt(RewardEvent),
        to_claim_transfers: IDL.Vec(NeuronStakeTransfer),
        short_voting_period_seconds: IDL.Nat64,
        topic_followee_index: IDL.Vec(IDL.Tuple(IDL.Int32, FollowersMap)),
        migrations: IDL.Opt(Migrations),
        proposals: IDL.Vec(IDL.Tuple(IDL.Nat64, ProposalData)),
        xdr_conversion_rate: IDL.Opt(XdrConversionRate),
        in_flight_commands: IDL.Vec(
            IDL.Tuple(IDL.Nat64, NeuronInFlightCommand)
        ),
        neurons: IDL.Vec(IDL.Tuple(IDL.Nat64, Neuron)),
        genesis_timestamp_seconds: IDL.Nat64
    });
    return [Governance];
};

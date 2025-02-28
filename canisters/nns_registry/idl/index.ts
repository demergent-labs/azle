import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
export interface AddApiBoundaryNodesPayload {
    version: string;
    node_ids: Array<Principal>;
}
export interface AddFirewallRulesPayload {
    expected_hash: string;
    scope: FirewallRulesScope;
    positions: Int32Array | number[];
    rules: Array<FirewallRule>;
}
export interface AddNodeOperatorPayload {
    ipv6: [] | [string];
    node_operator_principal_id: [] | [Principal];
    node_allowance: bigint;
    rewardable_nodes: Array<[string, number]>;
    node_provider_principal_id: [] | [Principal];
    dc_id: string;
}
export interface AddNodePayload {
    prometheus_metrics_endpoint: string;
    http_endpoint: string;
    idkg_dealing_encryption_pk: [] | [Uint8Array | number[]];
    domain: [] | [string];
    public_ipv4_config: [] | [IPv4Config];
    xnet_endpoint: string;
    chip_id: [] | [Uint8Array | number[]];
    committee_signing_pk: Uint8Array | number[];
    node_reward_type: [] | [string];
    node_signing_pk: Uint8Array | number[];
    transport_tls_cert: Uint8Array | number[];
    ni_dkg_dealing_encryption_pk: Uint8Array | number[];
    p2p_flow_endpoints: Array<string>;
}
export interface AddNodesToSubnetPayload {
    subnet_id: Principal;
    node_ids: Array<Principal>;
}
export interface AddOrRemoveDataCentersProposalPayload {
    data_centers_to_add: Array<DataCenterRecord>;
    data_centers_to_remove: Array<string>;
}
export interface ApiBoundaryNodeIdRecord {
    id: [] | [Principal];
}
export interface CanisterIdRange {
    end: Principal;
    start: Principal;
}
export interface ChainKeyConfig {
    signature_request_timeout_ns: [] | [bigint];
    key_configs: Array<KeyConfig>;
    idkg_key_rotation_period_ms: [] | [bigint];
}
export interface ChangeSubnetMembershipPayload {
    node_ids_add: Array<Principal>;
    subnet_id: Principal;
    node_ids_remove: Array<Principal>;
}
export interface CompleteCanisterMigrationPayload {
    canister_id_ranges: Array<CanisterIdRange>;
    migration_trace: Array<Principal>;
}
export interface CreateSubnetPayload {
    unit_delay_millis: bigint;
    features: SubnetFeatures;
    gossip_registry_poll_period_ms: number;
    max_ingress_bytes_per_message: bigint;
    dkg_dealings_per_block: bigint;
    max_block_payload_size: bigint;
    start_as_nns: boolean;
    is_halted: boolean;
    gossip_pfn_evaluation_period_ms: number;
    max_ingress_messages_per_block: bigint;
    max_number_of_canisters: bigint;
    gossip_max_artifact_streams_per_peer: number;
    replica_version_id: string;
    gossip_max_duplicity: number;
    gossip_max_chunk_wait_ms: number;
    dkg_interval_length: bigint;
    subnet_id_override: [] | [Principal];
    ssh_backup_access: Array<string>;
    ingress_bytes_per_block_soft_cap: bigint;
    initial_notary_delay_millis: bigint;
    chain_key_config: [] | [InitialChainKeyConfig];
    gossip_max_chunk_size: number;
    subnet_type: SubnetType;
    ssh_readonly_access: Array<string>;
    gossip_retransmission_request_ms: number;
    gossip_receive_check_cache_size: number;
    node_ids: Array<Principal>;
}
export interface DataCenterRecord {
    id: string;
    gps: [] | [Gps];
    region: string;
    owner: string;
}
export interface DeployGuestosToAllSubnetNodesPayload {
    subnet_id: Principal;
    replica_version_id: string;
}
export interface DeployGuestosToAllUnassignedNodesPayload {
    elected_replica_version: string;
}
export interface DeployGuestosToSomeApiBoundaryNodes {
    version: string;
    node_ids: Array<Principal>;
}
export interface DeployHostosToSomeNodes {
    hostos_version_id: [] | [string];
    node_ids: Array<Principal>;
}
export interface EcdsaConfig {
    quadruples_to_create_in_advance: number;
    max_queue_size: [] | [number];
    key_ids: Array<EcdsaKeyId>;
    signature_request_timeout_ns: [] | [bigint];
    idkg_key_rotation_period_ms: [] | [bigint];
}
export type EcdsaCurve = { secp256k1: null };
export interface EcdsaInitialConfig {
    quadruples_to_create_in_advance: number;
    max_queue_size: [] | [number];
    keys: Array<EcdsaKeyRequest>;
    signature_request_timeout_ns: [] | [bigint];
    idkg_key_rotation_period_ms: [] | [bigint];
}
export interface EcdsaKeyId {
    name: string;
    curve: EcdsaCurve;
}
export interface EcdsaKeyRequest {
    key_id: EcdsaKeyId;
    subnet_id: [] | [Principal];
}
export interface FirewallRule {
    ipv4_prefixes: Array<string>;
    direction: [] | [number];
    action: number;
    user: [] | [string];
    comment: string;
    ipv6_prefixes: Array<string>;
    ports: Uint32Array | number[];
}
export type FirewallRulesScope =
    | { Node: Principal }
    | { ReplicaNodes: null }
    | { ApiBoundaryNodes: null }
    | { Subnet: Principal }
    | { Global: null };
export type GetApiBoundaryNodeIdsRequest = {};
export type GetApiBoundaryNodeIdsResponse =
    | {
          Ok: Array<ApiBoundaryNodeIdRecord>;
      }
    | { Err: string };
export type GetNodeOperatorsAndDcsOfNodeProviderResponse =
    | {
          Ok: Array<[DataCenterRecord, NodeOperatorRecord]>;
      }
    | { Err: string };
export type GetNodeProvidersMonthlyXdrRewardsResponse =
    | {
          Ok: NodeProvidersMonthlyXdrRewards;
      }
    | { Err: string };
export interface GetSubnetForCanisterRequest {
    principal: [] | [Principal];
}
export type GetSubnetForCanisterResponse =
    | {
          Ok: { subnet_id: [] | [Principal] };
      }
    | { Err: string };
export interface Gps {
    latitude: number;
    longitude: number;
}
export interface IPv4Config {
    prefix_length: number;
    gateway_ip_addr: string;
    ip_addr: string;
}
export interface InitialChainKeyConfig {
    signature_request_timeout_ns: [] | [bigint];
    key_configs: Array<KeyConfigRequest>;
    idkg_key_rotation_period_ms: [] | [bigint];
}
export interface KeyConfig {
    max_queue_size: [] | [number];
    key_id: [] | [MasterPublicKeyId];
    pre_signatures_to_create_in_advance: [] | [number];
}
export interface KeyConfigRequest {
    subnet_id: [] | [Principal];
    key_config: [] | [KeyConfig];
}
export type MasterPublicKeyId =
    | { Schnorr: SchnorrKeyId }
    | { VetKd: VetKdKeyId }
    | { Ecdsa: EcdsaKeyId };
export interface NodeOperatorPrincipals {
    principals: Array<Principal>;
}
export interface NodeOperatorRecord {
    ipv6: [] | [string];
    node_operator_principal_id: Uint8Array | number[];
    node_allowance: bigint;
    rewardable_nodes: Array<[string, number]>;
    node_provider_principal_id: Uint8Array | number[];
    dc_id: string;
}
export interface NodeProvidersMonthlyXdrRewards {
    registry_version: [] | [bigint];
    rewards: Array<[string, bigint]>;
}
export interface NodeRewardRate {
    xdr_permyriad_per_node_per_month: bigint;
    reward_coefficient_percent: [] | [number];
}
export interface NodeRewardRates {
    rates: Array<[string, NodeRewardRate]>;
}
export interface PrepareCanisterMigrationPayload {
    canister_id_ranges: Array<CanisterIdRange>;
    source_subnet: Principal;
    destination_subnet: Principal;
}
export interface RecoverSubnetPayload {
    height: bigint;
    replacement_nodes: [] | [Array<Principal>];
    subnet_id: Principal;
    registry_store_uri: [] | [[string, string, bigint]];
    state_hash: Uint8Array | number[];
    chain_key_config: [] | [InitialChainKeyConfig];
    time_ns: bigint;
}
export interface RemoveApiBoundaryNodesPayload {
    node_ids: Array<Principal>;
}
export interface RemoveFirewallRulesPayload {
    expected_hash: string;
    scope: FirewallRulesScope;
    positions: Int32Array | number[];
}
export interface RemoveNodeDirectlyPayload {
    node_id: Principal;
}
export interface RemoveNodeOperatorsPayload {
    node_operator_principals_to_remove: [] | [NodeOperatorPrincipals];
    node_operators_to_remove: Array<Uint8Array | number[]>;
}
export interface RemoveNodesFromSubnetPayload {
    node_ids: Array<Principal>;
}
export interface RemoveNodesPayload {
    node_ids: Array<Principal>;
}
export interface RerouteCanisterRangesPayload {
    source_subnet: Principal;
    reassigned_canister_ranges: Array<CanisterIdRange>;
    destination_subnet: Principal;
}
export interface ReviseElectedGuestosVersionsPayload {
    release_package_urls: Array<string>;
    replica_versions_to_unelect: Array<string>;
    replica_version_to_elect: [] | [string];
    guest_launch_measurement_sha256_hex: [] | [string];
    release_package_sha256_hex: [] | [string];
}
export interface ReviseElectedHostosVersionsPayload {
    release_package_urls: Array<string>;
    hostos_version_to_elect: [] | [string];
    hostos_versions_to_unelect: Array<string>;
    release_package_sha256_hex: [] | [string];
}
export type SchnorrAlgorithm = { ed25519: null } | { bip340secp256k1: null };
export interface SchnorrKeyId {
    algorithm: SchnorrAlgorithm;
    name: string;
}
export interface SetFirewallConfigPayload {
    ipv4_prefixes: Array<string>;
    firewall_config: string;
    ipv6_prefixes: Array<string>;
}
export interface SubnetFeatures {
    canister_sandboxing: boolean;
    http_requests: boolean;
    sev_enabled: [] | [boolean];
}
export type SubnetType =
    | { application: null }
    | { verified_application: null }
    | { system: null };
export interface UpdateApiBoundaryNodesVersionPayload {
    version: string;
    node_ids: Array<Principal>;
}
export interface UpdateElectedHostosVersionsPayload {
    release_package_urls: Array<string>;
    hostos_version_to_elect: [] | [string];
    hostos_versions_to_unelect: Array<string>;
    release_package_sha256_hex: [] | [string];
}
export interface UpdateFirewallRulesPayload {
    expected_hash: string;
    scope: FirewallRulesScope;
    positions: Int32Array | number[];
    rules: Array<FirewallRule>;
}
export interface UpdateNodeDirectlyPayload {
    idkg_dealing_encryption_pk: [] | [Uint8Array | number[]];
}
export interface UpdateNodeDomainDirectlyPayload {
    node_id: Principal;
    domain: [] | [string];
}
export type UpdateNodeDomainDirectlyResponse = { Ok: null } | { Err: string };
export interface UpdateNodeIPv4ConfigDirectlyPayload {
    ipv4_config: [] | [IPv4Config];
    node_id: Principal;
}
export type UpdateNodeIpv4ConfigDirectlyResponse =
    | { Ok: null }
    | { Err: string };
export interface UpdateNodeOperatorConfigDirectlyPayload {
    node_operator_id: [] | [Principal];
    node_provider_id: [] | [Principal];
}
export interface UpdateNodeOperatorConfigPayload {
    node_operator_id: [] | [Principal];
    set_ipv6_to_none: [] | [boolean];
    ipv6: [] | [string];
    node_provider_id: [] | [Principal];
    node_allowance: [] | [bigint];
    rewardable_nodes: Array<[string, number]>;
    dc_id: [] | [string];
}
export interface UpdateNodeRewardsTableProposalPayload {
    new_entries: Array<[string, NodeRewardRates]>;
}
export interface UpdateNodesHostosVersionPayload {
    hostos_version_id: [] | [string];
    node_ids: Array<Principal>;
}
export interface UpdateSshReadOnlyAccessForAllUnassignedNodesPayload {
    ssh_readonly_keys: Array<string>;
}
export interface UpdateSubnetPayload {
    unit_delay_millis: [] | [bigint];
    max_duplicity: [] | [number];
    features: [] | [SubnetFeatures];
    set_gossip_config_to_default: boolean;
    halt_at_cup_height: [] | [boolean];
    pfn_evaluation_period_ms: [] | [number];
    subnet_id: Principal;
    max_ingress_bytes_per_message: [] | [bigint];
    dkg_dealings_per_block: [] | [bigint];
    max_block_payload_size: [] | [bigint];
    start_as_nns: [] | [boolean];
    is_halted: [] | [boolean];
    chain_key_signing_enable: [] | [Array<MasterPublicKeyId>];
    max_ingress_messages_per_block: [] | [bigint];
    max_number_of_canisters: [] | [bigint];
    retransmission_request_ms: [] | [number];
    dkg_interval_length: [] | [bigint];
    registry_poll_period_ms: [] | [number];
    max_chunk_wait_ms: [] | [number];
    receive_check_cache_size: [] | [number];
    ssh_backup_access: [] | [Array<string>];
    max_chunk_size: [] | [number];
    initial_notary_delay_millis: [] | [bigint];
    chain_key_config: [] | [ChainKeyConfig];
    max_artifact_streams_per_peer: [] | [number];
    subnet_type: [] | [SubnetType];
    ssh_readonly_access: [] | [Array<string>];
    chain_key_signing_disable: [] | [Array<MasterPublicKeyId>];
}
export interface UpdateUnassignedNodesConfigPayload {
    replica_version: [] | [string];
    ssh_readonly_access: [] | [Array<string>];
}
export type VetKdCurve = { bls12_381_g2: null };
export interface VetKdKeyId {
    name: string;
    curve: VetKdCurve;
}
export interface _SERVICE {
    add_api_boundary_nodes: ActorMethod<
        [AddApiBoundaryNodesPayload],
        undefined
    >;
    add_firewall_rules: ActorMethod<[AddFirewallRulesPayload], undefined>;
    add_node: ActorMethod<[AddNodePayload], Principal>;
    add_node_operator: ActorMethod<[AddNodeOperatorPayload], undefined>;
    add_nodes_to_subnet: ActorMethod<[AddNodesToSubnetPayload], undefined>;
    add_or_remove_data_centers: ActorMethod<
        [AddOrRemoveDataCentersProposalPayload],
        undefined
    >;
    change_subnet_membership: ActorMethod<
        [ChangeSubnetMembershipPayload],
        undefined
    >;
    clear_provisional_whitelist: ActorMethod<[], undefined>;
    complete_canister_migration: ActorMethod<
        [CompleteCanisterMigrationPayload],
        undefined
    >;
    create_subnet: ActorMethod<[CreateSubnetPayload], undefined>;
    deploy_guestos_to_all_subnet_nodes: ActorMethod<
        [DeployGuestosToAllSubnetNodesPayload],
        undefined
    >;
    deploy_guestos_to_all_unassigned_nodes: ActorMethod<
        [DeployGuestosToAllUnassignedNodesPayload],
        undefined
    >;
    deploy_guestos_to_some_api_boundary_nodes: ActorMethod<
        [DeployGuestosToSomeApiBoundaryNodes],
        undefined
    >;
    deploy_hostos_to_some_nodes: ActorMethod<
        [DeployHostosToSomeNodes],
        undefined
    >;
    get_api_boundary_node_ids: ActorMethod<
        [GetApiBoundaryNodeIdsRequest],
        GetApiBoundaryNodeIdsResponse
    >;
    get_build_metadata: ActorMethod<[], string>;
    get_node_operators_and_dcs_of_node_provider: ActorMethod<
        [Principal],
        GetNodeOperatorsAndDcsOfNodeProviderResponse
    >;
    get_node_providers_monthly_xdr_rewards: ActorMethod<
        [],
        GetNodeProvidersMonthlyXdrRewardsResponse
    >;
    get_subnet_for_canister: ActorMethod<
        [GetSubnetForCanisterRequest],
        GetSubnetForCanisterResponse
    >;
    prepare_canister_migration: ActorMethod<
        [PrepareCanisterMigrationPayload],
        undefined
    >;
    recover_subnet: ActorMethod<[RecoverSubnetPayload], undefined>;
    remove_api_boundary_nodes: ActorMethod<
        [RemoveApiBoundaryNodesPayload],
        undefined
    >;
    remove_firewall_rules: ActorMethod<[RemoveFirewallRulesPayload], undefined>;
    remove_node_directly: ActorMethod<[RemoveNodeDirectlyPayload], undefined>;
    remove_node_operators: ActorMethod<[RemoveNodeOperatorsPayload], undefined>;
    remove_nodes: ActorMethod<[RemoveNodesPayload], undefined>;
    remove_nodes_from_subnet: ActorMethod<[RemoveNodesPayload], undefined>;
    reroute_canister_ranges: ActorMethod<
        [RerouteCanisterRangesPayload],
        undefined
    >;
    revise_elected_guestos_versions: ActorMethod<
        [ReviseElectedGuestosVersionsPayload],
        undefined
    >;
    revise_elected_hostos_versions: ActorMethod<
        [ReviseElectedHostosVersionsPayload],
        undefined
    >;
    revise_elected_replica_versions: ActorMethod<
        [ReviseElectedGuestosVersionsPayload],
        undefined
    >;
    set_firewall_config: ActorMethod<[SetFirewallConfigPayload], undefined>;
    update_api_boundary_nodes_version: ActorMethod<
        [UpdateApiBoundaryNodesVersionPayload],
        undefined
    >;
    update_elected_hostos_versions: ActorMethod<
        [UpdateElectedHostosVersionsPayload],
        undefined
    >;
    update_firewall_rules: ActorMethod<[UpdateFirewallRulesPayload], undefined>;
    update_node_directly: ActorMethod<[UpdateNodeDirectlyPayload], undefined>;
    update_node_domain_directly: ActorMethod<
        [UpdateNodeDomainDirectlyPayload],
        UpdateNodeDomainDirectlyResponse
    >;
    update_node_ipv4_config_directly: ActorMethod<
        [UpdateNodeIPv4ConfigDirectlyPayload],
        UpdateNodeIpv4ConfigDirectlyResponse
    >;
    update_node_operator_config: ActorMethod<
        [UpdateNodeOperatorConfigPayload],
        undefined
    >;
    update_node_operator_config_directly: ActorMethod<
        [UpdateNodeOperatorConfigDirectlyPayload],
        undefined
    >;
    update_node_rewards_table: ActorMethod<
        [UpdateNodeRewardsTableProposalPayload],
        undefined
    >;
    update_nodes_hostos_version: ActorMethod<
        [UpdateNodesHostosVersionPayload],
        undefined
    >;
    update_ssh_readonly_access_for_all_unassigned_nodes: ActorMethod<
        [UpdateSshReadOnlyAccessForAllUnassignedNodesPayload],
        undefined
    >;
    update_subnet: ActorMethod<[UpdateSubnetPayload], undefined>;
    update_unassigned_nodes_config: ActorMethod<
        [UpdateUnassignedNodesConfigPayload],
        undefined
    >;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const AddApiBoundaryNodesPayload = IDL.Record({
    version: IDL.Text,
    node_ids: IDL.Vec(IDL.Principal)
});
export const FirewallRulesScope = IDL.Variant({
    Node: IDL.Principal,
    ReplicaNodes: IDL.Null,
    ApiBoundaryNodes: IDL.Null,
    Subnet: IDL.Principal,
    Global: IDL.Null
});
export const FirewallRule = IDL.Record({
    ipv4_prefixes: IDL.Vec(IDL.Text),
    direction: IDL.Opt(IDL.Int32),
    action: IDL.Int32,
    user: IDL.Opt(IDL.Text),
    comment: IDL.Text,
    ipv6_prefixes: IDL.Vec(IDL.Text),
    ports: IDL.Vec(IDL.Nat32)
});
export const AddFirewallRulesPayload = IDL.Record({
    expected_hash: IDL.Text,
    scope: FirewallRulesScope,
    positions: IDL.Vec(IDL.Int32),
    rules: IDL.Vec(FirewallRule)
});
export const IPv4Config = IDL.Record({
    prefix_length: IDL.Nat32,
    gateway_ip_addr: IDL.Text,
    ip_addr: IDL.Text
});
export const AddNodePayload = IDL.Record({
    prometheus_metrics_endpoint: IDL.Text,
    http_endpoint: IDL.Text,
    idkg_dealing_encryption_pk: IDL.Opt(IDL.Vec(IDL.Nat8)),
    domain: IDL.Opt(IDL.Text),
    public_ipv4_config: IDL.Opt(IPv4Config),
    xnet_endpoint: IDL.Text,
    chip_id: IDL.Opt(IDL.Vec(IDL.Nat8)),
    committee_signing_pk: IDL.Vec(IDL.Nat8),
    node_reward_type: IDL.Opt(IDL.Text),
    node_signing_pk: IDL.Vec(IDL.Nat8),
    transport_tls_cert: IDL.Vec(IDL.Nat8),
    ni_dkg_dealing_encryption_pk: IDL.Vec(IDL.Nat8),
    p2p_flow_endpoints: IDL.Vec(IDL.Text)
});
export const AddNodeOperatorPayload = IDL.Record({
    ipv6: IDL.Opt(IDL.Text),
    node_operator_principal_id: IDL.Opt(IDL.Principal),
    node_allowance: IDL.Nat64,
    rewardable_nodes: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat32)),
    node_provider_principal_id: IDL.Opt(IDL.Principal),
    dc_id: IDL.Text
});
export const AddNodesToSubnetPayload = IDL.Record({
    subnet_id: IDL.Principal,
    node_ids: IDL.Vec(IDL.Principal)
});
export const Gps = IDL.Record({
    latitude: IDL.Float32,
    longitude: IDL.Float32
});
export const DataCenterRecord = IDL.Record({
    id: IDL.Text,
    gps: IDL.Opt(Gps),
    region: IDL.Text,
    owner: IDL.Text
});
export const AddOrRemoveDataCentersProposalPayload = IDL.Record({
    data_centers_to_add: IDL.Vec(DataCenterRecord),
    data_centers_to_remove: IDL.Vec(IDL.Text)
});
export const ChangeSubnetMembershipPayload = IDL.Record({
    node_ids_add: IDL.Vec(IDL.Principal),
    subnet_id: IDL.Principal,
    node_ids_remove: IDL.Vec(IDL.Principal)
});
export const CanisterIdRange = IDL.Record({
    end: IDL.Principal,
    start: IDL.Principal
});
export const CompleteCanisterMigrationPayload = IDL.Record({
    canister_id_ranges: IDL.Vec(CanisterIdRange),
    migration_trace: IDL.Vec(IDL.Principal)
});
export const SubnetFeatures = IDL.Record({
    canister_sandboxing: IDL.Bool,
    http_requests: IDL.Bool,
    sev_enabled: IDL.Opt(IDL.Bool)
});
export const SchnorrAlgorithm = IDL.Variant({
    ed25519: IDL.Null,
    bip340secp256k1: IDL.Null
});
export const SchnorrKeyId = IDL.Record({
    algorithm: SchnorrAlgorithm,
    name: IDL.Text
});
export const VetKdCurve = IDL.Variant({ bls12_381_g2: IDL.Null });
export const VetKdKeyId = IDL.Record({
    name: IDL.Text,
    curve: VetKdCurve
});
export const EcdsaCurve = IDL.Variant({ secp256k1: IDL.Null });
export const EcdsaKeyId = IDL.Record({
    name: IDL.Text,
    curve: EcdsaCurve
});
export const MasterPublicKeyId = IDL.Variant({
    Schnorr: SchnorrKeyId,
    VetKd: VetKdKeyId,
    Ecdsa: EcdsaKeyId
});
export const KeyConfig = IDL.Record({
    max_queue_size: IDL.Opt(IDL.Nat32),
    key_id: IDL.Opt(MasterPublicKeyId),
    pre_signatures_to_create_in_advance: IDL.Opt(IDL.Nat32)
});
export const KeyConfigRequest = IDL.Record({
    subnet_id: IDL.Opt(IDL.Principal),
    key_config: IDL.Opt(KeyConfig)
});
export const InitialChainKeyConfig = IDL.Record({
    signature_request_timeout_ns: IDL.Opt(IDL.Nat64),
    key_configs: IDL.Vec(KeyConfigRequest),
    idkg_key_rotation_period_ms: IDL.Opt(IDL.Nat64)
});
export const SubnetType = IDL.Variant({
    application: IDL.Null,
    verified_application: IDL.Null,
    system: IDL.Null
});
export const CreateSubnetPayload = IDL.Record({
    unit_delay_millis: IDL.Nat64,
    features: SubnetFeatures,
    gossip_registry_poll_period_ms: IDL.Nat32,
    max_ingress_bytes_per_message: IDL.Nat64,
    dkg_dealings_per_block: IDL.Nat64,
    max_block_payload_size: IDL.Nat64,
    start_as_nns: IDL.Bool,
    is_halted: IDL.Bool,
    gossip_pfn_evaluation_period_ms: IDL.Nat32,
    max_ingress_messages_per_block: IDL.Nat64,
    max_number_of_canisters: IDL.Nat64,
    gossip_max_artifact_streams_per_peer: IDL.Nat32,
    replica_version_id: IDL.Text,
    gossip_max_duplicity: IDL.Nat32,
    gossip_max_chunk_wait_ms: IDL.Nat32,
    dkg_interval_length: IDL.Nat64,
    subnet_id_override: IDL.Opt(IDL.Principal),
    ssh_backup_access: IDL.Vec(IDL.Text),
    ingress_bytes_per_block_soft_cap: IDL.Nat64,
    initial_notary_delay_millis: IDL.Nat64,
    chain_key_config: IDL.Opt(InitialChainKeyConfig),
    gossip_max_chunk_size: IDL.Nat32,
    subnet_type: SubnetType,
    ssh_readonly_access: IDL.Vec(IDL.Text),
    gossip_retransmission_request_ms: IDL.Nat32,
    gossip_receive_check_cache_size: IDL.Nat32,
    node_ids: IDL.Vec(IDL.Principal)
});
export const DeployGuestosToAllSubnetNodesPayload = IDL.Record({
    subnet_id: IDL.Principal,
    replica_version_id: IDL.Text
});
export const DeployGuestosToAllUnassignedNodesPayload = IDL.Record({
    elected_replica_version: IDL.Text
});
export const DeployGuestosToSomeApiBoundaryNodes = IDL.Record({
    version: IDL.Text,
    node_ids: IDL.Vec(IDL.Principal)
});
export const DeployHostosToSomeNodes = IDL.Record({
    hostos_version_id: IDL.Opt(IDL.Text),
    node_ids: IDL.Vec(IDL.Principal)
});
export const GetApiBoundaryNodeIdsRequest = IDL.Record({});
export const ApiBoundaryNodeIdRecord = IDL.Record({
    id: IDL.Opt(IDL.Principal)
});
export const GetApiBoundaryNodeIdsResponse = IDL.Variant({
    Ok: IDL.Vec(ApiBoundaryNodeIdRecord),
    Err: IDL.Text
});
export const NodeOperatorRecord = IDL.Record({
    ipv6: IDL.Opt(IDL.Text),
    node_operator_principal_id: IDL.Vec(IDL.Nat8),
    node_allowance: IDL.Nat64,
    rewardable_nodes: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat32)),
    node_provider_principal_id: IDL.Vec(IDL.Nat8),
    dc_id: IDL.Text
});
export const GetNodeOperatorsAndDcsOfNodeProviderResponse = IDL.Variant({
    Ok: IDL.Vec(IDL.Tuple(DataCenterRecord, NodeOperatorRecord)),
    Err: IDL.Text
});
export const NodeProvidersMonthlyXdrRewards = IDL.Record({
    registry_version: IDL.Opt(IDL.Nat64),
    rewards: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat64))
});
export const GetNodeProvidersMonthlyXdrRewardsResponse = IDL.Variant({
    Ok: NodeProvidersMonthlyXdrRewards,
    Err: IDL.Text
});
export const GetSubnetForCanisterRequest = IDL.Record({
    principal: IDL.Opt(IDL.Principal)
});
export const GetSubnetForCanisterResponse = IDL.Variant({
    Ok: IDL.Record({ subnet_id: IDL.Opt(IDL.Principal) }),
    Err: IDL.Text
});
export const PrepareCanisterMigrationPayload = IDL.Record({
    canister_id_ranges: IDL.Vec(CanisterIdRange),
    source_subnet: IDL.Principal,
    destination_subnet: IDL.Principal
});
export const RecoverSubnetPayload = IDL.Record({
    height: IDL.Nat64,
    replacement_nodes: IDL.Opt(IDL.Vec(IDL.Principal)),
    subnet_id: IDL.Principal,
    registry_store_uri: IDL.Opt(IDL.Tuple(IDL.Text, IDL.Text, IDL.Nat64)),
    state_hash: IDL.Vec(IDL.Nat8),
    chain_key_config: IDL.Opt(InitialChainKeyConfig),
    time_ns: IDL.Nat64
});
export const RemoveApiBoundaryNodesPayload = IDL.Record({
    node_ids: IDL.Vec(IDL.Principal)
});
export const RemoveFirewallRulesPayload = IDL.Record({
    expected_hash: IDL.Text,
    scope: FirewallRulesScope,
    positions: IDL.Vec(IDL.Int32)
});
export const RemoveNodeDirectlyPayload = IDL.Record({
    node_id: IDL.Principal
});
export const NodeOperatorPrincipals = IDL.Record({
    principals: IDL.Vec(IDL.Principal)
});
export const RemoveNodeOperatorsPayload = IDL.Record({
    node_operator_principals_to_remove: IDL.Opt(NodeOperatorPrincipals),
    node_operators_to_remove: IDL.Vec(IDL.Vec(IDL.Nat8))
});
export const RemoveNodesPayload = IDL.Record({
    node_ids: IDL.Vec(IDL.Principal)
});
export const RerouteCanisterRangesPayload = IDL.Record({
    source_subnet: IDL.Principal,
    reassigned_canister_ranges: IDL.Vec(CanisterIdRange),
    destination_subnet: IDL.Principal
});
export const ReviseElectedGuestosVersionsPayload = IDL.Record({
    release_package_urls: IDL.Vec(IDL.Text),
    replica_versions_to_unelect: IDL.Vec(IDL.Text),
    replica_version_to_elect: IDL.Opt(IDL.Text),
    guest_launch_measurement_sha256_hex: IDL.Opt(IDL.Text),
    release_package_sha256_hex: IDL.Opt(IDL.Text)
});
export const ReviseElectedHostosVersionsPayload = IDL.Record({
    release_package_urls: IDL.Vec(IDL.Text),
    hostos_version_to_elect: IDL.Opt(IDL.Text),
    hostos_versions_to_unelect: IDL.Vec(IDL.Text),
    release_package_sha256_hex: IDL.Opt(IDL.Text)
});
export const SetFirewallConfigPayload = IDL.Record({
    ipv4_prefixes: IDL.Vec(IDL.Text),
    firewall_config: IDL.Text,
    ipv6_prefixes: IDL.Vec(IDL.Text)
});
export const UpdateApiBoundaryNodesVersionPayload = IDL.Record({
    version: IDL.Text,
    node_ids: IDL.Vec(IDL.Principal)
});
export const UpdateElectedHostosVersionsPayload = IDL.Record({
    release_package_urls: IDL.Vec(IDL.Text),
    hostos_version_to_elect: IDL.Opt(IDL.Text),
    hostos_versions_to_unelect: IDL.Vec(IDL.Text),
    release_package_sha256_hex: IDL.Opt(IDL.Text)
});
export const UpdateFirewallRulesPayload = IDL.Record({
    expected_hash: IDL.Text,
    scope: FirewallRulesScope,
    positions: IDL.Vec(IDL.Int32),
    rules: IDL.Vec(FirewallRule)
});
export const UpdateNodeDirectlyPayload = IDL.Record({
    idkg_dealing_encryption_pk: IDL.Opt(IDL.Vec(IDL.Nat8))
});
export const UpdateNodeDomainDirectlyPayload = IDL.Record({
    node_id: IDL.Principal,
    domain: IDL.Opt(IDL.Text)
});
export const UpdateNodeDomainDirectlyResponse = IDL.Variant({
    Ok: IDL.Null,
    Err: IDL.Text
});
export const UpdateNodeIPv4ConfigDirectlyPayload = IDL.Record({
    ipv4_config: IDL.Opt(IPv4Config),
    node_id: IDL.Principal
});
export const UpdateNodeIpv4ConfigDirectlyResponse = IDL.Variant({
    Ok: IDL.Null,
    Err: IDL.Text
});
export const UpdateNodeOperatorConfigPayload = IDL.Record({
    node_operator_id: IDL.Opt(IDL.Principal),
    set_ipv6_to_none: IDL.Opt(IDL.Bool),
    ipv6: IDL.Opt(IDL.Text),
    node_provider_id: IDL.Opt(IDL.Principal),
    node_allowance: IDL.Opt(IDL.Nat64),
    rewardable_nodes: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat32)),
    dc_id: IDL.Opt(IDL.Text)
});
export const UpdateNodeOperatorConfigDirectlyPayload = IDL.Record({
    node_operator_id: IDL.Opt(IDL.Principal),
    node_provider_id: IDL.Opt(IDL.Principal)
});
export const NodeRewardRate = IDL.Record({
    xdr_permyriad_per_node_per_month: IDL.Nat64,
    reward_coefficient_percent: IDL.Opt(IDL.Int32)
});
export const NodeRewardRates = IDL.Record({
    rates: IDL.Vec(IDL.Tuple(IDL.Text, NodeRewardRate))
});
export const UpdateNodeRewardsTableProposalPayload = IDL.Record({
    new_entries: IDL.Vec(IDL.Tuple(IDL.Text, NodeRewardRates))
});
export const UpdateNodesHostosVersionPayload = IDL.Record({
    hostos_version_id: IDL.Opt(IDL.Text),
    node_ids: IDL.Vec(IDL.Principal)
});
export const UpdateSshReadOnlyAccessForAllUnassignedNodesPayload = IDL.Record({
    ssh_readonly_keys: IDL.Vec(IDL.Text)
});
export const ChainKeyConfig = IDL.Record({
    signature_request_timeout_ns: IDL.Opt(IDL.Nat64),
    key_configs: IDL.Vec(KeyConfig),
    idkg_key_rotation_period_ms: IDL.Opt(IDL.Nat64)
});
export const UpdateSubnetPayload = IDL.Record({
    unit_delay_millis: IDL.Opt(IDL.Nat64),
    max_duplicity: IDL.Opt(IDL.Nat32),
    features: IDL.Opt(SubnetFeatures),
    set_gossip_config_to_default: IDL.Bool,
    halt_at_cup_height: IDL.Opt(IDL.Bool),
    pfn_evaluation_period_ms: IDL.Opt(IDL.Nat32),
    subnet_id: IDL.Principal,
    max_ingress_bytes_per_message: IDL.Opt(IDL.Nat64),
    dkg_dealings_per_block: IDL.Opt(IDL.Nat64),
    max_block_payload_size: IDL.Opt(IDL.Nat64),
    start_as_nns: IDL.Opt(IDL.Bool),
    is_halted: IDL.Opt(IDL.Bool),
    chain_key_signing_enable: IDL.Opt(IDL.Vec(MasterPublicKeyId)),
    max_ingress_messages_per_block: IDL.Opt(IDL.Nat64),
    max_number_of_canisters: IDL.Opt(IDL.Nat64),
    retransmission_request_ms: IDL.Opt(IDL.Nat32),
    dkg_interval_length: IDL.Opt(IDL.Nat64),
    registry_poll_period_ms: IDL.Opt(IDL.Nat32),
    max_chunk_wait_ms: IDL.Opt(IDL.Nat32),
    receive_check_cache_size: IDL.Opt(IDL.Nat32),
    ssh_backup_access: IDL.Opt(IDL.Vec(IDL.Text)),
    max_chunk_size: IDL.Opt(IDL.Nat32),
    initial_notary_delay_millis: IDL.Opt(IDL.Nat64),
    chain_key_config: IDL.Opt(ChainKeyConfig),
    max_artifact_streams_per_peer: IDL.Opt(IDL.Nat32),
    subnet_type: IDL.Opt(SubnetType),
    ssh_readonly_access: IDL.Opt(IDL.Vec(IDL.Text)),
    chain_key_signing_disable: IDL.Opt(IDL.Vec(MasterPublicKeyId))
});
export const UpdateUnassignedNodesConfigPayload = IDL.Record({
    replica_version: IDL.Opt(IDL.Text),
    ssh_readonly_access: IDL.Opt(IDL.Vec(IDL.Text))
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const AddApiBoundaryNodesPayload = IDL.Record({
        version: IDL.Text,
        node_ids: IDL.Vec(IDL.Principal)
    });
    const FirewallRulesScope = IDL.Variant({
        Node: IDL.Principal,
        ReplicaNodes: IDL.Null,
        ApiBoundaryNodes: IDL.Null,
        Subnet: IDL.Principal,
        Global: IDL.Null
    });
    const FirewallRule = IDL.Record({
        ipv4_prefixes: IDL.Vec(IDL.Text),
        direction: IDL.Opt(IDL.Int32),
        action: IDL.Int32,
        user: IDL.Opt(IDL.Text),
        comment: IDL.Text,
        ipv6_prefixes: IDL.Vec(IDL.Text),
        ports: IDL.Vec(IDL.Nat32)
    });
    const AddFirewallRulesPayload = IDL.Record({
        expected_hash: IDL.Text,
        scope: FirewallRulesScope,
        positions: IDL.Vec(IDL.Int32),
        rules: IDL.Vec(FirewallRule)
    });
    const IPv4Config = IDL.Record({
        prefix_length: IDL.Nat32,
        gateway_ip_addr: IDL.Text,
        ip_addr: IDL.Text
    });
    const AddNodePayload = IDL.Record({
        prometheus_metrics_endpoint: IDL.Text,
        http_endpoint: IDL.Text,
        idkg_dealing_encryption_pk: IDL.Opt(IDL.Vec(IDL.Nat8)),
        domain: IDL.Opt(IDL.Text),
        public_ipv4_config: IDL.Opt(IPv4Config),
        xnet_endpoint: IDL.Text,
        chip_id: IDL.Opt(IDL.Vec(IDL.Nat8)),
        committee_signing_pk: IDL.Vec(IDL.Nat8),
        node_reward_type: IDL.Opt(IDL.Text),
        node_signing_pk: IDL.Vec(IDL.Nat8),
        transport_tls_cert: IDL.Vec(IDL.Nat8),
        ni_dkg_dealing_encryption_pk: IDL.Vec(IDL.Nat8),
        p2p_flow_endpoints: IDL.Vec(IDL.Text)
    });
    const AddNodeOperatorPayload = IDL.Record({
        ipv6: IDL.Opt(IDL.Text),
        node_operator_principal_id: IDL.Opt(IDL.Principal),
        node_allowance: IDL.Nat64,
        rewardable_nodes: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat32)),
        node_provider_principal_id: IDL.Opt(IDL.Principal),
        dc_id: IDL.Text
    });
    const AddNodesToSubnetPayload = IDL.Record({
        subnet_id: IDL.Principal,
        node_ids: IDL.Vec(IDL.Principal)
    });
    const Gps = IDL.Record({
        latitude: IDL.Float32,
        longitude: IDL.Float32
    });
    const DataCenterRecord = IDL.Record({
        id: IDL.Text,
        gps: IDL.Opt(Gps),
        region: IDL.Text,
        owner: IDL.Text
    });
    const AddOrRemoveDataCentersProposalPayload = IDL.Record({
        data_centers_to_add: IDL.Vec(DataCenterRecord),
        data_centers_to_remove: IDL.Vec(IDL.Text)
    });
    const ChangeSubnetMembershipPayload = IDL.Record({
        node_ids_add: IDL.Vec(IDL.Principal),
        subnet_id: IDL.Principal,
        node_ids_remove: IDL.Vec(IDL.Principal)
    });
    const CanisterIdRange = IDL.Record({
        end: IDL.Principal,
        start: IDL.Principal
    });
    const CompleteCanisterMigrationPayload = IDL.Record({
        canister_id_ranges: IDL.Vec(CanisterIdRange),
        migration_trace: IDL.Vec(IDL.Principal)
    });
    const SubnetFeatures = IDL.Record({
        canister_sandboxing: IDL.Bool,
        http_requests: IDL.Bool,
        sev_enabled: IDL.Opt(IDL.Bool)
    });
    const SchnorrAlgorithm = IDL.Variant({
        ed25519: IDL.Null,
        bip340secp256k1: IDL.Null
    });
    const SchnorrKeyId = IDL.Record({
        algorithm: SchnorrAlgorithm,
        name: IDL.Text
    });
    const VetKdCurve = IDL.Variant({ bls12_381_g2: IDL.Null });
    const VetKdKeyId = IDL.Record({ name: IDL.Text, curve: VetKdCurve });
    const EcdsaCurve = IDL.Variant({ secp256k1: IDL.Null });
    const EcdsaKeyId = IDL.Record({ name: IDL.Text, curve: EcdsaCurve });
    const MasterPublicKeyId = IDL.Variant({
        Schnorr: SchnorrKeyId,
        VetKd: VetKdKeyId,
        Ecdsa: EcdsaKeyId
    });
    const KeyConfig = IDL.Record({
        max_queue_size: IDL.Opt(IDL.Nat32),
        key_id: IDL.Opt(MasterPublicKeyId),
        pre_signatures_to_create_in_advance: IDL.Opt(IDL.Nat32)
    });
    const KeyConfigRequest = IDL.Record({
        subnet_id: IDL.Opt(IDL.Principal),
        key_config: IDL.Opt(KeyConfig)
    });
    const InitialChainKeyConfig = IDL.Record({
        signature_request_timeout_ns: IDL.Opt(IDL.Nat64),
        key_configs: IDL.Vec(KeyConfigRequest),
        idkg_key_rotation_period_ms: IDL.Opt(IDL.Nat64)
    });
    const SubnetType = IDL.Variant({
        application: IDL.Null,
        verified_application: IDL.Null,
        system: IDL.Null
    });
    const CreateSubnetPayload = IDL.Record({
        unit_delay_millis: IDL.Nat64,
        features: SubnetFeatures,
        gossip_registry_poll_period_ms: IDL.Nat32,
        max_ingress_bytes_per_message: IDL.Nat64,
        dkg_dealings_per_block: IDL.Nat64,
        max_block_payload_size: IDL.Nat64,
        start_as_nns: IDL.Bool,
        is_halted: IDL.Bool,
        gossip_pfn_evaluation_period_ms: IDL.Nat32,
        max_ingress_messages_per_block: IDL.Nat64,
        max_number_of_canisters: IDL.Nat64,
        gossip_max_artifact_streams_per_peer: IDL.Nat32,
        replica_version_id: IDL.Text,
        gossip_max_duplicity: IDL.Nat32,
        gossip_max_chunk_wait_ms: IDL.Nat32,
        dkg_interval_length: IDL.Nat64,
        subnet_id_override: IDL.Opt(IDL.Principal),
        ssh_backup_access: IDL.Vec(IDL.Text),
        ingress_bytes_per_block_soft_cap: IDL.Nat64,
        initial_notary_delay_millis: IDL.Nat64,
        chain_key_config: IDL.Opt(InitialChainKeyConfig),
        gossip_max_chunk_size: IDL.Nat32,
        subnet_type: SubnetType,
        ssh_readonly_access: IDL.Vec(IDL.Text),
        gossip_retransmission_request_ms: IDL.Nat32,
        gossip_receive_check_cache_size: IDL.Nat32,
        node_ids: IDL.Vec(IDL.Principal)
    });
    const DeployGuestosToAllSubnetNodesPayload = IDL.Record({
        subnet_id: IDL.Principal,
        replica_version_id: IDL.Text
    });
    const DeployGuestosToAllUnassignedNodesPayload = IDL.Record({
        elected_replica_version: IDL.Text
    });
    const DeployGuestosToSomeApiBoundaryNodes = IDL.Record({
        version: IDL.Text,
        node_ids: IDL.Vec(IDL.Principal)
    });
    const DeployHostosToSomeNodes = IDL.Record({
        hostos_version_id: IDL.Opt(IDL.Text),
        node_ids: IDL.Vec(IDL.Principal)
    });
    const GetApiBoundaryNodeIdsRequest = IDL.Record({});
    const ApiBoundaryNodeIdRecord = IDL.Record({ id: IDL.Opt(IDL.Principal) });
    const GetApiBoundaryNodeIdsResponse = IDL.Variant({
        Ok: IDL.Vec(ApiBoundaryNodeIdRecord),
        Err: IDL.Text
    });
    const NodeOperatorRecord = IDL.Record({
        ipv6: IDL.Opt(IDL.Text),
        node_operator_principal_id: IDL.Vec(IDL.Nat8),
        node_allowance: IDL.Nat64,
        rewardable_nodes: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat32)),
        node_provider_principal_id: IDL.Vec(IDL.Nat8),
        dc_id: IDL.Text
    });
    const GetNodeOperatorsAndDcsOfNodeProviderResponse = IDL.Variant({
        Ok: IDL.Vec(IDL.Tuple(DataCenterRecord, NodeOperatorRecord)),
        Err: IDL.Text
    });
    const NodeProvidersMonthlyXdrRewards = IDL.Record({
        registry_version: IDL.Opt(IDL.Nat64),
        rewards: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat64))
    });
    const GetNodeProvidersMonthlyXdrRewardsResponse = IDL.Variant({
        Ok: NodeProvidersMonthlyXdrRewards,
        Err: IDL.Text
    });
    const GetSubnetForCanisterRequest = IDL.Record({
        principal: IDL.Opt(IDL.Principal)
    });
    const GetSubnetForCanisterResponse = IDL.Variant({
        Ok: IDL.Record({ subnet_id: IDL.Opt(IDL.Principal) }),
        Err: IDL.Text
    });
    const PrepareCanisterMigrationPayload = IDL.Record({
        canister_id_ranges: IDL.Vec(CanisterIdRange),
        source_subnet: IDL.Principal,
        destination_subnet: IDL.Principal
    });
    const RecoverSubnetPayload = IDL.Record({
        height: IDL.Nat64,
        replacement_nodes: IDL.Opt(IDL.Vec(IDL.Principal)),
        subnet_id: IDL.Principal,
        registry_store_uri: IDL.Opt(IDL.Tuple(IDL.Text, IDL.Text, IDL.Nat64)),
        state_hash: IDL.Vec(IDL.Nat8),
        chain_key_config: IDL.Opt(InitialChainKeyConfig),
        time_ns: IDL.Nat64
    });
    const RemoveApiBoundaryNodesPayload = IDL.Record({
        node_ids: IDL.Vec(IDL.Principal)
    });
    const RemoveFirewallRulesPayload = IDL.Record({
        expected_hash: IDL.Text,
        scope: FirewallRulesScope,
        positions: IDL.Vec(IDL.Int32)
    });
    const RemoveNodeDirectlyPayload = IDL.Record({ node_id: IDL.Principal });
    const NodeOperatorPrincipals = IDL.Record({
        principals: IDL.Vec(IDL.Principal)
    });
    const RemoveNodeOperatorsPayload = IDL.Record({
        node_operator_principals_to_remove: IDL.Opt(NodeOperatorPrincipals),
        node_operators_to_remove: IDL.Vec(IDL.Vec(IDL.Nat8))
    });
    const RemoveNodesPayload = IDL.Record({
        node_ids: IDL.Vec(IDL.Principal)
    });
    const RerouteCanisterRangesPayload = IDL.Record({
        source_subnet: IDL.Principal,
        reassigned_canister_ranges: IDL.Vec(CanisterIdRange),
        destination_subnet: IDL.Principal
    });
    const ReviseElectedGuestosVersionsPayload = IDL.Record({
        release_package_urls: IDL.Vec(IDL.Text),
        replica_versions_to_unelect: IDL.Vec(IDL.Text),
        replica_version_to_elect: IDL.Opt(IDL.Text),
        guest_launch_measurement_sha256_hex: IDL.Opt(IDL.Text),
        release_package_sha256_hex: IDL.Opt(IDL.Text)
    });
    const ReviseElectedHostosVersionsPayload = IDL.Record({
        release_package_urls: IDL.Vec(IDL.Text),
        hostos_version_to_elect: IDL.Opt(IDL.Text),
        hostos_versions_to_unelect: IDL.Vec(IDL.Text),
        release_package_sha256_hex: IDL.Opt(IDL.Text)
    });
    const SetFirewallConfigPayload = IDL.Record({
        ipv4_prefixes: IDL.Vec(IDL.Text),
        firewall_config: IDL.Text,
        ipv6_prefixes: IDL.Vec(IDL.Text)
    });
    const UpdateApiBoundaryNodesVersionPayload = IDL.Record({
        version: IDL.Text,
        node_ids: IDL.Vec(IDL.Principal)
    });
    const UpdateElectedHostosVersionsPayload = IDL.Record({
        release_package_urls: IDL.Vec(IDL.Text),
        hostos_version_to_elect: IDL.Opt(IDL.Text),
        hostos_versions_to_unelect: IDL.Vec(IDL.Text),
        release_package_sha256_hex: IDL.Opt(IDL.Text)
    });
    const UpdateFirewallRulesPayload = IDL.Record({
        expected_hash: IDL.Text,
        scope: FirewallRulesScope,
        positions: IDL.Vec(IDL.Int32),
        rules: IDL.Vec(FirewallRule)
    });
    const UpdateNodeDirectlyPayload = IDL.Record({
        idkg_dealing_encryption_pk: IDL.Opt(IDL.Vec(IDL.Nat8))
    });
    const UpdateNodeDomainDirectlyPayload = IDL.Record({
        node_id: IDL.Principal,
        domain: IDL.Opt(IDL.Text)
    });
    const UpdateNodeDomainDirectlyResponse = IDL.Variant({
        Ok: IDL.Null,
        Err: IDL.Text
    });
    const UpdateNodeIPv4ConfigDirectlyPayload = IDL.Record({
        ipv4_config: IDL.Opt(IPv4Config),
        node_id: IDL.Principal
    });
    const UpdateNodeIpv4ConfigDirectlyResponse = IDL.Variant({
        Ok: IDL.Null,
        Err: IDL.Text
    });
    const UpdateNodeOperatorConfigPayload = IDL.Record({
        node_operator_id: IDL.Opt(IDL.Principal),
        set_ipv6_to_none: IDL.Opt(IDL.Bool),
        ipv6: IDL.Opt(IDL.Text),
        node_provider_id: IDL.Opt(IDL.Principal),
        node_allowance: IDL.Opt(IDL.Nat64),
        rewardable_nodes: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat32)),
        dc_id: IDL.Opt(IDL.Text)
    });
    const UpdateNodeOperatorConfigDirectlyPayload = IDL.Record({
        node_operator_id: IDL.Opt(IDL.Principal),
        node_provider_id: IDL.Opt(IDL.Principal)
    });
    const NodeRewardRate = IDL.Record({
        xdr_permyriad_per_node_per_month: IDL.Nat64,
        reward_coefficient_percent: IDL.Opt(IDL.Int32)
    });
    const NodeRewardRates = IDL.Record({
        rates: IDL.Vec(IDL.Tuple(IDL.Text, NodeRewardRate))
    });
    const UpdateNodeRewardsTableProposalPayload = IDL.Record({
        new_entries: IDL.Vec(IDL.Tuple(IDL.Text, NodeRewardRates))
    });
    const UpdateNodesHostosVersionPayload = IDL.Record({
        hostos_version_id: IDL.Opt(IDL.Text),
        node_ids: IDL.Vec(IDL.Principal)
    });
    const UpdateSshReadOnlyAccessForAllUnassignedNodesPayload = IDL.Record({
        ssh_readonly_keys: IDL.Vec(IDL.Text)
    });
    const ChainKeyConfig = IDL.Record({
        signature_request_timeout_ns: IDL.Opt(IDL.Nat64),
        key_configs: IDL.Vec(KeyConfig),
        idkg_key_rotation_period_ms: IDL.Opt(IDL.Nat64)
    });
    const UpdateSubnetPayload = IDL.Record({
        unit_delay_millis: IDL.Opt(IDL.Nat64),
        max_duplicity: IDL.Opt(IDL.Nat32),
        features: IDL.Opt(SubnetFeatures),
        set_gossip_config_to_default: IDL.Bool,
        halt_at_cup_height: IDL.Opt(IDL.Bool),
        pfn_evaluation_period_ms: IDL.Opt(IDL.Nat32),
        subnet_id: IDL.Principal,
        max_ingress_bytes_per_message: IDL.Opt(IDL.Nat64),
        dkg_dealings_per_block: IDL.Opt(IDL.Nat64),
        max_block_payload_size: IDL.Opt(IDL.Nat64),
        start_as_nns: IDL.Opt(IDL.Bool),
        is_halted: IDL.Opt(IDL.Bool),
        chain_key_signing_enable: IDL.Opt(IDL.Vec(MasterPublicKeyId)),
        max_ingress_messages_per_block: IDL.Opt(IDL.Nat64),
        max_number_of_canisters: IDL.Opt(IDL.Nat64),
        retransmission_request_ms: IDL.Opt(IDL.Nat32),
        dkg_interval_length: IDL.Opt(IDL.Nat64),
        registry_poll_period_ms: IDL.Opt(IDL.Nat32),
        max_chunk_wait_ms: IDL.Opt(IDL.Nat32),
        receive_check_cache_size: IDL.Opt(IDL.Nat32),
        ssh_backup_access: IDL.Opt(IDL.Vec(IDL.Text)),
        max_chunk_size: IDL.Opt(IDL.Nat32),
        initial_notary_delay_millis: IDL.Opt(IDL.Nat64),
        chain_key_config: IDL.Opt(ChainKeyConfig),
        max_artifact_streams_per_peer: IDL.Opt(IDL.Nat32),
        subnet_type: IDL.Opt(SubnetType),
        ssh_readonly_access: IDL.Opt(IDL.Vec(IDL.Text)),
        chain_key_signing_disable: IDL.Opt(IDL.Vec(MasterPublicKeyId))
    });
    const UpdateUnassignedNodesConfigPayload = IDL.Record({
        replica_version: IDL.Opt(IDL.Text),
        ssh_readonly_access: IDL.Opt(IDL.Vec(IDL.Text))
    });
    return IDL.Service({
        add_api_boundary_nodes: IDL.Func([AddApiBoundaryNodesPayload], [], []),
        add_firewall_rules: IDL.Func([AddFirewallRulesPayload], [], []),
        add_node: IDL.Func([AddNodePayload], [IDL.Principal], []),
        add_node_operator: IDL.Func([AddNodeOperatorPayload], [], []),
        add_nodes_to_subnet: IDL.Func([AddNodesToSubnetPayload], [], []),
        add_or_remove_data_centers: IDL.Func(
            [AddOrRemoveDataCentersProposalPayload],
            [],
            []
        ),
        change_subnet_membership: IDL.Func(
            [ChangeSubnetMembershipPayload],
            [],
            []
        ),
        clear_provisional_whitelist: IDL.Func([], [], []),
        complete_canister_migration: IDL.Func(
            [CompleteCanisterMigrationPayload],
            [],
            []
        ),
        create_subnet: IDL.Func([CreateSubnetPayload], [], []),
        deploy_guestos_to_all_subnet_nodes: IDL.Func(
            [DeployGuestosToAllSubnetNodesPayload],
            [],
            []
        ),
        deploy_guestos_to_all_unassigned_nodes: IDL.Func(
            [DeployGuestosToAllUnassignedNodesPayload],
            [],
            []
        ),
        deploy_guestos_to_some_api_boundary_nodes: IDL.Func(
            [DeployGuestosToSomeApiBoundaryNodes],
            [],
            []
        ),
        deploy_hostos_to_some_nodes: IDL.Func(
            [DeployHostosToSomeNodes],
            [],
            []
        ),
        get_api_boundary_node_ids: IDL.Func(
            [GetApiBoundaryNodeIdsRequest],
            [GetApiBoundaryNodeIdsResponse],
            ['query']
        ),
        get_build_metadata: IDL.Func([], [IDL.Text], ['query']),
        get_node_operators_and_dcs_of_node_provider: IDL.Func(
            [IDL.Principal],
            [GetNodeOperatorsAndDcsOfNodeProviderResponse],
            ['query']
        ),
        get_node_providers_monthly_xdr_rewards: IDL.Func(
            [],
            [GetNodeProvidersMonthlyXdrRewardsResponse],
            ['query']
        ),
        get_subnet_for_canister: IDL.Func(
            [GetSubnetForCanisterRequest],
            [GetSubnetForCanisterResponse],
            ['query']
        ),
        prepare_canister_migration: IDL.Func(
            [PrepareCanisterMigrationPayload],
            [],
            []
        ),
        recover_subnet: IDL.Func([RecoverSubnetPayload], [], []),
        remove_api_boundary_nodes: IDL.Func(
            [RemoveApiBoundaryNodesPayload],
            [],
            []
        ),
        remove_firewall_rules: IDL.Func([RemoveFirewallRulesPayload], [], []),
        remove_node_directly: IDL.Func([RemoveNodeDirectlyPayload], [], []),
        remove_node_operators: IDL.Func([RemoveNodeOperatorsPayload], [], []),
        remove_nodes: IDL.Func([RemoveNodesPayload], [], []),
        remove_nodes_from_subnet: IDL.Func([RemoveNodesPayload], [], []),
        reroute_canister_ranges: IDL.Func(
            [RerouteCanisterRangesPayload],
            [],
            []
        ),
        revise_elected_guestos_versions: IDL.Func(
            [ReviseElectedGuestosVersionsPayload],
            [],
            []
        ),
        revise_elected_hostos_versions: IDL.Func(
            [ReviseElectedHostosVersionsPayload],
            [],
            []
        ),
        revise_elected_replica_versions: IDL.Func(
            [ReviseElectedGuestosVersionsPayload],
            [],
            []
        ),
        set_firewall_config: IDL.Func([SetFirewallConfigPayload], [], []),
        update_api_boundary_nodes_version: IDL.Func(
            [UpdateApiBoundaryNodesVersionPayload],
            [],
            []
        ),
        update_elected_hostos_versions: IDL.Func(
            [UpdateElectedHostosVersionsPayload],
            [],
            []
        ),
        update_firewall_rules: IDL.Func([UpdateFirewallRulesPayload], [], []),
        update_node_directly: IDL.Func([UpdateNodeDirectlyPayload], [], []),
        update_node_domain_directly: IDL.Func(
            [UpdateNodeDomainDirectlyPayload],
            [UpdateNodeDomainDirectlyResponse],
            []
        ),
        update_node_ipv4_config_directly: IDL.Func(
            [UpdateNodeIPv4ConfigDirectlyPayload],
            [UpdateNodeIpv4ConfigDirectlyResponse],
            []
        ),
        update_node_operator_config: IDL.Func(
            [UpdateNodeOperatorConfigPayload],
            [],
            []
        ),
        update_node_operator_config_directly: IDL.Func(
            [UpdateNodeOperatorConfigDirectlyPayload],
            [],
            []
        ),
        update_node_rewards_table: IDL.Func(
            [UpdateNodeRewardsTableProposalPayload],
            [],
            []
        ),
        update_nodes_hostos_version: IDL.Func(
            [UpdateNodesHostosVersionPayload],
            [],
            []
        ),
        update_ssh_readonly_access_for_all_unassigned_nodes: IDL.Func(
            [UpdateSshReadOnlyAccessForAllUnassignedNodesPayload],
            [],
            []
        ),
        update_subnet: IDL.Func([UpdateSubnetPayload], [], []),
        update_unassigned_nodes_config: IDL.Func(
            [UpdateUnassignedNodesConfigPayload],
            [],
            []
        )
    });
};
export const init: init = () => {
    return [];
};

import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
export type AddTentativeDeviceResponse =
    | {
          device_registration_mode_off: null;
      }
    | { another_device_tentatively_added: null }
    | {
          added_tentatively: {
              verification_code: string;
              device_registration_timeout: Timestamp;
          };
      };
export type AnalyticsConfig = {
    Plausible: {
        domain: [] | [string];
        track_localhost: [] | [boolean];
        hash_mode: [] | [boolean];
        api_host: [] | [string];
    };
};
export interface AnchorCredentials {
    recovery_phrases: Array<PublicKey>;
    credentials: Array<WebAuthnCredential>;
    recovery_credentials: Array<WebAuthnCredential>;
}
export interface ArchiveConfig {
    polling_interval_ns: bigint;
    entries_buffer_limit: bigint;
    module_hash: Uint8Array | number[];
    entries_fetch_limit: number;
}
export interface ArchiveInfo {
    archive_config: [] | [ArchiveConfig];
    archive_canister: [] | [Principal];
}
export type Aud = string;
export type AuthnMethod = { PubKey: PublicKeyAuthn } | { WebAuthn: WebAuthn };
export type AuthnMethodAddError = { InvalidMetadata: string };
export interface AuthnMethodConfirmationCode {
    confirmation_code: string;
    expiration: Timestamp;
}
export type AuthnMethodConfirmationError =
    | { RegistrationModeOff: null }
    | { NoAuthnMethodToConfirm: null }
    | { WrongCode: { retries_left: number } };
export interface AuthnMethodData {
    security_settings: AuthnMethodSecuritySettings;
    metadata: MetadataMapV2;
    last_authentication: [] | [Timestamp];
    authn_method: AuthnMethod;
}
export type AuthnMethodMetadataReplaceError =
    | { AuthnMethodNotFound: null }
    | { InvalidMetadata: string };
export type AuthnMethodProtection = { Protected: null } | { Unprotected: null };
export type AuthnMethodPurpose = { Recovery: null } | { Authentication: null };
export type AuthnMethodRegisterError =
    | { RegistrationModeOff: null }
    | { RegistrationAlreadyInProgress: null }
    | { InvalidMetadata: string };
export interface AuthnMethodRegistrationInfo {
    expiration: Timestamp;
    authn_method: [] | [AuthnMethodData];
}
export type AuthnMethodReplaceError =
    | { AuthnMethodNotFound: null }
    | { InvalidMetadata: string };
export interface AuthnMethodSecuritySettings {
    protection: AuthnMethodProtection;
    purpose: AuthnMethodPurpose;
}
export type AuthnMethodSecuritySettingsReplaceError = {
    AuthnMethodNotFound: null;
};
export interface BufferedArchiveEntry {
    sequence_number: bigint;
    entry: Uint8Array | number[];
    anchor_number: UserNumber;
    timestamp: Timestamp;
}
export interface CaptchaConfig {
    max_unsolved_captchas: bigint;
    captcha_trigger:
        | {
              Dynamic: {
                  reference_rate_sampling_interval_s: bigint;
                  threshold_pct: number;
                  current_rate_sampling_interval_s: bigint;
              };
          }
        | { Static: { CaptchaDisabled: null } | { CaptchaEnabled: null } };
}
export type CaptchaResult = ChallengeResult;
export interface Challenge {
    png_base64: string;
    challenge_key: ChallengeKey;
}
export type ChallengeKey = string;
export interface ChallengeResult {
    key: ChallengeKey;
    chars: string;
}
export interface CheckCaptchaArg {
    solution: string;
}
export type CheckCaptchaError =
    | { NoRegistrationFlow: null }
    | { UnexpectedCall: { next_step: RegistrationFlowNextStep } }
    | { WrongSolution: { new_captcha_png_base64: string } };
export type CredentialId = Uint8Array | number[];
export interface Delegation {
    pubkey: PublicKey;
    targets: [] | [Array<Principal>];
    expiration: Timestamp;
}
export type DeployArchiveResult =
    | { creation_in_progress: null }
    | { success: Principal }
    | { failed: string };
export interface DeviceData {
    alias: string;
    metadata: [] | [MetadataMap];
    origin: [] | [string];
    protection: DeviceProtection;
    pubkey: DeviceKey;
    key_type: KeyType;
    purpose: Purpose;
    credential_id: [] | [CredentialId];
}
export type DeviceKey = PublicKey;
export type DeviceProtection = { unprotected: null } | { protected: null };
export interface DeviceRegistrationInfo {
    tentative_device: [] | [DeviceData];
    expiration: Timestamp;
}
export interface DeviceWithUsage {
    alias: string;
    last_usage: [] | [Timestamp];
    metadata: [] | [MetadataMap];
    origin: [] | [string];
    protection: DeviceProtection;
    pubkey: DeviceKey;
    key_type: KeyType;
    purpose: Purpose;
    credential_id: [] | [CredentialId];
}
export type FrontendHostname = string;
export type GetDelegationResponse =
    | { no_such_delegation: null }
    | { signed_delegation: SignedDelegation };
export type GetIdAliasError =
    | { InternalCanisterError: string }
    | { Unauthorized: Principal }
    | { NoSuchCredentials: string };
export interface GetIdAliasRequest {
    rp_id_alias_jwt: string;
    issuer: FrontendHostname;
    issuer_id_alias_jwt: string;
    relying_party: FrontendHostname;
    identity_number: IdentityNumber;
}
export type HeaderField = [string, string];
export interface HttpRequest {
    url: string;
    method: string;
    body: Uint8Array | number[];
    headers: Array<HeaderField>;
    certificate_version: [] | [number];
}
export interface HttpResponse {
    body: Uint8Array | number[];
    headers: Array<HeaderField>;
    upgrade: [] | [boolean];
    streaming_strategy: [] | [StreamingStrategy];
    status_code: number;
}
export interface IdAliasCredentials {
    rp_id_alias_credential: SignedIdAlias;
    issuer_id_alias_credential: SignedIdAlias;
}
export interface IdRegFinishArg {
    authn_method: AuthnMethodData;
}
export type IdRegFinishError =
    | { NoRegistrationFlow: null }
    | { UnexpectedCall: { next_step: RegistrationFlowNextStep } }
    | { InvalidAuthnMethod: string }
    | { IdentityLimitReached: null }
    | { StorageError: string };
export interface IdRegFinishResult {
    identity_number: bigint;
}
export interface IdRegNextStepResult {
    next_step: RegistrationFlowNextStep;
}
export type IdRegStartError =
    | { InvalidCaller: null }
    | { AlreadyInProgress: null }
    | { RateLimitExceeded: null };
export interface IdentityAnchorInfo {
    devices: Array<DeviceWithUsage>;
    openid_credentials: [] | [Array<OpenIdCredential>];
    device_registration: [] | [DeviceRegistrationInfo];
}
export interface IdentityAuthnInfo {
    authn_methods: Array<AuthnMethod>;
    recovery_authn_methods: Array<AuthnMethod>;
}
export interface IdentityInfo {
    authn_methods: Array<AuthnMethodData>;
    metadata: MetadataMapV2;
    authn_method_registration: [] | [AuthnMethodRegistrationInfo];
    openid_credentials: [] | [Array<OpenIdCredential>];
}
export type IdentityInfoError =
    | { InternalCanisterError: string }
    | { Unauthorized: Principal };
export type IdentityMetadataReplaceError =
    | {
          InternalCanisterError: string;
      }
    | { Unauthorized: Principal }
    | {
          StorageSpaceExceeded: {
              space_required: bigint;
              space_available: bigint;
          };
      };
export type IdentityNumber = bigint;
export interface InternetIdentityInit {
    openid_google: [] | [[] | [OpenIdConfig]];
    assigned_user_number_range: [] | [[bigint, bigint]];
    archive_config: [] | [ArchiveConfig];
    canister_creation_cycles_cost: [] | [bigint];
    analytics_config: [] | [[] | [AnalyticsConfig]];
    related_origins: [] | [Array<string>];
    captcha_config: [] | [CaptchaConfig];
    register_rate_limit: [] | [RateLimitConfig];
}
export interface InternetIdentityStats {
    storage_layout_version: number;
    users_registered: bigint;
    assigned_user_number_range: [bigint, bigint];
    archive_info: ArchiveInfo;
    canister_creation_cycles_cost: bigint;
    event_aggregations: Array<[string, Array<[string, bigint]>]>;
}
export type Iss = string;
export type JWT = string;
export type KeyType =
    | { platform: null }
    | { seed_phrase: null }
    | { cross_platform: null }
    | { unknown: null }
    | { browser_storage_key: null };
export type MetadataMap = Array<
    [
        string,
        (
            | { map: MetadataMap }
            | { string: string }
            | { bytes: Uint8Array | number[] }
        )
    ]
>;
export type MetadataMapV2 = Array<
    [
        string,
        (
            | { Map: MetadataMapV2 }
            | { String: string }
            | { Bytes: Uint8Array | number[] }
        )
    ]
>;
export interface OpenIdConfig {
    client_id: string;
}
export interface OpenIdCredential {
    aud: Aud;
    iss: Iss;
    sub: Sub;
    metadata: MetadataMapV2;
    last_usage_timestamp: Timestamp;
}
export type OpenIdCredentialAddError =
    | {
          OpenIdCredentialAlreadyRegistered: null;
      }
    | { InternalCanisterError: string }
    | { Unauthorized: Principal }
    | { JwtVerificationFailed: null };
export type OpenIdCredentialKey = [Iss, Sub];
export type OpenIdCredentialRemoveError =
    | { InternalCanisterError: string }
    | { OpenIdCredentialNotFound: null }
    | { Unauthorized: Principal };
export type PrepareIdAliasError =
    | { InternalCanisterError: string }
    | { Unauthorized: Principal };
export interface PrepareIdAliasRequest {
    issuer: FrontendHostname;
    relying_party: FrontendHostname;
    identity_number: IdentityNumber;
}
export interface PreparedIdAlias {
    rp_id_alias_jwt: string;
    issuer_id_alias_jwt: string;
    canister_sig_pk_der: PublicKey;
}
export type PublicKey = Uint8Array | number[];
export interface PublicKeyAuthn {
    pubkey: PublicKey;
}
export type Purpose = { authentication: null } | { recovery: null };
export interface RateLimitConfig {
    max_tokens: bigint;
    time_per_token_ns: bigint;
}
export type RegisterResponse =
    | { bad_challenge: null }
    | { canister_full: null }
    | { registered: { user_number: UserNumber } };
export type RegistrationFlowNextStep =
    | {
          CheckCaptcha: { captcha_png_base64: string };
      }
    | { Finish: null };
export type Salt = Uint8Array | number[];
export type SessionKey = PublicKey;
export interface SignedDelegation {
    signature: Uint8Array | number[];
    delegation: Delegation;
}
export interface SignedIdAlias {
    credential_jws: string;
    id_alias: Principal;
    id_dapp: Principal;
}
export interface StreamingCallbackHttpResponse {
    token: [] | [Token];
    body: Uint8Array | number[];
}
export type StreamingStrategy = {
    Callback: { token: Token; callback: [Principal, string] };
};
export type Sub = string;
export type Timestamp = bigint;
export type Token = {};
export type UserKey = PublicKey;
export type UserNumber = bigint;
export type VerifyTentativeDeviceResponse =
    | {
          device_registration_mode_off: null;
      }
    | { verified: null }
    | { wrong_code: { retries_left: number } }
    | { no_device_to_verify: null };
export interface WebAuthn {
    pubkey: PublicKey;
    credential_id: CredentialId;
}
export interface WebAuthnCredential {
    pubkey: PublicKey;
    credential_id: CredentialId;
}
export interface _SERVICE {
    acknowledge_entries: ActorMethod<[bigint], undefined>;
    add: ActorMethod<[UserNumber, DeviceData], undefined>;
    add_tentative_device: ActorMethod<
        [UserNumber, DeviceData],
        AddTentativeDeviceResponse
    >;
    authn_method_add: ActorMethod<
        [IdentityNumber, AuthnMethodData],
        { Ok: null } | { Err: AuthnMethodAddError }
    >;
    authn_method_confirm: ActorMethod<
        [IdentityNumber, string],
        { Ok: null } | { Err: AuthnMethodConfirmationError }
    >;
    authn_method_metadata_replace: ActorMethod<
        [IdentityNumber, PublicKey, MetadataMapV2],
        { Ok: null } | { Err: AuthnMethodMetadataReplaceError }
    >;
    authn_method_register: ActorMethod<
        [IdentityNumber, AuthnMethodData],
        { Ok: AuthnMethodConfirmationCode } | { Err: AuthnMethodRegisterError }
    >;
    authn_method_registration_mode_enter: ActorMethod<
        [IdentityNumber],
        { Ok: { expiration: Timestamp } } | { Err: null }
    >;
    authn_method_registration_mode_exit: ActorMethod<
        [IdentityNumber],
        { Ok: null } | { Err: null }
    >;
    authn_method_remove: ActorMethod<
        [IdentityNumber, PublicKey],
        { Ok: null } | { Err: null }
    >;
    authn_method_replace: ActorMethod<
        [IdentityNumber, PublicKey, AuthnMethodData],
        { Ok: null } | { Err: AuthnMethodReplaceError }
    >;
    authn_method_security_settings_replace: ActorMethod<
        [IdentityNumber, PublicKey, AuthnMethodSecuritySettings],
        { Ok: null } | { Err: AuthnMethodSecuritySettingsReplaceError }
    >;
    check_captcha: ActorMethod<
        [CheckCaptchaArg],
        { Ok: IdRegNextStepResult } | { Err: CheckCaptchaError }
    >;
    config: ActorMethod<[], InternetIdentityInit>;
    create_challenge: ActorMethod<[], Challenge>;
    deploy_archive: ActorMethod<[Uint8Array | number[]], DeployArchiveResult>;
    enter_device_registration_mode: ActorMethod<[UserNumber], Timestamp>;
    exit_device_registration_mode: ActorMethod<[UserNumber], undefined>;
    fetch_entries: ActorMethod<[], Array<BufferedArchiveEntry>>;
    get_anchor_credentials: ActorMethod<[UserNumber], AnchorCredentials>;
    get_anchor_info: ActorMethod<[UserNumber], IdentityAnchorInfo>;
    get_delegation: ActorMethod<
        [UserNumber, FrontendHostname, SessionKey, Timestamp],
        GetDelegationResponse
    >;
    get_id_alias: ActorMethod<
        [GetIdAliasRequest],
        { Ok: IdAliasCredentials } | { Err: GetIdAliasError }
    >;
    get_principal: ActorMethod<[UserNumber, FrontendHostname], Principal>;
    http_request: ActorMethod<[HttpRequest], HttpResponse>;
    http_request_update: ActorMethod<[HttpRequest], HttpResponse>;
    identity_authn_info: ActorMethod<
        [IdentityNumber],
        { Ok: IdentityAuthnInfo } | { Err: null }
    >;
    identity_info: ActorMethod<
        [IdentityNumber],
        { Ok: IdentityInfo } | { Err: IdentityInfoError }
    >;
    identity_metadata_replace: ActorMethod<
        [IdentityNumber, MetadataMapV2],
        { Ok: null } | { Err: IdentityMetadataReplaceError }
    >;
    identity_registration_finish: ActorMethod<
        [IdRegFinishArg],
        { Ok: IdRegFinishResult } | { Err: IdRegFinishError }
    >;
    identity_registration_start: ActorMethod<
        [],
        { Ok: IdRegNextStepResult } | { Err: IdRegStartError }
    >;
    init_salt: ActorMethod<[], undefined>;
    lookup: ActorMethod<[UserNumber], Array<DeviceData>>;
    openid_credential_add: ActorMethod<
        [IdentityNumber, JWT, Salt],
        { Ok: null } | { Err: OpenIdCredentialAddError }
    >;
    openid_credential_remove: ActorMethod<
        [IdentityNumber, OpenIdCredentialKey],
        { Ok: null } | { Err: OpenIdCredentialRemoveError }
    >;
    prepare_delegation: ActorMethod<
        [UserNumber, FrontendHostname, SessionKey, [] | [bigint]],
        [UserKey, Timestamp]
    >;
    prepare_id_alias: ActorMethod<
        [PrepareIdAliasRequest],
        { Ok: PreparedIdAlias } | { Err: PrepareIdAliasError }
    >;
    register: ActorMethod<
        [DeviceData, ChallengeResult, [] | [Principal]],
        RegisterResponse
    >;
    remove: ActorMethod<[UserNumber, DeviceKey], undefined>;
    replace: ActorMethod<[UserNumber, DeviceKey, DeviceData], undefined>;
    stats: ActorMethod<[], InternetIdentityStats>;
    update: ActorMethod<[UserNumber, DeviceKey, DeviceData], undefined>;
    verify_tentative_device: ActorMethod<
        [UserNumber, string],
        VerifyTentativeDeviceResponse
    >;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const MetadataMap = IDL.Rec();
export const MetadataMapV2 = IDL.Rec();
export const OpenIdConfig = IDL.Record({ client_id: IDL.Text });
export const ArchiveConfig = IDL.Record({
    polling_interval_ns: IDL.Nat64,
    entries_buffer_limit: IDL.Nat64,
    module_hash: IDL.Vec(IDL.Nat8),
    entries_fetch_limit: IDL.Nat16
});
export const AnalyticsConfig = IDL.Variant({
    Plausible: IDL.Record({
        domain: IDL.Opt(IDL.Text),
        track_localhost: IDL.Opt(IDL.Bool),
        hash_mode: IDL.Opt(IDL.Bool),
        api_host: IDL.Opt(IDL.Text)
    })
});
export const CaptchaConfig = IDL.Record({
    max_unsolved_captchas: IDL.Nat64,
    captcha_trigger: IDL.Variant({
        Dynamic: IDL.Record({
            reference_rate_sampling_interval_s: IDL.Nat64,
            threshold_pct: IDL.Nat16,
            current_rate_sampling_interval_s: IDL.Nat64
        }),
        Static: IDL.Variant({
            CaptchaDisabled: IDL.Null,
            CaptchaEnabled: IDL.Null
        })
    })
});
export const RateLimitConfig = IDL.Record({
    max_tokens: IDL.Nat64,
    time_per_token_ns: IDL.Nat64
});
export const InternetIdentityInit = IDL.Record({
    openid_google: IDL.Opt(IDL.Opt(OpenIdConfig)),
    assigned_user_number_range: IDL.Opt(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
    archive_config: IDL.Opt(ArchiveConfig),
    canister_creation_cycles_cost: IDL.Opt(IDL.Nat64),
    analytics_config: IDL.Opt(IDL.Opt(AnalyticsConfig)),
    related_origins: IDL.Opt(IDL.Vec(IDL.Text)),
    captcha_config: IDL.Opt(CaptchaConfig),
    register_rate_limit: IDL.Opt(RateLimitConfig)
});
export const UserNumber = IDL.Nat64;
MetadataMap.fill(
    IDL.Vec(
        IDL.Tuple(
            IDL.Text,
            IDL.Variant({
                map: MetadataMap,
                string: IDL.Text,
                bytes: IDL.Vec(IDL.Nat8)
            })
        )
    )
);
export const DeviceProtection = IDL.Variant({
    unprotected: IDL.Null,
    protected: IDL.Null
});
export const PublicKey = IDL.Vec(IDL.Nat8);
export const DeviceKey = PublicKey;
export const KeyType = IDL.Variant({
    platform: IDL.Null,
    seed_phrase: IDL.Null,
    cross_platform: IDL.Null,
    unknown: IDL.Null,
    browser_storage_key: IDL.Null
});
export const Purpose = IDL.Variant({
    authentication: IDL.Null,
    recovery: IDL.Null
});
export const CredentialId = IDL.Vec(IDL.Nat8);
export const DeviceData = IDL.Record({
    alias: IDL.Text,
    metadata: IDL.Opt(MetadataMap),
    origin: IDL.Opt(IDL.Text),
    protection: DeviceProtection,
    pubkey: DeviceKey,
    key_type: KeyType,
    purpose: Purpose,
    credential_id: IDL.Opt(CredentialId)
});
export const Timestamp = IDL.Nat64;
export const AddTentativeDeviceResponse = IDL.Variant({
    device_registration_mode_off: IDL.Null,
    another_device_tentatively_added: IDL.Null,
    added_tentatively: IDL.Record({
        verification_code: IDL.Text,
        device_registration_timeout: Timestamp
    })
});
export const IdentityNumber = IDL.Nat64;
export const AuthnMethodProtection = IDL.Variant({
    Protected: IDL.Null,
    Unprotected: IDL.Null
});
export const AuthnMethodPurpose = IDL.Variant({
    Recovery: IDL.Null,
    Authentication: IDL.Null
});
export const AuthnMethodSecuritySettings = IDL.Record({
    protection: AuthnMethodProtection,
    purpose: AuthnMethodPurpose
});
MetadataMapV2.fill(
    IDL.Vec(
        IDL.Tuple(
            IDL.Text,
            IDL.Variant({
                Map: MetadataMapV2,
                String: IDL.Text,
                Bytes: IDL.Vec(IDL.Nat8)
            })
        )
    )
);
export const PublicKeyAuthn = IDL.Record({ pubkey: PublicKey });
export const WebAuthn = IDL.Record({
    pubkey: PublicKey,
    credential_id: CredentialId
});
export const AuthnMethod = IDL.Variant({
    PubKey: PublicKeyAuthn,
    WebAuthn: WebAuthn
});
export const AuthnMethodData = IDL.Record({
    security_settings: AuthnMethodSecuritySettings,
    metadata: MetadataMapV2,
    last_authentication: IDL.Opt(Timestamp),
    authn_method: AuthnMethod
});
export const AuthnMethodAddError = IDL.Variant({
    InvalidMetadata: IDL.Text
});
export const AuthnMethodConfirmationError = IDL.Variant({
    RegistrationModeOff: IDL.Null,
    NoAuthnMethodToConfirm: IDL.Null,
    WrongCode: IDL.Record({ retries_left: IDL.Nat8 })
});
export const AuthnMethodMetadataReplaceError = IDL.Variant({
    AuthnMethodNotFound: IDL.Null,
    InvalidMetadata: IDL.Text
});
export const AuthnMethodConfirmationCode = IDL.Record({
    confirmation_code: IDL.Text,
    expiration: Timestamp
});
export const AuthnMethodRegisterError = IDL.Variant({
    RegistrationModeOff: IDL.Null,
    RegistrationAlreadyInProgress: IDL.Null,
    InvalidMetadata: IDL.Text
});
export const AuthnMethodReplaceError = IDL.Variant({
    AuthnMethodNotFound: IDL.Null,
    InvalidMetadata: IDL.Text
});
export const AuthnMethodSecuritySettingsReplaceError = IDL.Variant({
    AuthnMethodNotFound: IDL.Null
});
export const CheckCaptchaArg = IDL.Record({ solution: IDL.Text });
export const RegistrationFlowNextStep = IDL.Variant({
    CheckCaptcha: IDL.Record({ captcha_png_base64: IDL.Text }),
    Finish: IDL.Null
});
export const IdRegNextStepResult = IDL.Record({
    next_step: RegistrationFlowNextStep
});
export const CheckCaptchaError = IDL.Variant({
    NoRegistrationFlow: IDL.Null,
    UnexpectedCall: IDL.Record({ next_step: RegistrationFlowNextStep }),
    WrongSolution: IDL.Record({ new_captcha_png_base64: IDL.Text })
});
export const ChallengeKey = IDL.Text;
export const Challenge = IDL.Record({
    png_base64: IDL.Text,
    challenge_key: ChallengeKey
});
export const DeployArchiveResult = IDL.Variant({
    creation_in_progress: IDL.Null,
    success: IDL.Principal,
    failed: IDL.Text
});
export const BufferedArchiveEntry = IDL.Record({
    sequence_number: IDL.Nat64,
    entry: IDL.Vec(IDL.Nat8),
    anchor_number: UserNumber,
    timestamp: Timestamp
});
export const WebAuthnCredential = IDL.Record({
    pubkey: PublicKey,
    credential_id: CredentialId
});
export const AnchorCredentials = IDL.Record({
    recovery_phrases: IDL.Vec(PublicKey),
    credentials: IDL.Vec(WebAuthnCredential),
    recovery_credentials: IDL.Vec(WebAuthnCredential)
});
export const DeviceWithUsage = IDL.Record({
    alias: IDL.Text,
    last_usage: IDL.Opt(Timestamp),
    metadata: IDL.Opt(MetadataMap),
    origin: IDL.Opt(IDL.Text),
    protection: DeviceProtection,
    pubkey: DeviceKey,
    key_type: KeyType,
    purpose: Purpose,
    credential_id: IDL.Opt(CredentialId)
});
export const Aud = IDL.Text;
export const Iss = IDL.Text;
export const Sub = IDL.Text;
export const OpenIdCredential = IDL.Record({
    aud: Aud,
    iss: Iss,
    sub: Sub,
    metadata: MetadataMapV2,
    last_usage_timestamp: Timestamp
});
export const DeviceRegistrationInfo = IDL.Record({
    tentative_device: IDL.Opt(DeviceData),
    expiration: Timestamp
});
export const IdentityAnchorInfo = IDL.Record({
    devices: IDL.Vec(DeviceWithUsage),
    openid_credentials: IDL.Opt(IDL.Vec(OpenIdCredential)),
    device_registration: IDL.Opt(DeviceRegistrationInfo)
});
export const FrontendHostname = IDL.Text;
export const SessionKey = PublicKey;
export const Delegation = IDL.Record({
    pubkey: PublicKey,
    targets: IDL.Opt(IDL.Vec(IDL.Principal)),
    expiration: Timestamp
});
export const SignedDelegation = IDL.Record({
    signature: IDL.Vec(IDL.Nat8),
    delegation: Delegation
});
export const GetDelegationResponse = IDL.Variant({
    no_such_delegation: IDL.Null,
    signed_delegation: SignedDelegation
});
export const GetIdAliasRequest = IDL.Record({
    rp_id_alias_jwt: IDL.Text,
    issuer: FrontendHostname,
    issuer_id_alias_jwt: IDL.Text,
    relying_party: FrontendHostname,
    identity_number: IdentityNumber
});
export const SignedIdAlias = IDL.Record({
    credential_jws: IDL.Text,
    id_alias: IDL.Principal,
    id_dapp: IDL.Principal
});
export const IdAliasCredentials = IDL.Record({
    rp_id_alias_credential: SignedIdAlias,
    issuer_id_alias_credential: SignedIdAlias
});
export const GetIdAliasError = IDL.Variant({
    InternalCanisterError: IDL.Text,
    Unauthorized: IDL.Principal,
    NoSuchCredentials: IDL.Text
});
export const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
export const HttpRequest = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    certificate_version: IDL.Opt(IDL.Nat16)
});
export const Token = IDL.Record({});
export const StreamingCallbackHttpResponse = IDL.Record({
    token: IDL.Opt(Token),
    body: IDL.Vec(IDL.Nat8)
});
export const StreamingStrategy = IDL.Variant({
    Callback: IDL.Record({
        token: Token,
        callback: IDL.Func([Token], [StreamingCallbackHttpResponse], ['query'])
    })
});
export const HttpResponse = IDL.Record({
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    upgrade: IDL.Opt(IDL.Bool),
    streaming_strategy: IDL.Opt(StreamingStrategy),
    status_code: IDL.Nat16
});
export const IdentityAuthnInfo = IDL.Record({
    authn_methods: IDL.Vec(AuthnMethod),
    recovery_authn_methods: IDL.Vec(AuthnMethod)
});
export const AuthnMethodRegistrationInfo = IDL.Record({
    expiration: Timestamp,
    authn_method: IDL.Opt(AuthnMethodData)
});
export const IdentityInfo = IDL.Record({
    authn_methods: IDL.Vec(AuthnMethodData),
    metadata: MetadataMapV2,
    authn_method_registration: IDL.Opt(AuthnMethodRegistrationInfo),
    openid_credentials: IDL.Opt(IDL.Vec(OpenIdCredential))
});
export const IdentityInfoError = IDL.Variant({
    InternalCanisterError: IDL.Text,
    Unauthorized: IDL.Principal
});
export const IdentityMetadataReplaceError = IDL.Variant({
    InternalCanisterError: IDL.Text,
    Unauthorized: IDL.Principal,
    StorageSpaceExceeded: IDL.Record({
        space_required: IDL.Nat64,
        space_available: IDL.Nat64
    })
});
export const IdRegFinishArg = IDL.Record({ authn_method: AuthnMethodData });
export const IdRegFinishResult = IDL.Record({ identity_number: IDL.Nat64 });
export const IdRegFinishError = IDL.Variant({
    NoRegistrationFlow: IDL.Null,
    UnexpectedCall: IDL.Record({ next_step: RegistrationFlowNextStep }),
    InvalidAuthnMethod: IDL.Text,
    IdentityLimitReached: IDL.Null,
    StorageError: IDL.Text
});
export const IdRegStartError = IDL.Variant({
    InvalidCaller: IDL.Null,
    AlreadyInProgress: IDL.Null,
    RateLimitExceeded: IDL.Null
});
export const JWT = IDL.Text;
export const Salt = IDL.Vec(IDL.Nat8);
export const OpenIdCredentialAddError = IDL.Variant({
    OpenIdCredentialAlreadyRegistered: IDL.Null,
    InternalCanisterError: IDL.Text,
    Unauthorized: IDL.Principal,
    JwtVerificationFailed: IDL.Null
});
export const OpenIdCredentialKey = IDL.Tuple(Iss, Sub);
export const OpenIdCredentialRemoveError = IDL.Variant({
    InternalCanisterError: IDL.Text,
    OpenIdCredentialNotFound: IDL.Null,
    Unauthorized: IDL.Principal
});
export const UserKey = PublicKey;
export const PrepareIdAliasRequest = IDL.Record({
    issuer: FrontendHostname,
    relying_party: FrontendHostname,
    identity_number: IdentityNumber
});
export const PreparedIdAlias = IDL.Record({
    rp_id_alias_jwt: IDL.Text,
    issuer_id_alias_jwt: IDL.Text,
    canister_sig_pk_der: PublicKey
});
export const PrepareIdAliasError = IDL.Variant({
    InternalCanisterError: IDL.Text,
    Unauthorized: IDL.Principal
});
export const ChallengeResult = IDL.Record({
    key: ChallengeKey,
    chars: IDL.Text
});
export const RegisterResponse = IDL.Variant({
    bad_challenge: IDL.Null,
    canister_full: IDL.Null,
    registered: IDL.Record({ user_number: UserNumber })
});
export const ArchiveInfo = IDL.Record({
    archive_config: IDL.Opt(ArchiveConfig),
    archive_canister: IDL.Opt(IDL.Principal)
});
export const InternetIdentityStats = IDL.Record({
    storage_layout_version: IDL.Nat8,
    users_registered: IDL.Nat64,
    assigned_user_number_range: IDL.Tuple(IDL.Nat64, IDL.Nat64),
    archive_info: ArchiveInfo,
    canister_creation_cycles_cost: IDL.Nat64,
    event_aggregations: IDL.Vec(
        IDL.Tuple(IDL.Text, IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat64)))
    )
});
export const VerifyTentativeDeviceResponse = IDL.Variant({
    device_registration_mode_off: IDL.Null,
    verified: IDL.Null,
    wrong_code: IDL.Record({ retries_left: IDL.Nat8 }),
    no_device_to_verify: IDL.Null
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const MetadataMap = IDL.Rec();
    const MetadataMapV2 = IDL.Rec();
    const OpenIdConfig = IDL.Record({ client_id: IDL.Text });
    const ArchiveConfig = IDL.Record({
        polling_interval_ns: IDL.Nat64,
        entries_buffer_limit: IDL.Nat64,
        module_hash: IDL.Vec(IDL.Nat8),
        entries_fetch_limit: IDL.Nat16
    });
    const AnalyticsConfig = IDL.Variant({
        Plausible: IDL.Record({
            domain: IDL.Opt(IDL.Text),
            track_localhost: IDL.Opt(IDL.Bool),
            hash_mode: IDL.Opt(IDL.Bool),
            api_host: IDL.Opt(IDL.Text)
        })
    });
    const CaptchaConfig = IDL.Record({
        max_unsolved_captchas: IDL.Nat64,
        captcha_trigger: IDL.Variant({
            Dynamic: IDL.Record({
                reference_rate_sampling_interval_s: IDL.Nat64,
                threshold_pct: IDL.Nat16,
                current_rate_sampling_interval_s: IDL.Nat64
            }),
            Static: IDL.Variant({
                CaptchaDisabled: IDL.Null,
                CaptchaEnabled: IDL.Null
            })
        })
    });
    const RateLimitConfig = IDL.Record({
        max_tokens: IDL.Nat64,
        time_per_token_ns: IDL.Nat64
    });
    const InternetIdentityInit = IDL.Record({
        openid_google: IDL.Opt(IDL.Opt(OpenIdConfig)),
        assigned_user_number_range: IDL.Opt(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
        archive_config: IDL.Opt(ArchiveConfig),
        canister_creation_cycles_cost: IDL.Opt(IDL.Nat64),
        analytics_config: IDL.Opt(IDL.Opt(AnalyticsConfig)),
        related_origins: IDL.Opt(IDL.Vec(IDL.Text)),
        captcha_config: IDL.Opt(CaptchaConfig),
        register_rate_limit: IDL.Opt(RateLimitConfig)
    });
    const UserNumber = IDL.Nat64;
    MetadataMap.fill(
        IDL.Vec(
            IDL.Tuple(
                IDL.Text,
                IDL.Variant({
                    map: MetadataMap,
                    string: IDL.Text,
                    bytes: IDL.Vec(IDL.Nat8)
                })
            )
        )
    );
    const DeviceProtection = IDL.Variant({
        unprotected: IDL.Null,
        protected: IDL.Null
    });
    const PublicKey = IDL.Vec(IDL.Nat8);
    const DeviceKey = PublicKey;
    const KeyType = IDL.Variant({
        platform: IDL.Null,
        seed_phrase: IDL.Null,
        cross_platform: IDL.Null,
        unknown: IDL.Null,
        browser_storage_key: IDL.Null
    });
    const Purpose = IDL.Variant({
        authentication: IDL.Null,
        recovery: IDL.Null
    });
    const CredentialId = IDL.Vec(IDL.Nat8);
    const DeviceData = IDL.Record({
        alias: IDL.Text,
        metadata: IDL.Opt(MetadataMap),
        origin: IDL.Opt(IDL.Text),
        protection: DeviceProtection,
        pubkey: DeviceKey,
        key_type: KeyType,
        purpose: Purpose,
        credential_id: IDL.Opt(CredentialId)
    });
    const Timestamp = IDL.Nat64;
    const AddTentativeDeviceResponse = IDL.Variant({
        device_registration_mode_off: IDL.Null,
        another_device_tentatively_added: IDL.Null,
        added_tentatively: IDL.Record({
            verification_code: IDL.Text,
            device_registration_timeout: Timestamp
        })
    });
    const IdentityNumber = IDL.Nat64;
    const AuthnMethodProtection = IDL.Variant({
        Protected: IDL.Null,
        Unprotected: IDL.Null
    });
    const AuthnMethodPurpose = IDL.Variant({
        Recovery: IDL.Null,
        Authentication: IDL.Null
    });
    const AuthnMethodSecuritySettings = IDL.Record({
        protection: AuthnMethodProtection,
        purpose: AuthnMethodPurpose
    });
    MetadataMapV2.fill(
        IDL.Vec(
            IDL.Tuple(
                IDL.Text,
                IDL.Variant({
                    Map: MetadataMapV2,
                    String: IDL.Text,
                    Bytes: IDL.Vec(IDL.Nat8)
                })
            )
        )
    );
    const PublicKeyAuthn = IDL.Record({ pubkey: PublicKey });
    const WebAuthn = IDL.Record({
        pubkey: PublicKey,
        credential_id: CredentialId
    });
    const AuthnMethod = IDL.Variant({
        PubKey: PublicKeyAuthn,
        WebAuthn: WebAuthn
    });
    const AuthnMethodData = IDL.Record({
        security_settings: AuthnMethodSecuritySettings,
        metadata: MetadataMapV2,
        last_authentication: IDL.Opt(Timestamp),
        authn_method: AuthnMethod
    });
    const AuthnMethodAddError = IDL.Variant({ InvalidMetadata: IDL.Text });
    const AuthnMethodConfirmationError = IDL.Variant({
        RegistrationModeOff: IDL.Null,
        NoAuthnMethodToConfirm: IDL.Null,
        WrongCode: IDL.Record({ retries_left: IDL.Nat8 })
    });
    const AuthnMethodMetadataReplaceError = IDL.Variant({
        AuthnMethodNotFound: IDL.Null,
        InvalidMetadata: IDL.Text
    });
    const AuthnMethodConfirmationCode = IDL.Record({
        confirmation_code: IDL.Text,
        expiration: Timestamp
    });
    const AuthnMethodRegisterError = IDL.Variant({
        RegistrationModeOff: IDL.Null,
        RegistrationAlreadyInProgress: IDL.Null,
        InvalidMetadata: IDL.Text
    });
    const AuthnMethodReplaceError = IDL.Variant({
        AuthnMethodNotFound: IDL.Null,
        InvalidMetadata: IDL.Text
    });
    const AuthnMethodSecuritySettingsReplaceError = IDL.Variant({
        AuthnMethodNotFound: IDL.Null
    });
    const CheckCaptchaArg = IDL.Record({ solution: IDL.Text });
    const RegistrationFlowNextStep = IDL.Variant({
        CheckCaptcha: IDL.Record({ captcha_png_base64: IDL.Text }),
        Finish: IDL.Null
    });
    const IdRegNextStepResult = IDL.Record({
        next_step: RegistrationFlowNextStep
    });
    const CheckCaptchaError = IDL.Variant({
        NoRegistrationFlow: IDL.Null,
        UnexpectedCall: IDL.Record({ next_step: RegistrationFlowNextStep }),
        WrongSolution: IDL.Record({ new_captcha_png_base64: IDL.Text })
    });
    const ChallengeKey = IDL.Text;
    const Challenge = IDL.Record({
        png_base64: IDL.Text,
        challenge_key: ChallengeKey
    });
    const DeployArchiveResult = IDL.Variant({
        creation_in_progress: IDL.Null,
        success: IDL.Principal,
        failed: IDL.Text
    });
    const BufferedArchiveEntry = IDL.Record({
        sequence_number: IDL.Nat64,
        entry: IDL.Vec(IDL.Nat8),
        anchor_number: UserNumber,
        timestamp: Timestamp
    });
    const WebAuthnCredential = IDL.Record({
        pubkey: PublicKey,
        credential_id: CredentialId
    });
    const AnchorCredentials = IDL.Record({
        recovery_phrases: IDL.Vec(PublicKey),
        credentials: IDL.Vec(WebAuthnCredential),
        recovery_credentials: IDL.Vec(WebAuthnCredential)
    });
    const DeviceWithUsage = IDL.Record({
        alias: IDL.Text,
        last_usage: IDL.Opt(Timestamp),
        metadata: IDL.Opt(MetadataMap),
        origin: IDL.Opt(IDL.Text),
        protection: DeviceProtection,
        pubkey: DeviceKey,
        key_type: KeyType,
        purpose: Purpose,
        credential_id: IDL.Opt(CredentialId)
    });
    const Aud = IDL.Text;
    const Iss = IDL.Text;
    const Sub = IDL.Text;
    const OpenIdCredential = IDL.Record({
        aud: Aud,
        iss: Iss,
        sub: Sub,
        metadata: MetadataMapV2,
        last_usage_timestamp: Timestamp
    });
    const DeviceRegistrationInfo = IDL.Record({
        tentative_device: IDL.Opt(DeviceData),
        expiration: Timestamp
    });
    const IdentityAnchorInfo = IDL.Record({
        devices: IDL.Vec(DeviceWithUsage),
        openid_credentials: IDL.Opt(IDL.Vec(OpenIdCredential)),
        device_registration: IDL.Opt(DeviceRegistrationInfo)
    });
    const FrontendHostname = IDL.Text;
    const SessionKey = PublicKey;
    const Delegation = IDL.Record({
        pubkey: PublicKey,
        targets: IDL.Opt(IDL.Vec(IDL.Principal)),
        expiration: Timestamp
    });
    const SignedDelegation = IDL.Record({
        signature: IDL.Vec(IDL.Nat8),
        delegation: Delegation
    });
    const GetDelegationResponse = IDL.Variant({
        no_such_delegation: IDL.Null,
        signed_delegation: SignedDelegation
    });
    const GetIdAliasRequest = IDL.Record({
        rp_id_alias_jwt: IDL.Text,
        issuer: FrontendHostname,
        issuer_id_alias_jwt: IDL.Text,
        relying_party: FrontendHostname,
        identity_number: IdentityNumber
    });
    const SignedIdAlias = IDL.Record({
        credential_jws: IDL.Text,
        id_alias: IDL.Principal,
        id_dapp: IDL.Principal
    });
    const IdAliasCredentials = IDL.Record({
        rp_id_alias_credential: SignedIdAlias,
        issuer_id_alias_credential: SignedIdAlias
    });
    const GetIdAliasError = IDL.Variant({
        InternalCanisterError: IDL.Text,
        Unauthorized: IDL.Principal,
        NoSuchCredentials: IDL.Text
    });
    const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
    const HttpRequest = IDL.Record({
        url: IDL.Text,
        method: IDL.Text,
        body: IDL.Vec(IDL.Nat8),
        headers: IDL.Vec(HeaderField),
        certificate_version: IDL.Opt(IDL.Nat16)
    });
    const Token = IDL.Record({});
    const StreamingCallbackHttpResponse = IDL.Record({
        token: IDL.Opt(Token),
        body: IDL.Vec(IDL.Nat8)
    });
    const StreamingStrategy = IDL.Variant({
        Callback: IDL.Record({
            token: Token,
            callback: IDL.Func(
                [Token],
                [StreamingCallbackHttpResponse],
                ['query']
            )
        })
    });
    const HttpResponse = IDL.Record({
        body: IDL.Vec(IDL.Nat8),
        headers: IDL.Vec(HeaderField),
        upgrade: IDL.Opt(IDL.Bool),
        streaming_strategy: IDL.Opt(StreamingStrategy),
        status_code: IDL.Nat16
    });
    const IdentityAuthnInfo = IDL.Record({
        authn_methods: IDL.Vec(AuthnMethod),
        recovery_authn_methods: IDL.Vec(AuthnMethod)
    });
    const AuthnMethodRegistrationInfo = IDL.Record({
        expiration: Timestamp,
        authn_method: IDL.Opt(AuthnMethodData)
    });
    const IdentityInfo = IDL.Record({
        authn_methods: IDL.Vec(AuthnMethodData),
        metadata: MetadataMapV2,
        authn_method_registration: IDL.Opt(AuthnMethodRegistrationInfo),
        openid_credentials: IDL.Opt(IDL.Vec(OpenIdCredential))
    });
    const IdentityInfoError = IDL.Variant({
        InternalCanisterError: IDL.Text,
        Unauthorized: IDL.Principal
    });
    const IdentityMetadataReplaceError = IDL.Variant({
        InternalCanisterError: IDL.Text,
        Unauthorized: IDL.Principal,
        StorageSpaceExceeded: IDL.Record({
            space_required: IDL.Nat64,
            space_available: IDL.Nat64
        })
    });
    const IdRegFinishArg = IDL.Record({ authn_method: AuthnMethodData });
    const IdRegFinishResult = IDL.Record({ identity_number: IDL.Nat64 });
    const IdRegFinishError = IDL.Variant({
        NoRegistrationFlow: IDL.Null,
        UnexpectedCall: IDL.Record({ next_step: RegistrationFlowNextStep }),
        InvalidAuthnMethod: IDL.Text,
        IdentityLimitReached: IDL.Null,
        StorageError: IDL.Text
    });
    const IdRegStartError = IDL.Variant({
        InvalidCaller: IDL.Null,
        AlreadyInProgress: IDL.Null,
        RateLimitExceeded: IDL.Null
    });
    const JWT = IDL.Text;
    const Salt = IDL.Vec(IDL.Nat8);
    const OpenIdCredentialAddError = IDL.Variant({
        OpenIdCredentialAlreadyRegistered: IDL.Null,
        InternalCanisterError: IDL.Text,
        Unauthorized: IDL.Principal,
        JwtVerificationFailed: IDL.Null
    });
    const OpenIdCredentialKey = IDL.Tuple(Iss, Sub);
    const OpenIdCredentialRemoveError = IDL.Variant({
        InternalCanisterError: IDL.Text,
        OpenIdCredentialNotFound: IDL.Null,
        Unauthorized: IDL.Principal
    });
    const UserKey = PublicKey;
    const PrepareIdAliasRequest = IDL.Record({
        issuer: FrontendHostname,
        relying_party: FrontendHostname,
        identity_number: IdentityNumber
    });
    const PreparedIdAlias = IDL.Record({
        rp_id_alias_jwt: IDL.Text,
        issuer_id_alias_jwt: IDL.Text,
        canister_sig_pk_der: PublicKey
    });
    const PrepareIdAliasError = IDL.Variant({
        InternalCanisterError: IDL.Text,
        Unauthorized: IDL.Principal
    });
    const ChallengeResult = IDL.Record({
        key: ChallengeKey,
        chars: IDL.Text
    });
    const RegisterResponse = IDL.Variant({
        bad_challenge: IDL.Null,
        canister_full: IDL.Null,
        registered: IDL.Record({ user_number: UserNumber })
    });
    const ArchiveInfo = IDL.Record({
        archive_config: IDL.Opt(ArchiveConfig),
        archive_canister: IDL.Opt(IDL.Principal)
    });
    const InternetIdentityStats = IDL.Record({
        storage_layout_version: IDL.Nat8,
        users_registered: IDL.Nat64,
        assigned_user_number_range: IDL.Tuple(IDL.Nat64, IDL.Nat64),
        archive_info: ArchiveInfo,
        canister_creation_cycles_cost: IDL.Nat64,
        event_aggregations: IDL.Vec(
            IDL.Tuple(IDL.Text, IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat64)))
        )
    });
    const VerifyTentativeDeviceResponse = IDL.Variant({
        device_registration_mode_off: IDL.Null,
        verified: IDL.Null,
        wrong_code: IDL.Record({ retries_left: IDL.Nat8 }),
        no_device_to_verify: IDL.Null
    });
    return IDL.Service({
        acknowledge_entries: IDL.Func([IDL.Nat64], [], []),
        add: IDL.Func([UserNumber, DeviceData], [], []),
        add_tentative_device: IDL.Func(
            [UserNumber, DeviceData],
            [AddTentativeDeviceResponse],
            []
        ),
        authn_method_add: IDL.Func(
            [IdentityNumber, AuthnMethodData],
            [IDL.Variant({ Ok: IDL.Null, Err: AuthnMethodAddError })],
            []
        ),
        authn_method_confirm: IDL.Func(
            [IdentityNumber, IDL.Text],
            [
                IDL.Variant({
                    Ok: IDL.Null,
                    Err: AuthnMethodConfirmationError
                })
            ],
            []
        ),
        authn_method_metadata_replace: IDL.Func(
            [IdentityNumber, PublicKey, MetadataMapV2],
            [
                IDL.Variant({
                    Ok: IDL.Null,
                    Err: AuthnMethodMetadataReplaceError
                })
            ],
            []
        ),
        authn_method_register: IDL.Func(
            [IdentityNumber, AuthnMethodData],
            [
                IDL.Variant({
                    Ok: AuthnMethodConfirmationCode,
                    Err: AuthnMethodRegisterError
                })
            ],
            []
        ),
        authn_method_registration_mode_enter: IDL.Func(
            [IdentityNumber],
            [
                IDL.Variant({
                    Ok: IDL.Record({ expiration: Timestamp }),
                    Err: IDL.Null
                })
            ],
            []
        ),
        authn_method_registration_mode_exit: IDL.Func(
            [IdentityNumber],
            [IDL.Variant({ Ok: IDL.Null, Err: IDL.Null })],
            []
        ),
        authn_method_remove: IDL.Func(
            [IdentityNumber, PublicKey],
            [IDL.Variant({ Ok: IDL.Null, Err: IDL.Null })],
            []
        ),
        authn_method_replace: IDL.Func(
            [IdentityNumber, PublicKey, AuthnMethodData],
            [IDL.Variant({ Ok: IDL.Null, Err: AuthnMethodReplaceError })],
            []
        ),
        authn_method_security_settings_replace: IDL.Func(
            [IdentityNumber, PublicKey, AuthnMethodSecuritySettings],
            [
                IDL.Variant({
                    Ok: IDL.Null,
                    Err: AuthnMethodSecuritySettingsReplaceError
                })
            ],
            []
        ),
        check_captcha: IDL.Func(
            [CheckCaptchaArg],
            [
                IDL.Variant({
                    Ok: IdRegNextStepResult,
                    Err: CheckCaptchaError
                })
            ],
            []
        ),
        config: IDL.Func([], [InternetIdentityInit], ['query']),
        create_challenge: IDL.Func([], [Challenge], []),
        deploy_archive: IDL.Func(
            [IDL.Vec(IDL.Nat8)],
            [DeployArchiveResult],
            []
        ),
        enter_device_registration_mode: IDL.Func([UserNumber], [Timestamp], []),
        exit_device_registration_mode: IDL.Func([UserNumber], [], []),
        fetch_entries: IDL.Func([], [IDL.Vec(BufferedArchiveEntry)], []),
        get_anchor_credentials: IDL.Func(
            [UserNumber],
            [AnchorCredentials],
            ['query']
        ),
        get_anchor_info: IDL.Func([UserNumber], [IdentityAnchorInfo], []),
        get_delegation: IDL.Func(
            [UserNumber, FrontendHostname, SessionKey, Timestamp],
            [GetDelegationResponse],
            ['query']
        ),
        get_id_alias: IDL.Func(
            [GetIdAliasRequest],
            [IDL.Variant({ Ok: IdAliasCredentials, Err: GetIdAliasError })],
            ['query']
        ),
        get_principal: IDL.Func(
            [UserNumber, FrontendHostname],
            [IDL.Principal],
            ['query']
        ),
        http_request: IDL.Func([HttpRequest], [HttpResponse], ['query']),
        http_request_update: IDL.Func([HttpRequest], [HttpResponse], []),
        identity_authn_info: IDL.Func(
            [IdentityNumber],
            [IDL.Variant({ Ok: IdentityAuthnInfo, Err: IDL.Null })],
            ['query']
        ),
        identity_info: IDL.Func(
            [IdentityNumber],
            [IDL.Variant({ Ok: IdentityInfo, Err: IdentityInfoError })],
            []
        ),
        identity_metadata_replace: IDL.Func(
            [IdentityNumber, MetadataMapV2],
            [
                IDL.Variant({
                    Ok: IDL.Null,
                    Err: IdentityMetadataReplaceError
                })
            ],
            []
        ),
        identity_registration_finish: IDL.Func(
            [IdRegFinishArg],
            [IDL.Variant({ Ok: IdRegFinishResult, Err: IdRegFinishError })],
            []
        ),
        identity_registration_start: IDL.Func(
            [],
            [IDL.Variant({ Ok: IdRegNextStepResult, Err: IdRegStartError })],
            []
        ),
        init_salt: IDL.Func([], [], []),
        lookup: IDL.Func([UserNumber], [IDL.Vec(DeviceData)], ['query']),
        openid_credential_add: IDL.Func(
            [IdentityNumber, JWT, Salt],
            [IDL.Variant({ Ok: IDL.Null, Err: OpenIdCredentialAddError })],
            []
        ),
        openid_credential_remove: IDL.Func(
            [IdentityNumber, OpenIdCredentialKey],
            [IDL.Variant({ Ok: IDL.Null, Err: OpenIdCredentialRemoveError })],
            []
        ),
        prepare_delegation: IDL.Func(
            [UserNumber, FrontendHostname, SessionKey, IDL.Opt(IDL.Nat64)],
            [UserKey, Timestamp],
            []
        ),
        prepare_id_alias: IDL.Func(
            [PrepareIdAliasRequest],
            [IDL.Variant({ Ok: PreparedIdAlias, Err: PrepareIdAliasError })],
            []
        ),
        register: IDL.Func(
            [DeviceData, ChallengeResult, IDL.Opt(IDL.Principal)],
            [RegisterResponse],
            []
        ),
        remove: IDL.Func([UserNumber, DeviceKey], [], []),
        replace: IDL.Func([UserNumber, DeviceKey, DeviceData], [], []),
        stats: IDL.Func([], [InternetIdentityStats], ['query']),
        update: IDL.Func([UserNumber, DeviceKey, DeviceData], [], []),
        verify_tentative_device: IDL.Func(
            [UserNumber, IDL.Text],
            [VerifyTentativeDeviceResponse],
            []
        )
    });
};
export const init: init = ({ IDL }) => {
    const OpenIdConfig = IDL.Record({ client_id: IDL.Text });
    const ArchiveConfig = IDL.Record({
        polling_interval_ns: IDL.Nat64,
        entries_buffer_limit: IDL.Nat64,
        module_hash: IDL.Vec(IDL.Nat8),
        entries_fetch_limit: IDL.Nat16
    });
    const AnalyticsConfig = IDL.Variant({
        Plausible: IDL.Record({
            domain: IDL.Opt(IDL.Text),
            track_localhost: IDL.Opt(IDL.Bool),
            hash_mode: IDL.Opt(IDL.Bool),
            api_host: IDL.Opt(IDL.Text)
        })
    });
    const CaptchaConfig = IDL.Record({
        max_unsolved_captchas: IDL.Nat64,
        captcha_trigger: IDL.Variant({
            Dynamic: IDL.Record({
                reference_rate_sampling_interval_s: IDL.Nat64,
                threshold_pct: IDL.Nat16,
                current_rate_sampling_interval_s: IDL.Nat64
            }),
            Static: IDL.Variant({
                CaptchaDisabled: IDL.Null,
                CaptchaEnabled: IDL.Null
            })
        })
    });
    const RateLimitConfig = IDL.Record({
        max_tokens: IDL.Nat64,
        time_per_token_ns: IDL.Nat64
    });
    const InternetIdentityInit = IDL.Record({
        openid_google: IDL.Opt(IDL.Opt(OpenIdConfig)),
        assigned_user_number_range: IDL.Opt(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
        archive_config: IDL.Opt(ArchiveConfig),
        canister_creation_cycles_cost: IDL.Opt(IDL.Nat64),
        analytics_config: IDL.Opt(IDL.Opt(AnalyticsConfig)),
        related_origins: IDL.Opt(IDL.Vec(IDL.Text)),
        captcha_config: IDL.Opt(CaptchaConfig),
        register_rate_limit: IDL.Opt(RateLimitConfig)
    });
    return [IDL.Opt(InternetIdentityInit)];
};

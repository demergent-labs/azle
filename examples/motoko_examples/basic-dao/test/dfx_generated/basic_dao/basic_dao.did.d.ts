import type { Principal } from '@dfinity/principal';
export interface Account {
    owner: Principal;
    tokens: Tokens;
}
export interface Proposal {
    id: bigint;
    votes_no: Tokens;
    voters: Array<Principal>;
    state: ProposalState;
    timestamp: bigint;
    proposer: Principal;
    votes_yes: Tokens;
    payload: ProposalPayload;
}
export interface ProposalPayload {
    method: string;
    canister_id: Principal;
    message: Array<number>;
}
export type ProposalState =
    | { open: null }
    | { rejected: null }
    | { executing: null }
    | { accepted: null }
    | { failed: string }
    | { succeeded: null };
export type SubmitProposalResult = { ok: bigint } | { err: string };
export interface SystemParams {
    transfer_fee: Tokens;
    proposal_vote_threshold: Tokens;
    proposal_submission_deposit: Tokens;
}
export interface Tokens {
    amount_e8s: bigint;
}
export interface TransferArgs {
    to: Principal;
    amount: { amount_e8s: bigint };
}
export type TransferResult = { ok: bigint } | { err: string };
export interface UpdateSystemParamsPayload {
    transfer_fee: [] | [Tokens];
    proposal_vote_threshold: [] | [Tokens];
    proposal_submission_deposit: [] | [Tokens];
}
export type Vote = { no: null } | { yes: null };
export interface VoteArgs {
    vote: Vote;
    proposal_id: bigint;
}
export type VoteResult = { ok: ProposalState } | { err: string };
export interface _SERVICE {
    accountBalance: () => Promise<Tokens>;
    getInstaller: () => Promise<Principal>;
    getProposal: (arg_0: bigint) => Promise<[] | [Proposal]>;
    getSystemParams: () => Promise<SystemParams>;
    listAccounts: () => Promise<Array<Account>>;
    listProposals: () => Promise<Array<Proposal>>;
    submitProposal: (arg_0: ProposalPayload) => Promise<SubmitProposalResult>;
    transfer: (arg_0: TransferArgs) => Promise<TransferResult>;
    updateSystemParams: (
        arg_0: UpdateSystemParamsPayload
    ) => Promise<undefined>;
    vote: (arg_0: VoteArgs) => Promise<VoteResult>;
    whoami: () => Promise<Principal>;
}

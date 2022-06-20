import { nat, nat8, Opt, Principal, Variant } from 'azle';

export type Account = { owner: Principal; tokens: Tokens };
export type Proposal = {
    id: nat;
    votes_no: Tokens;
    voters: Principal[];
    state: ProposalState;
    timestamp: nat;
    proposer: Principal;
    votes_yes: Tokens;
    payload: ProposalPayload;
};
export type ProposalPayload = {
    method: string;
    canister_id: Principal;
    message: nat8[];
};

export type ProposalState = Variant<{
    // A failure occurred while executing the proposal
    failed: string;
    // The proposal is open for voting
    open: null;
    // The proposal is currently being executed
    executing: null;
    // Enough "no" votes have been cast to reject the proposal, and it will not be executed
    rejected: null;
    // The proposal has been successfully executed
    succeeded: null;
    // Enough "yes" votes have been cast to accept the proposal, and it will soon be executed
    accepted: null;
}>;
export type Tokens = {
    amount_e8s: nat;
};
// export type TransferArgs = { to: Principal; amount: Tokens };
export type UpdateSystemParamsPayload = {
    transfer_fee: Opt<Tokens>;
    proposal_vote_threshold: Opt<Tokens>;
    proposal_submission_deposit: Opt<Tokens>;
};
export type Vote = Variant<{
    no: null;
    yes: null;
}>;
export type VoteArgs = {
    vote: Vote;
    proposal_id: nat;
};

export type SystemParams = {
    transfer_fee: Tokens;

    // The amount of tokens needed to vote "yes" to accept, or "no" to reject, a proposal
    proposal_vote_threshold: Tokens;
    // The amount of tokens that will be temporarily deducted from the account of
    // a user that submits a proposal. If the proposal is Accepted, this deposit is returned,
    // otherwise it is lost. This prevents users from submitting superfluous proposals.
    proposal_submission_deposit: Tokens;
};
export type BasicDaoStableStorage = {
    accounts: Account[];
    proposals: Proposal[];
    system_params: SystemParams;
};

export type TransferResult = Variant<{
    ok: nat;
    err: string;
}>;
export type SubmitProposalResult = Variant<{
    ok: nat;
    err: string;
}>;
export type DeductProposalSubmissionDepositResult = Variant<{
    ok: null;
    err: string;
}>;
export type ExecuteProposalResult = Variant<{
    ok: null;
    err: string;
}>;

export type VoteResult = Variant<{
    ok: ProposalState;
    err: string;
}>;
export type TransferArgs = {
    to: Principal;
    amount: {
        amount_e8s: nat;
    };
};

export function accounts_fromArray(arr: Account[]): { [key: string]: Tokens } {
    let s: { [key: string]: Tokens } = {};

    arr.forEach((account) => {
        s[account.owner] = account.tokens;
    });

    return s;
}
export function proposals_fromArray(arr: Proposal[]): {
    [key: string]: Proposal;
} {
    let s: {
        [key: string]: Proposal;
    } = {};

    arr.forEach((proposal) => {
        s[proposal.id.toString()] = proposal;
    });

    return s;
}

export const oneToken: Tokens = { amount_e8s: 10_000_000n };
export const zeroToken: Tokens = { amount_e8s: 0n };

export const idlFactory = ({ IDL }) => {
    const Tokens = IDL.Record({ amount_e8s: IDL.Nat });
    const Account = IDL.Record({ owner: IDL.Principal, tokens: Tokens });
    const ProposalState = IDL.Variant({
        open: IDL.Null,
        rejected: IDL.Null,
        executing: IDL.Null,
        accepted: IDL.Null,
        failed: IDL.Text,
        succeeded: IDL.Null
    });
    const ProposalPayload = IDL.Record({
        method: IDL.Text,
        canister_id: IDL.Principal,
        message: IDL.Vec(IDL.Nat8)
    });
    const Proposal = IDL.Record({
        id: IDL.Nat,
        votes_no: Tokens,
        voters: IDL.Vec(IDL.Principal),
        state: ProposalState,
        timestamp: IDL.Nat,
        proposer: IDL.Principal,
        votes_yes: Tokens,
        payload: ProposalPayload
    });
    const SystemParams = IDL.Record({
        transfer_fee: Tokens,
        proposal_vote_threshold: Tokens,
        proposal_submission_deposit: Tokens
    });
    const SubmitProposalResult = IDL.Variant({
        ok: IDL.Nat,
        err: IDL.Text
    });
    const TransferArgs = IDL.Record({
        to: IDL.Principal,
        amount: IDL.Record({ amount_e8s: IDL.Nat })
    });
    const TransferResult = IDL.Variant({ ok: IDL.Nat, err: IDL.Text });
    const UpdateSystemParamsPayload = IDL.Record({
        transfer_fee: IDL.Opt(Tokens),
        proposal_vote_threshold: IDL.Opt(Tokens),
        proposal_submission_deposit: IDL.Opt(Tokens)
    });
    const Vote = IDL.Variant({ no: IDL.Null, yes: IDL.Null });
    const VoteArgs = IDL.Record({ vote: Vote, proposal_id: IDL.Nat });
    const VoteResult = IDL.Variant({ ok: ProposalState, err: IDL.Text });
    return IDL.Service({
        accountBalance: IDL.Func([], [Tokens], ['query']),
        getInstaller: IDL.Func([], [IDL.Principal], ['query']),
        getProposal: IDL.Func([IDL.Nat], [IDL.Opt(Proposal)], ['query']),
        getSystemParams: IDL.Func([], [SystemParams], ['query']),
        listAccounts: IDL.Func([], [IDL.Vec(Account)], ['query']),
        listProposals: IDL.Func([], [IDL.Vec(Proposal)], ['query']),
        submitProposal: IDL.Func([ProposalPayload], [SubmitProposalResult], []),
        transfer: IDL.Func([TransferArgs], [TransferResult], []),
        updateSystemParams: IDL.Func([UpdateSystemParamsPayload], [], []),
        vote: IDL.Func([VoteArgs], [VoteResult], []),
        whoami: IDL.Func([], [IDL.Principal], ['query'])
    });
};
export const init = ({ IDL }) => {
    const Tokens = IDL.Record({ amount_e8s: IDL.Nat });
    const Account = IDL.Record({ owner: IDL.Principal, tokens: Tokens });
    const ProposalState = IDL.Variant({
        open: IDL.Null,
        rejected: IDL.Null,
        executing: IDL.Null,
        accepted: IDL.Null,
        failed: IDL.Text,
        succeeded: IDL.Null
    });
    const ProposalPayload = IDL.Record({
        method: IDL.Text,
        canister_id: IDL.Principal,
        message: IDL.Vec(IDL.Nat8)
    });
    const Proposal = IDL.Record({
        id: IDL.Nat,
        votes_no: Tokens,
        voters: IDL.Vec(IDL.Principal),
        state: ProposalState,
        timestamp: IDL.Nat,
        proposer: IDL.Principal,
        votes_yes: Tokens,
        payload: ProposalPayload
    });
    const SystemParams = IDL.Record({
        transfer_fee: Tokens,
        proposal_vote_threshold: Tokens,
        proposal_submission_deposit: Tokens
    });
    return [IDL.Vec(Account), IDL.Vec(Proposal), SystemParams];
};

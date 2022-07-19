import {
    Query,
    Update,
    Principal,
    ic,
    Opt,
    nat,
    Init,
    Heartbeat,
    PreUpgrade,
    PostUpgrade,
    Stable,
    CanisterResult,
    Variant,
    ok
} from 'azle';

import {
    accounts_fromArray,
    proposals_fromArray,
    SystemParams,
    Tokens,
    Proposal,
    zeroToken,
    Account,
    UpdateSystemParamsPayload,
    ProposalState,
    ProposalPayload,
    VoteArgs,
    TransferResult,
    SubmitProposalResult,
    DeductProposalSubmissionDepositResult,
    TransferArgs,
    VoteResult
} from './types';

let installer: Opt<Principal> = null;
let accounts = accounts_fromArray([]);
let proposals = proposals_fromArray([]);
let nextProposalId: nat = 0n;
let systemParams: SystemParams = {
    transfer_fee: { amount_e8s: 0n },
    proposal_vote_threshold: { amount_e8s: 0n },
    proposal_submission_deposit: { amount_e8s: 0n }
};

type ProposalStable = {
    key: string;
    value: Proposal;
};

type StableStorage = Stable<{
    installer: Principal;
    accounts: Account[];
    proposals: ProposalStable[];
    nextProposalId: nat;
    systemParams: SystemParams;
}>;

export function init(
    initAccounts: Account[],
    initProposals: Proposal[],
    initSystemParams: SystemParams
): Init {
    installer = ic.caller();
    accounts = accounts_fromArray(initAccounts);
    proposals = proposals_fromArray(initProposals);
    nextProposalId = 0n;
    systemParams = initSystemParams;
}

// @TODO fix this after this issue is resolved
// https://github.com/demergent-labs/azle/issues/203
export function* heartbeat(): Heartbeat {
    // We have to inline executeAcceptedProposals function here because of a limitaion of azle for now
    const allProposals = Object.keys(proposals).map((id) => proposals[id]);

    const acceptedProposals = allProposals.filter((p) => {
        return 'accepted' in p.state;
    });
    // Update proposal state, so that it won't be picked up by the next heartbeat
    for (let proposal of acceptedProposals) {
        updateProposalState(proposal, { executing: null });
    }

    for (let proposal of acceptedProposals) {
        try {
            const payload = proposal.payload;

            const res: CanisterResult<Variant<{ ok: null; err: null }>> =
                yield ic.call_raw(
                    payload.canister_id,
                    payload.method,
                    payload.message,
                    0n
                );

            if (ok(res)) {
                updateProposalState(proposal, { succeeded: null });
            } else {
                updateProposalState(proposal, { failed: res.err });
            }
        } catch (e) {
            updateProposalState(proposal, { failed: 'Execution failed' });
        }
    }
}

function accountGet(id: Principal): Opt<Tokens> {
    return accounts[id] ?? null;
}

function account_put(id: Principal, tokens: Tokens) {
    accounts[id] = tokens;
}

function proposalGet(id: nat): Opt<Proposal> {
    return proposals[id.toString()] ?? null;
}

function proposalPut(id: nat, proposal: Proposal) {
    proposals[id.toString()] = proposal;
}

// Transfer tokens from the caller's account to another account
export function transfer(transfer: TransferArgs): Update<TransferResult> {
    const caller = ic.caller();
    const from_tokens = accountGet(caller);
    switch (from_tokens) {
        case null: {
            return { err: 'Caller needs an account to transfer funds' };
        }
        case from_tokens as Tokens: {
            const fee: nat = systemParams.transfer_fee.amount_e8s;
            const amount = transfer.amount.amount_e8s;
            if (from_tokens.amount_e8s < amount + fee) {
                return {
                    err: `Caller's account has insufficient funds to transfer ${transfer.amount}`
                };
            } else {
                const from_amount: nat = from_tokens.amount_e8s - amount - fee;
                account_put(caller, { amount_e8s: from_amount });
                const to_amount =
                    (accountGet(transfer.to) ?? zeroToken).amount_e8s + amount;
                account_put(transfer.to, { amount_e8s: to_amount });
                return { ok: 0n };
            }
        }
        default: {
            return { err: 'Unexpected error' };
        }
    }
}

/// Return the account balance of the caller
export function accountBalance(): Query<Tokens> {
    return accountGet(ic.caller()) ?? zeroToken;
}

// Lists all accounts
export function listAccounts(): Query<Account[]> {
    const accountList = Object.keys(accounts).map((owner) => ({
        owner,
        tokens: accounts[owner]
    }));

    return accountList;
}

// / Submit a proposal
// /
// / A proposal contains a canister ID, method name and method args. If enough users
// / vote "yes" on the proposal, the given method will be called with the given method
// / args on the given canister.
export function submitProposal(
    payload: ProposalPayload
): Update<SubmitProposalResult> {
    const caller = ic.caller();
    const result = deductProposalSubmissionDeposit(caller);
    if (ok(result)) {
        const proposal_id: nat = nextProposalId;
        nextProposalId += 1n;

        const proposal = {
            id: proposal_id,
            timestamp: ic.time(),
            proposer: caller,
            payload,
            state: { open: null },
            votes_yes: zeroToken,
            votes_no: zeroToken,
            voters: []
        };
        proposalPut(proposal_id, proposal);
        return { ok: proposal_id };
    } else {
        return { err: result.err };
    }
}

/// Return the proposal with the given ID, if one exists
export function getProposal(proposal_id: nat): Query<Opt<Proposal>> {
    return proposalGet(proposal_id);
}

/// Return the list of all proposals
export function listProposals(): Query<Proposal[]> {
    return Object.keys(proposals).map((id) => proposals[id]);
}

// Vote on an open proposal
export function vote(args: VoteArgs): Update<VoteResult> {
    const caller = ic.caller();
    const proposal = proposalGet(args.proposal_id);
    if (proposal === null) {
        return { err: `No proposal with ID  ${args.proposal_id} exists` };
    }

    if (proposal) {
        let state = proposal.state;
        if (!('open' in state)) {
            return {
                err: `Proposal ${args.proposal_id} is not open for voting`
            };
        }
        const account = accountGet(caller);
        if (account === null) {
            return { err: 'Caller does not have any tokens to vote with' };
        }
        if (account) {
            if (proposal.voters.some((e) => e === caller)) {
                return { err: 'Already voted' };
            }

            let votes_yes = proposal.votes_yes.amount_e8s;
            let votes_no = proposal.votes_no.amount_e8s;
            if ('yes' in args.vote) {
                votes_yes += account.amount_e8s;
            }
            if ('no' in args.vote) {
                votes_no += account.amount_e8s;
            }
            const voters = [...proposal.voters, caller];

            if (votes_yes >= systemParams.proposal_vote_threshold.amount_e8s) {
                // Refund the proposal deposit when the proposal is accepted
                const account = accountGet(proposal.proposer);
                if (!account)
                    return { err: 'Proposer does not have an account' };

                const refunded =
                    account.amount_e8s +
                    systemParams.proposal_submission_deposit.amount_e8s;
                account_put(proposal.proposer, { amount_e8s: refunded });

                state = { accepted: null };
            }

            if (votes_no >= systemParams.proposal_vote_threshold.amount_e8s) {
                state = { rejected: null };
            }

            const updated_proposal = {
                id: proposal.id,
                votes_yes: { amount_e8s: votes_yes },
                votes_no: { amount_e8s: votes_no },
                voters,
                state,
                timestamp: proposal.timestamp,
                proposer: proposal.proposer,
                payload: proposal.payload
            };
            proposalPut(args.proposal_id, updated_proposal);
        }

        return { ok: state };
    }

    return { err: 'Unexpected error' };
}

/// Get the current system params
export function getSystemParams(): Query<SystemParams> {
    return systemParams;
}

/// Update system params
///
/// Only callable via proposal execution
export function updateSystemParams(
    payload: UpdateSystemParamsPayload
): Update<void> {
    const caller = ic.caller();
    if (caller !== ic.id()) {
        return;
    }
    systemParams = {
        ...systemParams,
        transfer_fee: payload.transfer_fee || systemParams.transfer_fee,
        proposal_submission_deposit:
            payload.proposal_submission_deposit ||
            systemParams.proposal_submission_deposit,
        proposal_vote_threshold:
            payload.proposal_vote_threshold ||
            systemParams.proposal_vote_threshold
    };
}

/// Deduct the proposal submission deposit from the caller's account
function deductProposalSubmissionDeposit(
    caller: Principal
): DeductProposalSubmissionDepositResult {
    const fromTokens = accountGet(caller);

    if (fromTokens === null) {
        return { err: 'Caller needs an account to submit a proposal' };
    }
    if (fromTokens) {
        const threshold = systemParams.proposal_submission_deposit.amount_e8s;
        if (fromTokens.amount_e8s < threshold) {
            return {
                err: `Caller's account must have at least ${threshold} to submit a proposal`
            };
        } else {
            const fromAmount: nat = fromTokens.amount_e8s - threshold;
            account_put(caller, { amount_e8s: fromAmount });
            return { ok: null };
        }
    }
    return { err: 'Unexpected error' };
}

/// Execute all accepted proposals
// inlined into Heartbeat due to a limitation
// function* executeAcceptedProposals(): Generator<any, void> {
//   const allProposals = Object.keys(proposals).map((id) => proposals[id]);

//   const acceptedProposals = allProposals.filter((p) => {
//     return 'accepted' in p.state;
//   });
//   // Update proposal state, so that it won't be picked up by the next heartbeat
//   for (let proposal of acceptedProposals) {
//     updateProposalState(proposal, { executing: null });
//   }

//   for (let proposal of acceptedProposals) {
//     const res: ExecuteProposalResult = yield executeProposal(proposal);
//     if ('ok' in res) {
//       updateProposalState(proposal, { succeeded: null });
//     } else {
//       updateProposalState(proposal, { failed: 'Execution failed' });
//     }
//   }
// }

// inlined into Heartbeat due to a limitation
// function* executeProposal(
//   proposal: Proposal
// ): Generator<any, ExecuteProposalResult, any> {
//   try {
//     const payload = proposal.payload;
//     yield ic.call_raw(payload.canister_id, payload.method, payload.message, 0n);
//     return { ok: null };
//   } catch (e) {
//     if (e instanceof Error) return { err: e.message };
//     return { err: `Unexpected err` };
//   }
// }

function updateProposalState(proposal: Proposal, state: ProposalState) {
    const updated = {
        state,
        id: proposal.id,
        votes_yes: proposal.votes_yes,
        votes_no: proposal.votes_no,
        voters: proposal.voters,
        timestamp: proposal.timestamp,
        proposer: proposal.proposer,
        payload: proposal.payload
    };
    proposalPut(proposal.id, updated);
}

export function preUpgrade(): PreUpgrade {
    ic.stable_storage<StableStorage>().installer = installer;
    ic.stable_storage<StableStorage>().accounts = Object.entries(accounts).map(
        (entry) => {
            return {
                owner: entry[0],
                tokens: entry[1]
            };
        }
    );
    ic.stable_storage<StableStorage>().proposals = Object.entries(
        proposals
    ).map((entry) => {
        return {
            key: entry[0],
            value: entry[1]
        };
    });
    ic.stable_storage<StableStorage>().nextProposalId = nextProposalId;
    ic.stable_storage<StableStorage>().systemParams = systemParams;
}

export function postUpgrade(): PostUpgrade {
    installer = ic.stable_storage<StableStorage>().installer;
    accounts = ic
        .stable_storage<StableStorage>()
        .accounts.reduce((result, entry) => {
            return {
                ...result,
                [entry.owner]: entry.tokens
            };
        }, {});
    proposals = ic
        .stable_storage<StableStorage>()
        .proposals.reduce((result, entry) => {
            return {
                ...result,
                [entry.key]: entry.value
            };
        }, {});
    nextProposalId = ic.stable_storage<StableStorage>().nextProposalId;
    systemParams = ic.stable_storage<StableStorage>().systemParams;
}

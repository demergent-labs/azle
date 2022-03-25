import {
    Query,
    Update,
    Principal,
    int8,
    ic,
    int32
} from 'azle';

type State = {
    signers: {
        [key: Principal]: Principal;
    };
    signerProposals: {
        [key: Principal]: SignerProposal;
    };
    transferProposals: {
        [key: string]: TransferProposal;
    };
    threshold: int8;
    maxSigners: int8;
};

type SignerProposal = {
    signer: Principal;
    approvals: Principal[];
};

type TransferProposal = {
    destination: Principal;
    amount: int32;
    approvals: Principal[];
};

let state: State = {
    signers: {},
    signerProposals: {},
    transferProposals: {},
    threshold: 0,
    maxSigners: 0
};

export function initSigners(
    signers: Principal[],
    threshold: int8,
    maxSigners: int8
): Update<void> {
    if (
        Object.keys(state.signers).length === 0 &&
        state.threshold === 0 &&
        state.maxSigners === 0
    ) {
        signers.forEach((signer) => {
            state.signers[signer] = signer;
        });

        state.threshold = threshold;
        state.maxSigners = maxSigners;
    }
    else {
        ic.trap('Signers already initialized');
    }
}

export function getSigners(): Query<Principal[]> {
    return Object.values(state.signers);
}

export function getThreshold(): Query<int8> {
    return state.threshold;
}

export function getMaxSigners(): Query<int8> {
    return state.maxSigners;
}

export function getSignerProposals(): Query<SignerProposal[]> {
    return Object.values(state.signerProposals);
}

export function proposeTransfer(
    destination: Principal,
    amount: int32
): Update<void> {
    if (isSigner(ic.caller()) === false) {
        ic.trap('Only a signer can propose a transfer');
    }

    const id = '0'; // TODO generate some random ids, maybe a sha224 hash on secure randomness

    state.transferProposals[id] = {
        destination,
        amount,
        approvals: []
    };
}

export function approveTransfer(transferId: string): Update<void> {
    if (isSigner(ic.caller()) === false) {
        ic.trap('Only a signer can approve a transfer');
    }

    const transferProposal: TransferProposal = state.transferProposals[transferId];

    if (transferProposal === undefined) {
        ic.trap(`No transfer proposal found for transfer id: ${transferId}`);
    }

    // TODO check to make sure the approval hasn't already been done
    state.transferProposals[transferId] = {
        ...transferProposal,
        approvals: [
            ...transferProposal.approvals,
            ic.caller()
        ]
    }

    if (state.transferProposals[transferId].approvals.length >= state.threshold) {
        // TODO execute transfer
        // TODO remove transfer request

        // TODO consider if we should do things mutably or immutably
        delete state.transferProposals[transferId];
    }
}

export function proposeSigner(signer: Principal): Update<void> {
    if (isSigner(ic.caller()) === false) {
        ic.trap('Only a signer can propose a signer');
    }

    // TODO attack vector if the proposals get too big, have a limit
    state.signerProposals[signer] = {
        signer,
        approvals: []
    };
}

// TODO probably do not use arrays and make sure to think about memory leak attack vectors
export function approveSigner(signer: Principal): Update<boolean> {
    if (isSigner(ic.caller()) === false) {
        return false;
    }

    const signerProposal: SignerProposal = state.signerProposals[signer];

    if (signerProposal !== undefined) {
        state.signerProposals[signer] = {
            ...signerProposal,
            approvals: [
                ...signerProposal.approvals,
                ic.caller()
            ]
        };

        if (state.signerProposals[signer].approvals.length === state.threshold) {
            state.signers[signerProposal.signer] = signerProposal.signer;
        }

        return true;
    }
    else {
        return false;
    }
}

function isSigner(signer: Principal): boolean {
    if (state.signers[signer] === signer) {
        return true;
    }

    return false;
}
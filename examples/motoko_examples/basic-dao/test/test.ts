import { run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from './dfx_generated/basic_dao';
import { Principal } from '@dfinity/principal';

import { Ed25519KeyIdentity } from '@dfinity/identity';
import { SignIdentity } from '@dfinity/agent';

function createIdentity(seed: number): SignIdentity {
    const seed1 = new Array(32).fill(0);
    seed1[0] = seed;
    return Ed25519KeyIdentity.generate(new Uint8Array(seed1));
}
export const alice = createIdentity(1);
export const bob = createIdentity(2);
export const cathy = createIdentity(3);
export const dory = createIdentity(4);
export const eve = createIdentity(5);
export const genesis = createIdentity(6);

const DAO_CANISTER_ID = 'rrkah-fqaaa-aaaaa-aaaaq-cai';
const dao = (identity = alice) =>
    createActor(DAO_CANISTER_ID, {
        agentOptions: {
            host: 'http://127.0.0.1:8000',
            identity
        }
    });
const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code basic_dao || true`, {
                stdio: 'inherit'
            });
        }
    },
    {
        // TODO hopefully we can get rid of this: https://forum.dfinity.org/t/generated-declarations-in-node-js-environment-break/12686/16?u=lastmjs
        name: 'waiting for createActor fetchRootKey',
        wait: 5000
    },
    {
        name: 'deploy',
        prep: async () => {
            execSync(
                `dfx deploy basic_dao --argument '(
          vec {
              record {
                  owner = principal \"${alice.getPrincipal().toString()}\";
                  tokens = record { amount_e8s = 1_000_000_000_000 };
              };
          },
          vec {},
          record {
              transfer_fee = record { amount_e8s = 10_000 };
              proposal_vote_threshold = record { amount_e8s = 1_000_000_000 };
              proposal_submission_deposit = record { amount_e8s = 10_000 };
          }
        )'`,
                {
                    stdio: 'inherit'
                }
            );
        }
    },
    {
        name: 'accountBalance',
        test: async () => {
            const aliceBalance = await dao().accountBalance();

            return {
                ok: aliceBalance.amount_e8s === 1_000_000_000_000n
            };
        }
    },
    {
        name: 'destination address needs to exist',
        test: async () => {
            const daoWithBob = dao(bob);
            const bobBalance = await daoWithBob.accountBalance();

            assert(
                bobBalance.amount_e8s === 0n,
                "Bob's account should be empty"
            );

            const transfer = await daoWithBob.transfer({
                to: alice.getPrincipal(),
                amount: {
                    amount_e8s: 500_000_000_000n
                }
            });

            if ('err' in transfer) {
                assert(
                    transfer.err ===
                        'Caller needs an account to transfer funds',
                    'Should throws an error'
                );
            } else {
                assert(false, 'should have failed');
            }

            return {
                ok: true
            };
        }
    },
    {
        name: 'transfer from alice to bob',
        test: async () => {
            const daoWithBob = dao(bob);
            const daoWithAlice = dao(alice);

            await daoWithAlice.transfer({
                to: bob.getPrincipal(),
                amount: {
                    amount_e8s: 500_000_000_000n
                }
            });

            const aliceBalance = await daoWithAlice.accountBalance();

            assert(
                aliceBalance.amount_e8s === 499_999_990_000n,
                'Alice should have 499_999_990_000 tokens'
            );

            let bobBalance = await daoWithBob.accountBalance();

            assert(
                bobBalance.amount_e8s === 500_000_000_000n,
                'Bob should have 500_000_000_000 tokens'
            );

            // not enough funds considering transfer fee
            let bobTransfer = await daoWithBob.transfer({
                to: alice.getPrincipal(),
                amount: {
                    amount_e8s: 500_000_000_000n
                }
            });

            if ('err' in bobTransfer) {
                assert(
                    bobTransfer.err.includes(
                        "Caller's account has insufficient funds to transfer"
                    ),
                    'Should throws an error'
                );
            } else {
                assert(false, 'bobTransfer should have failed');
            }

            // transfer to self
            bobTransfer = await daoWithBob.transfer({
                to: bob.getPrincipal(),
                amount: {
                    amount_e8s: 10n
                }
            });

            bobBalance = await daoWithBob.accountBalance();

            assert(
                bobBalance.amount_e8s === 499_999_990_000n,
                'Bob should have 499_999_990_000 tokens'
            );

            return {
                ok: true
            };
        }
    },
    {
        name: 'upgrade preserves states',
        prep: async () => {
            // @TODO remove the --mode=reinstall
            execSync(
                `dfx deploy basic_dao --argument '(
          vec {
              record {
                  owner = principal \"${alice.getPrincipal().toString()}\";
                  tokens = record { amount_e8s = 1_000_000_000_000 };
              };
          },
          vec {},
          record {
              transfer_fee = record { amount_e8s = 10_000 };
              proposal_vote_threshold = record { amount_e8s = 1_000_000_000 };
              proposal_submission_deposit = record { amount_e8s = 10_000 };
          }
        )'`,
                {
                    stdio: 'inherit'
                }
            );
        }
    },
    {
        name: 'upgrade preserves states',
        test: async () => {
            const accounts = await dao().listAccounts();

            const mapped = accounts.map((a) => ({
                owner: a.owner.toString(),
                tokens: a.tokens.amount_e8s
            }));

            assert(
                mapped[0].tokens === 499_999_990_000n,
                'Should have 499_999_990_000 tokens'
            );
            assert(
                mapped[1].tokens === 499_999_990_000n,
                'Should have 499_999_990_000 tokens'
            );

            return {
                ok: true
            };
        }
    },
    {
        name: 'getSystemParams',
        test: async () => {
            const {
                proposal_submission_deposit,
                proposal_vote_threshold,
                transfer_fee
            } = await dao().getSystemParams();

            return {
                ok:
                    proposal_submission_deposit.amount_e8s === 10_000n &&
                    proposal_vote_threshold.amount_e8s === 1_000_000_000n &&
                    transfer_fee.amount_e8s === 10_000n
            };
        }
    },
    {
        name: 'clear canister memory for second set of tests',
        prep: async () => {
            execSync(`dfx canister uninstall-code basic_dao || true`, {
                stdio: 'inherit'
            });
        }
    },
    {
        // TODO hopefully we can get rid of this: https://forum.dfinity.org/t/generated-declarations-in-node-js-environment-break/12686/16?u=lastmjs
        name: 'waiting for createActor fetchRootKey',
        wait: 5000
    },
    {
        name: 're deploy a new cansiter',
        prep: async () => {
            execSync(
                `dfx deploy basic_dao --argument '(
          vec {
              record {
                  owner = principal \"${genesis.getPrincipal().toString()}\";
                  tokens = record { amount_e8s = 1_000_000_000_000 };
              };
          },
          vec {},
          record {
              transfer_fee = record { amount_e8s = 0 };
              proposal_vote_threshold = record { amount_e8s = 500 };
              proposal_submission_deposit = record { amount_e8s = 100 };
          }
        )'`,
                {
                    stdio: 'inherit'
                }
            );
        }
    },
    {
        name: 'cannot update system params without proposal',
        test: async () => {
            await dao().updateSystemParams({
                transfer_fee: [{ amount_e8s: 10_000n }],
                proposal_submission_deposit: [],
                proposal_vote_threshold: []
            });

            const systemParams = await dao().getSystemParams();
            assert(
                systemParams.transfer_fee.amount_e8s === 0n,
                'Should have 0 fee'
            );

            return {
                ok: true
            };
        }
    },
    {
        name: 'distribute tokens',
        test: async () => {
            await dao(genesis).transfer({
                to: alice.getPrincipal(),
                amount: {
                    amount_e8s: 100n
                }
            });
            await dao(genesis).transfer({
                to: bob.getPrincipal(),
                amount: {
                    amount_e8s: 200n
                }
            });
            await dao(genesis).transfer({
                to: cathy.getPrincipal(),
                amount: {
                    amount_e8s: 300n
                }
            });
            await dao(genesis).transfer({
                to: dory.getPrincipal(),
                amount: {
                    amount_e8s: 400n
                }
            });

            const balance = await dao(genesis).accountBalance();
            // verify no transfer fee
            assert(
                balance.amount_e8s === 999_999_999_000n,
                'Should have 999_999_999_000 tokens'
            );

            return {
                ok: true
            };
        }
    },
    {
        name: 'alice makes a proposal',
        test: async () => {
            let aliceBalance = await dao(alice).accountBalance();
            assert(aliceBalance.amount_e8s === 100n, 'Should have 100 tokens');

            const candid_encoded_arguments_hex_string = execSync(
                `./target/bin/didc encode '(record { transfer_fee = opt record { amount_e8s = 10_000 : nat } })'`
            )
                .toString()
                .trim();
            const candid_encoded_arguments_byte_array =
                candid_encoded_arguments_hex_string
                    .match(/.{1,2}/g)
                    ?.map((x) => parseInt(x, 16)) ?? [];

            let aliceProposalId;
            const aliceProposal = await dao(alice).submitProposal({
                canister_id: Principal.fromText(DAO_CANISTER_ID),
                method: 'updateSystemParams',
                message: candid_encoded_arguments_byte_array
            });

            if ('ok' in aliceProposal) {
                aliceProposalId = aliceProposal.ok;
            }

            aliceBalance = await dao(alice).accountBalance();
            assert(
                aliceBalance.amount_e8s === 0n,
                'Alice balance should be deducted by amount of proposal_submission_deposit 100, now her balance should be 0'
            );

            let voteAlice = await dao(alice).vote({
                proposal_id: aliceProposalId,
                vote: { yes: null }
            });

            assert(
                'ok' in voteAlice && 'open' in voteAlice.ok,
                'Should have an open status'
            );

            let voteEve = await dao(eve).vote({
                proposal_id: aliceProposalId,
                vote: { yes: null }
            });

            assert(
                'err' in voteEve &&
                    voteEve.err.includes(
                        'Caller does not have any tokens to vote with'
                    ),
                'Should have an error'
            );

            const [
                { id, payload, proposer, state, voters, votes_no, votes_yes }
            ] = await dao(bob).getProposal(aliceProposalId);

            assert(id === aliceProposalId, 'Should have the same proposal id');
            assert(
                proposer.toString() === alice.getPrincipal().toString(),
                'Proposer should be alice'
            );

            // votes yes === 0 because alice didn't have any tokens when she voted
            assert(votes_yes.amount_e8s === 0n, 'Should have 0 votes_yes');
            assert(votes_no.amount_e8s === 0n, 'Should have 0 votes_no');
            assert(
                voters
                    .map((v) => v.toString())
                    .includes(alice.getPrincipal().toString()),
                'Should have alice as a voter'
            );
            assert('open' in state, 'Should have an open status');
            assert(
                payload.canister_id.toString() === DAO_CANISTER_ID &&
                    payload.method === 'updateSystemParams',
                'Payload should have the correct canister_id and method'
            );

            let bobVote = await dao(bob).vote({
                proposal_id: aliceProposalId,
                vote: { yes: null }
            });

            assert(
                'ok' in bobVote && 'open' in bobVote.ok,
                'Bob should be able to vote'
            );

            bobVote = await dao(bob).vote({
                proposal_id: aliceProposalId,
                vote: { no: null }
            });

            assert(
                'err' in bobVote && bobVote.err === 'Already voted',
                'Bob should not be able to vote'
            );

            let doryVote = await dao(dory).vote({
                proposal_id: aliceProposalId,
                vote: { no: null }
            });

            assert(
                'ok' in doryVote && 'open' in doryVote.ok,
                'Dory should be able to vote'
            );

            let cathyVote = await dao(cathy).vote({
                proposal_id: aliceProposalId,
                vote: { yes: null }
            });

            assert(
                'ok' in cathyVote && 'accepted' in cathyVote.ok,
                'Cathy should be able to vote'
            );

            let genesisVote = await dao(genesis).vote({
                proposal_id: aliceProposalId,
                vote: { no: null }
            });

            assert(
                'err' in genesisVote &&
                    genesisVote.err === 'Proposal 0 is not open for voting',
                'Genesis should not be able to vote'
            );

            // refunded
            const balance = await dao(alice).accountBalance();

            assert(balance.amount_e8s === 100n, 'Should have 100 tokens');

            let oldProposal = await dao(alice).getProposal(aliceProposalId);

            assert(
                oldProposal[0].votes_yes.amount_e8s === 500n,
                'Should have 500 votes_yes'
            );
            assert(
                oldProposal[0].votes_no.amount_e8s === 400n,
                'Should have 400 votes_no'
            );

            let mappedVoters = voters.map((v) => v.toString());
            let expectedVoters = [cathy, dory, bob, alice].map((v) =>
                v.getPrincipal().toString()
            );
            assert(
                mappedVoters.every((v) => expectedVoters.includes(v)),
                'Should have alice as a voter'
            );

            return {
                ok: true
            };
        }
    },
    {
        name: 'check proposal is executed',
        test: async () => {
            const systemParams = await dao().getSystemParams();

            assert(
                systemParams.transfer_fee.amount_e8s === 10_000n,
                'Should have 10_000 tokens'
            );

            const candid_encoded_arguments_hex_string = execSync(
                `./target/bin/didc encode '(record { to = \"${alice
                    .getPrincipal()
                    .toString()}\"; amount = record { amount_e8s = 100 } })'`
            )
                .toString()
                .trim();
            const candid_encoded_arguments_byte_array =
                candid_encoded_arguments_hex_string
                    .match(/.{1,2}/g)
                    ?.map((x) => parseInt(x, 16)) ?? [];

            let bobProposalId1;
            let bobProposal1 = await dao(bob).submitProposal({
                canister_id: Principal.fromText(DAO_CANISTER_ID),
                method: 'transfer2',
                message: candid_encoded_arguments_byte_array
            });

            if ('ok' in bobProposal1) {
                bobProposalId1 = bobProposal1.ok;
            }
            let bobProposalId2;
            let bobProposal2 = await dao(bob).submitProposal({
                canister_id: Principal.fromText(DAO_CANISTER_ID),
                method: 'transfer2',
                message: candid_encoded_arguments_byte_array
            });

            if ('ok' in bobProposal2) {
                bobProposalId2 = bobProposal2.ok;
            }

            let bobProposal3 = await dao(bob).submitProposal({
                canister_id: Principal.fromText(DAO_CANISTER_ID),
                method: 'transfer',
                message: candid_encoded_arguments_byte_array
            });

            assert(
                'err' in bobProposal3 &&
                    bobProposal3.err ===
                        "Caller's account must have at least 100 to submit a proposal",
                'Should have an error'
            );

            // reject bob1, accept bob2
            await dao(cathy).vote({
                proposal_id: bobProposalId1,
                vote: { no: null }
            });
            await dao(cathy).vote({
                proposal_id: bobProposalId2,
                vote: { yes: null }
            });

            let doryVote1 = await dao(dory).vote({
                proposal_id: bobProposalId1,
                vote: { no: null }
            });

            assert(
                'ok' in doryVote1 && 'rejected' in doryVote1.ok,
                'Dory should be able to vote'
            );

            let doryVote2 = await dao(dory).vote({
                proposal_id: bobProposalId2,
                vote: { yes: null }
            });
            assert(
                'ok' in doryVote2 && 'accepted' in doryVote2.ok,
                'Dory should be able to vote'
            );

            // bob gets only one refund
            let bobBalance = await dao(bob).accountBalance();

            assert(bobBalance.amount_e8s === 100n, 'Should have 100 tokens');

            return {
                ok: true
            };
        }
    },
    {
        name: 'upgrade preserves states',
        prep: async () => {
            execSync(
                `dfx deploy basic_dao --argument '(
          vec {
              record {
                  owner = principal \"${alice.getPrincipal().toString()}\";
                  tokens = record { amount_e8s = 1_000_000_000_000 };
              };
          },
          vec {},
          record {
              transfer_fee = record { amount_e8s = 10_000 };
              proposal_vote_threshold = record { amount_e8s = 1_000_000_000 };
              proposal_submission_deposit = record { amount_e8s = 10_000 };
          }
        )'`,
                {
                    stdio: 'inherit'
                }
            );
        }
    },
    {
        name: 'upgrade preserves states',
        test: async () => {
            const proposals = await dao().listProposals();

            assert('succeeded' in proposals[0].state, 'Should have succeeded');
            assert('rejected' in proposals[1].state, 'Should have rejected');
            assert(
                'failed' in proposals[2].state &&
                    proposals[2].state.failed.includes(
                        "has no update method 'transfer2'"
                    ),
                'Should have failed'
            );

            return {
                ok: true
            };
        }
    }
];

run_tests(tests);

function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(message);
    }
}

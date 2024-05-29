import { Actor, HttpAgent } from '@dfinity/agent';
import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

// import { createActor as createActorConsumer } from './dfx_generated/consumer';
import { createActor as createActorWallet } from './dfx_generated/wallet';
import { getTests } from './tests';

const agent = new HttpAgent({
    host: 'http://127.0.0.1:8000'
});

agent.fetchRootKey(); // TODO we are going to want to await this

const actorConsumer = Actor.createActor(
    ({ IDL }) => {
        const PeriodicPayout = IDL.Record({
            time_started: IDL.Nat64,
            time_completed: IDL.Nat64,
            total_amount: IDL.Nat,
            individual_payouts: IDL.Vec(
                IDL.Record({
                    name: IDL.Text,
                    time: IDL.Nat64,
                    amount: IDL.Nat,
                    principal: IDL.Principal
                })
            )
        });

        return IDL.Service({
            _azle_open_value_sharing_last_periodic_payout: IDL.Func(
                [],
                [IDL.Opt(PeriodicPayout)],
                []
            ),
            _azle_open_value_sharing_all_periodic_payouts: IDL.Func(
                [],
                [IDL.Vec(PeriodicPayout)],
                []
            )
        });
    },
    {
        agent,
        canisterId: getCanisterId('consumer')
    }
);

const actorWallet = createActorWallet(getCanisterId('wallet'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(actorConsumer, actorWallet));

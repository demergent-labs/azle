import { Actor, ActorMethod, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { getCanisterId } from 'azle/dfx';

export type PeriodicPayout = {
    time_started: bigint;
    time_completed: bigint;
    total_amount: bigint;
    individual_payouts: IndividualPayout[];
};

export type IndividualPayout = {
    name: string;
    time: bigint;
    amount: bigint;
    principal: Principal;
    success: { Ok: null } | { Err: string };
};

export interface _SERVICE {
    _azle_open_value_sharing_last_periodic_payout: ActorMethod<
        [],
        [PeriodicPayout] | []
    >;
    _azle_open_value_sharing_all_periodic_payouts: ActorMethod<
        [],
        PeriodicPayout[]
    >;
}

export const agent = new HttpAgent({
    host: 'http://127.0.0.1:8000'
});

export const actorConsumer = Actor.createActor<_SERVICE>(
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
                    principal: IDL.Principal,
                    success: IDL.Variant({
                        Ok: IDL.Null,
                        Err: IDL.Text
                    })
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

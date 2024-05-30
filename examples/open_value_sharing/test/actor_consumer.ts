import { Actor, ActorMethod, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { getCanisterId } from 'azle/dfx';

export type PeriodicBatch = {
    time_start: bigint;
    time_end: bigint;
    total_amount: bigint;
    payments: Payment[];
};

export type Payment = {
    name: string;
    time: bigint;
    amount: bigint;
    principal: Principal;
    success: { Ok: null } | { Err: string };
};

export interface _SERVICE {
    _azle_open_value_sharing_last_periodic_batch: ActorMethod<
        [],
        [PeriodicBatch] | []
    >;
    _azle_open_value_sharing_all_periodic_batches: ActorMethod<
        [],
        PeriodicBatch[]
    >;
}

export const agent = new HttpAgent({
    host: 'http://127.0.0.1:8000'
});

export const actorConsumer = Actor.createActor<_SERVICE>(
    ({ IDL }) => {
        const PeriodicBatch = IDL.Record({
            time_start: IDL.Nat64,
            time_end: IDL.Nat64,
            total_amount: IDL.Nat,
            payments: IDL.Vec(
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
            _azle_open_value_sharing_last_periodic_batch: IDL.Func(
                [],
                [IDL.Opt(PeriodicBatch)],
                []
            ),
            _azle_open_value_sharing_all_periodic_batches: IDL.Func(
                [],
                [IDL.Vec(PeriodicBatch)],
                []
            )
        });
    },
    {
        agent,
        canisterId: getCanisterId('consumer')
    }
);

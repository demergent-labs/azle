import { Actor, ActorMethod, ActorSubclass } from '@dfinity/agent';

import { createAuthenticatedAgent } from '../../dfx';

export async function createActor(
    canisterId: string,
    identityName: string
): Promise<ActorSubclass<_SERVICE>> {
    const agent = await createAuthenticatedAgent(identityName);

    return Actor.createActor<_SERVICE>(
        ({ IDL }) => {
            const BenchmarkEntry = IDL.Record({
                method_name: IDL.Text,
                instructions: IDL.Nat64,
                timestamp: IDL.Nat64
            });

            return IDL.Service({
                _azle_get_benchmarks: IDL.Func(
                    [],
                    [IDL.Vec(BenchmarkEntry)],
                    ['query']
                )
            });
        },
        {
            agent,
            canisterId
        }
    );
}

export interface _SERVICE {
    _azle_get_benchmarks: ActorMethod<
        [],
        {
            method_name: string;
            instructions: bigint;
            timestamp: bigint;
        }[]
    >;
}

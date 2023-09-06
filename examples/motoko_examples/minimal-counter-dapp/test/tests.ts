import { Test } from 'azle/test';
import { _SERVICE } from '../src/declarations/minimal_dapp/minimal_dapp.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(counterCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'init get count',
            test: async () => {
                const result = await counterCanister.getCount();

                return {
                    Ok: result === 0n
                };
            }
        },
        {
            name: 'first increment',
            test: async () => {
                const result = await counterCanister.count();

                return {
                    Ok: result === 1n
                };
            }
        },
        {
            name: 'second increment',
            test: async () => {
                const result = await counterCanister.count();

                return {
                    Ok: result === 2n
                };
            }
        },
        {
            name: 'get count',
            test: async () => {
                const result = await counterCanister.getCount();

                return {
                    Ok: result === 2n
                };
            }
        },
        {
            name: 'reset',
            test: async () => {
                const result = await counterCanister.reset();

                return {
                    Ok: result === 0n
                };
            }
        },
        {
            name: 'get count after reset',
            test: async () => {
                const result = await counterCanister.getCount();

                return {
                    Ok: result === 0n
                };
            }
        },
        {
            name: 'increment after reset',
            test: async () => {
                const result = await counterCanister.count();

                return {
                    Ok: result === 1n
                };
            }
        },
        {
            name: 'get count after first increment after reset',
            test: async () => {
                const result = await counterCanister.getCount();

                return {
                    Ok: result === 1n
                };
            }
        }
    ];
}

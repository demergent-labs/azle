import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/_internal/test';

import CanisterClass from '../src/index';
import { _SERVICE } from './dfx_generated/event_loop/event_loop.did';

const METHODS = [
    'testOrdering0',
    'testOrdering1',
    'testOrdering2',
    'testOrdering3',
    'testOrdering4',
    'testOrdering5',
    'testOrdering6',
    'testOrdering7',
    'testOrdering8',
    'testOrdering9',
    'testOrdering10',
    'testOrdering11',
    'testOrdering12',
    'testOrdering13',
    'testOrdering14',
    'testOrdering15',
    'testOrdering16',
    'testOrdering17',
    'testOrdering18',
    'testOrdering19',
    'testOrdering20'
] as const;

const canisterClass = new CanisterClass();

export function getTests(actor: ActorSubclass<_SERVICE>): Test {
    return () => {
        it.each(METHODS)(
            'should return the correct order for %s from the deployed canister',
            async (methodName) => {
                const result = await actor[methodName]();
                expect(Array.from(result)).toStrictEqual([0, 1, 2, 3, 4, 5, 6]);
            }
        );

        it.each(METHODS)(
            'should return the correct order for %s from Node.js',
            async (methodName) => {
                const result = await canisterClass[methodName]();

                // This allows us to emulate what Azle does before returning the encoded result,
                // which is to run all microtasks to completion.
                // The setTimeout makes it so that the continuation of the await
                // is run after a new macrotask
                await new Promise((resolve) => setTimeout(resolve));

                expect(result).toStrictEqual([0, 1, 2, 3, 4, 5, 6]);
            }
        );
    };
}

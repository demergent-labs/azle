import { ActorSubclass } from '@dfinity/agent';
import { describe } from '@jest/globals';
import { expect, it, Test } from 'azle/_internal/test';

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
    'testOrdering10'
] as const;
type MethodName = (typeof METHODS)[number];

export function getTests(actor: ActorSubclass<_SERVICE>): Test {
    return () => {
        describe.each(METHODS)('%s', (methodName: MethodName) => {
            it(`should return the correct order for ${methodName}`, async () => {
                const result = await actor[methodName]();
                expect(Array.from(result)).toStrictEqual([0, 1, 2, 3, 4, 5, 6]);
            });
        });
    };
}

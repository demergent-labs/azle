import { runTests } from 'azle/_internal/test';
import { Actor, getCanisterId } from 'azle/_internal/test/actor';

import { getTests } from './tests';

export async function createActor(canisterName: string = 'call'): Promise<any> {
    return await Actor.create(getCanisterId(canisterName), {
        getSelf: { args: [], returns: 'principal' },
        callNonExistentCanister: { args: ['principal'], returns: 'bool' },
        callNonExistentMethod: { args: ['principal'], returns: 'bool' },
        callRejectingMethod: { args: ['principal'], returns: 'bool' },
        isCallPerformFailedError: {
            args: [{ type: 'variant', variants: [['Any', null]] }],
            returns: 'bool'
        },
        isCallRejectedError: {
            args: [{ type: 'variant', variants: [['Any', null]] }],
            returns: 'bool'
        },
        getCallPerformFailedExample: {
            args: [],
            returns: { type: 'record', fields: [['type', 'text']] }
        },
        getCallRejectedExample: {
            args: [],
            returns: {
                type: 'record',
                fields: [
                    ['type', 'text'],
                    ['rejectCode', 'nat8'],
                    ['rejectMessage', 'text']
                ]
            }
        }
    });
}

runTests(getTests());

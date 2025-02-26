import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/_internal/test';

import { _SERVICE } from './dfx_generated/agent/agent.did';

export function getTests(actor: ActorSubclass<_SERVICE>): Test {
    return () => {
        (process.env.GITHUB_ACTIONS !== 'true' ? it : it.skip)(
            'sends back the number 100 and nothing else',
            async () => {
                const result = await actor.chat(
                    'send back the number 100 and nothing else'
                );
                expect(result).toStrictEqual('100');
            }
        );
    };
}

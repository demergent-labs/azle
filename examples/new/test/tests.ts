import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/hello_world/hello_world.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(helloWorldCanister: ActorSubclass<_SERVICE>): Test[] {
    return [];
}

import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/plugins/plugins.did';

export function getTests(pluginsCanister: ActorSubclass<_SERVICE>): Test[] {
    return [];
}

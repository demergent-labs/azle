import { Principal } from '@dfinity/principal';
import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/stable_json/stable_json.did';

export function getTests(stableJsonCanister: ActorSubclass<_SERVICE>): Test[] {
    return [];
}

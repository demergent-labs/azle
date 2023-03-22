import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/service/service.did';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export function getTests(serviceCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        // {
        //     name: 'test',
        //     test: async () => {
        //         const result = await serviceCanister.test(
        //             Principal.fromText('aaaaa-aa')
        //         );
        //         return {
        //             Ok: result.toString() === 'aaaaa-aa'
        //         };
        //     }
        // }
    ];
}

import { ActorSubclass } from '@dfinity/agent';

import { _SERVICE } from './dfx_generated/query/query.did';

declare global {
    // eslint-disable-next-line no-var
    var queryCanister: ActorSubclass<_SERVICE>;
}

// TODO remember that Heartbeat can be asynchronous
// TODO implement the heartbeat generator code
// TODO there might be some huge shared mutable state issues with heartbeat and the unsafe code we're using

// TODO if there are issues with shared mutable state and heartbeat, then there should be with other calls as well
// TODO make sure our use of unsafe is not unsafe

import {
    Heartbeat,
    ic
} from 'azle';

export function* heartbeat(): Heartbeat {
    const randomness = yield ic.rawRand();
    ic.print('this is the heartbeat', randomness.toString());
}
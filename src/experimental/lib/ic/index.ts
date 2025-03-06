import '#experimental/lib/experimental';

import { acceptMessage } from './accept_message';
import { candidCompiler } from './candid_compiler';
import { setOutgoingHttpOptions } from './set_outgoing_http_options';

export * from './types';

/** API entrypoint for interacting with the Internet Computer */
export const ic = {
    acceptMessage,
    candidCompiler,
    setOutgoingHttpOptions
};

import '../experimental';

import { candidCompiler } from './candid_compiler';
import { setOutgoingHttpOptions } from './set_outgoing_http_options';

export * from './types';

/** API entrypoint for interacting with the Internet Computer */
export const ic = {
    candidCompiler,
    setOutgoingHttpOptions
};

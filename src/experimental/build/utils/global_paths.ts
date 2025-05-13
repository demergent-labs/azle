import '#experimental/build/assert_experimental';

import { createRequire } from 'module';
import { dirname } from 'path';

export const WASMEDGE_QUICKJS_PATH = dirname(
    createRequire(import.meta.url).resolve('wasmedge_quickjs/package.json')
);

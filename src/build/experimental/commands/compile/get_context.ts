import { join } from 'path';

import { version } from '../../../../../package.json';
import { getContext as getStableContext } from '../../../stable/commands/compile/get_context';
import { GLOBAL_AZLE_CONFIG_DIR } from '../../../stable/utils/global_paths';
import { CanisterConfig } from '../../../stable/utils/types';
import { Context } from '../../utils/types';

export function getContext(
    canisterName: string,
    canisterConfig: CanisterConfig
): Context {
    const stableContext = getStableContext(canisterName, canisterConfig);

    const esmAliases = canisterConfig.custom?.esm_aliases ?? {};
    const esmExternals = canisterConfig.custom?.esm_externals ?? [];

    const wasmedgeQuickJsName = `wasmedge-quickjs_${version}`;

    const wasmedgeQuickJsPath = join(
        GLOBAL_AZLE_CONFIG_DIR,
        wasmedgeQuickJsName
    );

    return {
        ...stableContext,
        esmAliases,
        esmExternals,
        wasmedgeQuickJsPath
    };
}

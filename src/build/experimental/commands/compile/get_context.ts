import { readFile } from 'fs/promises';
import { join } from 'path';

import { getCanisterId } from '../../../../../dfx';
import { getContext as getStableContext } from '../../../stable/commands/compile/get_context';
import { AZLE_PACKAGE_PATH } from '../../../stable/utils/global_paths';
import { CanisterConfig } from '../../../stable/utils/types';
import { Context, WasmData } from '../../utils/types';
import { getConsumer } from './open_value_sharing/consumer';

export async function getContext(
    canisterName: string,
    canisterConfig: CanisterConfig
): Promise<Context> {
    const stableContext = getStableContext(canisterName, canisterConfig);

    const canisterId = getCanisterId(canisterName);

    const esmAliases = canisterConfig.custom?.esm_aliases ?? {};
    const esmExternals = canisterConfig.custom?.esm_externals ?? [];

    const reloadedJsPath = join('.azle', canisterName, 'main_reloaded.js');

    const consumer = await getConsumer(canisterConfig);
    const managementDid = (
        await readFile(
            join(AZLE_PACKAGE_PATH, 'canisters', 'management', 'ic.did')
        )
    ).toString();
    const wasmData: WasmData = {
        ...stableContext.wasmData,
        consumer,
        managementDid
    };

    return {
        ...stableContext,
        canisterId,
        esmAliases,
        esmExternals,
        reloadedJsPath,
        wasmData
    };
}

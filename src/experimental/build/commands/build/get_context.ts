import '#experimental/build/assert_experimental';

import { readFile } from 'fs/promises';
import { join } from 'path';

import { getContext as getStableContext } from '#commands/build/get_context';
import { Context, WasmData } from '#experimental/utils/types';
import { CanisterConfig } from '#experimental/utils/types';
import { getCanisterId } from '#utils/dfx';
import { AZLE_ROOT } from '#utils/global_paths';

export async function getContext(
    canisterName: string,
    canisterConfig: CanisterConfig
): Promise<Context> {
    const stableContext = await getStableContext(canisterName, {
        ...canisterConfig,
        custom: {
            ...canisterConfig.custom,
            assets: undefined,
            build_assets: undefined,
            esm_aliases: undefined,
            esm_externals: undefined
        }
    });

    const canisterId = getCanisterId(canisterName);

    const esmAliases = canisterConfig.custom?.esm_aliases ?? {};
    const esmExternals = canisterConfig.custom?.esm_externals ?? [];

    const reloadedJsPath = join('.azle', canisterName, 'main_reloaded.js');

    const managementDid = (
        await readFile(
            join(
                AZLE_ROOT,
                'src',
                'stable',
                'lib',
                'canisters',
                'management',
                'idl',
                'ic.did'
            )
        )
    ).toString();
    const wasmData: WasmData = {
        ...stableContext.wasmData,
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

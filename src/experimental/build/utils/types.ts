import '#experimental/build/assert_experimental';

import {
    CanisterConfig as StableCanisterConfig,
    Context as StableContext,
    CustomConfig as StableCustomConfig,
    WasmData as StableWasmData
} from '#utils/types';

export type Context = {
    canisterId: string;
    esmAliases: Record<string, string>;
    esmExternals: string[];
    reloadedJsPath: string;
    wasmData: WasmData;
} & StableContext;

export type WasmData = {
    managementDid: string;
} & StableWasmData;

export type CustomConfig = Omit<
    StableCustomConfig,
    'assets' | 'build_assets' | 'esm_aliases' | 'esm_externals'
> & {
    assets?: [string, string][];
    build_assets?: string;
    esm_aliases?: Record<string, string>;
    esm_externals?: string[];
};

export type CanisterConfig = Omit<StableCanisterConfig, 'custom'> & {
    custom?: CustomConfig;
};

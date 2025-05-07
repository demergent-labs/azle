import {
    CanisterConfig as StableCanisterConfig,
    Context as StableContext,
    CustomConfig as StableCustomConfig,
    WasmData as StableWasmData
} from '#utils/types';

import {
    Consumer,
    ConsumerConfig
} from '../commands/build/open_value_sharing/consumer';

export type Context = {
    canisterId: string;
    esmAliases: Record<string, string>;
    esmExternals: string[];
    reloadedJsPath: string;
    wasmData: WasmData;
} & StableContext;

export type WasmData = {
    consumer: Consumer;
    managementDid: string;
} & StableWasmData;

export type CustomConfig = Omit<StableCustomConfig, 'openValueSharing'> & {
    openValueSharing?: ConsumerConfig;
};

export type CanisterConfig = Omit<StableCanisterConfig, 'custom'> & {
    custom?: CustomConfig;
};

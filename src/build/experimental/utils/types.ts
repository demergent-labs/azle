import {
    Context as StableContext,
    WasmData as StableWasmData
} from '../../stable/utils/types';
import { Consumer } from '../commands/compile/open_value_sharing/consumer';

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

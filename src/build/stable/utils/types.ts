import { ConsumerConfig } from '../../experimental/commands/compile/open_value_sharing/consumer';

export type CandidAndMethodMeta = {
    candid: string;
    methodMeta: MethodMeta;
};

export type CandidGen = 'automatic' | 'custom' | 'http';

export type CanisterConfig = {
    main?: string;
    custom?: {
        assets?: [string, string][];
        build_assets?: string;
        candid_gen?: CandidGen;
        env?: string[];
        esm_aliases: Record<string, string>;
        esm_externals: string[];
        experimental?: boolean;
        openValueSharing?: ConsumerConfig;
    };
};

export type Context = {
    canisterPath: string;
    candidPath: string;
    main: string;
    wasmBinaryPath: string;
    wasmData: WasmData;
};

export type Command =
    | 'compile'
    | 'install-dfx-extension'
    | 'template'
    | 'upload-assets'
    | '--version'
    | 'clean'
    | 'new';

export type DfxJson = {
    canisters?: {
        [key: string]: CanisterConfig | undefined;
    };
};

export type EnvVars = [string, string][];

export type Method = {
    name: string;
    composite?: boolean;
    index: number;
};

export type MethodMeta = {
    queries?: Method[];
    updates?: Method[];
    init?: Method;
    pre_upgrade?: Method;
    post_upgrade?: Method;
    heartbeat?: Method;
    inspect_message?: Method;
};

export type WasmData = {
    envVars: EnvVars;
};

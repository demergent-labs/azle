export type CandidAndMethodMeta = {
    candid: string;
    methodMeta: MethodMeta;
};

export type CandidGen = 'automatic' | 'custom';

// TODO in stable we should detect if certain properties exist
// TODO and throw if not in experimental mode
// TODO should the experimental properties only be defined
// TODO in an experimental version of CanisterConfig?
export type CanisterConfig = {
    main?: string;
    custom?: {
        assets?: [string, string][];
        candid_gen?: CandidGen;
        env?: string[];
        esm_aliases: Record<string, string>;
        esm_externals: string[];
        experimental?: boolean;
    };
};

export type Context = {
    main: string;
    canisterPath: string;
    candidPath: string;
    envVars: EnvVars;
    wasmBinaryPath: string;
};

export type Command =
    | 'new'
    | 'compile'
    | 'install-dfx-extension'
    | 'clean'
    | 'upload-assets'
    | '--version';

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
    env_vars: EnvVars;
};

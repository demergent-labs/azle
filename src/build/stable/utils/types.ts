export type CandidAndMethodMeta = {
    candid: string;
    methodMeta: MethodMeta;
};

export type CandidGen = 'automatic' | 'custom';

export type CanisterConfig = {
    main?: string;
    custom?: {
        assets?: [string, string][];
        candid_gen?: CandidGen;
        env?: string[];
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

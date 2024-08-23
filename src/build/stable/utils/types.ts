export type Command =
    | 'new'
    | 'compile'
    | 'install-dfx-extension'
    | 'clean'
    | 'upload-assets'
    | '--version';

export type EnvVars = [string, string][];

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CANISTER_ORIGIN: string | undefined;
    readonly VITE_IDENTITY_PROVIDER: string | undefined;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

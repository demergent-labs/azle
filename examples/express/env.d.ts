/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CANISTER_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

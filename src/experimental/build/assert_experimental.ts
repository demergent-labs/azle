if (globalThis._azleExperimental !== true) {
    throw new Error(
        'Azle: experimental mode must be enabled to import from azle/experimental or #experimental. You can enable experimental mode by setting AZLE_EXPERIMENTAL to true in your environment.'
    );
}

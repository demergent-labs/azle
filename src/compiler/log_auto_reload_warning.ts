import { red } from './utils/colors';

export function logAutoreloadWarning() {
    if (
        process.env.AZLE_AUTORELOAD === 'true' &&
        process.env.DFX_NETWORK !== 'local'
    ) {
        console.info(
            red(
                `DANGER: AZLE_AUTORELOAD is set to true; arbitrary untrusted JavaScript can be executed with the reload_js update method\n`
            )
        );
    }
}

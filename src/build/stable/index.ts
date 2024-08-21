// TODO try to make everything pure as much as possible
// TODO gather everything and write to files etc at the end

import { compile } from './compile';
import { CanisterConfig } from './get_canister_config';

export async function build(
    canisterName: string,
    canisterConfig: CanisterConfig
): Promise<void> {
    const commandName = process.argv[2];

    if (commandName === 'compile') {
        await compile(canisterName, canisterConfig);
    }
}

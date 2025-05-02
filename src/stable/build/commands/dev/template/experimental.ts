import { IOType } from 'child_process';
import { join } from 'path';

import { compile } from '#commands/build/wasm_binary/compile';
import { EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH } from '#utils/global_paths';
import { AZLE_ROOT } from '#utils/global_paths';
import { logGlobalDependencies } from '#utils/log_global_dependencies';

export async function runCommand(ioType: IOType): Promise<void> {
    await logGlobalDependencies();

    compile(
        join(
            AZLE_ROOT,
            'src',
            'experimental',
            'build',
            'commands',
            'build',
            'wasm_binary',
            'rust',
            'experimental_canister_template',
            'Cargo.toml'
        ),
        EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH,
        ioType
    );
}

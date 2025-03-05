import { IOType } from 'child_process';
import { join } from 'path';

import { compile } from '#experimental/commands/compile/wasm_binary/compile';
import { EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH } from '#experimental/utils/global_paths';
import { AZLE_PACKAGE_PATH } from '#utils/global_paths';
import { logGlobalDependencies } from '#utils/log_global_dependencies';

export async function runCommand(ioType: IOType): Promise<void> {
    await logGlobalDependencies();

    compile(
        join(
            AZLE_PACKAGE_PATH,
            'src',
            'experimental',
            'build',
            'commands',
            'compile',
            'wasm_binary',
            'rust',
            'experimental_canister_template',
            'Cargo.toml'
        ),
        EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH,
        ioType
    );
}

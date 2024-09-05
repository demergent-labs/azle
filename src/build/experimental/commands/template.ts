import { IOType } from 'child_process';
import { join } from 'path';

import { compile } from '../../experimental/commands/compile/wasm_binary/compile';
import { AZLE_PACKAGE_PATH } from '../../stable/utils/global_paths';
import { logGlobalDependencies } from '../../stable/utils/log_global_dependencies';
import { EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH } from '../utils/global_paths';

export async function runCommand(ioType: IOType): Promise<void> {
    await logGlobalDependencies();

    compile(
        join(
            AZLE_PACKAGE_PATH,
            'src',
            'build',
            'rust',
            'canister',
            'Cargo.toml'
        ),
        EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH,
        ioType
    );
}

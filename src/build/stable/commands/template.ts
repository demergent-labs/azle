import { IOType } from 'child_process';
import { join } from 'path';

import {
    AZLE_PACKAGE_PATH,
    STABLE_STATIC_CANISTER_TEMPLATE_PATH
} from '../utils/global_paths';
import { logGlobalDependencies } from '../utils/log_global_dependencies';
import { compile } from './compile/wasm_binary/compile';

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
        STABLE_STATIC_CANISTER_TEMPLATE_PATH,
        ioType
    );
}

import { IOType } from 'child_process';
import { join } from 'path';

import { compile } from '#commands/build/wasm_binary/compile';
import {
    AZLE_ROOT,
    EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH
} from '#utils/global_paths';

export async function runCommand(ioType: IOType): Promise<void> {
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
        ioType,
        true
    );
}

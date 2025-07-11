import { IOType } from 'child_process';
import { join } from 'path';

import { compile } from '#commands/build/wasm_binary/compile';
import {
    AZLE_ROOT,
    STABLE_STATIC_CANISTER_TEMPLATE_PATH
} from '#utils/global_paths';

export async function runCommand(ioType: IOType): Promise<void> {
    compile(
        join(
            AZLE_ROOT,
            'src',
            'stable',
            'build',
            'commands',
            'build',
            'wasm_binary',
            'rust',
            'stable_canister_template',
            'Cargo.toml'
        ),
        STABLE_STATIC_CANISTER_TEMPLATE_PATH,
        ioType
    );
}

import { Rust } from '../../../../types';
import { generateCanisterMethodHeartbeat } from './heartbeat';
import { generateCanisterMethodInit } from './init';
import { generateCanisterMethodInspectMessage } from './inspect_message';
import { generateCanisterMethodPostUpgrade } from './post_upgrade';
import { generateCanisterMethodPreUpgrade } from './pre_upgrade';
import { SourceFile } from 'typescript';

export function generateSystemCanisterMethods(
    sourceFiles: readonly SourceFile[]
) {
    const canisterMethodInit: Rust = generateCanisterMethodInit(sourceFiles);
    const canisterMethodInspectMessage: Rust =
        generateCanisterMethodInspectMessage(sourceFiles);
    const canisterMethodPreUpgrade: Rust =
        generateCanisterMethodPreUpgrade(sourceFiles);
    const canisterMethodPostUpgrade: Rust =
        generateCanisterMethodPostUpgrade(sourceFiles);
    const canisterMethodHeartbeat: Rust =
        generateCanisterMethodHeartbeat(sourceFiles);

    return `
        ${canisterMethodInit}
        ${canisterMethodInspectMessage}
        ${canisterMethodPreUpgrade}
        ${canisterMethodPostUpgrade}
        ${canisterMethodHeartbeat}
    `;
}

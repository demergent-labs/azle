import { CallFunctionInfo, Rust } from '../../../../types';
import { generateCanisterMethodHeartbeat } from './heartbeat';
import { generateCanisterMethodInit } from './init';
import { generateCanisterMethodInspectMessage } from './inspect_message';
import { generateCanisterMethodPostUpgrade } from './post_upgrade';
import { generateCanisterMethodPreUpgrade } from './pre_upgrade';
import { SourceFile } from 'typescript';

export function generateSystemCanisterMethods(
    sourceFiles: readonly SourceFile[],
    callFunctionInfos: CallFunctionInfo[]
) {
    const canisterMethodInit: Rust = generateCanisterMethodInit(
        sourceFiles,
        callFunctionInfos
    );
    const canisterMethodInspectMessage: Rust =
        generateCanisterMethodInspectMessage(sourceFiles);
    const canisterMethodPreUpgrade: Rust =
        generateCanisterMethodPreUpgrade(sourceFiles);
    const canisterMethodPostUpgrade: Rust = generateCanisterMethodPostUpgrade(
        sourceFiles,
        callFunctionInfos
    );
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

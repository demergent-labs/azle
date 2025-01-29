export function generateCanister(
    idlType: string,
    tsType: string,
    imports: string[],
    variableAliasDeclarations: string[]
): string {
    return /*ts*/ `
import { msgReply, query, update } from 'azle';
${imports
    .map((importDeclaration) => `import { ${importDeclaration} } from 'azle';`)
    .join('\n')}
${variableAliasDeclarations.join('\n')}

export default class {
    @query([${idlType}], ${idlType}, { manual: true })
    alwaysReplyQuery(input: ${tsType}): void {
        const encoded = new Uint8Array(IDL.encode([${idlType}], [input]));

        msgReply(encoded);
    }

    @update([${idlType}], ${idlType}, { manual: true })
    alwaysReplyUpdate(input: ${tsType}): void {
        const encoded = new Uint8Array(IDL.encode([${idlType}], [input]));

        msgReply(encoded);
    }
}
    `;
}

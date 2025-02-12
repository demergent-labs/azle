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
    alwaysReplyQuery(): void {
        const input = IDL.decode([${idlType}], new Uint8Array(msgArgData()).buffer)[0] as unknown as ${tsType};

        const encoded = new Uint8Array(IDL.encode([${idlType}], [input]));

        msgReply(encoded);
    }

    @update([${idlType}], ${idlType}, { manual: true })
    alwaysReplyUpdate(): void {
        const input = IDL.decode([${idlType}], new Uint8Array(msgArgData()).buffer)[0] as unknown as ${tsType};

        const encoded = new Uint8Array(IDL.encode([${idlType}], [input]));

        msgReply(encoded);
    }
}
    `;
}

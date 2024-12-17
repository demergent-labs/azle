export function generateCanister(
    idlType: string,
    tsType: string,
    imports: string[],
    variableAliasDeclarations: string[]
): string {
    return /*ts*/ `
import { query, reply, update } from 'azle';
${imports
    .map((importDeclaration) => `import { ${importDeclaration} } from 'azle';`)
    .join('\n')}
${variableAliasDeclarations.join('\n')}

export default class {
    @query([${idlType}], ${idlType}, { manual: true })
    alwaysReplyQuery(input: ${tsType}): void {
        reply({ data: input, idlType: ${idlType} });
    }

    @update([${idlType}], ${idlType}, { manual: true })
    alwaysReplyUpdate(input: ${tsType}): void {
        reply({ data: input, idlType: ${idlType} });
    }
}
    `;
}

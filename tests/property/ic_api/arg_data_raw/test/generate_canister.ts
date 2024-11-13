export function generateCanister(
    initIdlType: string,
    initTsType: string,
    queryIdlType: string,
    queryTsType: string,
    updateIdlType: string,
    updateTsType: string,
    imports: string[],
    variableAliasDeclarations: string[]
): string {
    return /*ts*/ `
import {
    argDataRaw,
    candidEncode,
    init,
    postUpgrade,
    query,
    update
} from 'azle';
${imports
    .map((importDeclaration) => `import { ${importDeclaration} } from 'azle';`)
    .join('\n')}
${variableAliasDeclarations.join('\n')}

export default class {
    initArgDataRaw: Uint8Array | null = null;
    postUpgradeArgDataRaw: Uint8Array | null = null;

    @init([${initIdlType}])
    init(arg: ${initTsType}): void {
        console.info('init', arg);
        this.initArgDataRaw = argDataRaw();
    }

    @query([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    getInitArgDataRaw(): [Uint8Array] | [] {
        if (this.initArgDataRaw === null) {
            return [];
        } else {
            return [this.initArgDataRaw];
        }
    }

    @postUpgrade([${initIdlType}])
    postUpgrade(arg: ${initTsType}): void {
        console.info('postUpgrade', arg);
        this.postUpgradeArgDataRaw = argDataRaw();
    }

    @query([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    getPostUpgradeArgDataRaw(): [Uint8Array] | [] {
        if (this.postUpgradeArgDataRaw === null) {
            return [];
        } else {
            return [this.postUpgradeArgDataRaw];
        }
    }

    @query([${queryIdlType}], IDL.Vec(IDL.Nat8))
    getQueryArgDataRaw(arg: ${queryTsType}): Uint8Array {
        console.info('query', arg);
        return argDataRaw();
    }

    @update([${updateIdlType}], IDL.Vec(IDL.Nat8))
    getUpdateArgDataRaw(arg: ${updateTsType}): Uint8Array {
        console.info('update', arg);
        return argDataRaw();
    }

    @query([IDL.Text], IDL.Vec(IDL.Nat8))
    candidEncode(arg: string): Uint8Array {
        return candidEncode(arg);
    }
}
    `;
}

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
    candidEncode,
    init,
    msgArgData,
    postUpgrade,
    query,
    update
} from 'azle';
${imports
    .map((importDeclaration) => `import { ${importDeclaration} } from 'azle';`)
    .join('\n')}
${variableAliasDeclarations.join('\n')}
import { AssertType, NotAnyAndExact } from 'azle/_internal/test/assert_type';

export default class {
    initMsgArgData: Uint8Array | null = null;
    postUpgradeMsgArgData: Uint8Array | null = null;

    @init([${initIdlType}])
    init(_arg: ${initTsType}): void {
        this.initMsgArgData = msgArgData();
    }

    @query([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    getInitMsgArgData(): [Uint8Array] | [] {
        if (this.initMsgArgData === null) {
            return [];
        } else {
            return [this.initMsgArgData];
        }
    }

    @postUpgrade([${initIdlType}])
    postUpgrade(_arg: ${initTsType}): void {
        this.postUpgradeMsgArgData = msgArgData();
    }

    @query([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    getPostUpgradeMsgArgData(): [Uint8Array] | [] {
        if (this.postUpgradeMsgArgData === null) {
            return [];
        } else {
            return [this.postUpgradeMsgArgData];
        }
    }

    @query([${queryIdlType}], IDL.Vec(IDL.Nat8))
    getQueryMsgArgData(_arg: ${queryTsType}): Uint8Array {
        return msgArgData();
    }

    @update([${updateIdlType}], IDL.Vec(IDL.Nat8))
    getUpdateMsgArgData(_arg: ${updateTsType}): Uint8Array {
        return msgArgData();
    }

    @query([IDL.Text], IDL.Vec(IDL.Nat8))
    candidEncode(arg: string): Uint8Array {
        return candidEncode(arg);
    }

    @query([], IDL.Bool)
    assertTypes(): boolean {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof msgArgData>, Uint8Array>
        >;
        return msgArgData() instanceof Uint8Array;
    }
}
    `;
}

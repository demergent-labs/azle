import { IDL } from '@dfinity/candid';
import { v4 } from 'uuid';

import { CandidType, Parent } from './index';

export type _AzleRecursiveFunction = {
    (...args: any[]): CandidType;
    azleName?: string;
    isRecursive?: boolean;
    getIdl?: (parents: Parent[]) => IDL.Type<any>;
};

export function Recursive(candidTypeCallback: any): any {
    const name = v4();

    let result: _AzleRecursiveFunction = (...args: any[]) => {
        const candidType = candidTypeCallback();
        if (candidType.isCanister !== undefined) {
            return candidType(...args);
        }
        return candidType;
    };

    result.azleName = name;
    result.isRecursive = true;
    result.getIdl = (parents: Parent[]) => {
        const idl = IDL.Rec();
        let filler = candidTypeCallback();
        if (filler.isCanister !== undefined) {
            filler = filler(result);
        }
        idl.fill(filler.getIdl([...parents, { idl: idl, name }]));
        return idl;
    };

    return result;
}

import '../experimental';

import { IDL } from '@dfinity/candid';
import { v4 } from 'uuid';

import { CandidType, Parent } from './index';

export type _AzleRecursiveFunction = {
    (...args: any[]): CandidType;
    azleName?: string;
    isRecursive?: boolean;
    getIdlType?: (parents: Parent[]) => IDL.Type<any>;
};

export function Recursive(candidTypeCallback: any): any {
    const name = v4();

    let result: _AzleRecursiveFunction = (...args: any[]) => {
        const candidType = candidTypeCallback();
        if (candidType.isCanister) {
            return candidType(...args);
        }
        return candidType;
    };

    result.azleName = name;
    result.isRecursive = true;
    // TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    result.getIdlType = (parents: Parent[]) => {
        const idlType = IDL.Rec();
        let filler = candidTypeCallback();
        if (filler.isCanister) {
            filler = filler(result);
        }
        idlType.fill(filler.getIdlType([...parents, { idlType, name }]));
        return idlType;
    };

    return result;
}

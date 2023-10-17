import { v4 } from 'uuid';
import { IDL } from '@dfinity/candid';
import { CandidType, Parent } from './index';

export type _AzleRecursiveFunction = {
    (...args: any[]): CandidType;
    _azleName?: string;
    _azleIsRecursive?: boolean;
    getIdl?: (parents: Parent[]) => IDL.Type<any>;
};

export function Recursive(candidTypeCallback: any): any {
    const name = v4();

    let result: _AzleRecursiveFunction = (...args: any[]) => {
        const candidType = candidTypeCallback();
        if (candidType._azleIsCanister) {
            return candidType(...args);
        }
        return candidType;
    };

    result._azleName = name;
    result._azleIsRecursive = true;
    result.getIdl = (parents: Parent[]) => {
        const idl = IDL.Rec();
        let filler = candidTypeCallback();
        if (filler._azleIsCanister) {
            filler = filler(result);
        }
        idl.fill(filler.getIdl([...parents, { idl: idl, name }]));
        return idl;
    };

    return result;
}

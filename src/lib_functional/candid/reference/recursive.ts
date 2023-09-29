import { v4 } from 'uuid';
import { IDL } from '@dfinity/candid';
import { Parent } from '../../../lib_new/utils';

export interface RecursiveType {
    idlCallback: () => any;
    _azleName: string;
    getIDL(parents: Parent[]): any;
}

export function Recursive(idlCallback: () => any): RecursiveType {
    const name = v4();

    let result = (...args: any[]) => {
        const idl = idlCallback();
        if (idl._azleIsCanister) {
            return idl(...args);
        }
        return idl;
    };

    result._azleName = name;
    result._azleIsRecursive = true;
    result.getIDL = (parents: Parent[]) => {
        const idl = IDL.Rec();
        let filler = idlCallback();
        if (filler._azleIsCanister) {
            filler = filler(result);
        }
        idl.fill(filler.getIDL([...parents, { idl: idl, name }]));
        return idl;
    };

    return result;
}

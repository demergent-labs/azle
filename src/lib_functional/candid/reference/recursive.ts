import { v4 } from 'uuid';
import { IDL } from '@dfinity/candid';
import { Parent } from '../../../lib_new/utils';

export interface RecursiveResult {
    idlCallback: () => any;
    _azleName: string;
    getIDL(parents: Parent[]): any;
}

export function Recursive(idlCallback: any): RecursiveResult {
    const name = v4();

    const result = {
        idlCallback,
        _azleName: name,
        getIDL(parents: Parent[]) {
            const idl = IDL.Rec();
            let filler = idlCallback();
            if (filler._azleIsCanister) {
                filler = filler(result);
            }
            idl.fill(filler.getIDL([...parents, { idl: idl, name }]));
            return idl;
        }
    };

    return result;
}

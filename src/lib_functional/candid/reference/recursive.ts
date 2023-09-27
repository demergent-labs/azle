import { v4 } from 'uuid';
import { IDL } from '@dfinity/candid';
import { Parent } from '../../../lib_new/utils';

export function Recursive(idlCallback: any) {
    const name = v4();

    return {
        idlCallback,
        _azleName: name,
        getIDL(parents: Parent[]) {
            const idl = IDL.Rec();
            idl.fill(idlCallback().getIDL([...parents, { idl: idl, name }]));
            return idl;
        }
    };
}

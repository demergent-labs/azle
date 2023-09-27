import { v4 } from 'uuid';

export function Recursive(idl: any) {
    idl._azleRecLambda = true;
    idl._azleName = v4();
    return idl;
}

import { IDL } from '@dfinity/candid';
import { CandidClass } from './property_decorators';

export function display(paramIdl: CandidClass) {
    if (paramIdl instanceof IDL.FuncClass) {
        return `func ${paramIdl.display().replace(/→/g, '->')}`;
    }
    return paramIdl.display();
}

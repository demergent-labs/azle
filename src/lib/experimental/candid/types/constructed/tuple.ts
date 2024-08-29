import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { CandidType } from '../../candid_type';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { Parent, toIdlType } from '../../to_idl_type';
import { TypeMapping } from '../../type_mapping';

export class AzleTuple<T extends any[]> {
    constructor(t: CandidType[]) {
        this.innerTypes = t;
    }

    tsType: {
        [P in keyof T]: TypeMapping<T[P]>;
    } = {} as any;

    innerTypes: CandidType[];

    _azleKind = 'AzleTuple' as const;
    static _azleKind = 'AzleTuple' as const;

    toBytes(data: any): Uint8Array {
        return encode(this, data);
    }

    // TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    getIdlType(parents: Parent[]): IDL.TupleClass<any> {
        const idlTypes = this.innerTypes.map((value) => {
            return toIdlType(value, parents);
        });
        return IDL.Tuple(...idlTypes);
    }
}

export function Tuple<T extends CandidType[]>(...types: T): AzleTuple<T> {
    return new AzleTuple<T>(types);
}
export type Tuple<T> = T;

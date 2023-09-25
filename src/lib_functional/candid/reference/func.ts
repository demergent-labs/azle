import { TypeMapping } from '..';
import { IDL } from '@dfinity/candid';
import {
    processMap,
    toParamIDLTypes,
    toReturnIDLType
} from '../../../lib_new/utils';
import { v4 } from 'uuid';
import { Principal } from '../../';

type Mode = 'query' | 'update' | 'oneway';

const modeToCandid = {
    query: ['query'],
    oneway: ['oneway'],
    update: [] // TODO what is the proper way to do updates
};

export function Func(
    paramsIdls: any[],
    returnIdl: any,
    mode: Mode
): [Principal, string] {
    // TODO can't Func be recursive?
    // TODO can't Opt be recursive?
    // const name = v4();

    return {
        getIDL() {
            return IDL.Func(
                toParamIDLTypes(paramsIdls),
                toReturnIDLType(returnIdl),
                modeToCandid[mode]
            );
        }
    } as any;
}

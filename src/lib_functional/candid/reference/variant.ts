import { TypeMapping } from '..';
import { IDL } from '@dfinity/candid';
import { processMap } from '../../../lib_new/utils';
import { v4 } from 'uuid';
import { Null } from '../../../lib_new/primitives';

export function Variant<T>(obj: T): RequireExactlyOne<{
    [K in keyof T]: TypeMapping<T[K]>;
}> & { _azleCandidType?: '_azleCandidType' } {
    const name = v4();

    return {
        ...obj,
        _azleName: name,
        getIDL(parents: any) {
            return IDL.Variant(processMap(obj as any, parents));
        }
    } as any;
}

type RequireExactlyOne<
    ObjectType,
    KeysType extends keyof ObjectType = keyof ObjectType
> = {
    [Key in KeysType]: Required<Pick<ObjectType, Key>> &
        Partial<Record<Exclude<KeysType, Key>, never>>;
}[KeysType] &
    Omit<ObjectType, KeysType>;

/**
 * Indicates an error was encountered during a canister method.
 */
export const RejectionCode = Variant({
    NoError: Null,
    SysFatal: Null,
    SysTransient: Null,
    DestinationInvalid: Null,
    CanisterReject: Null,
    CanisterError: Null,
    Unknown: Null
});

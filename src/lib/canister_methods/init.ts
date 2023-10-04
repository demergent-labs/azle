import { Callback, CanisterMethodInfo, createParents, executeMethod } from '.';
import { CandidType, TypeMapping } from '../candid';
import { Void } from '../candid/types/primitive/void';

export function init<
    const Params extends ReadonlyArray<CandidType>,
    GenericCallback extends Callback<Params, typeof Void>
>(
    paramCandidTypes: Params,
    callback?: Awaited<ReturnType<GenericCallback>> extends TypeMapping<Void>
        ? GenericCallback
        : never
): CanisterMethodInfo<Params, Void> {
    return ((parent: any) => {
        const finalCallback =
            callback === undefined
                ? undefined
                : (...args: any[]) => {
                      executeMethod(
                          'init',
                          args,
                          callback,
                          paramCandidTypes as unknown as CandidType[],
                          Void,
                          false,
                          createParents(parent)
                      );
                  };

        return {
            mode: 'init',
            callback: finalCallback,
            paramCandidTypes: paramCandidTypes as any,
            returnCandidType: Void,
            async: false,
            guard: undefined
        } as CanisterMethodInfo<Params, Void>;
    }) as any;
}

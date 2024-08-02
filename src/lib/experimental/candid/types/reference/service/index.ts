import { CanisterMethodInfo } from '../../../../canister_methods/types/canister_method_info';
import { CandidType, TypeMapping } from '../../../index';
import { _AzleRecursiveFunction } from '../../../recursive';
import { Principal } from '../principal';
import { createCanisterFunction } from './canister_function';

type CanisterOptions = {
    [key: string]: CanisterMethodInfo<any, any>;
};

type CanisterReturn<T extends CanisterOptions> = {
    [EndpointName in keyof T]: T[EndpointName] extends CanisterMethodInfo<
        infer Params,
        infer Return
    >
        ? (
              ...args: { [K in keyof Params]: TypeMapping<Params[K]> }
          ) => Promise<TypeMapping<Return>>
        : never;
};

type CallableObject<T extends CanisterOptions> = {
    (principal: Principal): CallableObject<T> & CandidType;
} & CanisterReturn<T>;

type _AzleCanisterReturnType = {
    (parentOrPrincipal: _AzleRecursiveFunction | Principal): void;
    isCanister?: boolean;
};

export function Canister<T extends CanisterOptions>(
    canisterOptions: T
): CallableObject<T> & CandidType {
    let result: _AzleCanisterReturnType = (parentOrPrincipal: any) => {
        const canisterFunction = createCanisterFunction(canisterOptions);

        if (parentOrPrincipal !== undefined && parentOrPrincipal._isPrincipal) {
            return canisterFunction(parentOrPrincipal);
        }

        return canisterFunction;
    };
    result.isCanister = true;
    return result as any;
}

import { ic, IDL, Principal } from './index';
import {
    CandidClass,
    Parent,
    ReturnCandidClass,
    toParamCandidClasses,
    toReturnCandidClass
} from './utils';

export type FunctionInfo = {
    mode: 'query' | 'update';
    paramIdls: CandidClass[];
    returnIdl: ReturnCandidClass;
};

export interface ServiceFunctionInfo {
    [key: string]: FunctionInfo;
}

export interface ServiceConstructor {
    _azleFunctionInfo?: ServiceFunctionInfo;
}

type Constructor<T = {}> = new (...args: any[]) => T;

export abstract class Service {
    canisterId: Principal;

    [key: string]: any;

    constructor(canisterId: Principal) {
        this.canisterId = canisterId;

        // This sets the context (this) correctly for
        // ic.call, ic.call128, and ic.notify
        const proto = Object.getPrototypeOf(this);
        Object.getOwnPropertyNames(proto)
            .filter(
                (name) =>
                    typeof proto[name] === 'function' && name !== 'constructor'
            )
            .forEach((name) => {
                this[name] = this[name].bind(this);
            });
    }

    static create<T extends Constructor>(
        this: T,
        props: { canisterId: Principal }
    ): InstanceType<T> {
        return new this(props) as InstanceType<T>;
    }

    static getIDL(parents: Parent[]): IDL.ServiceClass {
        const serviceFunctionInfo: ServiceFunctionInfo =
            // @ts-ignore - may be added by @query and @update decorators
            this._azleFunctionInfo || {};

        const record = Object.entries(serviceFunctionInfo).reduce(
            (accumulator, [methodName, functionInfo]) => {
                const paramRealIdls = toParamCandidClasses(
                    functionInfo.paramIdls
                );
                const returnRealIdl = toReturnCandidClass(
                    functionInfo.returnIdl
                );

                const annotations =
                    functionInfo.mode === 'update' ? [] : ['query'];

                return {
                    ...accumulator,
                    [methodName]: IDL.Func(
                        paramRealIdls,
                        returnRealIdl,
                        annotations
                    )
                };
            },
            {} as Record<string, IDL.FuncClass>
        );

        return IDL.Service(record);
    }
}

export function serviceDecorator(
    target: any,
    key: string,
    paramsIdls: any[],
    returnIdl: CandidClass
) {
    target[key] = serviceCall(key, paramsIdls, returnIdl);
}

export function serviceCall(
    methodName: string,
    paramsIdls: any[],
    returnIdl: CandidClass
) {
    // This must remain a function and not an arrow function
    // in order to set the context (this) correctly
    return async function (
        _: '_AZLE_CROSS_CANISTER_CALL',
        notify: boolean,
        callFunction:
            | typeof ic.callRaw
            | typeof ic.callRaw128
            | typeof ic.notifyRaw,
        cycles: bigint,
        ...args: any[]
    ) {
        const encodedArgs = new Uint8Array(
            IDL.encode(toParamCandidClasses(paramsIdls), args)
        );

        if (notify) {
            try {
                return callFunction(
                    this.canisterId,
                    methodName,
                    encodedArgs,
                    cycles
                );
            } catch (error) {
                throw error;
            }
        } else {
            const encodedResult = await callFunction(
                this.canisterId,
                methodName,
                encodedArgs,
                cycles
            );

            const returnIdls = toReturnCandidClass(returnIdl);
            const decodedResult = IDL.decode(returnIdls, encodedResult)[0];

            return decodedResult;
        }
    };
}

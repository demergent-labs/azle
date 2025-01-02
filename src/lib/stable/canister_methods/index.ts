import { IDL } from '@dfinity/candid';

import { MethodMeta } from '../../../build/stable/utils/types';
import { handleUncaughtError } from '../error';
import {
    CanisterMethodMode,
    executeAndReplyWithCandidSerde
} from '../execute_with_candid_serde';

export interface ExportedCanisterClass {
    _azleCallbacks?: {
        [key: string]: MethodType<ExportedCanisterClass, any[], any>;
    };
    _azleCanisterMethodIdlTypes?: { [key: string]: IDL.FuncClass };
    _azleCanisterMethodsIndex?: number;
    _azleInitAndPostUpgradeIdlTypes?: IDL.FuncClass[];
    _azleMethodMeta?: MethodMeta;
}

export type MethodType<This, Args extends any[], Return> = (
    this: This,
    ...args: Args
) => Return;

export type DecoratorFunction<This, Args extends any[], Return> = (
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
) => MethodType<This, Args, Return>;

export function decoratorArgumentsHandler<This, Args extends any[], Return>(
    canisterMethodMode: CanisterMethodMode,
    param1?: MethodType<This, Args, Return> | IDL.Type[],
    param2?:
        | ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
        | IDL.Type,
    param3?: { composite?: boolean; manual?: boolean }
):
    | MethodType<ExportedCanisterClass, Args, Return>
    | DecoratorFunction<ExportedCanisterClass, Args, Return> {
    const decoratorIsOverloadedWithoutParams =
        isDecoratorOverloadedWithoutParams(param1, param2);

    if (decoratorIsOverloadedWithoutParams === true) {
        const originalMethod = param1 as MethodType<
            ExportedCanisterClass,
            Args,
            Return
        >;
        const context = param2 as ClassMethodDecoratorContext<
            ExportedCanisterClass,
            MethodType<ExportedCanisterClass, Args, Return>
        >;

        return decoratorImplementation(
            canisterMethodMode,
            originalMethod,
            context
        );
    } else {
        const paramIdlTypes = param1 as IDL.Type[] | undefined;
        const returnIdlType = param2 as IDL.Type | undefined;
        const options = param3;

        return (
            originalMethod: MethodType<ExportedCanisterClass, Args, Return>,
            context: ClassMethodDecoratorContext<
                ExportedCanisterClass,
                MethodType<ExportedCanisterClass, Args, Return>
            >
        ): MethodType<ExportedCanisterClass, Args, Return> => {
            return decoratorImplementation(
                canisterMethodMode,
                originalMethod,
                context,
                paramIdlTypes,
                returnIdlType,
                options
            );
        };
    }
}

function isDecoratorOverloadedWithoutParams<This, Args extends any[], Return>(
    param1?: MethodType<This, Args, Return> | IDL.Type[],
    param2?:
        | ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
        | IDL.Type
): boolean {
    return (
        typeof param1 === 'function' &&
        param2 !== undefined &&
        'kind' in param2 &&
        param2.kind === 'method' &&
        param2.metadata !== undefined &&
        param2.name !== undefined
    );
}

function decoratorImplementation<
    This extends ExportedCanisterClass,
    Args extends any[],
    Return
>(
    canisterMethodMode: CanisterMethodMode,
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>,
    paramIdlTypes?: IDL.Type[],
    returnIdlType?: IDL.Type,
    options?: { composite?: boolean; manual?: boolean }
): MethodType<This, Args, Return> {
    context.addInitializer(function () {
        if (this._azleCanisterMethodsIndex === undefined) {
            this._azleCanisterMethodsIndex = 0;
        }

        if (this._azleCanisterMethodIdlTypes === undefined) {
            this._azleCanisterMethodIdlTypes = {};
        }

        if (this._azleInitAndPostUpgradeIdlTypes === undefined) {
            this._azleInitAndPostUpgradeIdlTypes = [];
        }

        if (this._azleMethodMeta === undefined) {
            this._azleMethodMeta = {
                queries: [],
                updates: []
            };
        }

        if (this._azleCallbacks === undefined) {
            this._azleCallbacks = {};
        }

        const name = context.name as string;

        const index = this._azleCanisterMethodsIndex++;
        const indexString = index.toString();

        if (canisterMethodMode === 'query') {
            this._azleMethodMeta.queries?.push({
                name,
                index,
                composite: options?.composite ?? false
            });

            this._azleCanisterMethodIdlTypes[name] = IDL.Func(
                paramIdlTypes ?? [],
                returnIdlType === undefined ? [] : [returnIdlType],
                ['query']
            );
        }

        if (canisterMethodMode === 'update') {
            this._azleMethodMeta.updates?.push({
                name,
                index
            });

            this._azleCanisterMethodIdlTypes[name] = IDL.Func(
                paramIdlTypes ?? [],
                returnIdlType === undefined ? [] : [returnIdlType]
            );
        }

        if (canisterMethodMode === 'init') {
            this._azleMethodMeta.init = {
                name,
                index
            };

            this._azleInitAndPostUpgradeIdlTypes.push(
                IDL.Func(paramIdlTypes ?? [], [], ['init'])
            );
        }

        if (canisterMethodMode === 'postUpgrade') {
            this._azleMethodMeta.post_upgrade = {
                name,
                index
            };

            this._azleInitAndPostUpgradeIdlTypes.push(
                IDL.Func(paramIdlTypes ?? [], [], ['post_upgrade'])
            );
        }

        if (canisterMethodMode === 'preUpgrade') {
            this._azleMethodMeta.pre_upgrade = {
                name,
                index
            };
        }

        if (canisterMethodMode === 'heartbeat') {
            this._azleMethodMeta.heartbeat = {
                name,
                index
            };
        }

        if (canisterMethodMode === 'inspectMessage') {
            this._azleMethodMeta.inspect_message = {
                name,
                index
            };
        }

        this._azleCallbacks[indexString] = async (
            args?: Uint8Array
        ): Promise<void> => {
            try {
                await executeAndReplyWithCandidSerde(
                    canisterMethodMode,
                    args ?? new Uint8Array(),
                    originalMethod.bind(this), // TODO manually test context and ensure we have automatic tests for this
                    paramIdlTypes ?? [],
                    returnIdlType,
                    options?.manual ?? false
                );
            } catch (error: any) {
                handleUncaughtError(error);
            }
        };
    });

    return originalMethod;
}

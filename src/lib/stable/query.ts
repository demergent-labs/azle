import { IDL } from '@dfinity/candid';

import { isAsync } from '../canister_methods/is_async';
import { executeMethod } from './execute_method';

export function query(
    paramIdls: IDL.Type[],
    returnIdl: IDL.Type
): MethodDecorator {
    return <T>(
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> | void => {
        const originalMethod = descriptor.value;

        const methodCallback = (...args: any[]) => {
            executeMethod(
                'query',
                args,
                originalMethod,
                paramIdls,
                returnIdl,
                false // TODO implement manual check
            );
        };

        descriptor.value = methodCallback as any;

        globalThis._azleCanisterMethods.queries.push({
            name: propertyKey as string,
            composite: isAsync(originalMethod)
            // TODO implement guard
        });

        globalThis._azleCanisterMethods.callbacks[propertyKey as string] =
            methodCallback;

        return descriptor;
    };
}

// TODO this implementation is for native decorators
// export function query<This, Args extends any[], Return>(
//     paramIdls: IDL.Type[],
//     returnIdl: IDL.Type
// ) {
//     return (
//         originalMethod: (this: This, ...args: Args) => Return,
//         _context: ClassMethodDecoratorContext<
//             This,
//             (this: This, ...args: Args) => Return
//         >
//     ) => {
//         return function (this: This, ...args: Args): Return {
// executeMethod(
//     'query',
//     args,
//     originalMethod,
//     paramIdls,
//     returnIdl,
//     false // TODO implement manual check
// );

//             return undefined as Return;
//         };
//     };
// }

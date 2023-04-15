// from type-fest
type UnionToIntersection<Union> =
    // `extends unknown` is always going to be the case and is used to convert the
    // `Union` into a [distributive conditional
    // type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
    (
        Union extends unknown
            ? // The union type is used as the only argument to a function since the union
              // of function arguments is an intersection.
              (distributedUnion: Union) => void
            : // This won't happen.
              never
    ) extends // Infer the `Intersection` type since TypeScript represents the positional
    // arguments of unions of functions as an intersection of the union.
    (mergedIntersection: infer Intersection) => void
        ? Intersection
        : never;

// from type-fest
export type RequireExactlyOne<
    ObjectType,
    KeysType extends keyof ObjectType = keyof ObjectType
> = {
    [Key in KeysType]: Required<Pick<ObjectType, Key>> &
        Partial<Record<Exclude<KeysType, Key>, never>>;
}[KeysType] &
    Omit<ObjectType, KeysType>;

export type Variant<T extends object> = RequireExactlyOne<T>;

type UnVariant<T extends object> = UnionToIntersection<
    T extends Variant<infer Inner>
        ? {
              [Prop in keyof Inner as Required<Inner>[Prop] extends never
                  ? never
                  : Prop]: Inner[Prop];
          }
        : never
>;

type Matcher<T extends object, R> =
    | {
          [PropName in keyof UnVariant<T>]: (arg: UnVariant<T>[PropName]) => R;
      }
    | (Partial<{
          [PropName in keyof UnVariant<T>]: (arg: UnVariant<T>[PropName]) => R;
      }> & { _: (arg: never) => R });

type PropertyValueType<T> = T[keyof T];

export function match<U extends Matcher<T, any>, T extends object>(
    variant: T,
    matcher: U
): ReturnType<NonNullable<PropertyValueType<U>>> {
    for (const key in variant) {
        if (key in matcher) {
            return (matcher as any)[key](variant[key]);
        }
    }
    return (matcher as any)._();
}

// export function match_async<U extends Matcher<T, any>, T extends object>(
//     variant: T,
//     matcher: U
// ): Promise<ReturnType<NonNullable<PropertyValueType<U>>>> {
//     return match(variant, matcher);
// }

// type Variant<T extends object> = Partial<T>;

// function matchVariant<T extends object>(
//     variant: Variant<T>,
//     handlers: Record<keyof T, (value: T[keyof T]) => void>
// ) {
//     const handledKeys = new Set<keyof T>();

//     for (const key in variant) {
//         if (handlers.hasOwnProperty(key)) {
//             const handler = handlers[key];
//             handler(variant[key] as T[keyof T]);
//             handledKeys.add(key);
//         } else {
//             throw new Error(`Unhandled variant member: ${key}`);
//         }
//     }

//     const unhandledKeys = Object.keys(handlers).filter(
//         (key) => !handledKeys.has(key)
//     );
//     if (unhandledKeys.length > 0) {
//         throw new Error(
//             `Variant members not handled: ${unhandledKeys.join(', ')}`
//         );
//     }
// }

// type Matcher<T extends object, R, V = any> = {
//     [K in keyof T]: (value: V extends T[K] ? T[K] : never) => R;
// } & {
//     _: () => R;
// };

// function match<T extends object, R>(
//     value: Variant<T>,
//     matcher: Matcher<T, R>
// ): R {
//     const key = Object.keys(value)[0] as keyof T;
//     const matchFunc = matcher[key] || matcher._;
//     return matchFunc(value[key]);
// }

// TODO check that it works with returns records and variants
// TODO check that it works with all candid types

// type Matcher<T, R> = {
//     [K in keyof T]: (value: Parameters<T[K]>[0]) => R;
// } & {
//     _: () => R;
// };

// type Variant<T extends object> = {
//     [K in keyof T]: {
//         K: T[K];
//     };
// };

// TODO require exactly one for Variant
// TODO matcher function parameters to be inferred
// TODO _ required only if all Variant properties are not present
// TODO matcher functions must be able to return Variants
// TODO Variant.PropertyName to work

// type RequireExactlyOne<
//     ObjectType,
//     KeysType extends keyof ObjectType = keyof ObjectType
// > = {
//     [Key in KeysType]: Required<Pick<ObjectType, Key>> &
//         Partial<Record<Exclude<KeysType, Key>, never>>;
// }[KeysType] &
//     Omit<ObjectType, KeysType>;

// type Variant<T extends object> = RequireExactlyOne<T>;

// type FullMatcher<T extends object, R> = {
//     [K in keyof Required<T>]: (value: Required<T>[K]) => R;
// };

// type PartialMatcher<T extends object, R> = Partial<{
//     [K in keyof T]: (value: T[K]) => R;
// }> & {
//     _: () => R;
// };

// function match<
//     T extends object,
//     U extends FullMatcher<T, R> | PartialMatcher<T, R>,
//     R
// >(variant: T, matcher: U): R {
//     for (const key in variant) {
//         if (key in matcher) {
//             return (matcher as any)[key](variant[key]);
//         }
//     }
//     return matcher._();
// }

// type Monkey = Variant<{
//     Hello: null;
//     There: null;
//     Sir: null;
// }>;

// function test1(monkey: Monkey): string {
//     // const temp = monkey.Hello;

//     return match(monkey, {
//         Hello: (hello) => '',
//         There: (there) => '',
//         Sir: (sir) => ''
//     });
// }

// type Result = Variant<{
//     Ok: null;
//     Err: string;
// }>;

// const thing: Result = {
//     Ok: null
//     // Err: ''
// };

// function Brancher<T>(): {
//     [K in keyof NonNullable<T>]: (value: NonNullable<T>[K]) => {
//         [key in K]: NonNullable<T>;
//     };
// } {
//     return {};
// }

// type Lunky = {
//     Yes: null;
//     I: boolean;
//     Know: number;
// };

// const temp = Brancher<Monkey>().Hello(null);

// function test2(monkey: Monkey): Result {
//     // const temp = monkey.Hello;

//     const matched_value = match(monkey, {
//         Hello: (hello) => ({
//             // Ok: null,
//             Err: ''
//         }),
//         There: (there) => ({
//             Ok: null
//         }),
//         _: () => ({
//             Err: ''
//         })
//     });

//     return matched_value;

//     // return match(monkey, {
//     //     Hello: (hello) => ({
//     //         Ok: null
//     //     }),
//     //     There: (there) => ({
//     //         Ok: null
//     //     }),
//     //     _: () => ({
//     //         Err: ''
//     //     })
//     // });
// }

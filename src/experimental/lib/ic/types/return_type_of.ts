import '#experimental/lib/assert_experimental';

export type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : any;

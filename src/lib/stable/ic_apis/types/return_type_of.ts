export type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : any;

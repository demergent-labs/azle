export type ArgsType<T> = T extends (...args: infer U) => any ? U : any;

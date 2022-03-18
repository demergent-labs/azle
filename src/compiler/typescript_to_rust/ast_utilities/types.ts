export type AST = {
    items: Item[];
};

type Item = {
    impl?: Impl;
    fn?: Fn;
    // [key in 'impl']: Impl;
};

export type Impl = {
    items: ImplItem[]
};

export type ImplItem = {
    method?: ImplItemMethod;
};

export type ImplItemMethod = {
    vis: 'pub';
    async: boolean;
    ident: string;
    inputs: any[];
    output?: {};
    stmts: any[];
};

export type Fn = {
    async: boolean;
    ident: string;
    inputs: any[];
    output?: {};
    stmts: any[];
};
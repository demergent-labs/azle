export type AST = {
    items: Item[];
};

export type Item = {
    impl?: Impl;
    fn?: Fn;
    struct?: Struct;
    enum?: Enum;
    type?: Type;
};

export type Impl = {
    items: ImplItem[];
};

export type ImplItem = {
    method?: ImplItemMethod;
};

export type ImplItemMethod = {
    vis: 'pub';
    async: boolean;
    ident: string;
    inputs: any[];
    output?: any;
    stmts: any[];
};

export type Fn = {
    async: boolean;
    ident: string;
    inputs: any[];
    output?: any;
    stmts: any[];
    attrs?: any[];
};

export type Struct = {
    ident: string;
    attrs?: any[];
};

export type Enum = {};

export type Type = {
    ident: string;
};

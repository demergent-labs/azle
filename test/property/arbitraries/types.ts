export type Api = 'class' | 'functional';

export type Context<Constraint = any> = {
    api: Api;
    constraints: Constraint;
};

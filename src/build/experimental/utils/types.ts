import { Context as StableContext } from '../../stable/utils/types';

export type Context = {
    esmAliases: Record<string, string>;
    esmExternals: string[];
    wasmedgeQuickJsPath: string;
} & StableContext;

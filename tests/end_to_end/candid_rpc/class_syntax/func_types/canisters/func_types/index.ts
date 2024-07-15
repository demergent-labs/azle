import {
    call,
    IDL,
    init,
    Principal,
    query,
    StableBTreeMap,
    update
} from 'azle';

import { NotifierFunc } from '../notifiers';

type Func = [Principal, string];

const BasicFunc = IDL.Func([IDL.Text], [IDL.Text], ['query']);
type BasicFunc = Func;

const User = IDL.Rec();
const Reaction = IDL.Rec();

const ComplexFunc = IDL.Rec();
ComplexFunc.fill(IDL.Func([User, Reaction], [IDL.Nat64]));
type ComplexFunc = Func;

User.fill(
    IDL.Record({
        id: IDL.Text,
        basicFunc: BasicFunc,
        complexFunc: ComplexFunc
    })
);

Reaction.fill(
    IDL.Variant({
        Good: IDL.Null,
        Bad: IDL.Null,
        BasicFunc: BasicFunc,
        ComplexFunc: ComplexFunc
    })
);

const StableFunc = IDL.Func([IDL.Nat64, IDL.Text], [], ['query']);
type StableFunc = Func;

const NullFunc = IDL.Func(
    [
        IDL.Opt(IDL.Null),
        IDL.Vec(IDL.Null),
        IDL.Null,
        IDL.Vec(IDL.Vec(IDL.Null)),
        IDL.Vec(IDL.Opt(IDL.Null))
    ],
    [IDL.Null],
    ['query']
);
type NullFunc = Func;

let stableStorage = StableBTreeMap<string, StableFunc>(0);

export default class {
    @init([])
    init(): void {
        stableStorage.insert('stableFunc', [
            Principal.from('aaaaa-aa'),
            'start_canister'
        ]);
    }

    @query([], StableFunc)
    getStableFunc(): StableFunc {
        const stableFuncOpt = stableStorage.get('stableFunc');
        if (stableFuncOpt === null) {
            return [Principal.from('aaaaa-aa'), 'raw_rand'];
        }
        return stableFuncOpt;
    }

    @query([BasicFunc], BasicFunc)
    basicFuncParam(basicFunc: BasicFunc): BasicFunc {
        return basicFunc;
    }

    @query([NullFunc], NullFunc)
    nullFuncParam(nullFunc: NullFunc): NullFunc {
        return nullFunc;
    }

    @query([IDL.Vec(BasicFunc)], IDL.Vec(BasicFunc))
    basicFuncParamArray(basicFunc: BasicFunc[]): BasicFunc[] {
        return basicFunc;
    }

    @query([], BasicFunc)
    basicFuncReturnType(): BasicFunc {
        return [Principal.fromText('aaaaa-aa'), 'create_canister'];
    }

    @query([], IDL.Vec(BasicFunc))
    basicFuncReturnTypeArray(): BasicFunc[] {
        return [
            [Principal.fromText('aaaaa-aa'), 'create_canister'],
            [Principal.fromText('aaaaa-aa'), 'update_settings'],
            [Principal.fromText('aaaaa-aa'), 'install_code']
        ];
    }

    @query([ComplexFunc], ComplexFunc)
    complexFuncParam(complexFunc: ComplexFunc): ComplexFunc {
        return complexFunc;
    }

    @query([], ComplexFunc)
    complexFuncReturnType(): ComplexFunc {
        return [Principal.fromText('aaaaa-aa'), 'stop_canister'];
    }

    @update([], NotifierFunc)
    async getNotifierFromNotifiersCanister(): Promise<NotifierFunc> {
        return await call(getNotifierPrincipal(), 'getNotifier', {
            returnIdlType: NotifierFunc
        });
    }
}

function getNotifierPrincipal(): string {
    if (process.env.NOTIFIERS_PRINCIPAL !== undefined) {
        return process.env.NOTIFIERS_PRINCIPAL;
    }

    throw new Error(`process.env.NOTIFIERS_PRINCIPAL is not defined`);
}

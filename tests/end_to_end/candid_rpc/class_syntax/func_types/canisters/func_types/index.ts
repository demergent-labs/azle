import { call, IDL, query, update } from 'azle';

import Notifier, { NotifierFunc } from '../notifiers';

const BasicFunc = Func([IDL.Text], IDL.Text, 'query');
type BasicFunc = typeof BasicFunc.tsType;

const ComplexFunc = Recursive(() =>
    Func([User, Reaction], IDL.Nat64, 'update')
);
type ComplexFunc = typeof ComplexFunc.tsType;

const User = Record({
    id: IDL.Text,
    basicFunc: BasicFunc,
    complexFunc: ComplexFunc
});

const Reaction = Variant({
    Good: Null,
    Bad: Null,
    BasicFunc: BasicFunc,
    ComplexFunc: ComplexFunc
});

const StableFunc = Func([IDL.Nat64, IDL.Text], 'query');
type StableFunc = typeof StableFunc.tsType;

const NullFunc = Func(
    [
        Opt(Null),
        IDL.Vec(Null),
        Null,
        IDL.Vec(IDL.Vec(Null)),
        IDL.Vec(Opt(Null))
    ],
    Null,
    'query'
);

let stableStorage = StableBTreeMap<IDL.Text, StableFunc>(0);

export default class {
    @init([])
    init() {
        stableStorage.insert('stableFunc', [
            Principal.from('aaaaa-aa'),
            'start_canister'
        ]);
    }

    @query([], StableFunc)
    getStableFunc() {
        const stableFuncOpt = stableStorage.get('stableFunc');
        if ('None' in stableFuncOpt) {
            return [Principal.from('aaaaa-aa'), 'raw_rand'];
        }
        return stableFuncOpt.Some;
    }

    @query([BasicFunc], BasicFunc)
    basicFuncParam(basicFunc) {
        return basicFunc;
    }

    @query([NullFunc], NullFunc)
    nullFuncParam(nullFunc) {
        return nullFunc;
    }
    @query([IDL.Vec(BasicFunc)], IDL.Vec(BasicFunc))
    basicFuncParamArray(basicFunc) {
        return basicFunc;
    }

    @query([], BasicFunc)
    basicFuncReturnType() {
        return [Principal.fromText('aaaaa-aa'), 'create_canister'];
    }

    @query([], IDL.Vec(BasicFunc))
    basicFuncReturnTypeArray() {
        return [
            [Principal.fromText('aaaaa-aa'), 'create_canister'],
            [Principal.fromText('aaaaa-aa'), 'update_settings'],
            [Principal.fromText('aaaaa-aa'), 'install_code']
        ];
    }

    @query([ComplexFunc], ComplexFunc)
    complexFuncParam(complexFunc) {
        return complexFunc;
    }

    @query([], ComplexFunc)
    complexFuncReturnType() {
        return [Principal.fromText('aaaaa-aa'), 'stop_canister'];
    }

    @update([], NotifierFunc)
    async getNotifierFromNotifiersCanister() {
        const notifiersCanister = Notifier(
            Principal.fromText(getNotifierPrincipal())
        );

        return await call(notifiersCanister.getNotifier);
    }
}

function getNotifierPrincipal(): string {
    if (process.env.NOTIFIERS_PRINCIPAL !== undefined) {
        return process.env.NOTIFIERS_PRINCIPAL;
    }

    throw new Error(`process.env.NOTIFIERS_PRINCIPAL is not defined`);
}

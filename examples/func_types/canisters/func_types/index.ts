import {
    Canister,
    Func,
    init,
    ic,
    nat64,
    Opt,
    Principal,
    query,
    Record,
    StableBTreeMap,
    update,
    Variant,
    Vec,
    text,
    Void,
    Null,
    Recursive
} from 'azle';
import Notifier, { NotifierFunc } from '../notifiers';

const BasicFunc = Func([text], text, 'query');

const ComplexFunc = Recursive(() => Func([User, Reaction], nat64, 'update'));

const User = Record({
    id: text,
    basicFunc: BasicFunc,
    complexFunc: ComplexFunc
});

const Reaction = Variant({
    Good: Null,
    Bad: Null,
    BasicFunc: BasicFunc,
    ComplexFunc: ComplexFunc
});

const StableFunc = Func([nat64, text], Void, 'query');

const NullFunc = Func(
    [Opt(Null), Vec(Null), Null, Vec(Vec(Null)), Vec(Opt(Null))],
    Null,
    'query'
);

let stableStorage = StableBTreeMap(text, StableFunc, 0);

export default Canister({
    init: init([], () => {
        stableStorage.insert('stableFunc', [
            Principal.from('aaaaa-aa'),
            'start_canister'
        ]);
    }),

    getStableFunc: query([], StableFunc, () => {
        const stableFuncOpt = stableStorage.get('stableFunc');
        if ('None' in stableFuncOpt) {
            return [Principal.from('aaaaa-aa'), 'raw_rand'];
        }
        return stableFuncOpt.Some;
    }),

    basicFuncParam: query([BasicFunc], BasicFunc, (basicFunc) => {
        return basicFunc;
    }),

    nullFuncParam: query([NullFunc], NullFunc, (nullFunc) => {
        return nullFunc;
    }),

    basicFuncParamArray: query(
        [Vec(BasicFunc)],
        Vec(BasicFunc),
        (basicFunc) => {
            return basicFunc;
        }
    ),

    basicFuncReturnType: query([], BasicFunc, () => {
        return [Principal.fromText('aaaaa-aa'), 'create_canister'];
    }),

    basicFuncReturnTypeArray: query([], Vec(BasicFunc), () => {
        return [
            [Principal.fromText('aaaaa-aa'), 'create_canister'],
            [Principal.fromText('aaaaa-aa'), 'update_settings'],
            [Principal.fromText('aaaaa-aa'), 'install_code']
        ];
    }),

    complexFuncParam: query([ComplexFunc], ComplexFunc, (complexFunc) => {
        return complexFunc;
    }),

    complexFuncReturnType: query([], ComplexFunc, () => {
        return [Principal.fromText('aaaaa-aa'), 'stop_canister'];
    }),

    getNotifierFromNotifiersCanister: update([], NotifierFunc, async () => {
        const notifiersCanister = Notifier(
            Principal.fromText(
                process.env.NOTIFIERS_PRINCIPAL ??
                    ic.trap('process.env.NOTIFIERS_PRINCIPAL is undefined')
            )
        );

        return await ic.call(notifiersCanister.getNotifier);
    })
});

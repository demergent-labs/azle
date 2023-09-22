import {
    Func,
    init,
    ic,
    nat64,
    Opt,
    Principal,
    query,
    Record,
    Service,
    StableBTreeMap,
    update,
    Variant,
    Vec,
    candid,
    text,
    func,
    Void,
    Null
} from 'azle';
import Notifier, { NotifierFunc } from '../notifiers/notifiers';

@func([text], text, 'query')
class BasicFunc extends Func {}

@func([User, Reaction], nat64, 'update')
class ComplexFunc extends Func {}

class User extends Record {
    @candid(text)
    id: text;

    @candid(BasicFunc)
    basicFunc: BasicFunc;

    @candid(ComplexFunc)
    complexFunc: ComplexFunc;
}

class Reaction extends Variant {
    Good: null;
    Bad: null;
    BasicFunc: BasicFunc;
    ComplexFunc: ComplexFunc;
}

@func([nat64, text], Void, 'query')
class StableFunc extends Func {}

@func(
    [Opt(Null), Vec(Null), Null, Vec(Vec(Null)), Vec(Opt(Null))],
    Null,
    'query'
)
class NullFunc extends Func {}

export default class extends Service {
    stableStorage = new StableBTreeMap<text, StableFunc>(text, StableFunc, 0);

    @init([])
    init() {
        this.stableStorage.insert(
            'stableFunc',
            new StableFunc(Principal.from('aaaaa-aa'), 'start_canister')
        );
    }

    @query([], StableFunc)
    getStableFunc(): StableFunc {
        const stableFuncOpt = this.stableStorage.get('stableFunc');
        if (stableFuncOpt.length === 1) {
            return stableFuncOpt[0];
        }
        return new StableFunc(Principal.from('aaaaa-aa'), 'raw_rand');
    }

    @query([BasicFunc], BasicFunc)
    basicFuncParam(basicFunc: BasicFunc): BasicFunc {
        return basicFunc;
    }

    @query([NullFunc], NullFunc)
    nullFuncParam(nullFunc: NullFunc): NullFunc {
        return nullFunc;
    }

    @query([Vec(BasicFunc)], Vec(BasicFunc))
    basicFuncParamArray(basicFunc: Vec<BasicFunc>): Vec<BasicFunc> {
        return basicFunc;
    }

    @query([], BasicFunc)
    basicFuncReturnType(): BasicFunc {
        return new BasicFunc(Principal.fromText('aaaaa-aa'), 'create_canister');
    }

    @query([], Vec(BasicFunc))
    basicFuncReturnTypeArray(): Vec<BasicFunc> {
        return [
            new BasicFunc(Principal.fromText('aaaaa-aa'), 'create_canister'),
            new BasicFunc(Principal.fromText('aaaaa-aa'), 'update_settings'),
            new BasicFunc(Principal.fromText('aaaaa-aa'), 'install_code')
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
        const notifiersCanister: Notifier = new Notifier(
            Principal.fromText(
                process.env.NOTIFIERS_PRINCIPAL ??
                    ic.trap('process.env.NOTIFIERS_PRINCIPAL is undefined')
            )
        );

        return await ic.call(notifiersCanister.getNotifier);
    }
}

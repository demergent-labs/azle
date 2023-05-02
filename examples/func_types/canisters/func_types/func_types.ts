import {
    Func,
    Query,
    Update,
    $init,
    ic,
    match,
    nat64,
    Opt,
    Principal,
    $query,
    Record,
    Result,
    StableBTreeMap,
    $update,
    Variant,
    Vec
} from 'azle';
import { Notifier, NotifierFunc } from '../notifiers/types';

let stableStorage = new StableBTreeMap<string, StableFunc>(0, 25, 1_000);

type User = Record<{
    id: string;
    basicFunc: BasicFunc;
    complexFunc: ComplexFunc;
}>;

type Reaction = Variant<{
    Good: null;
    Bad: null;
    BasicFunc: BasicFunc;
    ComplexFunc: ComplexFunc;
}>;

type BasicFunc = Func<Query<(param1: string) => string>>;
type ComplexFunc = Func<Update<(user: User, reaction: Reaction) => nat64>>;
type StableFunc = Func<Query<(param1: nat64, param2: string) => void>>;
type NullFunc = Func<
    Query<
        (
            param1: Opt<null>,
            param2: Vec<null>,
            param3: null,
            param4: Vec<Vec<null>>,
            param5: Vec<Opt<null>>
        ) => null
    >
>;

$init;
export function init(): void {
    stableStorage.insert('stableFunc', [
        Principal.from('aaaaa-aa'),
        'start_canister'
    ]);
}

$query;
export function getStableFunc(): StableFunc {
    return match(stableStorage.get('stableFunc'), {
        Some: (func) => func,
        None: () => [Principal.from('aaaaa-aa'), 'raw_rand'] as StableFunc
    });
}

$query;
export function basicFuncParam(basicFunc: BasicFunc): BasicFunc {
    return basicFunc;
}

$query;
export function nullFuncParam(nullFunc: NullFunc): NullFunc {
    return nullFunc;
}

$query;
export function basicFuncParamArray(basicFunc: Vec<BasicFunc>): Vec<BasicFunc> {
    return basicFunc;
}

$query;
export function basicFuncReturnType(): BasicFunc {
    return [Principal.fromText('aaaaa-aa'), 'create_canister'];
}

$query;
export function basicFuncReturnTypeArray(): Vec<BasicFunc> {
    return [
        [Principal.fromText('aaaaa-aa'), 'create_canister'],
        [Principal.fromText('aaaaa-aa'), 'update_settings'],
        [Principal.fromText('aaaaa-aa'), 'install_code']
    ];
}

$query;
export function complexFuncParam(complexFunc: ComplexFunc): ComplexFunc {
    return complexFunc;
}

$query;
export function complexFuncReturnType(): ComplexFunc {
    return [Principal.fromText('aaaaa-aa'), 'stop_canister'];
}

$update;
export async function getNotifierFromNotifiersCanister(): Promise<
    Result<NotifierFunc, string>
> {
    const notifiersCanister: Notifier = new Notifier(
        Principal.fromText(
            process.env.NOTIFIERS_PRINCIPAL ??
                ic.trap('process.env.NOTIFIERS_PRINCIPAL is undefined')
        )
    );

    const result = await notifiersCanister.getNotifier().call();

    return match(result, {
        Ok: (ok) => ({ Ok: ok }),
        Err: (err) => ({ Err: err })
    });
}

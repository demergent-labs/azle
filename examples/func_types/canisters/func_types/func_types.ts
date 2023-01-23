import {
    Func,
    ic,
    Init,
    nat64,
    ok,
    Principal,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';
import { Notifier, NotifierFunc } from '../notifiers/types';

let stable_storage = new StableBTreeMap<string, StableFunc>(0, 25, 1_000);

type User = {
    id: string;
    basic_func: BasicFunc;
    complex_func: ComplexFunc;
};

type Reaction = Variant<{
    Good: null;
    Bad: null;
    BasicFunc: BasicFunc;
    ComplexFunc: ComplexFunc;
}>;

type BasicFunc = Func<(param1: string) => Query<string>>;
type ComplexFunc = Func<(user: User, reaction: Reaction) => Update<nat64>>;
type StableFunc = Func<(param1: nat64, param2: string) => Query<void>>;
type NullFunc = Func<(param1: nat64, param2: string) => Query<null>>;

export function init(): Init {
    stable_storage.insert('stable_func', [
        Principal.from('aaaaa-aa'),
        'start_canister'
    ]);
}

export function get_stable_func(): Query<StableFunc> {
    return (
        stable_storage.get('stable_func') ?? [
            Principal.from('aaaaa-aa'),
            'raw_rand'
        ]
    );
}

export function basic_func_param(basic_func: BasicFunc): Query<BasicFunc> {
    return basic_func;
}

export function null_func_param(null_func: NullFunc): Query<NullFunc> {
    return null_func;
}

export function basic_func_param_array(
    basic_func: BasicFunc[]
): Query<BasicFunc[]> {
    return basic_func;
}

export function basic_func_return_type(): Query<BasicFunc> {
    return [Principal.fromText('aaaaa-aa'), 'create_canister'];
}

export function basic_func_return_type_array(): Query<BasicFunc[]> {
    return [
        [Principal.fromText('aaaaa-aa'), 'create_canister'],
        [Principal.fromText('aaaaa-aa'), 'update_settings'],
        [Principal.fromText('aaaaa-aa'), 'install_code']
    ];
}

export function complex_func_param(
    complex_func: ComplexFunc
): Query<ComplexFunc> {
    return complex_func;
}

export function complex_func_return_type(): Query<ComplexFunc> {
    return [Principal.fromText('aaaaa-aa'), 'stop_canister'];
}

type GetNotifierFromNotifiersCanisterResult = Variant<{
    ok: NotifierFunc;
    err: string;
}>;

export async function get_notifier_from_notifiers_canister(): Promise<
    Update<GetNotifierFromNotifiersCanisterResult>
> {
    const notifiers_canister: Notifier = ic.canisters.Notifier(
        Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
    );

    const result = await notifiers_canister.get_notifier().call();

    if (!ok(result)) {
        return {
            err: result.err
        };
    }

    return {
        ok: result.ok
    };
}

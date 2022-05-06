import {
    CanisterResult,
    Func
} from 'azle';

type TestFunc = Func<(param1: string) => CanisterResult<string>>;
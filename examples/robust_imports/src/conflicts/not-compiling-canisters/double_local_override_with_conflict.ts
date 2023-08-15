import * as dlowc from '../tests-cases/double_local_override_with_conflict';
import * as azle from 'azle';

azle.$query;
export function echo_float64(param: dlowc.text): number {
    return param;
}

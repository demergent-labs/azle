import * as ec from '../tests-cases/export_conflict';
import * as azle from 'azle';

azle.$query;
export function echo_int(param: ec.text): bigint {
    return param;
}

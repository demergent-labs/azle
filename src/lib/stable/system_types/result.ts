import { IDL } from '..';

export function Result<T extends IDL.Type<any>, E extends IDL.Type<any>>(
    Ok: T,
    Err: E
): IDL.RecordClass {
    return IDL.Record({
        Ok: Ok,
        Err: Err
    });
}

export type Result<Ok, Err> =
    | {
          Ok: Ok;
      }
    | {
          Err: Err;
      };

import { Query, ic } from 'azle';

export function whoami(): Query<string> {
  return ic.caller();
}

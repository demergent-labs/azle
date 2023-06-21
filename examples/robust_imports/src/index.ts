// Named Imports
export * from './import_coverage/import_coverage';
export * from './azle_coverage/azle_coverage';
import NotAzleType from './types/azle_wrapper';
import NotAzle, {
    NotAzleType as NotAzleEither,
    Tuple
} from './types/azle_wrapper';

import * as starFruit from './azle_coverage/fruit';

// TODO figure out type aliases declarations, especially with built in types like string and number
// type coolString = string;
// export type coolNat = StarImport.AlmostCoolNat;
// export type coolInt = int;

// Not Named Imports
import './azle_coverage/fruit';

// TODO how do we tell the difference between
// type User1<T extends object> = azle.Record<T>;
// // and
// type User2 = azle.Record<{}>;
// // and
// type CoolThing = azle.int;
// // and
// type User = starFruit.Raspberry<{
//     id: string;
// }>;

// type Reaction = GrannySmith<{
//     Good: null;
//     Bad: null;
// }>;

// TODO tomororw. What about alias to built in types?

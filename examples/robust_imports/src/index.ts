// Named Imports
export * from './import_coverage/import_coverage';
export * from './azle_coverage/azle_coverage';

// TODO Add tests for things that are named to look like azle things
// import NotAzleType from './types/azle_wrapper';
// import NotAzle, {
//     NotAzleType as NotAzleEither,
//     Tuple
// } from './types/azle_wrapper';

// TODO figure out type aliases declarations, especially with built in types like string and number
// type coolString = string;
// export type coolNat = StarImport.AlmostCoolNat;
// export type coolInt = int;
// Though ultimately this will be covered by continuing to enforce use of the Alias<> wrapper
// As part of that:
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

// Not Named Imports
import './azle_coverage/fruit'; // Shouldn't do anything. It's just here to make sure it doesn't do anything

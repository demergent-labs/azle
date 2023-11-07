import {
    nat64,
    query,
    text,
    StableJson,
    Record,
    Serializable,
    Void
} from '../src/lib';
import { CandidType } from '../src/lib/candid/candid_type';
// import { expectTypeOf } from 'expect-type';
import { TypeMapping } from '../src/lib/candid/type_mapping';

// export function typeMapping<T>(value: T): TypeMapping<T> {
//     return value as any;
// }

// expectTypeOf(0).not.toMatchTypeOf<CandidType>;
// expectTypeOf(0n).not.toMatchTypeOf<CandidType>;
// expectTypeOf('').not.toMatchTypeOf<CandidType>;

// expectTypeOf({}).not.toMatchTypeOf<CandidType>; // TODO this is wrong

// expectTypeOf(text).toMatchTypeOf<CandidType>;
// expectTypeOf(text).toMatchTypeOf<Serializable>;
// expectTypeOf(StableJson).not.toMatchTypeOf<CandidType>; // TODO this is wrong
// expectTypeOf(StableJson).toMatchTypeOf<Serializable>; // TODO this is wrong

// const TestText: CandidType = text;

// // @ts-expect-error
// const TestStableJson: CandidType = StableJson;

// const ExampleRecord = Record({
//     text: text,
//     nat64: nat64
// });

// const TestExampleRecord: {
//     text: string;
//     nat64: bigint;
// } = ExampleRecord;

// const ExampleRecordInstance: typeof ExampleRecord = {
//     text: '',
//     nat64: 0n
// };

// query([text], Void);

// query([StableJson], Void);

// type HasOptionalField<T, K extends string> = undefined extends T[K]
//     ? true
//     : false;

// type Test = HasOptionalField<typeof TestRecord, ''>;

// type IfHasKey<T, K extends string, Yes, No> = K extends keyof T
//     ? undefined extends T[K]
//         ? Yes
//         : No
//     : No;

// type Test1 = IfHasKey<typeof TestRecord, '_azleCandidType', 'Yes', 'No'>;

// type

// expectTypeOf(TestRecord).toEqualTypeOf<{
//     text: string;
//     nat64: bigint;
// }>;

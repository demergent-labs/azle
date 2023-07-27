import { Test } from 'azle/test';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

import {
    _InlineComplexRecordTestInlineTest,
    _InlineComplexRecordTestInlineTest1,
    _InlineComplexRecordTestInlineWithTypeAliasDependency,
    _InlineComplexRecordTestOtherInlineTest,
    _InlineComplexRecordTestOtherInlineTest2,
    _InlineInlineParam,
    _InlineOptionTestInlineStructWithArray,
    _SERVICE,
    ComplexRecord,
    InlineExample,
    InlineOptionStruct,
    RecordWithInline,
    SelfReferencingRecord,
    SelfReferencingTuple,
    SelfReferencingVariant,
    SimpleRecord,
    StructWithInlineArray,
    VariantWithInline
} from './dfx_generated/rust_type_conversions/rust_type_conversions.did';

const complexRecord: ComplexRecord = {
    one: 1,
    two: true,
    three: false,
    four: [true, false],
    five: [
        {
            one: true,
            other: [true, false]
        }
    ],
    six: {
        one: 'lorem',
        two: {
            one: false,
            other: [false, true]
        }
    },
    seven: {
        one: {
            one: { thing: true },
            six: {
                one: 'ipsum',
                two: {
                    one: true,
                    other: [true, false]
                }
            }
        }
    }
};

const simpleRecord: SimpleRecord = {
    one: true,
    other: [true, false]
};

const usedType: boolean = true;

export function getTests(
    rustTypeConversionsCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'inline query',
            test: async () => {
                const param: InlineExample = {
                    first_field: {
                        one: true,
                        two: 'lorem'
                    },
                    second_field: {
                        one: false,
                        two: {
                            thing: 'ipsum'
                        }
                    },
                    third_field: {
                        one: true,
                        two: 'dolor'
                    }
                };
                const result = await rustTypeConversionsCanister.inlineQuery(
                    param
                );

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'simple query',
            test: async () => {
                const result = await rustTypeConversionsCanister.simpleQuery(
                    [64n],
                    'lorem',
                    42n,
                    true
                );

                return {
                    Ok: result === 'This is a query function'
                };
            }
        },
        {
            name: 'complex record test',
            test: async () => {
                const param = complexRecord;
                const simple = simpleRecord;
                const other = usedType;
                const inlineTest1: _InlineComplexRecordTestInlineTest1 = {
                    one: 'lorem',
                    two: simpleRecord,
                    three: usedType
                };
                const otherInlineTest2: _InlineComplexRecordTestOtherInlineTest2 =
                    {
                        one: true,
                        two: 16,
                        three: complexRecord
                    };
                const inlineTest: _InlineComplexRecordTestInlineTest = {
                    one: 'lorem',
                    two: simpleRecord,
                    three: {
                        sub_one: true,
                        sub_two: usedType
                    },
                    four: {
                        sub_one: true,
                        sub_two: {
                            sub_three: usedType
                        }
                    }
                };
                const otherInlineTest: _InlineComplexRecordTestOtherInlineTest =
                    {
                        one: { one_inline: true },
                        two: { two_inline: 16 },
                        three: { three_inline: complexRecord }
                    };
                const InlineWithTypeAliasDependency: _InlineComplexRecordTestInlineWithTypeAliasDependency =
                    { one: { one: true } };

                const result =
                    await rustTypeConversionsCanister.complexRecordTest(
                        param,
                        simple,
                        other,
                        inlineTest1,
                        otherInlineTest2,
                        inlineTest,
                        otherInlineTest,
                        InlineWithTypeAliasDependency
                    );

                return {
                    Ok: result === 1
                };
            }
        },
        {
            name: 'one variant',
            test: async () => {
                const result = await rustTypeConversionsCanister.oneVariant({
                    id: null
                });

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'various variants',
            test: async () => {
                const result =
                    await rustTypeConversionsCanister.variousVariants(
                        { One: null },
                        { Good: { id: 'lorem' } }
                    );

                return {
                    Ok: result === 'hello'
                };
            }
        },
        {
            name: 'self reference',
            test: async () => {
                const variant: SelfReferencingVariant = {
                    One: { One: { Two: null } }
                };
                const record: SelfReferencingRecord = {
                    one: [
                        {
                            one: [],
                            two: 'ipsum'
                        }
                    ],
                    two: 'lorem'
                };
                const tuple: SelfReferencingTuple = ['lorem', [['ipsum', []]]];
                const func: [Principal, string] = [
                    Principal.fromText('aaaaa-aa'),
                    'method'
                ];

                const result = await rustTypeConversionsCanister.selfReference(
                    variant,
                    record,
                    tuple,
                    func
                );

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'in line',
            test: async () => {
                const result = await rustTypeConversionsCanister.inline({
                    one: 16,
                    two: 16
                });

                return {
                    Ok:
                        result.one === 'hello' &&
                        result.two.two_a.two_a_i === 2 &&
                        result.two.two_b === false
                };
            }
        },
        {
            name: 'inline vec',
            test: async () => {
                const array = [{ thing: 'lorem', thing2: true }];
                const structThing: StructWithInlineArray = {
                    name: 'lorem',
                    not_array: {
                        thing: true,
                        thing2: false
                    },
                    array: [
                        {
                            thing: false,
                            thing2: true
                        }
                    ]
                };
                const result = await rustTypeConversionsCanister.inlineVec(
                    array,
                    structThing
                );

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'tuple test',
            test: async () => {
                const result = await rustTypeConversionsCanister.tupleTest([
                    'lorem',
                    64n,
                    {
                        tuple_inline: true,
                        tuple_inline2: 'ipsum'
                    },
                    true
                ]);

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'void alias test',
            test: async () => {
                const result =
                    await rustTypeConversionsCanister.voidAliasTest();

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'not so simple',
            test: async () => {
                const result = await rustTypeConversionsCanister.notSoSimple(
                    [1, 2, 3],
                    -16,
                    -32,
                    -64n,
                    8,
                    16,
                    32,
                    64n,
                    [1, 2, 3, 4],
                    32.32,
                    64.64,
                    Principal.fromText('aaaaa-aa'),
                    null,
                    { thing: 'lorem' }
                );

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'get principals',
            test: async () => {
                const result = await rustTypeConversionsCanister.getPrincipals([
                    [
                        Principal.fromText('aaaaa-aa'),
                        Principal.fromText('aaaaa-aa')
                    ],
                    [
                        Principal.fromText('aaaaa-aa'),
                        Principal.fromText('aaaaa-aa')
                    ]
                ]);

                return {
                    Ok: result[0][0].toString() === 'aaaaa-aa'
                };
            }
        },
        {
            name: 'everything inline',
            test: async () => {
                const recordWithInline: RecordWithInline = {
                    inline_record: { one: true, two: true, three: true },
                    inline_variant: { one: 'lorem' },
                    inline_func: [Principal.fromText('aaaaa-aa'), 'method']
                };
                const variantWithInline: VariantWithInline = { thing: null };
                const result =
                    await rustTypeConversionsCanister.everythingInline(
                        recordWithInline,
                        variantWithInline
                    );

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'option test',
            test: async () => {
                const opt: [boolean] = [true];
                const inlineOpt: [{ thing: string }] = [{ thing: 'lorem' }];
                const inlineAlias: [{ inline_bool: boolean }] = [
                    { inline_bool: true }
                ];
                const structWithOption: InlineOptionStruct = {
                    opt: [{ inline_string: 'lorem' }]
                };
                const inlineStructWithArray: _InlineOptionTestInlineStructWithArray =
                    {
                        arr: [{ inline_number: 16 }]
                    };

                const result = await rustTypeConversionsCanister.optionTest(
                    opt,
                    inlineOpt,
                    inlineAlias,
                    structWithOption,
                    inlineStructWithArray
                );

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'array test',
            test: async () => {
                const opt = [true, false];
                const inlineArray = [{ thing: 'lorem' }];
                const inlineAlias = [{ inline_bool: true }];
                const structWithArray = {
                    arr: [
                        { inline_string: 'lorem' },
                        { inline_string: 'ipsum' }
                    ]
                };
                const inlineStructWithArray = {
                    arr: [{ inline_number: 0 }, { inline_number: 1 }]
                };
                const result = await rustTypeConversionsCanister.arrayTest(
                    opt,
                    inlineArray,
                    inlineAlias,
                    structWithArray,
                    inlineStructWithArray
                );

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'ultimate self reference test',
            test: async () => {
                const result =
                    await rustTypeConversionsCanister.ultimateSelfReferenceTest(
                        {
                            pen_ultimate: {
                                antepenultimate: {
                                    ultimate: [
                                        {
                                            pen_ultimate: {
                                                antepenultimate: {
                                                    ultimate: []
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    );

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'hash duplication test',
            test: async () => {
                const record = { one: true, two: true, three: true };
                const variant = { one: true };
                const record2 = { one: false, two: false, three: false };
                const variant2 = { three: false };

                const result =
                    await rustTypeConversionsCanister.hashDuplicationTest(
                        record,
                        variant,
                        record2,
                        variant2
                    );

                return {
                    Ok: result === undefined
                };
            }
        }
    ];
}

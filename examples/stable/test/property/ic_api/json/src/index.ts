import { IDL, jsonParse, jsonStringify, query, update } from 'azle';
import {
    AssertType,
    NotAnyAndExact
} from 'azle/_internal/type_tests/assert_type';

export default class {
    @query([IDL.Text], IDL.Text)
    processJsonQuery(jsonString: string): string {
        // Parse the JSON string, then stringify it again
        const parsedValue = jsonParse(jsonString);
        return jsonStringify(parsedValue);
    }

    @update([IDL.Text], IDL.Text)
    processJsonUpdate(jsonString: string): string {
        // Parse the JSON string, then stringify it again
        const parsedValue = jsonParse(jsonString);
        return jsonStringify(parsedValue);
    }

    @query([], IDL.Bool)
    assertTypes(): boolean {
        // Assert types for jsonStringify and jsonParse
        type _AssertJsonStringifyReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof jsonStringify>, string>
        >;

        type _AssertJsonParseParam = AssertType<
            NotAnyAndExact<Parameters<typeof jsonParse>[0], string>
        >;

        return (
            typeof jsonStringify({}) === 'string' &&
            typeof jsonParse('{}') === 'object'
        );
    }
}

import { IDL, jsonParse, jsonStringify, query, update } from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/_internal/test/assert_type';

export default class {
    /**
     * Parse a JSON string, then stringify it again
     * @param jsonString - The JSON string to process
     * @returns The processed JSON string
     */
    @query([IDL.Text], IDL.Text)
    processJsonQuery(jsonString: string): string {
        const parsedValue = jsonParse(jsonString);
        return jsonStringify(parsedValue);
    }

    /**
     * Parse a JSON string, then stringify it again (update method)
     * @param jsonString - The JSON string to process
     * @returns The processed JSON string
     */
    @update([IDL.Text], IDL.Text)
    processJsonUpdate(jsonString: string): string {
        const parsedValue = jsonParse(jsonString);
        return jsonStringify(parsedValue);
    }

    /**
     * Assert that jsonStringify and jsonParse have the expected types
     */
    @query([], IDL.Bool)
    assertTypes(): boolean {
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

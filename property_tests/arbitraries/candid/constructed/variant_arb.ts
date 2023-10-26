import fc from 'fast-check';
import { CandidTypeArb } from '../../candid';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../js_function_name_arb';

type Variant = {
    /** The identifier for referencing the variant in source code */
    name: string;
    /**
     * The JS source code for creating the variant. E.g.:
     *
     * ```js
     * const VariantName = Variant({
     *   FieldOne: Null,
     *   FieldTwo: text,
     * });
     * ```
     */
    typeDeclaration: string;
    /**
     * A random instance of the field. E.g.:
     * ```ts
     * { FieldOne: null }
     * ```
     */
    value: {
        [x: string]: number | bigint | null;
    };
    /** A list of the tag/case/field names in the variant */
    fieldNames: string[];
};

export const VariantArb = fc
    .tuple(
        UniqueIdentifierArb('typeDeclaration'),
        fc.uniqueArray(fc.tuple(JsFunctionNameArb, CandidTypeArb), {
            selector: (entry) => entry[0],
            minLength: 1
            // Although no minLength is technically required (according to the
            // spec), the DFX CLI itself currently errors out trying to pass
            // an empty object.
        })
    )
    .map(([name, fields]): Variant => {
        const fieldNames = fields.map(([fieldName]) => fieldName);

        const typeDeclaration = `const ${name} = Variant({\n    ${fields
            .map(
                ([fieldName, fieldDataType]) =>
                    `${fieldName}: ${fieldDataType.type}`
            )
            .join(',\n    ')}\n});`;

        const value =
            fields.length === 0
                ? {}
                : (() => {
                      const randomIndex = Math.floor(
                          Math.random() * fields.length
                      );
                      const [randomFieldName, { value: randomFieldDataType }] =
                          fields[randomIndex];

                      return {
                          [randomFieldName]: randomFieldDataType
                      };
                  })();

        return {
            name,
            typeDeclaration,
            value,
            fieldNames
        };
    });

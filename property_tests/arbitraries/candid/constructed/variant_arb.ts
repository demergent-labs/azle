import fc from 'fast-check';
import { Candid, CandidTypeArb } from '../../candid';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../js_function_name_arb';

export type Variant = {
    [x: string]: number | bigint | null;
};
export type VariantFieldType = number | bigint | null;

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
    .map(([name, fields]): Candid<Variant> => {
        const typeDeclaration = `const ${name} = Variant({\n    ${fields
            .map(
                ([fieldName, fieldDataType]) =>
                    `${fieldName}: ${fieldDataType.src.candidType}`
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

        const imports = new Set([
            ...fields.map((field) => field[1].src.candidType),
            'Variant'
        ]);

        return {
            src: {
                candidType: name,
                typeDeclaration,
                imports,
                valueLiteral: '' // TODO
            },
            value,
            equals: (a: Variant, b: Variant): boolean => {
                if (typeof a !== 'object' || typeof b !== 'object') {
                    return false;
                }

                const aKeys = Object.keys(a);
                const bKeys = Object.keys(b);
                if (aKeys.length !== bKeys.length) {
                    return false;
                }
                const aField = aKeys[0];
                const bField = bKeys[0];
                if (aField !== bField) {
                    return false;
                }

                return fields.reduce((acc, [fieldName, candidType]) => {
                    const fieldCandidType =
                        candidType as Candid<VariantFieldType>;
                    if (fieldName !== aField) {
                        return acc || false;
                    }
                    return fieldCandidType.equals(a[fieldName], b[fieldName]);
                }, false);
            }
        };
    });

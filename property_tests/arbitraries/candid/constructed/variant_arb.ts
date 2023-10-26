import fc from 'fast-check';
import { Candid, CandidTypeArb } from '../../candid';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import { JsFunctionNameArb } from '../../js_function_name_arb';

type Variant = {
    [x: string]: number | bigint | null;
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
    .map(([name, fields]): Candid<Variant> => {
        const fieldNames = fields.map(([fieldName]) => fieldName);

        const typeDeclaration = `const ${name} = Variant({\n    ${fields
            .map(
                ([fieldName, fieldDataType]) =>
                    `${fieldName}: ${fieldDataType.meta.candidType}`
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

        const imports = new Set(
            fields.map((field) => field[1].meta.candidType)
        );

        return {
            meta: {
                candidType: name,
                typeDeclaration,
                imports
            },
            value
        };
    });

/*
From https://262.ecma-international.org/13.0/#sec-imports 16.2.2
Import Declarations come in two flavors
    1) import ImportClause FromClause;
    2) import ModuleSpecifier;

Option 2 does side effects only
Import Clause breakdown
    1) ImportedDefaultBinding (thing) (import thing from 'thing')
    2) NameSpaceImport (* as thing) (import * as thing from 'thing')
    3) NamedImports
        a) ({}) (import {} from 'thing')
        b) {ImportsList}
            i) ({thing}) (import {thing} from 'thing')
            ii) ({thing as other}) (import {thing as other} from 'thing')
        c) {ImportsList,}
            i) ({thing, }) (import {thing, } from 'thing')
            ii) ({thing1 as other1, }) (import {thing1 as other1, thing2 as other2} from 'thing')
        d) Combos
            i) ({thing1, thing2 as other2}) ({thing1, thing2 as other2})
            ii) ({thing1 as other1, thing2}) ({thing1, thing2 as other2})
    4) ImportedDefaultBinding, NameSpaceImport (thing, * as other from 'thing')
    5) ImportedDefaultBinding, NamedImports (thing, {thing as other} from 'thing')
        a) there could be all sorts of combos in here

*/
//1) ImportedDefaultBinding (thing) (import thing from 'thing')
import * as azle from 'azle/experimental';
//6 Type import
import { Opt, Vec as CoveredVec } from 'azle/experimental';

//2) NameSpaceImport (* as thing) (import * as thing from 'thing')
import * as deepStar from '../types/deep';
//3) NamedImports
//a) ({}) (import {} from 'thing')
import {} from '../types/deep';
//b) {ImportsList}
//i) ({thing}) (import {thing} from 'thing')
import { DeepRecord } from '../types/deep';
//ii) ({thing as other}) (import {thing as other} from 'thing')
import { DeepRecord as CavernousRecord } from '../types/deep';
//b) {ImportsList,}
//i) ({thing, }) (import {thing, } from 'thing')
import { DeepInt8, DeepTuple } from '../types/deep';
//ii) ({thing1 as other1, }) (import {thing1 as other1, thing2 as other2} from 'thing')
import {
    DeepInt8 as BottomlessInt8,
    DeepVariant as BottomlessVariant
} from '../types/deep';
//c) Combos
//i) ({thing1, thing2 as other2}) ({thing1, thing2 as other2})
import { DeepInt8 as ProfoundInt8, DeepVariant } from '../types/deep';
//ii) ({thing1 as other1, thing2}) ({thing1, thing2 as other2})
import { DeepRecord as FathomlessRecord, DeepVec } from '../types/deep';
//4) ImportedDefaultBinding, NameSpaceImport (thing, * as other from 'thing')
import profoundDefault, * as profoundStar from '../types/deep';
//5) ImportedDefaultBinding, NamedImports (thing, {thing as other} from 'thing')
import bottomlessDefault, { DeepTuple as BottomlessTuple } from '../types/deep';
//a) there could be all sorts of combos in here
import cavernousDefault, {
    DeepOpt,
    DeepTuple as CavernousTuple,
    DeepVariant as CavernousVariant
} from '../types/deep';
//7 Default import as
import { default as defaultInt16 } from '../types/deep';
import deepDefault from '../types/deep/shallow';

/*
From https://262.ecma-international.org/13.0/#sec-exports 16.2.3
1) export ExportFromClause FromClause ;
//a) *
    b) * as ModuleExportName
    c) NamedExports
2) export NamedExports ;
    a) { }
    b) { ExportList }
        i) thing
        ii) thing as other
        iii) combos
    c) { ExportLists, }
        i) thing
        ii) thing as other
        iii) combos
3) export VariableStatement
    // Not important
// The only declarations that we care about are type alias declarations
4) export Declaration
5) export default HoistableDeclaration;
6) export default ClassDeclaration;
7) export default AssignmentExpression;
*/

//1) export ExportFromClause FromClause ;
//a) *
export * from '../types/deep'; // TODO support having multiple export * from declarations
export * from 'azle/experimental';
//b) * as ModuleExportName
export * as azle from 'azle/experimental';
//c) NamedExports
//a) { }
export {} from 'azle/experimental';
//b) { ExportList }
//i) thing
export { Record } from 'azle/experimental';
//ii) thing as other
export { Variant as CoveredVariant } from 'azle/experimental';
//iii) combos
export { Tuple as CoveredTuple, int64 as nat8, Vec } from 'azle/experimental';
//2) export NamedExports ;
export {};
export { DeepVariant };
export { ProfoundInt8 as DeepInt8 };
export {
    bottomlessDefault,
    cavernousDefault,
    CavernousRecord,
    CavernousTuple,
    CavernousVariant,
    defaultInt16 as coveredInt16,
    Opt as CoveredOpt,
    DeepRecord as CoveredRecord,
    CoveredVec,
    DeepTuple,
    deepDefault as fathomlessCanister,
    BottomlessInt8 as FathomlessInt8,
    DeepOpt as FathomlessOpt,
    FathomlessRecord,
    deepStar as fathomlessStar,
    BottomlessTuple as FathomlessTuple,
    BottomlessVariant as FathomlessVariant,
    DeepVec as FathomlessVec,
    profoundDefault,
    profoundStar
};
export { DeepInt8 as CoverInt8 };
export type CoveredText = azle.text;
//4) export Declaration (Type Alias Declaration)
// TODO get type alias declarations to work
// export type FathomlessInt = DeepInt8;
export { DeepInt8 as FathomlessInt } from '../types/deep';
// export type ProfoundInt = profoundStar.DeepInt8;
export { DeepInt8 as ProfoundInt } from '../types/deep';
//5) export default
export default deepStar.deepAzle.query;

import { ImplItemMethod } from '../../../ast_utilities/types';
import { Rust } from '../../../../../types';

// TODO I think I should hold off on anything crazy for now, just tell people to use float64 until further notice
// TODO follow this issue https://github.com/boa-dev/boa/issues/1961 and this issue https://github.com/boa-dev/boa/issues/1962
// TODO worst case I might need to create my own conversion from boa's JsValue to the Rust equivalent
// TODO this would give me complete control over every conversion, and number conversions are what I require complete control of
// TODO I need that control to possibly convert from a BigInt
// TODO get this to work for Option...if necessary...probably is necessary to do some kind of recursion
export function generateReturnValueConversion(implItemMethod: ImplItemMethod): Rust {
    const returnTypeName = getImplItemMethodReturnTypeName(implItemMethod);

    if (returnTypeName === '') {
        return '';
    }

    // TODO I am holding off on further conversions...in the worst case this code might get complicated
    // TODO as I'll have to implement my own conversions from JsValue to Rust structs
    // TODO especially to overcome any possible BigInt issues
    // TODO but if I can do that, we should have perfect representation of every primitive number type
    // if (returnTypeName === 'int') {

    // }

    // if (returnTypeName === 'int64') {

    // }

    // if (returnTypeName === 'int32') {
        
    // }

    // if (returnTypeName === 'int16') {
        
    // }

    // if (returnTypeName === 'int8') {
        
    // }

    // if (returnTypeName === 'nat') {

    // }

    // if (returnTypeName === 'nat32') {

    // }

    return `serde_json::from_value(return_value.to_json(&mut boa_context).unwrap()).unwrap()`;
}

function getImplItemMethodReturnTypeName(implItemMethod: ImplItemMethod): string {
    const returnTypeAst = implItemMethod.output?.path.segments[0].arguments.angle_bracketed.args[0].type.tuple.elems[0];

    if (returnTypeAst === undefined) {
        return '';
    }
    else {
        return returnTypeAst.path.segments[0].ident;
    }
}
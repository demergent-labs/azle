export { DecodeVisitor } from './decode_visitor';
export { EncodeVisitor } from './encode_visitor';

/*
 * For most of the visitors the only thing that needs to happen is to visit each
 * of the sub nodes. That is the same for both encoding and decoding. That logic
 * is extracted into these helper methods.
 */

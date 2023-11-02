import fc from 'fast-check';
import { CandidArb } from '../../candid_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';

export const Nat64Arb = CandidArb(fc.bigUintN(64), 'nat64', bigintToSrcLiteral);

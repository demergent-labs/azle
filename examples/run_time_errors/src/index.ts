import * as _blob from './blob';
import * as _func from './func';
import * as _number from './numbers';
import * as _opt from './opt';
import * as _primitives from './primitives';
import * as _principals from './principals';
import * as _records from './records';
import * as _results from './results';
import * as _throws from './throws';
import * as _variants from './variants';
import * as _vecs from './vecs';

import { MyFunc } from './func';
import { UserDefinedRecord } from './records';
import { UserDefinedVariant } from './variants';

import {
    bool,
    blob,
    empty,
    float32,
    float64,
    IDL,
    int,
    int8,
    int16,
    int32,
    int64,
    nat,
    nat8,
    nat16,
    nat32,
    nat64,
    Null,
    Opt,
    principal,
    Principal,
    query,
    Result,
    Service,
    text,
    update,
    Vec,
    Void
} from 'azle';

export default class extends Service {
    inititalized = false;

    heartbeating = false;

    @query([], blob)
    returnNonObjectAsInvalidBlob(): blob {
        return _blob.returnNonObjectAsInvalidBlob();
    }

    @query([], blob)
    returnEmptyObjectAsInvlidBlob(): blob {
        return _blob.returnEmptyObjectAsInvalidBlob();
    }

    @query([], MyFunc)
    returnNonArrayValueAsInvalidFunc(): MyFunc {
        return _func.returnNonArrayValueAsInvalidFunc();
    }

    @query([], MyFunc)
    returnEmptyObjectAsInvalidFunc(): MyFunc {
        return _func.returnEmptyObjectAsInvalidFunc();
    }

    @query([], MyFunc)
    returnEmptyArrayAsInvalidFunc(): MyFunc {
        return _func.returnEmptyArrayAsInvalidFunc();
    }

    @query([], MyFunc)
    returnNonPrincipalValueAsInvalidFunc(): MyFunc {
        return _func.returnNonPrincipalValueAsInvalidFunc();
    }

    @query([], MyFunc)
    returnEmptyObjectPrincipalAsInvalidFunc(): MyFunc {
        return _func.returnEmptyObjectPrincipalAsInvalidFunc();
    }

    @query([], MyFunc)
    returnArrayWithOnlyPrincipalAsInvalidFunc(): MyFunc {
        return _func.returnArrayWithOnlyPrincipalAsInvalidFunc();
    }

    @query([], MyFunc)
    returnNonStringCanisterMethodNameAsInvalidFunc(): MyFunc {
        return _func.returnNonStringCanisterMethodNameAsInvalidFunc();
    }

    @query([], float64)
    returnInvalidNumber(): number {
        return _number.returnInvalidNumber();
    }

    @query([], int)
    returnInvalidInt(): int {
        return _number.returnInvalidInt();
    }

    @query([], int8)
    returnInvalidInt8(): int8 {
        return _number.returnInvalidInt8();
    }

    @query([], int16)
    returnInvalidInt16(): int16 {
        return _number.returnInvalidInt16();
    }

    @query([], int32)
    returnInvalidInt32(): int32 {
        return _number.returnInvalidInt32();
    }

    @query([], int64)
    returnInvalidInt64(): int64 {
        return _number.returnInvalidInt64();
    }

    @query([], nat)
    returnInvalidNat(): nat {
        return _number.returnInvalidNat();
    }

    @query([], nat8)
    returnInvalidNat8(): nat8 {
        return _number.returnInvalidNat8();
    }

    @query([], nat16)
    returnInvalidNat16(): nat16 {
        return _number.returnInvalidNat16();
    }

    @query([], nat32)
    returnInvalidNat32(): nat32 {
        return _number.returnInvalidNat32();
    }

    @query([], nat64)
    returnInvalidNat64(): nat64 {
        return _number.returnInvalidNat64();
    }

    @query([], float32)
    returnInvalidFloat32(): float32 {
        return _number.returnInvalidFloat32();
    }

    @query([], float64)
    returnInvalidFloat64(): float64 {
        return _number.returnInvalidFloat64();
    }

    @query([], Opt(text))
    returnNonObject(): Opt<text> {
        return _opt.returnNonObject();
    }

    @query([], Opt(text))
    returnBothSomeAndNone(): Opt<text> {
        return _opt.returnBothSomeAndNone();
    }

    @query([], Opt(text))
    returnObjectWithNeitherSomeNorNone(): Opt<text> {
        return _opt.returnObjectWithNeitherSomeNorNone();
    }

    @query([], Opt(text))
    returnNonNullNone(): Opt<text> {
        return _opt.returnNonNullNone();
    }

    @query([], Opt(text))
    returnInvalidSomeValue(): Opt<text> {
        return _opt.returnInvalidSomeValue();
    }

    @query([], bool)
    returnInvalidBooleanValue(): bool {
        return _primitives.returnInvalidBooleanValue();
    }

    @query([], empty)
    returnInvalidEmptyValue(): empty {
        return _primitives.returnInvalidEmptyValue();
    }

    @query([], Null)
    returnInvalidNullValue(): Null {
        return _primitives.returnInvalidNullValue();
    }

    @query([], text)
    returnInvalidStringValue(): text {
        return _primitives.returnInvalidStringValue();
    }

    @query([], text)
    returnInvalidTextValue(): text {
        return _primitives.returnInvalidTextValue();
    }

    @query([], Void)
    returnInvalidVoidValue(): Void {
        return _primitives.returnInvalidVoidValue();
    }

    @query([], Void)
    returnInvalidVoidAliasValue(): Void {
        return _primitives.returnInvalidVoidAliasValue();
    }

    @query([], Null)
    returnInvalidNullAliasValue(): Null {
        return _primitives.returnInvalidNullAliasValue();
    }

    @query([], principal)
    returnStringAsInvalidPrincipal(): Principal {
        return _principals.returnStringAsInvalidPrincipal();
    }

    @query([], principal)
    returnEmptyObjectAsInvalidPrincipal(): Principal {
        return _principals.returnEmptyObjectAsInvalidPrincipal();
    }

    @query([], principal)
    returnInvalidToTextPropertyAsInvalidPrincipal(): Principal {
        return _principals.returnInvalidToTextPropertyAsInvalidPrincipal();
    }

    @query([], principal)
    throwInPrincipalToTextMethodAsInvalidPrincipal(): Principal {
        return _principals.throwInPrincipalToTextMethodAsInvalidPrincipal();
    }

    @query([], principal)
    returnInvalidToTextReturnValueAsInvalidPrincipal(): Principal {
        return _principals.returnInvalidToTextReturnValueAsInvalidPrincipal();
    }

    @query([], principal)
    throwWhenCallingPrincipalFromText(): Principal {
        return _principals.throwWhenCallingPrincipalFromText();
    }

    @query([], principal)
    returnInvalidPrincipalFromTooShortOfText(): Principal {
        return _principals.returnInvalidPrincipalFromTooShortOfText();
    }

    @query([], UserDefinedRecord)
    returnStringAsInvalidUserDefinedRecord(): UserDefinedRecord {
        return _records.returnStringAsInvalidUserDefinedRecord();
    }

    @query([], UserDefinedRecord)
    returnEmptyObjectAsInvalidUserDefinedRecord(): UserDefinedRecord {
        return _records.returnEmptyObjectAsInvalidUserDefinedRecord();
    }

    @query([], UserDefinedRecord)
    returnStringAsInvalidVecUserDefinedRecord(): Vec<UserDefinedRecord> {
        return _records.returnStringAsInvalidVecUserDefinedRecord();
    }

    @query([], Vec(UserDefinedRecord))
    returnObjectAsInvalidVecUserDefinedRecord(): Vec<UserDefinedRecord> {
        return _records.returnObjectAsInvalidVecUserDefinedRecord();
    }

    @query([], Vec(UserDefinedRecord))
    returnArrayWithInvalidUserDefinedRecord(): Vec<UserDefinedRecord> {
        return _records.returnArrayWithInvalidUserDefinedRecord();
    }

    @query([], IDL.Variant({ Ok: text, Err: text }))
    returnNonObjectAsInvalidResult(): Result<string, string> {
        return _results.returnNonObjectAsInvalidResult();
    }

    @query([], IDL.Variant({ Ok: text, Err: text }))
    returnBothOkAndErr(): Result<string, string> {
        return _results.returnBothOkAndErr();
    }

    @query([], IDL.Variant({ Ok: text, Err: text }))
    returnObjectWithNeitherOkNorErr(): Result<string, string> {
        return _results.returnObjectWithNeitherOkNorErr();
    }

    @query([], IDL.Variant({ Ok: text, Err: text }))
    returnInvalidOkValue(): Result<string, string> {
        return _results.returnInvalidOkValue();
    }

    @query([], IDL.Variant({ Ok: text, Err: text }))
    returnInvalidErrValue(): Result<string, string> {
        return _results.returnInvalidErrValue();
    }

    @query([], Void)
    throwBigint(): void {
        return _throws.throwBigint();
    }

    @query([], Void)
    throwBoolean(): void {
        return _throws.throwBoolean();
    }

    @query([], Void)
    throwClass(): void {
        return _throws.throwClass();
    }

    @query([], Void)
    throwCustomError(): void {
        return _throws.throwCustomError();
    }

    @query([], Void)
    throwInt(): void {
        return _throws.throwInt();
    }

    @query([], Void)
    throwNull(): void {
        return _throws.throwNull();
    }

    @query([], Void)
    throwNullReference(): void {
        return _throws.throwNullReference();
    }

    @query([], Void)
    throwObject(): void {
        return _throws.throwObject();
    }

    @query([], Void)
    throwRational(): void {
        return _throws.throwRational();
    }

    @query([], Void)
    throwString(): void {
        return _throws.throwString();
    }

    @query([], Void)
    throwSymbol(): void {
        return _throws.throwSymbol();
    }

    @query([], Void)
    throwUndefined(): void {
        return _throws.throwUndefined();
    }

    getInitialized(): boolean {
        return _throws.getInitialized(this);
    }

    // TODO add these back in when heartbeat and inspect message are added
    // https://github.com/demergent-labs/azle/issues/1192
    // @heartbeat
    // heartbeat(): void {
    //     _throws.heartbeat(this);
    // }

    // @inspectMessage
    // inspectMessage(): void {
    //     _throws.inspectMessage();
    // }

    @update([], bool)
    accessible(): bool {
        return _throws.accessible();
    }

    @update([], bool)
    inaccessible(): bool {
        return _throws.inaccessible();
    }

    @update([], bool)
    alsoInaccessible(): bool {
        return _throws.alsoInaccessible();
    }

    @query([], UserDefinedVariant)
    returnStringAsInvalidUserDefinedVariant(): UserDefinedVariant {
        return _variants.returnStringAsInvalidUserDefinedVariant();
    }

    @query([], UserDefinedVariant)
    returnEmptyObjectAsInvalidUserDefinedVariant(): UserDefinedVariant {
        return _variants.returnEmptyObjectAsInvalidUserDefinedVariant();
    }

    @query([], UserDefinedVariant)
    returnObjectWithInvalidTagAsInvalidUserDefinedVariant(): UserDefinedVariant {
        return _variants.returnObjectWithInvalidTagAsInvalidUserDefinedVariant();
    }

    @query([], UserDefinedVariant)
    returnObjectWithMultipleTagsAsInvalidUserDefinedVariant(): UserDefinedVariant {
        return _variants.returnObjectWithMultipleTagsAsInvalidUserDefinedVariant();
    }

    @query([], UserDefinedVariant)
    returnObjectWithInvalidFieldsAsInvalidUserDefinedVariant(): UserDefinedVariant {
        return _variants.returnObjectWithInvalidFieldsAsInvalidUserDefinedVariant();
    }

    @query([], Vec(UserDefinedVariant))
    returnStringAsInvalidVecUserDefinedVariant(): Vec<UserDefinedVariant> {
        return _variants.returnStringAsInvalidVecUserDefinedVariant();
    }

    @query([], Vec(UserDefinedVariant))
    returnObjectAsInvalidVecUserDefinedVariant(): Vec<UserDefinedVariant> {
        return _variants.returnObjectAsInvalidVecUserDefinedVariant();
    }

    @query([], Vec(UserDefinedVariant))
    returnArrayWithInvalidUserDefinedVariant(): Vec<UserDefinedVariant> {
        return _variants.returnArrayWithInvalidUserDefinedVariant();
    }

    @query([], Vec(text))
    returnNonObjectAsInvalidVec(): Vec<text> {
        return _vecs.returnNonObjectAsInvalidVec();
    }

    @query([], Vec(text))
    returnNonArrayAsInvalidVec(): Vec<text> {
        return _vecs.returnNonArrayAsInvalidVec();
    }

    @query([], Vec(text))
    returnArrayWithInvalidVecItem(): Vec<text> {
        return _vecs.returnArrayWithInvalidVecItem();
    }
}

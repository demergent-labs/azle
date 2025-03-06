import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
export interface SupportedStandard {
    url: string;
    name: string;
}
export type SupportedStandardsResponse = Array<SupportedStandard>;
export interface _SERVICE {
    icrc10_supported_standards: ActorMethod<[], SupportedStandardsResponse>;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const SupportedStandard = IDL.Record({
    url: IDL.Text,
    name: IDL.Text
});
export const SupportedStandardsResponse = IDL.Vec(SupportedStandard);
export const idlFactory: idlFactory = ({ IDL }) => {
    const SupportedStandard = IDL.Record({ url: IDL.Text, name: IDL.Text });
    const SupportedStandardsResponse = IDL.Vec(SupportedStandard);
    return IDL.Service({
        icrc10_supported_standards: IDL.Func(
            [],
            [SupportedStandardsResponse],
            ['query']
        )
    });
};
export const init: init = () => {
    return [];
};

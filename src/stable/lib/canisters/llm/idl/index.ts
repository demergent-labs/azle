import { ActorMethod } from '@icp-sdk/core/agent';
import { IDL } from '@icp-sdk/core/candid';

export interface chat_message {
    content: string;
    role: role;
}
export interface chat_request {
    model: string;
    messages: Array<chat_message>;
}
export type role = { user: null } | { assistant: null } | { system: null };
export interface _SERVICE {
    v0_chat: ActorMethod<[chat_request], string>;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const role = IDL.Variant({
    user: IDL.Null,
    assistant: IDL.Null,
    system: IDL.Null
});
export const chat_message = IDL.Record({ content: IDL.Text, role: role });
export const chat_request = IDL.Record({
    model: IDL.Text,
    messages: IDL.Vec(chat_message)
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const role = IDL.Variant({
        user: IDL.Null,
        assistant: IDL.Null,
        system: IDL.Null
    });
    const chat_message = IDL.Record({ content: IDL.Text, role: role });
    const chat_request = IDL.Record({
        model: IDL.Text,
        messages: IDL.Vec(chat_message)
    });
    return IDL.Service({ v0_chat: IDL.Func([chat_request], [IDL.Text], []) });
};
export const init: init = () => {
    return [];
};

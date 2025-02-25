import { call, IDL, update } from 'azle';
import { chat_message, chat_request, role } from 'azle/canisters/llm/idl';

export default class {
    @update([IDL.Text], IDL.Text)
    async chat(prompt: string): Promise<string> {
        const role: role = {
            user: null
        };

        const chatMessage: chat_message = {
            role,
            content: prompt
        };

        const chatRequest: chat_request = {
            model: 'llama3.1:8b',
            messages: [chatMessage]
        };

        const response = await call<[chat_request], string>(
            'w36hm-eqaaa-aaaal-qr76a-cai',
            'v0_chat',
            {
                paramIdlTypes: [chat_request],
                returnIdlType: IDL.Text,
                args: [chatRequest]
            }
        );

        return response;
    }
}

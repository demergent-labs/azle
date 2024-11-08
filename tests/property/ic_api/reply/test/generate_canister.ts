export function generateCanister(replyIdl: string): string {
    return /*ts*/ `
import {
    call,
    IDL,
    query,
    reject,
    rejectCode,
    RejectionCode,
    rejectMessage,
    reply,
    trap,
    update
} from 'azle';

export default class {
    @query([${replyIdl}], ${replyIdl}, { manual: true })
    alwaysReplyQuery(input: string): void {
        reply({ data: input, idlType: ${replyIdl} });
    }
}
    `;
}

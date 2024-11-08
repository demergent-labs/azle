export function generateCanister(replyIdl: string): string {
    return /*ts*/ `
import { IDL, query, reply } from 'azle';

export default class {
    @query([${replyIdl}], ${replyIdl}, { manual: true })
    alwaysReplyQuery(input: string): void {
        reply({ data: input, idlType: ${replyIdl} });
    }
}
    `;
}

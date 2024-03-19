// TODO We hope to eventually truly convert the Identity into a JWT
// TODO and have the boundary node verify it and construct the appropriate
// TODO request to the canister
export function toJwt(value: any): string {
    return value as unknown as string;
}

- `index.did` manual Candid source: https://dashboard.internetcomputer.org/canister/rrkah-fqaaa-aaaaa-aaaaq-cai
- Licensing is assumed to be that described in ../../NOTICE

# How to update the IDL and TypeScript types

1. Go to the URL above
2. Find the Candid on that page and copy it
3. Paste the Candid into `index.did`
4. From this directory run `npx azle generate index.did > index.ts`

- `ic.did` manual Candid source: https://github.com/dfinity/portal/blob/440f74a06a813842f54720e00e938512238f5bce/docs/references/_attachments/http-gateway.did
- Licensing is assumed to be that described in ../../NOTICE

# How to update the IDL and TypeScript types

1. Go to the URL above, but at the latest commit
2. Find the Candid on that page and copy it
3. Paste the Candid into `http-gateway.did`
4. From this directory run `npx azle generate-types http-gateway.did > index.ts`

## NextPassword with server styles

### Guide

Run `yarn && yarn dev` to install and preview it. (the password is `123`)

### Added files

- `pages/__middleware.ts`: run inside Edge Function to check passwords.
- `pages/auth.tsx`: static pages running on the client.
- `pages/_document.tsx`: rendering page styles on the server side.

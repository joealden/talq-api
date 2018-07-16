# TODO

- https://github.com/prismagraphql/graphql-server-example
- Continue working on the API
  - Configure Prisma service to use a secret for auth
    - This will disallow the Prisma service endpoint to be accessed by
      unauthorized clients
    - After configured Prisma service, pass secret to application server
    - Create a `.env` and `.env.example` file to pull in the secret
      - Check in `.env.example` but at `.env` to `.gitignore` file
      - Will require installing dotenv dep
      - https://www.npmjs.com/package/dotenv#preload - might require using
        preload technique is using typescript
  - Start implementing resolvers (Dummy resolvers already done)
  - Look into subscriptions on both API and client side
  - Use GraphQL Shield: https://github.com/maticzav/graphql-shield
    - Query
      - userFriends (no auth needed)
      - userName (no auth needed)
      - chat (only members of the chat can get this info)
    - Mutation
      - signup - (no auth needed)
      - signin - (no auth needed)
      - addFriend - (only user of userId can perform)
      - changeUserName - (only user of userId can perform)
      - changeUserEmail - (only user of userId can perform)
      - startChat - (user must be signed in)
- Add TSLint?
- Add precommit hooks with husky etc. for prettier and TSLint?
  - Look at corum repo(s) for how to do this
- Add now.json
- Look into setting up circleCI

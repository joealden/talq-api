# TODO

## Note

`graphql` v14 is currently not compatible as yarn issues a warning about
duplicate versions (I assume this is because tools that need it as a peer dep
are currently requiring v0.13). Old back upgrading until dependent packages
upgrade.

## Now

- Look into sending WebSocket traffic over wss instead of ws (not encrypted)

## Later

- Look into the `Variable "$chatId" of required type "ID!" was not provided.`
  error that happens (most likely client side issue).
- Enforce fields like username to be a single 'word' (no spaces allowed)
- Switch from graphql-yoga to apollo-server due to lack of maintainance of
  graphql-yoga (and other prisma owned libs tbh)
- Look into orderBy: last updated (Not working as expected for chat list query)
- Implement max size for usernames (An eventually names)
- Look into adding paging support to application server for:
  - chat messages
  - chats (that will be in sidebar)
  - users
- Look into graph-yoga file upload for profile pictures
- Use GraphQL Shield: https://github.com/maticzav/graphql-shield (If needed)
- Look into Apollo Engine for API usage reporting
- Look into sentry.io for error reporting
- Add now.json
- Look into setting up circleCI

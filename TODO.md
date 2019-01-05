# TODO

## Now

- Error: Cannot return null for non-nullable field Query.user
- Look into the `Variable "$chatId" of required type "ID!" was not provided.`
  error that happens (most likely client side issue).

## Later

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

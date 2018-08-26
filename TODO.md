# TODO

## NOTE

Version `2.1.4` of `prisma-binding` introduced a pretty major regression to with
subscriptions. For this reason, `prisma-binding` is currently pinned at version
`2.1.3` until this issue has been resolved.

https://github.com/prisma/prisma-binding/issues/229

## Now

- Implement more subscription stuff

## Later

- Look into sending WebSocket traffic over wss instead of ws (not encrypted)
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

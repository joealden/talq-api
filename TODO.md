# TODO

- Add username field to prisma service `User` model
  - Make it a unique field
  - Means that in friends search, username does not have to be used
  - This improves privacy
- Expose a new `users` query that returns the following restricted set of user
  fields:

```gql
type RestrictedUser / PublicUser {
  username: String!
  firstName: String!
  lastName: String!
  # picture: File! ??? -> Look into file uploads with graphql-yoga
}
```

- This will mean when the client fetches users to add as friends, they cannot
  even see that they can query for the user's email address or friends list.
  This keeps both those pieces of information private to the user that owns that
  record. From the friends search, the client can send a mutation to add a
  friend by passing the other users username to the `addFriend` mutation because
  it is a unique field. This will mean that the schema also needs to be updated
  so that instead of taking user IDs everywhere, they take usernames instead.
- This also provides the security benefit of the client never being able to
  access any user's ID. This is important because the user's ID is what is
  signed to generate the auth token. If the app secret was compromised, a
  malicious user could not create token for any other users because there is no
  way to access any user's ID.
- Remember to remove the ID field from the current User type exposed by the
  application server so that even the user that own that User record cannot see
  their ID. Their ID should only be user internally by the Prisma service.

## Later

- Look into subscriptions on both API and client side
- Look into adding paging support to application server for:
  - chat messages
  - chats (that will be in sidebar)
  - users
- Use GraphQL Shield: https://github.com/maticzav/graphql-shield
- Look into Apollo Engine for API usage reporting
- Look into sentry.io for error reporting
- Add now.json
- Look into setting up circleCI

## Example Projects

- https://github.com/prismagraphql/graphql-server-example
- https://github.com/wesbos/Advanced-React/tree/master/finished-application/backend

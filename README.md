# talq-api

A communication platform built with React and GraphQL (API).

# Ideas

```graphql
# Images may need to be stored externally on a service
# like AWS S3 when implemented.

type User {
  id: ID! @unique
  email: String! @unique
  firstName: String!
  lastName: String!
  password: String!
  # Potentially needed to be optional as when a user
  # first creates an account, they will not have any
  # friends added to their account.
  friends: [User!]!
  # Needs to be looked into. Basic implementation
  # would be to save the image on the API server,
  # then give this field the URL to that image.
  #
  # TODO: Look into Apollo Server / Prisma file upload.
  # picture: String!
}

# For the time being, only messages array can be
# updated, and it can only be added to.
type Chat {
  id: ID! @unique
  # Optional because if it is not set, the front-end
  # will just use a list of the members names as the
  # title.
  title: String
  members: [User!]!
  # Potentially needs to be set to optional as a chat
  # needs to be able to be in a state where it has been
  # created but no messages have been sent yet.
  messages: [Message!]!
}

type Message {
  id: ID! @unique
  author: User!
  createdAt: DateTime!
  # Needs to be rethought when image / other media
  # sending is implemented.
  content: String!
}
```

# talq

A communication platform built with React and GraphQL.

## Plan

### Idea

Build a Facebook Messenger clone with the following technologies and tools:

#### Frontend

- React (Using a high level context provider to give login info)
- Next.js (For file based routing and easy SSR)
- Apollo client (To interface with the API)
- Emotion (For Styling)

#### API

- Node
- Prisma
- GraphQL Yoga (Or possibly Apollo server 2.0 when it comes out of RC)
- JWT token creation and verification for login
- GraphQL Subscriptions (For live message updates)
  - For both currently viewed contact and all contacts to show in sidebar

#### Both

- Typescript
- TSLint
- Jest

### Route Plan

If a user attempts to visit any page (That is not the login or signup pages)
when they are not logged in, (checked through a boolean passed down by a context
provider that checks local storage) they will be redirected to the login page
(`/login`). The login page will also provide a link to the signup page
(`/signup`).

If a user tries to access either the login or signup pages when they are already
logged in, they with be redirected to `/` (which will then redirect them to
their most recent chat as described below).

#### `/`

Redirect to most recent chat (`/chat/:chatId` where `:chatid` is the id of the
user's most recent chat).

#### `/login`

(Not logged in) Show a login page with email and password fields as well as a
link to signup page.

#### `/signup`

(Not logged in) Show a signup page with email, name and password with double
check. Also with a link to login page.

- email must be unique
- name does not have to be unique as it going to have a first and last name with
  people could share
- password must meet some security requirements (possibly using an existing
  lib), for example:
  - Minimum length
  - requires at least 1 number

#### `/settings`

When a user is logged in, shows a settings page where the user can change their
details. The following list shows what the user will be able to change for this
page:

#### `/chat`

Redirect to `/`.

#### `/chat/:chatId`

Shows the chat that has an id of `:chatId`. This could be a chat between two
people or a group chat. The user requesting to view this chat must be one of the
chats members.

### Data Plan

placeholder

### Feature Plan

placeholder

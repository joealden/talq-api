# TODO

- Flesh out login and settings page (Keep in style with messenger login)
- Start working on the API side
  - Install prisma, graphql-yoga, validator etc.
  - Create base datamodel described in `api/__schema.gql`
  - Add a `.graphqlconfig` (Possibly in root as client will get autocomplete)
    - https://github.com/prismagraphql/graphql-config
    - Add vscode folder with plugin recommendations:
      - Styled Components
      - prisma vscode (Called GraphQL)
  - Get typescript set up on API (Then think of adding to client)
  - Look into subscriptions
- Add custom Apollo install to client with subscription support
  - Connect to API
  - Test normal query + live query in sidebar

import { GraphQLClient } from 'graphql-request';

export default new GraphQLClient(process.env.SERVER_URL + '/graphql', {
  credentials: 'include',
});

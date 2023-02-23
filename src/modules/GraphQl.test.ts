import {GQLClient} from './GraphQl';
import { ApolloClient } from '@apollo/client';

describe('GraphQL Module', () => {
    test('does return a connection', async () => {
        expect(GQLClient).toBeInstanceOf(ApolloClient);
    });
});
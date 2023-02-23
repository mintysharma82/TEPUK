import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import App from './App';
import { getTopStarRepositoryQuery } from './modules/GraphQl';



describe('Main App component', () => {
  test('renders two elements as expected', async () => {
    const mocks = {
      request: {
        query: getTopStarRepositoryQuery(),
        variables: {}
      },
      result: {
        data: {
          search: {
            edges: [
              {
                node: {
                  name: "First",
                  __typename: "Repository"
                }
              },
              {
                node: {
                  name: "Second",
                  __typename: "Repository"
                }
              }
            ]
          }
        }
      }
    };
    render(<MockedProvider mocks={[mocks]} addTypename={false}>
      <App />
    </MockedProvider>);
    expect(await screen.findByText("Loading...")).toBeVisible();
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('First');
    expect(items[1]).toHaveTextContent('Second');
  });

  test('renders error message as expected', async () => {
    const mocks = {
      request: {
        query: getTopStarRepositoryQuery(),
        variables: {}
      },
      error: new Error("An error occurred")
    };
    render(<MockedProvider mocks={[mocks]} addTypename={false}>
      <App />
    </MockedProvider>);
    expect(await screen.findByText("Loading...")).toBeVisible();
    expect(await screen.findByText(/An error occurred/i)).toBeVisible();
  });
});

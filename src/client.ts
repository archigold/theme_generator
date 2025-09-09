import { GraphQLClient, RequestDocument, Variables } from 'graphql-request';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

// Set your Vendure Shop API endpoint here
const VENDURE_API_URL = 'http://51.15.207.136:3000/shop-api';

const client = new GraphQLClient(VENDURE_API_URL, {
  // This is crucial for cookie-based sessions, allowing the browser to
  // send the session cookie automatically.
  credentials: 'include',
  // You can set other headers here for things like bearer tokens or channels.
  headers: {
    'Content-Type': 'application/json',
  },
});

// A generic request function to abstract the client.request call
export async function request<T, V extends Variables = Variables>(
  document: RequestDocument | TypedDocumentNode<T, V>,
  variables?: V,
): Promise<T> {
  try {
    console.log('GraphQL Request:', { document, variables });
    const result = await client.request(document, variables);
    console.log('GraphQL Response:', result);
    return result;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
}

// Helper functions for common Vendure features
export function setChannelToken(channelToken: string | undefined) {
  if (channelToken) {
    client.setHeader('vendure-token', channelToken);
  } else {
    client.setHeader('vendure-token', '');
  }
}

export function setLanguageCode(languageCode: string | undefined) {
  if (languageCode) {
    const url = new URL(VENDURE_API_URL);
    url.searchParams.set('languageCode', languageCode);
    client.setEndpoint(url.toString());
  } else {
    client.setEndpoint(VENDURE_API_URL);
  }
}

// Export the client for direct access if needed
export { client };

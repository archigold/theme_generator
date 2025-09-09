import { request } from './client';
import { gql } from 'graphql-request';

const GET_PRODUCTS = gql`
  query GetProducts($options: ProductListOptions) {
    products(options: $options) {
      items {
        id
        name
        slug
        description
        featuredAsset {
          preview
        }
        assets {
          preview
        }
        variants {
          id
          name
          price
          priceWithTax
          currencyCode
          stockLevel
          sku
          options {
            id
            name
            code
            group {
              id
              name
              code
            }
          }
          featuredAsset {
            preview
          }
        }
        facetValues {
          id
          name
          code
          facet {
            id
            name
            code
          }
        }
        collections {
          id
          name
          slug
          breadcrumbs {
            id
            name
            slug
          }
        }
      }
      totalItems
    }
  }
`;

const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      slug
      description
      featuredAsset {
        preview
      }
      assets {
        preview
      }
      variants {
        id
        name
        price
        priceWithTax
        currencyCode
        stockLevel
        sku
        options {
          id
          name
          code
          group {
            id
            name
            code
          }
        }
        featuredAsset {
          preview
        }
      }
      facetValues {
        id
        name
        code
        facet {
          id
          name
          code
        }
      }
      collections {
        id
        name
        slug
        breadcrumbs {
          id
          name
          slug
        }
      }
    }
  }
`;

const SEARCH_PRODUCTS = gql`
  query SearchProducts($input: SearchInput!) {
    search(input: $input) {
      items {
        productId
        productName
        productVariantId
        productVariantName
        slug
        sku
        price {
          ... on PriceRange {
            min
            max
          }
          ... on SinglePrice {
            value
          }
        }
        priceWithTax {
          ... on PriceRange {
            min
            max
          }
          ... on SinglePrice {
            value
          }
        }
        currencyCode
        productAsset {
          preview
        }
        productVariantAsset {
          preview
        }
      }
      totalItems
      facetValues {
        count
        facetValue {
          id
          name
          facet {
            id
            name
          }
        }
      }
    }
  }
`;

// Function to get products with options
export const getProducts = async (options?: {
  take?: number;
  skip?: number;
  sort?: { [key: string]: 'ASC' | 'DESC' };
  filter?: any;
}) => {
  const data = await request(GET_PRODUCTS, { options });
  return data.products;
};

// Function to get a single product by ID
export const getProductById = async (id: string) => {
  const data = await request(GET_PRODUCT_BY_ID, { id });
  return data.product;
};

// Function to get a single product by slug
export const getProductBySlug = async (slug: string) => {
  const data = await request(GET_PRODUCT_BY_ID, { id: slug }); // Using the same query for now
  return data.product;
};

// Function to search products
export const searchProducts = async (input: {
  term: string;
  take?: number;
  skip?: number;
  groupByProduct?: boolean;
  facetValueIds?: string[];
  facetValueOperator?: 'AND' | 'OR';
  collectionId?: string;
  collectionSlug?: string;
}) => {
  const data = await request(SEARCH_PRODUCTS, { input });
  return data.search;
};

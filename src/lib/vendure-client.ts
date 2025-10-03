import { GraphQLClient } from 'graphql-request';

// Vendure GraphQL endpoint
const VENDURE_API_URL = import.meta.env.VITE_VENDURE_API_URL || 'https://stablecommerce.ai/mgmt/shop-api';

// Create GraphQL client
export const vendureClient = new GraphQLClient(VENDURE_API_URL, {
  credentials: 'include', // Important for session management
  headers: {
    'Content-Type': 'application/json',
  },
});

// Common GraphQL fragments
export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    name
    slug
    description
    featuredAsset {
      id
      preview
      source
    }
    assets {
      id
      preview
      source
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
        id
        preview
        source
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
`;

export const COLLECTION_FRAGMENT = `
  fragment CollectionFragment on Collection {
    id
    name
    slug
    description
    featuredAsset {
      id
      preview
      source
    }
    breadcrumbs {
      id
      name
      slug
    }
    children {
      id
      name
      slug
    }
  }
`;

// GraphQL queries
export const GET_PRODUCTS_QUERY = `
  query GetProducts($options: ProductListOptions) {
    products(options: $options) {
      items {
        ...ProductFragment
      }
      totalItems
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_BY_SLUG_QUERY = `
  query GetProductBySlug($slug: String!) {
    product(slug: $slug) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_BY_ID_QUERY = `
  query GetProductById($id: ID!) {
    product(id: $id) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_COLLECTIONS_QUERY = `
  query GetCollections {
    collections {
      items {
        ...CollectionFragment
      }
    }
  }
  ${COLLECTION_FRAGMENT}
`;

export const SEARCH_PRODUCTS_QUERY = `
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
          id
          preview
          source
        }
        productVariantAsset {
          id
          preview
          source
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

export const GET_ACTIVE_ORDER_QUERY = `
  query GetActiveOrder {
    activeOrder {
      id
      code
      state
      totalQuantity
      totalWithTax
      currencyCode
      lines {
        id
        quantity
        linePrice
        linePriceWithTax
        productVariant {
          id
          name
          sku
          price
          priceWithTax
          product {
            id
            name
            slug
            featuredAsset {
              id
              preview
              source
            }
          }
        }
      }
      shippingAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        phoneNumber
      }
      billingAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        phoneNumber
      }
    }
  }
`;

export const ADD_TO_ORDER_MUTATION = `
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ... on Order {
        id
        code
        totalQuantity
        totalWithTax
        lines {
          id
          quantity
          linePrice
          linePriceWithTax
          productVariant {
            id
            name
            sku
            product {
              name
              slug
              featuredAsset {
                preview
              }
            }
          }
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const REMOVE_ORDER_LINE_MUTATION = `
  mutation RemoveOrderLine($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
      ... on Order {
        id
        totalQuantity
        totalWithTax
        lines {
          id
          quantity
          linePrice
          linePriceWithTax
          productVariant {
            id
            name
            sku
            product {
              name
              slug
              featuredAsset {
                preview
              }
            }
          }
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const ADJUST_ORDER_LINE_MUTATION = `
  mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      ... on Order {
        id
        totalQuantity
        totalWithTax
        lines {
          id
          quantity
          linePrice
          linePriceWithTax
          productVariant {
            id
            name
            sku
            product {
              name
              slug
              featuredAsset {
                preview
              }
            }
          }
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

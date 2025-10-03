import { request } from './client';
import { gql } from 'graphql-request';

const ADD_ITEM_TO_ORDER = gql`
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ... on Order {
        id
        totalQuantity
        totalWithTax
        currencyCode
        lines {
          id
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
            product {
              id
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

const ADJUST_ORDER_LINE = gql`
  mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      ... on Order {
        id
        totalQuantity
        totalWithTax
        currencyCode
        lines {
          id
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
            product {
              id
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

const REMOVE_ORDER_LINE = gql`
  mutation RemoveOrderLine($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
      ... on Order {
        id
        totalQuantity
        totalWithTax
        currencyCode
        lines {
          id
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
            product {
              id
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

const GET_ACTIVE_ORDER = gql`
  query GetActiveOrder {
    activeOrder {
      id
      totalQuantity
      totalWithTax
      currencyCode
      lines {
        id
        quantity
        linePriceWithTax
        productVariant {
          id
          name
          sku
          product {
            id
            name
            slug
            featuredAsset {
              preview
            }
          }
        }
      }
    }
  }
`;

// Function to add a product variant to the cart
export const addItem = async (productVariantId: string, quantity: number = 1) => {
  const data = await request(ADD_ITEM_TO_ORDER, { productVariantId, quantity });
  return data.addItemToOrder;
};

// Function to adjust the quantity of an item in the cart
export const adjustItemQuantity = async (orderLineId: string, quantity: number) => {
  const data = await request(ADJUST_ORDER_LINE, { orderLineId, quantity });
  return data.adjustOrderLine;
};

// Function to remove an item from the cart
export const removeItem = async (orderLineId: string) => {
  const data = await request(REMOVE_ORDER_LINE, { orderLineId });
  return data.removeOrderLine;
};

// Function to get the active order (cart)
export const getActiveOrder = async () => {
  const data = await request(GET_ACTIVE_ORDER);
  return data.activeOrder;
};

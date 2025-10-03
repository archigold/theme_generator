import { vendureClient, GET_PRODUCTS_QUERY, GET_PRODUCT_BY_SLUG_QUERY, GET_PRODUCT_BY_ID_QUERY, GET_COLLECTIONS_QUERY, SEARCH_PRODUCTS_QUERY, GET_ACTIVE_ORDER_QUERY, ADD_TO_ORDER_MUTATION, REMOVE_ORDER_LINE_MUTATION, ADJUST_ORDER_LINE_MUTATION } from './vendure-client';

// Types for Vendure API responses
export interface VendureProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  featuredAsset?: {
    id: string;
    preview: string;
    source: string;
  };
  assets: Array<{
    id: string;
    preview: string;
    source: string;
  }>;
  variants: Array<{
    id: string;
    name: string;
    price: number;
    priceWithTax: number;
    currencyCode: string;
    stockLevel: string;
    sku: string;
    options: Array<{
      id: string;
      name: string;
      code: string;
      group: {
        id: string;
        name: string;
        code: string;
      };
    }>;
    featuredAsset?: {
      id: string;
      preview: string;
      source: string;
    };
  }>;
  facetValues: Array<{
    id: string;
    name: string;
    code: string;
    facet: {
      id: string;
      name: string;
      code: string;
    };
  }>;
  collections: Array<{
    id: string;
    name: string;
    slug: string;
    breadcrumbs: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  }>;
}

export interface VendureCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  featuredAsset?: {
    id: string;
    preview: string;
    source: string;
  };
  breadcrumbs: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  children: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

export interface VendureOrder {
  id: string;
  code: string;
  state: string;
  totalQuantity: number;
  totalWithTax: number;
  currencyCode: string;
  lines: Array<{
    id: string;
    quantity: number;
    linePrice: number;
    linePriceWithTax: number;
    productVariant: {
      id: string;
      name: string;
      sku: string;
      price: number;
      priceWithTax: number;
      product: {
        id: string;
        name: string;
        slug: string;
        featuredAsset?: {
          id: string;
          preview: string;
          source: string;
        };
      };
    };
  }>;
}

// API service functions
export class VendureApiService {
  static async getProducts(options?: {
    take?: number;
    skip?: number;
    sort?: { [key: string]: 'ASC' | 'DESC' };
    filter?: any;
  }) {
    try {
      const response = await vendureClient.request<{
        products: { items: VendureProduct[]; totalItems: number };
      }>(GET_PRODUCTS_QUERY, { options });
      
      return response.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async getProductBySlug(slug: string) {
    try {
      const response = await vendureClient.request<{
        product: VendureProduct;
      }>(GET_PRODUCT_BY_SLUG_QUERY, { slug });
      
      return response.product;
    } catch (error) {
      console.error('Error fetching product by slug:', error);
      throw error;
    }
  }

  static async getProductById(id: string) {
    try {
      const response = await vendureClient.request<{
        product: VendureProduct;
      }>(GET_PRODUCT_BY_ID_QUERY, { id });
      
      return response.product;
    } catch (error) {
      console.error('Error fetching product by id:', error);
      throw error;
    }
  }

  static async getCollections() {
    try {
      const response = await vendureClient.request<{
        collections: { items: VendureCollection[] };
      }>(GET_COLLECTIONS_QUERY);
      
      return response.collections.items;
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw error;
    }
  }

  static async searchProducts(term: string, options?: {
    take?: number;
    skip?: number;
    groupByProduct?: boolean;
    facetValueIds?: string[];
    facetValueOperator?: 'AND' | 'OR';
    collectionId?: string;
    collectionSlug?: string;
  }) {
    try {
      const input = {
        term,
        ...options,
      };

      const response = await vendureClient.request<{
        search: {
          items: Array<{
            productId: string;
            productName: string;
            productVariantId: string;
            productVariantName: string;
            slug: string;
            sku: string;
            price: { min?: number; max?: number; value?: number };
            priceWithTax: { min?: number; max?: number; value?: number };
            currencyCode: string;
            productAsset?: {
              id: string;
              preview: string;
              source: string;
            };
            productVariantAsset?: {
              id: string;
              preview: string;
              source: string;
            };
          }>;
          totalItems: number;
          facetValues: Array<{
            count: number;
            facetValue: {
              id: string;
              name: string;
              facet: {
                id: string;
                name: string;
              };
            };
          }>;
        };
      }>(SEARCH_PRODUCTS_QUERY, { input });
      
      return response.search;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  static async getActiveOrder() {
    try {
      const response = await vendureClient.request<{
        activeOrder: VendureOrder | null;
      }>(GET_ACTIVE_ORDER_QUERY);
      
      return response.activeOrder;
    } catch (error) {
      console.error('Error fetching active order:', error);
      throw error;
    }
  }

  static async addToCart(productVariantId: string, quantity: number = 1) {
    try {
      console.log('VendureApiService.addToCart called with:', { productVariantId, quantity });
      
      const response = await vendureClient.request<{
        addItemToOrder: VendureOrder | { errorCode: string; message: string };
      }>(ADD_TO_ORDER_MUTATION, { productVariantId, quantity });
      
      console.log('VendureApiService.addToCart response:', response);
      
      if ('errorCode' in response.addItemToOrder) {
        console.error('Vendure API returned error:', response.addItemToOrder);
        throw new Error(response.addItemToOrder.message);
      }
      
      console.log('VendureApiService.addToCart successful');
      return response.addItemToOrder;
    } catch (error) {
      console.error('VendureApiService.addToCart error:', error);
      throw error;
    }
  }

  static async removeFromCart(orderLineId: string) {
    try {
      const response = await vendureClient.request<{
        removeOrderLine: VendureOrder | { errorCode: string; message: string };
      }>(REMOVE_ORDER_LINE_MUTATION, { orderLineId });
      
      if ('errorCode' in response.removeOrderLine) {
        throw new Error(response.removeOrderLine.message);
      }
      
      return response.removeOrderLine;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  }

  static async updateCartQuantity(orderLineId: string, quantity: number) {
    try {
      const response = await vendureClient.request<{
        adjustOrderLine: VendureOrder | { errorCode: string; message: string };
      }>(ADJUST_ORDER_LINE_MUTATION, { orderLineId, quantity });
      
      if ('errorCode' in response.adjustOrderLine) {
        throw new Error(response.adjustOrderLine.message);
      }
      
      return response.adjustOrderLine;
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      throw error;
    }
  }
}

// Helper functions to convert Vendure data to your existing Product interface
export function convertVendureProduct(vendureProduct: VendureProduct): any {
  const variant = vendureProduct.variants[0]; // Use first variant
  const price = variant ? variant.priceWithTax / 100 : 0; // Convert from cents
  
  return {
    id: vendureProduct.id,
    name: vendureProduct.name,
    slug: vendureProduct.slug,
    price: price,
    rating: 4.5, // Default rating since Vendure doesn't have built-in ratings
    reviews: 0, // Default reviews count
    image: vendureProduct.featuredAsset?.preview || '/placeholder.svg',
    category: vendureProduct.collections[0]?.slug || 'uncategorized',
    description: vendureProduct.description,
    specifications: {}, // You can map facet values here if needed
    features: [], // You can map facet values here if needed
    inStock: variant ? variant.stockLevel !== 'OUT_OF_STOCK' : false,
    variants: vendureProduct.variants.map(v => ({
      id: v.id,
      name: v.name,
      price: v.priceWithTax / 100,
      sku: v.sku,
      stockLevel: v.stockLevel,
      options: v.options,
    })),
  };
}

export function convertVendureCollection(collection: VendureCollection) {
  return {
    id: collection.id,
    name: collection.name,
    slug: collection.slug,
    description: collection.description,
    image: collection.featuredAsset?.preview || '/placeholder.svg',
  };
}


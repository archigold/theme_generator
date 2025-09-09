import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { VendureApiService } from '@/lib/vendure-api';

// Products hooks
export function useProducts(options?: {
  take?: number;
  skip?: number;
  sort?: { [key: string]: 'ASC' | 'DESC' };
  filter?: any;
}) {
  return useQuery({
    queryKey: ['products', options],
    queryFn: () => VendureApiService.getProducts(options),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => VendureApiService.getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProductById(id: string) {
  return useQuery({
    queryKey: ['productById', id],
    queryFn: () => VendureApiService.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSearchProducts(term: string, options?: {
  take?: number;
  skip?: number;
  groupByProduct?: boolean;
  facetValueIds?: string[];
  facetValueOperator?: 'AND' | 'OR';
  collectionId?: string;
  collectionSlug?: string;
}) {
  return useQuery({
    queryKey: ['search', term, options],
    queryFn: () => VendureApiService.searchProducts(term, options),
    enabled: !!term && term.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Collections hooks
export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: () => VendureApiService.getCollections(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Cart/Order hooks
export function useActiveOrder() {
  return useQuery({
    queryKey: ['activeOrder'],
    queryFn: () => VendureApiService.getActiveOrder(),
    staleTime: 0, // Always fresh for cart data
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productVariantId, quantity }: { productVariantId: string; quantity: number }) =>
      VendureApiService.addToCart(productVariantId, quantity),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: ['activeOrder'] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderLineId: string) => VendureApiService.removeFromCart(orderLineId),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: ['activeOrder'] });
    },
  });
}

export function useUpdateCartQuantity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderLineId, quantity }: { orderLineId: string; quantity: number }) =>
      VendureApiService.updateCartQuantity(orderLineId, quantity),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: ['activeOrder'] });
    },
  });
}

// Custom hook for cart summary
export function useCartSummary() {
  const { data: activeOrder } = useActiveOrder();
  
  const totalItems = activeOrder?.totalQuantity || 0;
  const totalPrice = activeOrder?.totalWithTax ? activeOrder.totalWithTax / 100 : 0;
  const currencyCode = activeOrder?.currencyCode || 'USD';
  
  return {
    totalItems,
    totalPrice,
    currencyCode,
    isEmpty: totalItems === 0,
  };
}

// Custom hook for product variants
export function useProductVariants(productId: string) {
  const { data: product } = useProduct(productId);
  
  return {
    variants: product?.variants || [],
    defaultVariant: product?.variants?.[0],
  };
}



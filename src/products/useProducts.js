import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts, fetchProductById, fetchAllCategories } from './productService';

export function useProducts(params = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchAllProducts(params),
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: Boolean(id),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchAllCategories,
    staleTime: 1000 * 60 * 10,
  });
}

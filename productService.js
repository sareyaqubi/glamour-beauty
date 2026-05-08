const BASE_URL = 'https://dummyjson.com';

export async function fetchAllProducts(params = {}) {
  const { limit = 20, skip = 0, category, search, sort } = params;

  let url = `${BASE_URL}/products`;
  if (category) {
    url = `${BASE_URL}/products/category/${category}`;
  } else if (search) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(search)}`;
  }

  const qs = new URLSearchParams({ limit, skip });
  if (sort) qs.set('sortBy', 'price');

  const separator = url.includes('?') ? '&' : '?';
  const res = await fetch(`${url}${separator}${qs}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }
  return res.json();
}

export async function fetchAllCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }
  return res.json();
}

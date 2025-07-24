import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

export async function getProducts() {
  try {
    // For server-side rendering, use relative URL
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // During build time, use relative path instead of full URL
    let apiUrl;
    if (typeof window === 'undefined') {
      // Server-side: use relative URL or localhost for build
      apiUrl = process.env.NODE_ENV === 'production' 
        ? `${baseURL}/api/products`
        : 'http://localhost:3000/api/products';
    } else {
      // Client-side: use relative URL
      apiUrl = '/api/products';
    }
    
    console.log('Fetching from:', apiUrl);
    const response = await fetch(apiUrl);
    
    // Check if response is ok
    if (!response.ok) {
      console.error('API response not ok:', response.status, response.statusText);
      return [];
    }
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Response is not JSON, received:', contentType);
      const text = await response.text();
      console.error('Response body:', text.substring(0, 200));
      return [];
    }
    
    const products = await response.json();
    console.log('Products fetched successfully:', products.length);
    return products;
    
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return []; // Return empty array on error
  }
}

export default async function Home() {
  const products = await getProducts();
  
  let poster = null;
  let jerseys = [];

  // Handle case when products is empty or undefined
  if (Array.isArray(products) && products.length > 0) {
    for (let product of products) {
      if (product.name === "Cristiano Ronaldo Wall poster") {
        poster = product;
        continue;
      } 
      jerseys.push(product);
    }
  }

  return (
    <>
      <ImageBanner />
      <section>
        <Products poster={poster} jerseys={jerseys} />
      </section>
    </>
  );
}

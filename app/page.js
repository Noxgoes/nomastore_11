import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

export async function getProducts() {
  const BaseURL = process.env.NEXT_PUBLIC_BASE_URL ;
  const response = await fetch(BaseURL + "/api/products");
  const products = await response.json();
  return products;
}

export default async function Home() {
  const products = await getProducts();
  
  let poster=null;
  let jerseys=[]

  for(let product of products) {
    if(product.name=="Cristiano Ronaldo Wall poster") {
      poster = product;
      continue;
    } 
    jerseys.push(product);
  }

  return (
    <>

      <ImageBanner/>
      <section>
        <Products poster={poster} jerseys={jerseys}/>
      </section>

    </>
  )
}
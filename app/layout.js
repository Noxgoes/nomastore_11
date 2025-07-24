
import "./globals.css";
import "./fanta.css";
import Head from "./head";
import Link from "next/link";
import Cart from "@/components/Cart";
import EmailInput from "@/components/Emailinput";
import ProductsProvider from "@/components/ProductContent";



export const metadata = {
  title: "Nomastore",
  description: "for the football lovers",
};

export default function RootLayout({ children }) {
  return (
    <ProductsProvider>
      <html lang="en">
        <Head/>
        <body>
          <div id="portal"></div>
  
          <div id ="app">
            <header>
              <div className="header-content">{/* for seperating header */}
                <Link href={"/"}> <h1>Nomastore</h1>
                </Link>

                <h5 className="mid-text"> JERSEYS YOU WILL SWEAT YO ASS FOR</h5>
                <Cart/>
              </div>
            
            </header>
            <main>
              {children}
  
            </main>
            <div className="hr"></div>{/* for seperating footer*/}
            <footer>
              <div className="email-container">
                <h5>never misss the chance to wear a fresh jersey
                  ,recieve exclusive offers ad be a part of the community
                </h5>
                <EmailInput/>
              </div>


              <div className="links-container">
                <div>
                  <h3>nakkul</h3>
                  <Link href={'/'}>nakkul</Link>
                  <Link href={'/'}>my site</Link>
                </div>

                <div>
                  <h3>Store</h3>
                  <Link href={'/'}>Home</Link>
                  <Link href={'/cart'}>Cart</Link>
                </div>

                <div>
                  <h3>Support</h3>
                  <Link href={'/'}>Contact</Link>
                  <Link href={'/'}>FAQ</Link>
                </div>
              </div>

              <div className="socials">
                <p>©<a href ="https://www.Nomastore.com" target="_blank">Nomastore</a>
                2025 ⚽ <br/> All rights reserved</p>
              <div className="social-links">
                <Link href={"https://github.com/Noxgoes"} target="_blank"><i className="fa-brands fa-square-github"></i>
                </Link>
                <Link href={"https://www.linkedin.com/in/nakkul-gulati-20aa84230/"} target="_blank"><i className="fa-brands fa-linkedin-in"></i>
                </Link>
            
                <Link href={"https://www.instagram.com/nakulgulatioberoi"} target="_blank"><i className="fa-brands fa-square-instagram"></i>
                </Link>
              </div>
              
              
              </div>
              
            </footer>
            
          </div>
        </body>
      </html>
    </ProductsProvider>
  );
}

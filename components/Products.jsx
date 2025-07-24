// NOTE: Backticks (``) are used for template literals in JSX to build dynamic strings with variables, like image paths.
// Example: src={`mid_res/${portalImage}.jpg`} will insert the value of portalImage into the string.
'use client'
import Portal from "./Portal"; // or "../components/Portal" depending on your folder structure
import Link from "next/link" // Importing Link for navigation
import { useState } from "react"
import { useProducts } from "./ProductContent";
export default function Products(props) {
    const{ poster, jerseys } = props; // Destructure props to get poster and jerseys
    console.log(poster, jerseys); // Log poster and jerseys to check if they are passed correctl
    const [portalImage, setPortalImage] = useState(null);
    const {handleIncrementProduct,cart} = useProducts(); // Destructure handleIncrementProduct from props
    console.log(cart); // Log cart to check if it's working correctly
    
  
    if(!jerseys.length||!poster) {
        return null}
    return(
        <>
            {portalImage && (
                <Portal handleClosePortal={() => setPortalImage(null)}>
                    <div className="portal-content">
                        
                        <img className="img-display" src={`mid_res/${portalImage}.jpg`} alt={`${portalImage}-high-res`} />
                    </div>
                </Portal>)}
            <div className="section-container">
                <div className="section-header">
                    <h2>Get the Poster</h2>
                    <p>Giving away the motivation you need ಥ_ಥ</p>
                </div>
 
                <div className="planner-container">{/* i have used poster isntead of planner */}
                    <div>
                        <button  onClick={()=>{setPortalImage('poster')}} className="img-button2">
                            <img src="mid_res/poster.jpg" alt="low-res-planner" />
                        </button>{/*so its clickable the image */}
                    </div>
                    <div className="planner-info">
                        <p className="text-large planner-header">
                            Cristiano Ronaldo Retro Poster
                        </p>
                        <h2><span>₹</span>999</h2>
                        <p className="planner-cont">Step into a legacy of greatness with our <strong>CR7 Retro Tribute Poster</strong>! This high-resolution PNG asset blends vintage aesthetics with the unstoppable aura of Cristiano Ronaldo to deliver a poster that’s both iconic and inspirational. Whether you’re decorating your space or fueling your passion, this artwork is made to stand out.</p>
                        <ul className="planner-cont">
                            <li><strong>Bold Retro Design:</strong> Featuring Cristiano Ronaldo in a 
                            classic pose, enhanced with muted blue tones and powerful typography 
                            for a timeless visual impact.</li>
                            <li><strong>Fully Printable:</strong> Created at ultra-high resolution,
                             it's perfect for everything from desktop wallpapers to large-format poster
                             prints.</li>
                            <li><strong>Dimensions:</strong> 1024 x 1536 pixels</li>
                             
                        </ul>

                        <div className="purchase-btns">
                            <button  onClick={()=>{
                                        const posterpriceid=poster.default_price;
                                        handleIncrementProduct(posterpriceid,1,poster);


                                    }}
                            className="cart-button" >Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-container">
                <div className="section-header">
                    <h2>Or collect our RETRO JERSEYS</h2>
                    <p>yeah you will look cool wearing them ^_____^</p>
                </div>

                <div className="sticker-container">{/*shere sticker are jersys*/}
                    {jerseys.map((jersey,jerseyindex)=>{
                        const jerseyName=jersey.name
                        const jerseyImgUrl= jersey.name.replaceAll(" ", "_");
                        return(
                            <div className="sticker-card" key={jerseyindex}>
                                <button onClick={()=>{setPortalImage(jerseyImgUrl)}} className="img-button">
                                    <img src={`mid_res/${jerseyImgUrl}.jpg`} alt={`${jerseyName}-low-res`}/>
                                </button>
                                <div className="sticker-info">
                                    <p className="text-medium">{jerseyName}</p>
                                    <p >{jersey.description}</p>
                                    <h6>Size-M</h6>
                                    <h2><span>₹</span>{jersey.prices[0].unit_amount/100}</h2>
                                   
                                    <button onClick={()=>{
                                        const jereypriceid=jersey.default_price;
                                        handleIncrementProduct(jereypriceid,1,jersey);


                                    }} className="cart-button" >Add to cart</button>
                                </div>
                            </div>
                        )

                    })}


                </div>


            </div>
        </>
 )
}

    
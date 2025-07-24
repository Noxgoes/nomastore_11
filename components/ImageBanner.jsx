
// This component shows a low-res image first, then fades in a high-res image when it loads.
// We use useState to track if the high-res image is loaded.
// The onLoad event sets isloaded to true when the image loads.
// BUT: If the image is already cached, the browser may not fire onLoad again.
// To handle this, useRef and useEffect can check if the image is already loaded (imageRef.current.complete)
// and set isloaded to true immediately, so the high-res image shows up right away after reloads.
'use client'
import { useState,useEffect,useRef } from "react"   

export default function ImageBanner() {
    const [isloaded, setLoaded] = useState(false);
    const imageRef = useRef();
    useEffect(() => {
        if (imageRef.current.complete) {
            setLoaded(true);
        }
    }, []);
    
    return (
        <div className= "banner-images" >
            <img className="low-res-img" src="low_res/banner.png" alt="banner_low_res"/>
            <img className="high-res-img" ref ={imageRef} src="mid_res/banner.png" alt="banner_low_res" 
            style={{opacity: isloaded?1:0}} onLoad={()=>{setLoaded(true)}}/>
            <div className="cta-btns-container">
                <div>
                    <div >
                        <h2>Welcome to the....</h2>
                        <h1>Noma Store</h1>
                    </div>
                    <div>
                        <button>Shop retro jeresys</button>
                        <button>Shop Poster</button>
                    </div>

                </div>
                
            </div>
    
            
        </div>
        
    )
}

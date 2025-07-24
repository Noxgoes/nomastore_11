import Link from "next/link"
export default function NotFound(){
    return(
        <div className="page-container">
           
            <h2 className="text-large"> Thankyou for the purchase!!😮‍💨 <br/>you are a messiah 🦄</h2>
            <Link href="/" className="unstyled-button">
            <button className="button-card">Continue &rarr;</button>
            </Link>
        </div>
    )
}
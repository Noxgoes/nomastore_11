import Link from "next/link"
export default function NotFound(){
    return(
        <div className="page-container">
            <p className="text-large">404 <br/> Stay in your limits</p>
            <h2>Page Not Found</h2>
            <Link href="/" className="unstyled-button">
            <button className="button-card">Go to Home</button>
            </Link>
        </div>
    )
}
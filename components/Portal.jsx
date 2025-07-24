'use client'
// Render a modal with backdrop using React Portal; clicking the backdrop 
//when i press onclick handclocseportal run null which stops the modal
// runs handleClosePortal, and children is the modal content
import ReactDom from 'react-dom'

export default function Portal(props) {
    const { handleClosePortal, children } = props


    return ReactDom.createPortal(
        <div className='portal-container'>
            <div onClick={handleClosePortal} className='portal-underlay' />
            {children}
        </div>,
        document.getElementById('portal')
    )
}
import { Link } from 'react-router-dom'
import fonNavBar from '../static/img/fonNavBar.png'




const NavBar = () => {

    return (
        <>
            <nav className="navBar">

                <img src={fonNavBar} alt="" className="fon" />
                <div className="container">

                    <div className="nav_items">

                        <div className="nav_items_hed_link">
                            <Link className='a_href' to='/'>Главная /</Link>
                        </div>

                        <h2 className='nav_items_hed_text'>Велосипеды</h2>

                        
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
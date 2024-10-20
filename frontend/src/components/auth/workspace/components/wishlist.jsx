import { useEffect, useState } from "react"
import Get from "../../../../request/get"
import WishlistProduct from "./wishlistProduct"
import Wishlist_svg from '../../../../static/img/wishlist.svg'


const Wishlist = ({ userMenuOpen, setUserMenuOpen }) => {

    const [data, setData] = useState([])

    const user = JSON.parse(localStorage.getItem('infoUserBike'))


    useEffect(() => {

        if (user) {

            Get('http://127.0.0.1:8000/api/v1/auth/wishlist/', user?.token).then(r => setData(r?.data))
        } else {
            setUserMenuOpen(!userMenuOpen)
        }

    }, [])

    console.log(data);


    return (

        <>
            <div className="workspace">

                <div className="workspace_container">

                    <div className="workspace_item">

                        <h3>Список желаний</h3>

                        <div className="blok_wishlists">

                            {
                                data?.length != 0 ?
                                    data?.map(item => (<WishlistProduct idProduct={item?.bike} />)) :
                                    (
                                        <div className="null_wishlist_img">
                                            <img className="" src={Wishlist_svg} alt="" />
                                            <p>В списке пока нет ни одного избранного товара</p>
                                        </div>
                                    )
                            }

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}


export default Wishlist
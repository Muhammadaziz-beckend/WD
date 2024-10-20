import { useEffect, useState } from "react"
import Get from "../../../../request/get"
import Mouth from '../../../../static/img/mouth.svg'
import { NavLink } from 'react-router-dom'

const WishlistProduct = ({ idProduct }) => {

    const [data, setData] = useState({})

    useEffect(() => {

        Get(`http://127.0.0.1:8000/api/v1/products/${idProduct ? idProduct : 1}/`).then(r => setData(r?.data))

    }, [idProduct])


    return (
        <>

            <NavLink to={`/product/${data?.id}`} className="blok_product_wishlist">
                <div className="top">
                    <div className="flag">
                        <img src={data?.flag?.image} alt="Flag" />
                    </div>

                    <div className="info_product">
                        <span>{data?.receive_type}</span>
                    </div>

                    <img src={data?.image} alt="Product" className='product_img' />
                </div>

                <div className="bottom">
                    <div className="info_prise_and_name">
                        <p>{data?.name}</p>
                        <span>{Math.ceil(Number(data?.price))} ₽</span>
                    </div>

                    <NavLink to={`product/bey/${data?.id}`} className="bey_product">
                        <div className="blok_button">
                            <img src={Mouth} alt="Mouse" />
                            <span>В 1 клик</span>
                        </div>
                    </NavLink>
                </div>
            </NavLink>

        </>
    )
}

export default WishlistProduct
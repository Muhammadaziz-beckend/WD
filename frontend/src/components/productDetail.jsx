import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import Get from "../request/get"


const ProductDetail = () => {
    const { id } = useParams()

    const [date, setDate] = useState({})

    useEffect(() => {
        Get(`http://127.0.0.1:8000/api/v1/products/${id}/`).then(r => {
            setDate(r.data)
        })
    }, [])

    console.log(date);
    return (

        <>
            <div className="detail_item">
                <div className="container">

                    <div className="blok_items">
                        <div className="left">
                            <div className="blok_image">
                                <img src={date?.image} alt="" />
                            </div>
                        </div>
                        <div className="right"></div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ProductDetail
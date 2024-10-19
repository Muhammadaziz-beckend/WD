import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"

import Get from "../request/get"

import Minus from '../static/img/minus.svg'
import Plus from '../static/img/plus.svg'
import Featured from '../static/img/featured.svg'

const ProductDetail = () => {
    const { id } = useParams()

    const [date, setDate] = useState({})
    const [count, setCount] = useState(1)
    const [active, setActive] = useState(false)
    const [nameFlag, setNameFlg] = useState('')

    useEffect(() => {
        Get(`http://127.0.0.1:8000/api/v1/products/${id}/`).then(r => {
            setDate(r?.data)
        })

        Get(`http://127.0.0.1:8000/api/v1/flag/${date?.flag}/`).then(r => {
            setNameFlg(r?.data?.name)
        })
    }, [])

    console.log(date);
    return (

        <>
            <div className="detail_item">
                <div className="container">
                    <div className="blok_items">

                        <div className="blok_image_and_title">
                            <div className="name_product">
                                <h3>{date?.name}</h3>

                                <div className="product_info_blok">

                                    <div className="product_availability">{date?.receive_type}</div>

                                    <div className="product_prise" >
                                        {Math.ceil(date?.price)} c
                                    </div>

                                    <div className="des">
                                        <p>{date?.description}</p>
                                    </div>

                                    <div className="product_options">
                                        <div className="product_color">
                                            <label>Цвет:</label>
                                            <div className="blok_color">

                                                {
                                                    <>
                                                        <img src={date?.color?.image} alt="" />
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="blok_bey_product">
                                        <div className="count_product">
                                            <button onClick={() => {
                                                if (count - 1 > 0) {
                                                    setCount(count - 1)
                                                }
                                            }}>
                                                -
                                            </button>
                                            <span>{count}</span>
                                            <button onClick={() => {
                                                setCount(count + 1)
                                            }}>
                                                +
                                            </button>
                                        </div>
                                        <button className="bey_product" >
                                            В корзину
                                        </button>

                                        <button className={`featured ${active ? 'featured_active' : ''}`} onClick={() => {
                                            setActive(!active)
                                        }}>
                                            <svg width="28.750000" height="25.357056" viewBox="0 0 28.75 25.3571">
                                                <desc>
                                                    Created with Pixso.
                                                </desc>
                                                <defs />
                                                <path id="Vector" d="M14.37 24.85L26.19 12.75C27.51 11.4 28.25 9.57 28.25 7.67C28.25 3.71 25.11 0.5 21.24 0.5C19.38 0.5 17.6 1.25 16.28 2.6L14.37 4.55L12.46 2.6C11.14 1.25 9.36 0.5 7.5 0.5C3.63 0.5 0.5 3.71 0.5 7.67C0.5 9.57 1.23 11.4 2.55 12.75L14.37 24.85Z" stroke="#F57520" stroke-opacity="1.000000" stroke-width="1.000000" stroke-linejoin="round" />
                                            </svg>

                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="blok_image">
                                <img src={date?.image} alt="" />
                            </div>

                        </div>


                    </div>
                    <div className="blok_info_characteristic">
                        <h3>Характеристика</h3>

                        <div className="group_characteristic">

                            <div className="blok_characteristic">
                                <span className="title">Цвет</span>
                                <span className="title_value">{date?.color?.name}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Год</span>
                                <span className="title_value">{`${date?.year ? date?.year : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Диаметр колеса</span>
                                <span className="title_value">{`${date?.wheel_diameter ? date?.wheel_diameter : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Материал рамы</span>
                                <span className="title_value">{`${date?.frame_material ? date?.frame_material?.name : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Размер</span>
                                <span className="title_value">{`${date?.size ? date?.size : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Страна</span>
                                <span className="title_value">{`${nameFlag ? nameFlag : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Производитель</span>
                                <span className="title_value">{`${date?.brand ? date?.brand?.name : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Покрышки</span>
                                <span className="title_value">{`${date?.tires ? date?.tires : 'не указен'}`}</span>
                            </div>
                                    
                            <div className="blok_characteristic">
                                <span className="title">Рама</span>
                                <span className="title_value">{`${date?.frame ? date?.frame : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Подседельный Штырь</span>
                                <span className="title_value">{`${date?.seatpost ? date?.seatpost : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Седло</span>
                                <span className="title_value">{`${date?.saddle ? date?.saddle : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Вилка</span>
                                <span className="title_value">{`${date?.fork ? date?.fork : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Вынос</span>
                                <span className="title_value">{`${date?.takeaway ? date?.takeaway : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Колеса</span>
                                <span className="title_value">{`${date?.wheels ? date?.wheels : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Руль</span>
                                <span className="title_value">{`${date?.handlebar ? date?.handlebar : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Тип тормозов</span>
                                <span className="title_value">{`${date?.brake_system ? date?.brake_system : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Тормозная система</span>
                                <span className="title_value">{`${date?.brake_system ? date?.brake_system : 'не указен'}`}</span>
                            </div>

                            <div className="blok_characteristic">
                                <span className="title">Манетки</span>
                                <span className="title_value">{`${date?.shifters ? date?.shifters : 'не указен'}`}</span>
                            </div>

                            {/*brake_type	  */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ProductDetail
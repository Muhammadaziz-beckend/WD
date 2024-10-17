import PaginationRounded from './paginator'

import Mouth from '../static/img/mouth.svg'
import Image_test from '../static/img/image_test.png'
import Flag from '../static/img/flag.png'

import { NavLink } from 'react-router-dom'

const ProductMain = (
    {
        page,
        setPage,
        products,
        filter,
        setFilter
    }
) => {



    return (
        <>
            <div className="product">
                <div className="container_product">
                    <div className="product_items">
                        <div className="hed_product">
                            <select onChange={(event) => {
                                const value = { "ordering": [event.target.value] };
                                setFilter({
                                    ...filter,
                                    ...value
                                });
                            }} name='ordering' id="">
                                <option value="">Сортировка от последнего</option>
                                <option value="price">Цены: по возрастанию</option>
                                <option value="-price">Цены: по убыванию</option>
                            </select>
                        </div>

                        <div className="product_blok_items">
                            {products?.data?.results?.length != 0 ? products?.data?.results?.map(item => (
                                <div className="product_blok_item" key={item?.id}>
                                    <div className="top">
                                        <div className="flag">
                                            <img src={item?.flag?.image} alt="Flag" />
                                        </div>

                                        <div className="info_product">
                                            <span>{item?.receive_type}</span>
                                        </div>

                                        <img src={item?.image} alt="Product" className='product_img' />
                                    </div>

                                    <div className="bottom">
                                        <div className="info_prise_and_name">
                                            <p>{item?.name}</p>
                                            <span>{Math.ceil(Number(item?.price))} ₽</span>
                                        </div>

                                        <NavLink to={`product/${item?.id}`} className="bey_product">
                                            <div className="blok_button">
                                                <img src={Mouth} alt="Mouse" />
                                                <span>В 1 клик</span>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            )) : '404'}
                        </div>


                        <div className="paginator">

                            {products?.data?.next || products?.data?.previous ? <PaginationRounded count={Math.ceil(Number(products?.data?.count) / 9)} page={page} setPage={setPage} /> : ''}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ProductMain
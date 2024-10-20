import { useEffect, useState } from 'react'
import Open_close from '../../../../static/img/open_close.svg'
import Test from '../../../../static/img/image_test.png'
import Get from '../../../../request/get'



const History_blok = ({ date }) => {

    const [active, setActive] = useState(false)
    const [data, setData] = useState()
    const [dike, setBike] = useState()

    useEffect(() => {
        let dateYear = String(new Date(date?.order_date).getFullYear())
        let dateDate = String(new Date(date?.order_date).getDate())
        let dateMonth = String(new Date(date?.order_date).getMonth())

        setData(`${dateDate.length == 1 ? 0 + dateDate : dateDate}.${dateMonth.length == 1 ? '0' + dateMonth : dateMonth}.${dateYear.length == 1 ? 0 + dateYear : dateYear}`)

        Get(`http://127.0.0.1:8000/api/v1/products/${date?.bike}/`).then(r => setBike(r?.data))

    }, [date])

    console.log(dike);



    return (

        <>
            <div className="blok_item_history">
                <div className="blok_item_hed_history">
                    <span>{data}</span>
                    <span>{date?.id}</span>
                    <span>{Math.ceil(date?.quantity)} шт</span>
                    <span>{date?.status}</span>
                    <div className={`blok_open_close ${active ? 'active' : ''}`} onClick={() => setActive(!active)}>
                        <img src={Open_close} alt="" />
                    </div>
                </div>

                <div className="blok_items_main_history">

                    {active && (
                        <>
                            <div className="blok_item_main_history">
                                <img src={dike?.image} alt="" />
                                <p className='title'>{dike?.name}</p>
                                <div className="prise">
                                    <h4>{Math.ceil(dike?.price)* Math.ceil(date?.quantity)}  c</h4>

                                </div>
                            </div>
                        </>
                    )}


                </div>
            </div>
        </>
    )
}


export default History_blok
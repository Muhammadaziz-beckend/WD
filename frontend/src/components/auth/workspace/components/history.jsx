import { useEffect, useState } from "react"
import History_blok from "./history_blok"
import Get from '../../../../request/get.jsx'

const History = () => {

    const [date, setDate] = useState()

    const { token } = JSON.parse(localStorage.getItem('infoUserBike'))

    useEffect(() => {

        Get('http://127.0.0.1:8000/api/v1/auth/order/history/', token).then(
            r => {
                setDate(r?.data)
            }
        )
    }, [])

    console.log(date)

    return (

        <>
            <div className="workspace">

                <div className="workspace_container">

                    <div className="workspace_item">

                        <h3>История заказов</h3>

                        <div className="blok_history">

                            <div className="hed_blok_history">
                                <span>Дата</span>
                                <span>Номер заказа</span>
                                <span>Количество заказа</span>
                                <span>Статус</span>
                            </div>

                            <div className="main_blok_history">
                                {date?.map(item =>
                                (
                                    <History_blok date={item} />
                                )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default History
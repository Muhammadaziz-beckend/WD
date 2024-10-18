import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import Get from "../../request/get"



const Account = () => {
    const { id } = useParams()

    const [date,setDate] = useState({})

    useEffect(() => {
        Get(`http://127.0.0.1:8000/api/v1/products/${id}/`).then(r => {
            setDate(r.data)
        })
     }, [])

     console.log(date);
     

    return (
        <div className="info_account">

            <h4>Мой аккаунт</h4>

            <div className="group_info_user">
                <NavLink to='/auth/history'>История заказов</NavLink>
                <NavLink to='/auth/info-user'>Персональные данные</NavLink>
                <NavLink to='/auth/change-password'>Смена пароля</NavLink>
                <NavLink to='/auth/wish-list'>Список желаний</NavLink>
                <NavLink to='/auth/logout'>Выйти</NavLink>
            </div>
        </div>
    )
}


export default Account
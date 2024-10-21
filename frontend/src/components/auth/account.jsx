import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import Get from "../../request/get"



const Account = ({userMenuOpen , setUserMenuOpen}) => {



    return (
        <div className="info_account">

            <h4>Мой аккаунт</h4>

            <div className="group_info_user">
                <NavLink to='/auth/history'>История заказов</NavLink>
                <NavLink to='/auth/'>Персональные данные</NavLink>
                <NavLink to='/auth/change-password'>Смена пароля</NavLink>
                <NavLink to='/auth/wishlist'>Список желаний</NavLink>
                <NavLink to='/auth/logout'>Выйти</NavLink>
            </div>
        </div>
    )
}


export default Account
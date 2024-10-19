import logo from './../static/img/logo.svg'
import search from './../static/img/search.svg'
import searchInput from './../static/img/searchInput.svg'
import user from './../static/img/user.svg'
import favorites from './../static/img/favorites.svg'
import chick from './../static/img/chick.svg'
import burgerMenu from './../static/img/burgerMenu.svg'
import close from '../static/img/close.svg'

import Menu from './select'
import Login from "./auth/login.jsx";
import Account from './auth/account.jsx'

import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = ({ filter, setFilter }) => {

    const bicyclesRef = useRef()
    const sparePartsRef = useRef()
    const equipmentRef = useRef()
    const accessoriesRef = useRef()
    const searchRef = useRef()

    const [searchOpen, setSearchOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [is_user_authorization, set_user_authorization] = useState(false)

    const isActive = (ref = bicyclesRef) => {

        bicyclesRef.current.className = ''
        sparePartsRef.current.className = ''
        equipmentRef.current.className = ''
        accessoriesRef.current.className = ''

        ref.current.className = `active`

    }

    useEffect(() => {
        bicyclesRef.current.className = `active`
        set_user_authorization(Boolean(localStorage.getItem('infoUserBike')))
    }, [])

    const headerSubmit = (
        event
    ) => {
        event.preventDefault()

        const value = { "search": [searchRef.current.value] };
        console.log(value);

        setFilter({ ...filter, ...value });
    }

    return (
        <>
            <header className="header">

                <div className="container">

                    <div className="header_items">

                        <NavLink to='/' className="logo">

                            <img src={logo} alt="" />
                        </NavLink>

                        <div className="blok_access">
                            <div className="menu">
                                <ul>
                                    <li onClick={() => isActive(bicyclesRef)} ref={bicyclesRef}>Велосипеды</li>
                                    <li onClick={() => isActive(sparePartsRef)} ref={sparePartsRef}>Запчасти</li>
                                    <li onClick={() => isActive(equipmentRef)} ref={equipmentRef}>Экипировка</li>
                                    <li onClick={() => isActive(accessoriesRef)} ref={accessoriesRef}>Аксессуары</li>
                                </ul>
                            </div>

                            <div className="access">

                                <ul>
                                    <li onClick={() => searchOpen ? setSearchOpen(false) : setSearchOpen(true)} className='search'><img src={search} />

                                    </li>
                                    <div className={searchOpen ? 'blok_search' : 'display_none'}>
                                        <form method="get" onSubmit={headerSubmit}>
                                            <input
                                                type="text"
                                                placeholder="Поиск"
                                                ref={searchRef}
                                            />

                                            <button type='submit'><img src={searchInput} /></button>
                                        </form>
                                    </div>
                                    <li onClick={() => setUserMenuOpen(!userMenuOpen)}><img src={user} /></li>
                                    <li><img src={favorites} /></li>
                                    <li><img src={chick} /></li>
                                </ul>

                                <ul>
                                    <li onClick={() => setMenuOpen(true)}><img src={burgerMenu} /></li>
                                </ul>
                            </div>
                        </div>

                        <div className={userMenuOpen ? 'menu_blok' : 'menu_blok_none'}>
                            <div className="blok_user">
                                <div className="blok_close" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                                    <img src={close} alt="" />
                                </div>

                                {
                                    is_user_authorization ? <Account /> : <Login />
                                }

                            </div>
                        </div>

                        <div className={menuOpen ? 'menu_blok' : 'menu_blok_none'}>
                            <div className="blok_user">
                                <div className="blok_close" onClick={() => setMenuOpen(false)}>
                                    <img src={close} alt="" />
                                </div>
                                <h4>Доп. Информация</h4>

                                <Menu />
                            </div>
                        </div>

                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
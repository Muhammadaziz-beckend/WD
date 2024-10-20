import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Left = () => {
    const location = useLocation(); // Получаем текущий маршрут
    const [activeLink, setActiveLink] = useState('profile');

    const handleSetActive = (linkName) => {
        setActiveLink(linkName);
    };

    useEffect(() => {
        // Проверяем, какой маршрут активен, и обновляем состояние
        if (location.pathname === '/auth/chang-password') {
            setActiveLink('password');
        } else if (location.pathname === '/auth/') {
            setActiveLink('profile');
        } else if (location.pathname === '/auth/history') {
            setActiveLink('history');
        } else if (location.pathname === '/auth/wishlist') {
            setActiveLink('wishlist');
        }
    }, [location.pathname]);

    return (
        <>
            <aside className="aside">
                <div className="container_aside">
                    <div className="aside_item">
                        <h4 className="h4">Мой аккаунт</h4>

                        <nav className="aside_nav">
                            <ul>
                                <NavLink
                                    to="/auth/history"
                                    className={activeLink === 'history' ? 'activeLink' : ''}
                                    onClick={() => handleSetActive('history')}
                                >
                                    История заказов
                                </NavLink>
                                <NavLink
                                    to="/auth/"
                                    className={activeLink === 'profile' ? 'activeLink' : ''}
                                    onClick={() => handleSetActive('profile')}
                                >
                                    Персональные данные
                                </NavLink>
                                <NavLink
                                    to="/auth/chang-password"
                                    className={activeLink === 'password' ? 'activeLink' : ''}
                                    onClick={() => handleSetActive('password')}
                                >
                                    Смена пароля
                                </NavLink>
                                <NavLink
                                    to="/auth/"
                                    className={activeLink === 'wishlist' ? 'activeLink' : ''}
                                    onClick={() => handleSetActive('wishlist')}
                                >
                                    Список желаний
                                </NavLink>
                                <NavLink to="/auth/">Выйти</NavLink>
                            </ul>
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Left;

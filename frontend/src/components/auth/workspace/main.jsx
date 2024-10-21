import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../../header';
import AuthProfile from './auth';
import ChanPassword from './components/chanPassword';
import History from './components/history';
import { useEffect } from 'react';
import Wishlist from './components/wishlist';
import Basket from './components/basket';




const MainAuth = ({ userMenuOpen, setUserMenuOpen }) => {

    let navigate = useNavigate()

    useEffect(() => {
        const userData = localStorage.getItem('infoUserBike');

        setUserMenuOpen(false)

        if (userData) {
            try {
                const { token } = JSON.parse(userData);
            } catch (error) {
                console.error("Ошибка при парсинге JSON:", error);
            }
        } else {
            navigate('/');  // Если данных нет, перенаправляем на главную
        }
    }, [navigate]);

    

    return (
        <>
            <Header userMenuOpen={userMenuOpen}
                setUserMenuOpen={setUserMenuOpen} />

            <main className="main">
                <div className="container">
                    <div className="main-item">
                        <Routes>

                            <Route path='/' element={<AuthProfile />} />
                            <Route path='/chang-password' element={<AuthProfile component={<ChanPassword />} />} />
                            <Route path='/history' element={<AuthProfile component={<History />} />} />
                            <Route path='/wishlist' element={<AuthProfile component={<Wishlist userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} />} />} />
                            <Route path='/basket' element={<Basket/>} />
                        </Routes>
                    </div>
                </div>
            </main>

        </>
    )
}


export default MainAuth
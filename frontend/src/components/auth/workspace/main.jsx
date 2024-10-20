import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../../header';
import AuthProfile from './auth';
import ChanPassword from './components/chanPassword';
import History from './components/history';
import { useEffect } from 'react';




const MainAuth = () => {

    let navigate = useNavigate()

    useEffect(() => {
        const userData = localStorage.getItem('infoUserBike');
        
        if (userData) {
            try {
                const { token } = JSON.parse(userData);  // Если данные есть, распарсим и извлечем token
                // Работайте с токеном здесь
            } catch (error) {
                console.error("Ошибка при парсинге JSON:", error);
            }
        } else {
            navigate('/');  // Если данных нет, перенаправляем на главную
        }
    }, [navigate]);


    return (
        <>
            <Header />

            <main className="main">
                <div className="container">
                    <div className="main-item">
                        <Routes>

                            <Route path='/' element={<AuthProfile />} />
                            <Route path='/chang-password' element={<AuthProfile component={<ChanPassword />} />} />
                            <Route path='/history' element={<AuthProfile component={<History />} />} />
                        </Routes>
                    </div>
                </div>
            </main>

        </>
    )
}


export default MainAuth
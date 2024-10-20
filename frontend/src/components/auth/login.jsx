import { NavLink, useNavigate } from "react-router-dom";
import PostComponent from "../../request/post";
import { useState } from "react";
import Phone from "./components/phone";


const Login = () => {

    let navigate = useNavigate()
    const [active, setActive] = useState('login')
    const [phone, setPhone] = useState()

    const [error, setError] = useState()

    const headSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData(event.target);

        if (active !== 'login') {
            formData.append('phone', '+' + phone)
        }

        let date = {}
        for (let [key, value] of formData.entries()) {
            date[key] = value
        }

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        try {
            PostComponent(`http://127.0.0.1:8000/api/v1/auth/${active == 'login' ? 'login' : 'register'}/`, date).then(
                r => {
                    if (r.data) {
                        localStorage.setItem('infoUserBike', JSON.stringify(r.data));
                        window.location.reload();
                    }else {
                        setError(r?.response?.data?.detail)
                    }
                    // navigate('/auth/')
                }
            )
        } catch (e) {

            console.log(e);

        }
    }

    return (
        <>
            <form method="post" className="account_user" onSubmit={headSubmit}>
                <div className="info_form">
                    <div onClick={() => setActive('login')} className={active === 'login' ? `active` : `login_register_default_link`}>Войти</div>
                    <div onClick={() => setActive('register')} className={active === 'register' ? `active` : `login_register_default_link`}>Регистрация</div>
                </div>

                {
                    active === 'login' ? (
                        <>
                            <label htmlFor="">
                                <p>E-mail</p>
                                <input name="email" type="email" required />
                            </label>
                            <label htmlFor="">
                                <p>Пароль</p>
                                <input type="password" name="password" id="" min={8} required />
                            </label>
                        </>
                    ) : (
                        <>
                            <label htmlFor="">
                                <p>Имя пользователя</p>
                                <input type="text" name="first_name" />
                            </label>
                            <label htmlFor="">
                                <p>Фамилия пользователя</p>
                                <input type="text" name="last_name" />
                            </label>
                            <label htmlFor="">
                                <p>E-mail</p>
                                <input name="email" type="email" required />
                            </label>
                            <label htmlFor="">
                                <p>Телефон номер</p>
                                <Phone
                                    phone={phone}
                                    setPhone={setPhone}
                                />
                            </label>
                            <label htmlFor="">
                                <p>Пароль</p>
                                <input type="password" name="password" id="" min={8} required />
                            </label>
                            <label htmlFor="">
                                <p>Подтвердите пароль</p>
                                <input type="password" name="password_confirm" id="" min={8} required />
                            </label>
                        </>
                    )
                }

                <p className="error">
                    {error}
                </p>
                <button type="submit">Войти</button>
            </form>
        </>
    )
}



export default Login
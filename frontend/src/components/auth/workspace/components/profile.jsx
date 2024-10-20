import { useEffect, useState } from "react"
import Phone from "../../components/phone"
import Loading from '../../../../static/img/loading.gif'
import Get from "../../../../request/get"
import Post from "../../../../request/post"
import Patch from "../../../../request/patch"
import { useNavigate } from "react-router-dom"

const Profile = () => {

    let navigate = useNavigate()

    const [phone, setPhone] = useState()
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState()


    const headerSubmit = async (event) => {
        event.preventDefault()

        let formDate = new FormData(event.target)

        if (phone) {
            formDate.append('phone', phone)
        }

        for (let [key, value] of formDate.entries()) {
            console.log(key, value);
            setDate(key, value);
        }

        let user = localStorage.getItem('infoUserBike')

        if (!user) {
            navigate('/')
        }
        const { token } = JSON.parse(user)

        setLoading(true)
        await Patch('http://127.0.0.1:8000/api/v1/auth/profile/update/', formDate, token).then(r => {
            setLoading(false);
            window.location.reload();
            console.log(r.data);
        })

    }

    useEffect(() => {

        let user = localStorage.getItem('infoUserBike')

        if (!user) {
            navigate('/')
        } else {
            const { token } = JSON.parse(user)

            Get('http://127.0.0.1:8000/api/v1/auth/profile/update/', token).then(
                r => {
                    setDate(r.data);
                    console.log(r.data);
                    setPhone(r.data?.phone)
                }
            )
        }



    }, [])

    return (
        <>
            <div className="workspace">

                <div className="workspace_container">

                    <div className="workspace_item">

                        <h3>Персональные данные</h3>

                        <form method="post" className="workspace_form" onSubmit={headerSubmit}>

                            <div className="label fill_name_user" >

                                <label >
                                    <p>Имя</p>
                                    <input type="text" name="first_name" required defaultValue={date?.first_name} />

                                </label>

                                <label >
                                    <p>Фамилия</p>
                                    <input type="text" name="last_name" required defaultValue={date?.last_name} />
                                </label>

                            </div>

                            <label className="see_full_name">
                                <p>Отображаемое имя</p>
                                <input type="text" name="displayname" required defaultValue={date?.displayname} />
                            </label>

                            <label>
                                <p>E-mail</p>
                                <input type="email" name="email" id="" required defaultValue={date?.email} />
                            </label>

                            <label>
                                <p>Телефон</p>
                                <Phone phone={phone} setPhone={setPhone} />
                            </label>

                            <label >
                                <p>Город</p>
                                <input type="text" name="city" required defaultValue={date?.city} />
                            </label>

                            <label >
                                <p>Улица</p>
                                <input type="text" name="street" required defaultValue={date?.street} />
                            </label>

                            <div className="address_user">

                                <label>
                                    <p>Дом</p>
                                    <input className="input_num" name="house" required type="text" defaultValue={date?.house} />
                                </label>

                                <label>
                                    <p>Этаж</p>
                                    <input className="input_num" name="floor" required type="text" defaultValue={date?.floor} />
                                </label>

                                <label>
                                    <p>Квартира</p>
                                    <input className="input_num" name="apartment" required type="text" defaultValue={date?.apartment} />
                                </label>

                            </div>

                            <button type="submit">
                                {
                                    loading ?
                                        (<img src={Loading} alt="" />)
                                        : `Изменить`
                                }
                            </button>
                        </form>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile
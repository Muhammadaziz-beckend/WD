import { useRef, useState } from 'react'
import Loading from '../../../../static/img/loading.gif'
import Post from '../../../../request/post'

const ChanPassword = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const formRef = useRef()

    const headerSubmit = (
        event
    ) => {
        event.preventDefault()

        const formDate = new FormData(event.target)

        const { token } = JSON.parse(localStorage.getItem('infoUserBike'))
        setLoading(true)
        Post('http://127.0.0.1:8000/api/v1/auth/change-password/', formDate, token).then(r => {
            setError(r?.response?.data)
            console.log(r?.response?.data);
            setLoading(false)
            formRef.current.reset();
            setError({
                old_password : ['Пароль успешно изменён']
            })

            setTimeout(() => {
                setError({})
            }, 4000);
        })
    }

    return (
        <>
            <div className="workspace">

                <div className="workspace_container">

                    <div className="workspace_item">

                        <h3>Смена Пароля</h3>

                        <form ref={formRef} method="post" onClick={() => setError({})} className="workspace_form" onSubmit={headerSubmit}>


                            <label>
                                <p>Старый пароль</p>
                                <input type="password" required className='input_password' name='old_password' />
                                <span className='error input_password'>
                                    {error ? error?.old_password?.map(item => (
                                        <>
                                            <span>{item}</span>
                                        </>
                                    )) : ''}
                                </span>
                            </label>


                            <label>
                                <p>Новый пароль</p>
                                <input type="password" required className='input_password' name='new_password' />
                                <span className='error input_password'>
                                    {error ? error?.new_password?.map(item => (
                                        <>
                                            <span>{item}</span>
                                        </>
                                    )) : ''}
                                </span>
                            </label>

                            <label>
                                <p>Повторите новый пароль</p>
                                <input type="password" required className='input_password' name='new_password_confirm' />
                                <span className='error input_password'>
                                    {error ? error?.new_password_confirm?.map(item => (
                                        <>
                                            <span>{item}</span>
                                        </>
                                    )) : ''}
                                </span>
                            </label>

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


export default ChanPassword
import css from '../../../../static/css/style.module.css'
import { useEffect, useState } from 'react'
import Get from '../../../../request/get'
import Close from '../../../../static/img/close.svg'
import Delete from '../../../../request/delete'
import Patch from '../../../../request/patch'

const CardProduct = ({ id,id_user, bike_id, count, token_user, onDelete }) => {
    const [bike, setBike] = useState({});
    const [valueProduct, setValueProduct] = useState(count);

    useEffect(() => {
        Get(`http://127.0.0.1:8000/api/v1/products/${bike_id}/`).then(r => setBike(r?.data));
    }, [bike_id]);

    useEffect(() => {

        const obj = {
            "quantity": valueProduct,
            // "status": "pending",
            // "user": id_user,
            // "bike": bike_id
        }

        Patch(`http://127.0.0.1:8000/api/v1/auth/orders/${id}/`,obj,token_user,)

    }, [valueProduct])

    const deleteBikeInCard = () => {
        Delete(`http://127.0.0.1:8000/api/v1/auth/orders/${id}/`, token_user).then(() => {
            onDelete(id); // Сообщаем родительскому компоненту об удалении
        });
    };

    return (
        <div className={css.blok_item}>
            <div className={css.image_product}>
                <img src={bike?.image} alt="" />
            </div>
            <div className={css.title_product}>
                {bike?.name}
            </div>
            <div className={css.count_by_product}>
                <button
                    onClick={() => {
                        if (valueProduct - 1 > 0) {
                            setValueProduct(valueProduct - 1);
                        }
                    }}
                    className={css.button}
                >
                    -
                </button>
                {valueProduct}
                <button
                    onClick={() => {
                        setValueProduct(valueProduct + 1);
                    }}
                    className={css.button}
                >
                    +
                </button>
            </div>
            <div className={css.price_product}>
                {Math.ceil(bike?.price)} ₽
            </div>
            <button onClick={deleteBikeInCard} className={css.delete_product_in_card}>
                <img src={Close} alt="" />
            </button>
        </div>
    );
};


const Basket = ({ userMenuOpen, setUserMenuOpen }) => {
    const [card, setCard] = useState([]);
    const [sum_prise, setSum_prise] = useState(0);
    const user = JSON.parse(localStorage.getItem('infoUserBike'));

    useEffect(() => {
        if (user) {
            Get('http://127.0.0.1:8000/api/v1/auth/orders/', user?.token)
                .then(r => {
                    setCard(r?.data);
                    calculateSum(r?.data);
                })
                .catch(r => {
                    setUserMenuOpen(!userMenuOpen);
                });
        } else {
            setUserMenuOpen(!userMenuOpen);
        }
    }, []);

    // Функция для пересчета суммы
    const calculateSum = (data) => {
        const total = data.reduce((acc, item) => acc + Math.ceil(item?.price), 0);
        setSum_prise(total);
    };

    // Функция для удаления продукта из корзины и обновления списка
    const handleDeleteProduct = (id) => {
        const updatedCard = card.filter(item => item?.id !== id);
        setCard(updatedCard);
        calculateSum(updatedCard); // Пересчитываем сумму после удаления
    };

    return (
        <div className={css.blok_main_card}>
            <h2 className={css.basket_h2}>Корзина</h2>
            <div className={css.blok_items}>
                <div className={css.blok_left}>
                    {card?.map(item => (
                        <CardProduct
                            key={item?.id} // Уникальный ключ
                            id={item?.id}
                            bike_id={item?.bike}
                            count={item?.quantity}
                            token_user={user?.token}
                            id_user={user?.id}
                            onDelete={handleDeleteProduct} // Передаем функцию удаления
                        />
                    ))}
                </div>
                <div className={css.blok_right}>
                    <div className={css.blok_summa}>
                        <span className={css.sum_blok_text}>Итого</span>
                        <span className={css.sum_blok_num}>{sum_prise} ₽</span>
                    </div>
                    <button type='button' className={css.blok_button_by}>
                        Оформить заказ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Basket;

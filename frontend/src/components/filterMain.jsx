import { useEffect, useState } from "react";
import RangPrice from "./filter/rangPrice";
import Get from "../request/get";


const FilterMain = () => {

    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    const [selectedCat, setSelectedCat] = useState('');

    const handleSelect = (category) => {
        setSelectedCat(category);
    };

    const [priceFrom, setPriceFrom] = useState(null)
    const [priceTo, setPriceTo] = useState(null)

    // fetch
    const [colorDate, setColorDate] = useState([])
    const [brandDate, setBrandDate] = useState([])
    const [categoriesDate, setCategoriesDate] = useState([])

    useEffect(() => {
        Get('http://127.0.0.1:8000/api/v1/color/').then(r => setColorDate(r.data))
        Get('http://127.0.0.1:8000/api/v1/brand/').then(r => setBrandDate(r.data))
        Get('http://127.0.0.1:8000/api/v1/categories/').then(r => setCategoriesDate(r.data))
        // 
    }, [])


    return (
        <aside className="aside">
            <div className="aside_container">
                <form className="aside_items">
                    <div className="blok checkbox">
                        <label className="checkbox">
                            <p>Только в наличии</p>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleToggle}
                                id="toggle"
                            />
                            <div className={`feck ${isChecked ? 'active' : ''}`}>
                                <div className={`feck_blok_boll ${isChecked ? 'active' : ''}`}></div>
                            </div>
                        </label>
                    </div>

                    <div className="blok">
                        <h3>Категории товара</h3>

                        <div className="group_cat">

                            {categoriesDate?.map(item => (
                                <label className="radioInput">
                                    <input
                                        type="radio"
                                        name="categories"
                                        value={item?.id}
                                    />
                                    <div className={`feckRadio`}></div>
                                    <p>{item?.name}</p>
                                </label>
                            ))}

                        </div>
                    </div>

                    <div className="blok">
                        <h3>Цена</h3>

                        <div className="blok_range_prise">
                            <div className="top">
                                <RangPrice priseStart={setPriceFrom} priseEnd={setPriceTo} />
                            </div>
                            <div className="bottom">
                                <input type="text" name="price_from" value={priceFrom} />
                                <span>-</span>
                                <input type="text" name="price_to" value={priceTo} />
                            </div>
                        </div>
                    </div>

                    <div className="blok">
                        <h3>Бренд</h3>

                        <div className="blok_checkbox_multiple">

                            {brandDate?.map(item => (<label className="blokInputCh" >
                                <input type="checkbox" name="brands" value={item?.id} />
                                <div className="fake"></div>
                                <p>{item?.name}</p>
                            </label>))}

                        </div>
                    </div>

                    <div className="blok">
                        <h3>Цвет</h3>

                        <div className="blok_multiple">
                            {colorDate?.map(item =>
                            (<label>
                                <input type="radio" name="color" value={item?.id} />
                                <div className="fake" style={{ background: `${item?.name}` }}></div>
                            </label>)
                            )}
                        </div>
                    </div>

                    <div className="group_button_form">

                        <button type="submit" className="button button1">Фильтровать</button>
                        <button type="reset" className="button">Сбросить фильтры</button>
                    </div>
                </form>
            </div>
        </aside>
    )
}


export default FilterMain
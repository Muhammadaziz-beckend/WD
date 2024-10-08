import { useState } from "react";
import RangPrice from "./filter/rangPrice";


const FilterMain = () => {

    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    const [selectedCat, setSelectedCat] = useState('');

    const handleSelect = (category) => {
        setSelectedCat(category);
    };

    const [priceFrom, setPriceFrom] = useState('')
    const [priceTo, setPriceTo] = useState('')

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
                            <label className="radioInput">
                                <input
                                    type="radio"
                                    name="cat"
                                    id="triathlonBikes"
                                    checked={selectedCat === 'triathlonBikes'}
                                    onChange={() => handleSelect('triathlonBikes')}
                                />
                                <div className={`feckRadio ${selectedCat === 'triathlonBikes' ? 'active' : ''}`}></div>
                                <p>Велосипеды для триатлона</p>
                            </label>
                            <label className="radioInput">
                                <input
                                    type="radio"
                                    name="cat"
                                    id="mountainBikes"
                                    checked={selectedCat === 'mountainBikes'}
                                    onChange={() => handleSelect('mountainBikes')}
                                />
                                <div className={`feckRadio ${selectedCat === 'mountainBikes' ? 'active' : ''}`}></div>
                                <p>Горные велосипеды</p>
                            </label>
                        </div>
                    </div>

                    <div className="blok">
                        <h3>Цена</h3>

                        <div className="blok_range_prise">
                            <div className="top">
                                <RangPrice priseStart={setPriceFrom} priseEnd={setPriceTo} />
                            </div>
                            <div className="bottom">
                                <input type="text" name="price_from" value={priceFrom} id="" disabled />
                                <span>-</span>
                                <input type="text" name="price_to" id="" value={priceTo} disabled />
                            </div>
                        </div>
                    </div>

                    <div className="blok">
                        <h3>Бренд</h3>

                        <div className="blok_checkbox_multiple">

                            <label className="blokInputCh" >
                                <input type="checkbox" name="brands" id="" />
                                <div className="fake"></div>
                                <p>BMW</p>
                            </label>

                            <label className="blokInputCh">
                                <input type="checkbox" name="brands" id="" />
                                <div className="fake"></div>
                                <p>BMW</p>
                            </label>
                            
                        </div>
                    </div>

                    <div className="blok">
                        <h3>Цвет</h3>

                        <div className="blok_multiple">
                            <label htmlFor="">
                                <div className="fake" style={{background:'indigo'}}></div>
                                <input type="checkbox" name="" id="" />
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </aside>
    )
}


export default FilterMain
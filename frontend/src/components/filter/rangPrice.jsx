import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';

function valuetext(value) {
    return `${value} c`; // Форматируем значение как цену
}

const RangPrice = ({priseStart,priseEnd}) => {
    const [value, setValue] = React.useState([20, 1137900]); // Начальные значения цен

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        priseStart(value[0])
        priseEnd(value[1])
    },[value])

    return (
        <Box sx={{ width: 260 }}>
            <Slider
                getAriaLabel={() => 'Price range'} // Изменено на "Price range"
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0} // Минимальное значение
                max={1137900} // Максимальное значение
            />
        </Box>
    );
}

export default RangPrice
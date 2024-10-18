import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Phone = ({ phone, setPhone }) => {

    return (
        <PhoneInput
            country={'kg'}
            value={phone}
            onChange={phone => setPhone(phone)}
        />
    );
};

export default Phone;

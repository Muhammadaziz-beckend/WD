import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import css from '../static/css/style.module.css';

const Menu = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={css.main_blok_link}>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                className={`${css.blok_link} ${expanded === 'panel1' ? css.active : ''}`}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Велосипеды</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ul className={css.ul}>
                        <li>Велосипед</li>
                        <li>Велосипед</li>
                        <li>Велосипед</li>
                        <li>Велосипед</li>
                        <li>Велосипед</li>
                        <li>Велосипед</li>
                        <li>Велосипед</li>
                        <li>Велосипед</li>
                    </ul>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    className={`${css.blok_link} ${expanded === 'panel2' ? css.active : ''}`}
                >
                    <Typography>Экипировка</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ul className={css.ul}>
                        <li>qwe</li>
                    </ul>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    className={`${css.blok_link} ${expanded === 'panel3' ? css.active : ''}`}
                >
                    <Typography>Аксессуары</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Список аксессуаров...</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default Menu;

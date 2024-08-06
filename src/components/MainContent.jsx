import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import Form from './Form';
import Headline from './Headline';
import CountdownTimer from './CountdownTimer';

const MainContent = () => {
    return (

        <div>
            <Headline/>
            <div>
            <img src='/images/diskonspesial.webp' alt='promo'/>
            <p className='text-3xl text-center font-extrabold'>Promo Diskon Spesial akan berakhir dalam : </p>
            <CountdownTimer hours={0} minutes={9} seconds={0}/>
            </div>
            <br/>
            <div className='m-4'>
                <img src='/images/2.webp' alt='cod'/>
            </div>
            <div className='text-center space-x-6 text-redto text-5xl animate-bounce'>
                <FontAwesomeIcon icon={ faArrowDown}/>
                <FontAwesomeIcon icon={ faArrowDown}/>
                <FontAwesomeIcon icon={ faArrowDown}/>
            </div>
            <Form />

            <div className='space-y-2'>
                <img src='/images/testi (1).webp'/>
                <img src='/images/testi (2).webp'/>
                <img src='/images/testi (3).webp'/>
            </div>

            <div className='grid justify-center'>
                <img src='/images/fotter.webp' alt='footer'/>
                <img src='/images/fotter2.webp' alt='footer'/>
            </div>
        </div>
    );
};

export default MainContent;

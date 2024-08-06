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
            <div className='grid justify-center items-center'>
            <img src='/images/diskonspesial.webp' alt='promo' className="h-auto w-25"/>
            <p className='text-3xl text-center font-extrabold'>Promo Diskon Spesial akan berakhir dalam : </p>
            <CountdownTimer hours={0} minutes={9} seconds={0}/>
            </div>
            <br/>
            <div className='m-4 flex justify-center items-center'>
                <img src='/images/2.webp' alt='cod' className="h-auto w-25"/>
            </div>
            <div className='text-center space-x-6 text-redto text-5xl animate-bounce'>
                <FontAwesomeIcon icon={ faArrowDown}/>
                <FontAwesomeIcon icon={ faArrowDown}/>
                <FontAwesomeIcon icon={ faArrowDown}/>
            </div>
            <Form />

            <div className='space-y-2'>
                <img src='/images/testi (1).webp' alt='testi1' className="h-auto w-25"/>
                <img src='/images/testi (2).webp' alt='testi2' className="h-auto w-25"/>
                <img src='/images/testi (3).webp' alt='testi3' className="h-auto w-25"/>
            </div>

            <div className='grid justify-center'>
                <img src='/images/fotter.webp' alt='footer' className="h-auto w-25"/>
                <img src='/images/fotter2.webp' alt='footer' className="h-auto w-25"/>
            </div>
        </div>
    );
};

export default MainContent;

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
            <CountdownTimer hours={3} minutes={0} seconds={0}/>
            <br/>
            <div className='m-4'>
                <img src='/images/2.webp' alt='cod'/>
            </div>
            <div className='flex justify-center items-center gap-4 text-5xl text-redto animate-bounce'>
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

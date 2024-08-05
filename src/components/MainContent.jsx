import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, } from '@fortawesome/free-solid-svg-icons'

import Form from './Form';
import Headline from './Headline';
import CountdownTimer from './CountdownTimer';

const MainContent = () => {
    return (

        <div>
            <Headline/>
            <CountdownTimer hours={3} minutes={0} seconds={0}/>
            <br/>
            <div className='flex justify-center items-center gap-4 text-5xl text-redto animate-bounce'>
                <FontAwesomeIcon icon={ faArrowDown}/>
                <FontAwesomeIcon icon={ faArrowDown}/>
                <FontAwesomeIcon icon={ faArrowDown}/>
            </div>
            <Form />

            <div className='grid justify-center'>
                <img src='https://cdn.scalev.id/Image/388443c31ae44db194f0a4d19d32639f.webp'/>
                <img src='https://cdn.scalev.id/Image/82a22ece129e4ed2b4a2cae1d29f3c67.webp'/>
            </div>
        </div>
    );
};

export default MainContent;

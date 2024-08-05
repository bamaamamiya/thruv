import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

import Form from './Form';
import Headline from './part/Headline';

const MainContent = () => {
    return (

        <div>
            <Headline/>
            <Form />

            <div>
                <img src='https://cdn.scalev.id/Image/388443c31ae44db194f0a4d19d32639f.webp'/>
                <img src='https://cdn.scalev.id/Image/82a22ece129e4ed2b4a2cae1d29f3c67.webp'/>
            </div>
        </div>
    );
};

export default MainContent;

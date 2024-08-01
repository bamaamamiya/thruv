import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

import Footer from './Footer';
import Form from './Form';

const MainContent = () => {
    return (

        <div>
            <Form />
            <Footer />
        </div>
    );
};

export default MainContent;

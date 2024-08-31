import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainContent from './components/MainContent';
import Pel from './components/product/Pel'

import './index.css'
import Page from './components/Page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Page/>}/>
          <Route path='/shaver' element={<MainContent />} />
          <Route path='/pel' element={<Pel/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

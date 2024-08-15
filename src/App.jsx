import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainContent from './components/MainContent';
import Pel from './components/product/Pel'

import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<MainContent />} />
          <Route path='/pel' element={<Pel/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

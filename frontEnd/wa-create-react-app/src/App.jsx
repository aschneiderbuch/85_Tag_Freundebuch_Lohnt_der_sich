import { BrowserRouter, Routes,Route } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';
import { HomePage } from './page/HomePage';

function App() {
  return (
  <BrowserRouter>
   <Routes>
      <Route path='/' element={ <HomePage> </HomePage>} />
   </Routes>
  
  </BrowserRouter>
  );
}

export default App;

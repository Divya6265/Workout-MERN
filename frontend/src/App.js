//  Combines Routes 
// combines route
// combines components into route
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// pages & components

import Home from './pages/Home'
import Navbar from './components/navbar'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

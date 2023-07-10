import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Doisoatve from './Pages/Doisoatve';
import Goidichvu from './Pages/Goidichvu';
import Home from './Pages/Home/Home';
import Quanlive from './Pages/Quanlive';
import Trangchu from './Pages/Trangchu';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trangchu" element={<Trangchu />} />
                <Route path="/quanlive" element={<Quanlive />} />
                <Route path="/doisoatve" element={<Doisoatve />} />
                <Route path="/goidichvu" element={<Goidichvu />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Doisoatve from './Pages/Doisoatve/Doisoatve';
import Goidichvu from './Pages/Goidichvu/Goidichvu';
import Quanlive from './Pages/Quanlive/Quanlive';
import Trangchu from './Pages/Trangchu';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Trangchu />} />
                <Route path="/trangchu" element={<Trangchu />} />
                <Route path="/quanlive" element={<Quanlive />} />
                <Route path="/doisoatve" element={<Doisoatve />} />
                <Route path="/goidichvu" element={<Goidichvu />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

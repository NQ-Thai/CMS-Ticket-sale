import { Layout } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Top from './Component/Header';
import NavBar from './Component/NavBar';
import Doisoatve from './Pages/Doisoatve/Doisoatve';
import Goidichvu from './Pages/Goidichvu/Goidichvu';
import Quanlive from './Pages/Quanlive/Quanlive';
import Trangchu from './Pages/Trangchu';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Top />
            </Layout>
            <Layout className="container">
                <NavBar />
                <Layout>
                    <Routes>
                        <Route path="/" element={<Trangchu />} />
                        <Route path="/trangchu" element={<Trangchu />} />
                        <Route path="/quanlive" element={<Quanlive />} />
                        <Route path="/doisoatve" element={<Doisoatve />} />
                        <Route path="/goidichvu" element={<Goidichvu />} />
                    </Routes>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
}

export default App;

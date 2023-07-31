import { Layout } from 'antd';
import { Suspense, lazy } from 'react'; // Import Suspense and lazy
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Top from './Component/Header';
import NavBar from './Component/NavBar';
const Trangchu = lazy(() => import('./Pages/Trangchu'));
const Quanlive = lazy(() => import('./Pages/Quanlive/Quanlive'));
const Doisoatve = lazy(() => import('./Pages/Doisoatve/Doisoatve'));
const Goidichvu = lazy(() => import('./Pages/Goidichvu/Goidichvu'));

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Top />
            </Layout>
            <Layout className="container">
                <NavBar />
                <Layout>
                    {/* Wrap the Routes with Suspense */}
                    <Suspense fallback={<div></div>}>
                        <Routes>
                            <Route path="/" element={<Trangchu />} />
                            <Route path="/trangchu" element={<Trangchu />} />
                            <Route path="/quanlive" element={<Quanlive />} />
                            <Route path="/doisoatve" element={<Doisoatve />} />
                            <Route path="/goidichvu" element={<Goidichvu />} />
                        </Routes>
                    </Suspense>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
}

export default App;

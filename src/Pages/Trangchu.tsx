import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Top from '../Component/Header';
import NavBar from '../Component/NavBar';

function Trangchu() {
    return (
        <>
            <Layout>
                <Top />
            </Layout>
            <Layout className="container">
                <NavBar />
                <Layout
                    className="layout-content"
                    style={{
                        backgroundColor: '#FFFFFF',
                    }}
                >
                    <Content className="content">Thống kê</Content>
                </Layout>
            </Layout>
        </>
    );
}

export default Trangchu;

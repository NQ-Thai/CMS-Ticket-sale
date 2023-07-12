import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Top from '../Component/Header';
import NavBar from '../Component/NavBar';

function Quanlive() {
    return (
        <div>
            <Layout>
                <Top />
            </Layout>
            <Layout className="container">
                <NavBar />
                <Layout>
                    <Content className="content">Danh sách vé</Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default Quanlive;

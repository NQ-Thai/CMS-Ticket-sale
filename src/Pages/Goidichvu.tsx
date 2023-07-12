import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Top from '../Component/Header';
import NavBar from '../Component/NavBar';

function Goidichvu() {
    return (
        <div>
            <Layout>
                <Top />
            </Layout>
            <Layout className="container">
                <NavBar />
                <Layout>
                    <Content className="content">Danh sách gói vé</Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default Goidichvu;

import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Top from '../Component/Header';
import NavBar from '../Component/NavBar';

function Doisoatve() {
    return (
        <div>
            <Layout>
                <Top />
            </Layout>
            <Layout className="container">
                <NavBar />
                <Layout>
                    <Content className="content">Đối soát vé</Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default Doisoatve;

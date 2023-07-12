import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Top from '../../Component/Header';
import NavBar from '../../Component/NavBar';

function Home() {
    return (
        <div>
            <Layout>
                <Top />
            </Layout>
            <Layout className="container">
                <NavBar />
                <Layout>
                    <Content className="content">Thống kê</Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default Home;

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
                <Layout
                    className="layout-content"
                    style={{
                        backgroundColor: '#FFFFFF',
                    }}
                >
                    <Content>
                        <div className="content">Thống kê</div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default Home;
